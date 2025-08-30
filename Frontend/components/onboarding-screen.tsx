"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { WardrobeScreen } from "./wardrobe-screen"
import { Leaf, Users, Recycle } from "lucide-react"

export function OnboardingScreen() {
  const [currentScreen, setCurrentScreen] = useState<"onboarding" | "wardrobe">("onboarding")

  if (currentScreen === "wardrobe") {
    return <WardrobeScreen />
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo/Brand */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Cloth AI</h1>
          <p className="text-muted-foreground text-sm">Sustainable Fashion Exchange</p>
        </div>

        {/* Hero Illustration */}
        <Card className="p-8 bg-card border-border">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            </div>
            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
              <Recycle className="w-6 h-6 text-accent" />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-card-foreground mb-2">Swap. Try. Save the Planet.</h2>
            <p className="text-muted-foreground text-sm">Exchange clothes with friends using AI try-on technology</p>
          </div>
        </Card>

        {/* Features */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary text-sm">✨</span>
            </div>
            <span className="text-sm text-foreground">AI-powered virtual try-on</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary text-sm">🌱</span>
            </div>
            <span className="text-sm text-foreground">Reduce fashion waste</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary text-sm">👥</span>
            </div>
            <span className="text-sm text-foreground">Connect with friends</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => setCurrentScreen("wardrobe")}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg"
        >
          Get Started
        </Button>

        <p className="text-xs text-muted-foreground text-center">Join the sustainable fashion revolution</p>
      </div>
    </div>
  )
}
