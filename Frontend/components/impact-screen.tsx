"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Share2, Leaf, Recycle, Users, Trophy } from "lucide-react"

interface ImpactScreenProps {
  onBack: () => void
}

export function ImpactScreen({ onBack }: ImpactScreenProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold text-foreground">Swap Impact</h1>
        <Button variant="ghost" size="sm">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Success Animation */}
      <div className="p-6 text-center">
        <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Trophy className="w-10 h-10 text-accent-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Swap Confirmed! 🎉</h2>
        <p className="text-muted-foreground text-sm">Your sustainable fashion exchange is complete</p>
      </div>

      {/* Impact Summary */}
      <div className="px-4 space-y-4">
        <Card className="p-6 bg-accent/5 border-accent/20">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-accent mb-1">Environmental Impact</h3>
            <p className="text-sm text-muted-foreground">This swap saved:</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Leaf className="w-6 h-6 text-accent" />
              </div>
              <p className="text-2xl font-bold text-accent">3.2kg</p>
              <p className="text-xs text-muted-foreground">CO₂ emissions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Recycle className="w-6 h-6 text-accent" />
              </div>
              <p className="text-2xl font-bold text-accent">€45</p>
              <p className="text-xs text-muted-foreground">Fast fashion waste</p>
            </div>
          </div>
        </Card>

        {/* Swap Details */}
        <Card className="p-4 bg-card border-border">
          <h3 className="font-semibold text-card-foreground mb-3">Swap Summary</h3>
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
                  <p className="text-xs text-muted-foreground">→ To Anna</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-accent/10 text-accent">
                Sent
              </Badge>
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
                  <p className="text-xs text-muted-foreground">→ To You</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Received
              </Badge>
            </div>
          </div>
        </Card>

        {/* Achievement */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-primary">New Achievement!</h3>
              <p className="text-sm text-muted-foreground">Eco Warrior - 5 swaps completed</p>
            </div>
          </div>
        </Card>

        {/* Animated Swap Visualization */}
        <Card className="p-6 bg-card border-border">
          <div className="text-center mb-4">
            <h3 className="font-semibold text-card-foreground">Global Impact</h3>
          </div>
          <div className="relative h-32 bg-muted/30 rounded-lg flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 rounded-lg animate-pulse" />
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center space-x-4 mb-2">
                <div className="w-8 h-8 bg-accent rounded-full animate-bounce" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
                <div className="w-8 h-8 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
              </div>
              <p className="text-sm text-muted-foreground">Join 10,000+ users making fashion sustainable</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Share Button */}
      <div className="fixed bottom-6 left-4 right-4">
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 rounded-lg">
          <Share2 className="w-4 h-4 mr-2" />
          Brag with Friends 🌍
        </Button>
      </div>
    </div>
  )
}
