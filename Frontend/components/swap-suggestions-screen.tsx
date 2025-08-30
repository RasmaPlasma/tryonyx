"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Sparkles, Heart, MessageCircle, Star } from "lucide-react"

interface SwapSuggestionsScreenProps {
  onBack: () => void
}

export function SwapSuggestionsScreen({ onBack }: SwapSuggestionsScreenProps) {
  const suggestions = [
    {
      id: 1,
      friend: "Anna",
      item: "Blue Jeans",
      yourItem: "Red Jacket",
      image: "/classic-blue-jeans.png",
      score: 5,
      reason: "Perfect color match with your style!",
    },
    {
      id: 2,
      friend: "Sarah",
      item: "Black Boots",
      yourItem: "Green Skirt",
      image: "/black-boots.png",
      score: 4,
      reason: "Great for autumn outfits",
    },
    {
      id: 3,
      friend: "Emma",
      item: "Floral Top",
      yourItem: "White Dress",
      image: "/floral-top.png",
      score: 4,
      reason: "Similar aesthetic, different style",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold text-foreground">Swap Suggestions</h1>
        <div className="w-8" />
      </div>

      {/* AI Agent Card */}
      <div className="p-4">
        <Card className="p-4 bg-accent/5 border-accent/20 mb-6">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <div className="bg-background rounded-lg p-3 shadow-sm">
                <p className="text-sm text-foreground">
                  Your red jacket would look great with Anna's jeans! I found 3 perfect matches for you. 🌟
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">AI Stylist • Just now</p>
            </div>
          </div>
        </Card>

        {/* Suggestions List */}
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <Card key={suggestion.id} className="p-4 bg-card border-border">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
                  <img
                    src={suggestion.image || "/placeholder.svg"}
                    alt={suggestion.item}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-card-foreground">
                      {suggestion.friend}'s {suggestion.item}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: suggestion.score }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-2">For your {suggestion.yourItem}</p>

                  <p className="text-xs text-accent bg-accent/10 rounded px-2 py-1 inline-block">{suggestion.reason}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Message {suggestion.friend}
                </Button>
                <Button size="sm" variant="outline" className="px-3 bg-transparent">
                  <Heart className="w-3 h-3" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* More Suggestions */}
        <Card className="p-4 bg-muted/30 border-dashed border-2 border-muted-foreground/20 mt-6">
          <div className="text-center">
            <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-3">Want more personalized suggestions?</p>
            <Button variant="outline" size="sm">
              Upload More Items
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
