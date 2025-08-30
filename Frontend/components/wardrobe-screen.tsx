"use client"

import { useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AITryOnScreen } from "./ai-try-on-screen"
import { SwapSuggestionsScreen } from "./swap-suggestions-screen"
import { Bell, User, Plus, Heart, MessageCircle, Users } from "lucide-react"

type MyItem = {
    id: number
    name: string
    image: string
    likes: number
    __localUrl?: string
}
type OtherItem = { id: number; name: string; image: string; likes: number; owner: string }

export function WardrobeScreen() {
    const [currentScreen, setCurrentScreen] =
        useState<"wardrobe" | "try-on" | "suggestions">("wardrobe")
    const [wardrobeView, setWardrobeView] = useState<"my" | "others">("my")
    const [selectedItem, setSelectedItem] = useState<MyItem | OtherItem | null>(null)

// --- My Wardrobe (uses your public images) ---
    const [myWardrobeItems, setMyWardrobeItems] = useState<MyItem[]>([
        { id: 1, name: "Black T-Shirt", image: "/blackTshirt.jpg", likes: 12 },
        { id: 2, name: "Green Pants", image: "/greenpants.jpg", likes: 8 },
        { id: 3, name: "Green Sweater", image: "/GreenSweater.jpg", likes: 15 },
        { id: 4, name: "Jumper", image: "/jumper.jpg", likes: 6 },
        { id: 5, name: "Linen Pants", image: "/linenpants.jpg", likes: 9 },
        { id: 6, name: "Pants", image: "/pants.jpg", likes: 11 },
    ])

// --- Community Wardrobe (also from your public folder) ---
    const othersWardrobeItems: OtherItem[] = [
        { id: 7,  name: "Brown Pants",   image: "/brownpants.jpg",   likes: 24, owner: "Sarah M." },
        { id: 8,  name: "Clothing Set",  image: "/clothing.jpg",     likes: 18, owner: "Emma K." },
        { id: 9,  name: "Green Bomber",  image: "/greenbomber.jpg",  likes: 16, owner: "Alex R." },
        { id: 10, name: "Windbreaker",   image: "/windbreaker.jpg",  likes: 13, owner: "Lisa T." },
        // extras from your list to keep variety:
    ]

    const wardrobeItems = useMemo(
        () => (wardrobeView === "my" ? myWardrobeItems : othersWardrobeItems),
        [wardrobeView, myWardrobeItems]
    )

    // Remove
    const handleRemove = (id: number) => {
        setMyWardrobeItems(prev => {
            const toRemove = prev.find(i => i.id === id)
            if (toRemove?.__localUrl) URL.revokeObjectURL(toRemove.__localUrl)
            return prev.filter(item => item.id !== id)
        })
    }

    // Add (from file)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const deriveTitleFromFilename = (filename: string) => {
        const withoutExt = filename.replace(/\.[^.]+$/i, "")
        return withoutExt.replace(/[-_]+/g, " ").trim().toUpperCase()
    }

    const onPickFile = () => fileInputRef.current?.click()

    const onFileSelected: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        const url = URL.createObjectURL(file)
        const title = deriveTitleFromFilename(file.name)

        setMyWardrobeItems(prev => [
            { id: Date.now(), name: title, image: url, likes: 0, __localUrl: url },
            ...prev,
        ])

        setWardrobeView("my")
        e.currentTarget.value = ""
    }

    if (currentScreen === "try-on") {
        return <AITryOnScreen
            onBack={() => setCurrentScreen("wardrobe")}
            selectedItem={selectedItem}
        />
    }

    if (currentScreen === "suggestions") {
        return <SwapSuggestionsScreen onBack={() => setCurrentScreen("wardrobe")} />
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                        <h1 className="font-semibold text-foreground">
                            {wardrobeView === "my" ? "My Wardrobe" : "Community Wardrobe"}
                        </h1>
                        <p className="text-xs text-muted-foreground">{wardrobeItems.length} items available</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant={wardrobeView === "others" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setWardrobeView(wardrobeView === "my" ? "others" : "my")}
                        className="text-xs px-3"
                    >
                        {wardrobeView === "my" ? (
                            <>
                                <Users className="w-4 h-4 mr-1" />
                                Others
                            </>
                        ) : (
                            <>
                                <User className="w-4 h-4 mr-1" />
                                Mine
                            </>
                        )}
                    </Button>
                    {/* Message icon removed */}
                    {/* <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("suggestions")} className="text-muted-foreground">
            <MessageCircle className="w-4 h-4" />
          </Button> */}
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Bell className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Wardrobe Grid */}
            <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {wardrobeItems.map((item) => (
                        <Card key={item.id} className="p-3 bg-card border-border hover:shadow-md transition-shadow">
                            <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
                                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-medium text-sm text-card-foreground">{item.name}</h3>
                                {wardrobeView === "others" && "owner" in item && (
                                    <p className="text-xs text-muted-foreground">by {(item as OtherItem).owner}</p>
                                )}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-1">
                                        <Heart className="w-3 h-3 text-accent" />
                                        <span className="text-xs text-muted-foreground">{item.likes}</span>
                                    </div>

                                    {wardrobeView === "my" ? (
                                        // ✅ NOW: Try On + Remove for MY items
                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-xs px-2 py-1 h-6"
                                                onClick={() => {
                                                    setSelectedItem(item)
                                                    setCurrentScreen("try-on")
                                                }}
                                            >
                                                Try On
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-xs px-2 py-1 h-6 bg-transparent"
                                                onClick={() => handleRemove((item as MyItem).id)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                setSelectedItem(item)
                                                setCurrentScreen("try-on")
                                            }}
                                            className="text-xs px-2 py-1 h-6"
                                        >
                                            Try On
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {wardrobeView === "my" && (
                    <Card className="p-4 bg-accent/5 border-accent/20 mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-accent">Your Impact</h3>
                                <p className="text-sm text-muted-foreground">3 swaps completed</p>
                            </div>
                            <Badge variant="secondary" className="bg-accent/10 text-accent">
                                🌱 Eco Warrior
                            </Badge>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="text-lg font-bold text-accent">12.5kg</p>
                                <p className="text-xs text-muted-foreground">CO₂ saved</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold text-accent">€180</p>
                                <p className="text-xs text-muted-foreground">Fast fashion avoided</p>
                            </div>
                        </div>
                    </Card>
                )}
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                className="hidden"
                onChange={onFileSelected}
            />

            {wardrobeView === "my" && (
                <div className="fixed bottom-6 right-6">
                    <Button
                        size="lg"
                        className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
                        onClick={onPickFile}
                        aria-label="Add wardrobe item"
                    >
                        <Plus className="w-6 h-6 text-primary-foreground" />
                    </Button>
                </div>
            )}
        </div>
    )
}
