"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImpactScreen } from "./impact-screen"
import { ArrowLeft, Camera, Sparkles, Heart } from "lucide-react"

interface AITryOnScreenProps {
  onBack: () => void
}

export function AITryOnScreen({ onBack }: AITryOnScreenProps) {
  const [currentScreen, setCurrentScreen] = useState<"try-on" | "impact">("try-on")
  const [isProcessing, setIsProcessing] = useState(false)

  if (currentScreen === "impact") {
    return <ImpactScreen onBack={onBack} />
  }

  const handleProposeSwap = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setCurrentScreen("impact")
    }, 2000)
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
      <div className="p-4 space-y-4">
        {/* Split View */}
        <div className="grid grid-cols-2 gap-3">
          {/* You */}
          <Card className="p-3 bg-card border-border">
            <div className="aspect-[3/4] bg-muted rounded-lg mb-2 overflow-hidden relative">
              <img src="/person-wearing-red-jacket.png" alt="You in their jacket" className="w-full h-full object-cover" />
              <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs">You</Badge>
            </div>
            <p className="text-xs text-center text-card-foreground font-medium">You in Anna's jacket</p>
          </Card>

          {/* Friend */}
          <Card className="p-3 bg-card border-border">
            <div className="aspect-[3/4] bg-muted rounded-lg mb-2 overflow-hidden relative">
              <img src="/person-wearing-white-dress.png" alt="Them in your dress" className="w-full h-full object-cover" />
              <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs">Anna</Badge>
            </div>
            <p className="text-xs text-center text-card-foreground font-medium">Anna in your dress</p>
          </Card>
        </div>

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
                    src="/red-jacket.png"
                    alt="Red jacket"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">Your Red Jacket</p>
                  <p className="text-xs text-muted-foreground">Size M • Zara</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3 text-accent" />
                <span className="text-xs text-muted-foreground">12</span>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary text-sm">⇄</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg">
                  <img
                    src="/white-dress.png"
                    alt="White dress"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">Anna's White Dress</p>
                  <p className="text-xs text-muted-foreground">Size M • H&M</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3 text-accent" />
                <span className="text-xs text-muted-foreground">15</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Button */}
      <div className="fixed bottom-6 left-4 right-4">
        <Button
          onClick={handleProposeSwap}
          disabled={isProcessing}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg"
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              <span>Processing Swap...</span>
            </div>
          ) : (
            "Propose Swap"
          )}
        </Button>
      </div>
    </div>
  )
}
