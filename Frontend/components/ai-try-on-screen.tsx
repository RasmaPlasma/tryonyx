"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImpactScreen } from "./impact-screen"
import { ArrowLeft, Camera, Sparkles, Heart } from "lucide-react"

type WardrobeItem = {
  id: number
  name: string
  image: string
  likes: number
  owner?: string
  __localUrl?: string
}

interface AITryOnScreenProps {
  onBack: () => void
  selectedItem: WardrobeItem | null
}

export function AITryOnScreen({ onBack, selectedItem }: AITryOnScreenProps) {
  const [currentScreen, setCurrentScreen] = useState<"try-on" | "impact">("try-on")
  const [isProcessing, setIsProcessing] = useState(false)
  const [resultImage, setResultImage] = useState<string | null>(null)

  if (currentScreen === "impact") {
    return <ImpactScreen onBack={onBack} />
  }

  const handleProposeSwap = async () => {
    if (!selectedItem) return

    setIsProcessing(true)
    setResultImage(null)

    try {
      // Convert image URLs to File objects for the API call
      const person1Response = await fetch('/mario.png')
      const person1Blob = await person1Response.blob()
      const person1File = new File([person1Blob], 'person1.png', { type: 'image/png' })

      // Use the selected item's image (handle both regular URLs and local blob URLs)
      const clothingImageUrl = selectedItem.__localUrl || selectedItem.image
      const person2Response = await fetch(clothingImageUrl)
      const person2Blob = await person2Response.blob()
      const person2File = new File([person2Blob], 'clothing.png', { type: 'image/png' })

      // Create FormData for the API call
      const formData = new FormData()
      formData.append('person', person1File)
      formData.append('clothing', person2File)

      // Call the swap API
      const response = await fetch('http://localhost:3001/api/tryon', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`)
      }

      const data = await response.json()

      if (data.success && data.resultUrl) {
        setResultImage(data.resultUrl)
      } else {
        throw new Error('API response did not contain result URL')
      }

    } catch (error) {
      console.error('Error calling swap API:', error)
      // You might want to show an error message to the user here
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold text-foreground">AI Try-On</h1>
        <Button variant="ghost" size="sm">
          <Camera className="w-4 h-4" />
        </Button>
      </div>

      {/* AI Try-On Interface */}
      <div className="p-4 space-y-4 pb-24">
        {/* Split View, Loading, or Result */}
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold text-foreground">Processing Swap...</p>
              <p className="text-sm text-muted-foreground">AI is analyzing the style compatibility</p>
            </div>
          </div>
        ) : resultImage ? (
          <div className="flex flex-col items-center space-y-4">
            <Card className="p-4 bg-card border-border w-full max-w-sm">
              <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden relative">
                <img src={resultImage} alt="AI Swap Result" className="w-full h-full object-cover" />
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs">AI Result</Badge>
              </div>
              <p className="text-sm text-center text-card-foreground font-medium mt-2">AI Try-On completed!</p>
            </Card>
            <Button
              variant="outline"
              onClick={() => setResultImage(null)}
              className="text-sm"
            >
              Try Another Try-On
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {/* You */}
            <Card className="p-3 bg-card border-border">
              <div className="aspect-[3/4] bg-muted rounded-lg mb-2 overflow-hidden relative">
                <img src="/mario.png" alt="You wearing selected item" className="w-full h-full object-cover" />
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs">You</Badge>
              </div>
              <p className="text-xs text-center text-card-foreground font-medium">
                You in {selectedItem?.owner ? `${selectedItem.owner}'s ${selectedItem.name}` : selectedItem?.name || 'selected item'}
              </p>
            </Card>

            {/* Selected Item */}
            <Card className="p-3 bg-card border-border">
              <div className="aspect-[3/4] bg-muted rounded-lg mb-2 overflow-hidden relative">
                <img
                  src={selectedItem?.image || "/placeholder.svg"}
                  alt={selectedItem?.name || 'selected item'}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs">
                  Selected Item
                </Badge>
              </div>
              <p className="text-xs text-center text-card-foreground font-medium">
                {selectedItem?.name || 'Selected Item'}
              </p>
            </Card>
          </div>
        )}

        {/* AI Confidence */}
        <Card className="p-4 bg-accent/5 border-accent/20">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">AI Confidence</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Style Match</span>
              <span className="text-accent font-medium">94%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-accent h-2 rounded-full" style={{ width: "94%" }} />
            </div>
          </div>
        </Card>

        {/* Swap Details */}
        <Card className="p-4 bg-card border-border">
          <h3 className="font-semibold text-card-foreground mb-3">Swap Details</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg">
                  <img
                    src={selectedItem?.image || "/placeholder.svg"}
                    alt={selectedItem?.name || "Selected item"}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    {selectedItem?.owner ? `${selectedItem.owner}'s ${selectedItem.name}` : `Your ${selectedItem?.name || 'Item'}`}
                  </p>
                  <p className="text-xs text-muted-foreground">Size M • Brand</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3 text-accent" />
                <span className="text-xs text-muted-foreground">{selectedItem?.likes || 0}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button
          onClick={handleProposeSwap}
          disabled={isProcessing || !selectedItem}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg disabled:opacity-50"
        >
          {!selectedItem ? (
            "No Item Selected"
          ) : isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              <span>Processing Try-On...</span>
            </div>
          ) : resultImage ? (
            "Try On Again"
          ) : (
            "Try On"
          )}
        </Button>
      </div>
    </div>
  )
}
