import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function RefillLivesCard() {
    const router = useRouter();
  
  return (
    <div className="rounded-2xl bg-card shadow-lg border border-border overflow-hidden p-6">
      <div className="">
        <h3 className="text-xl font-semibold flex items-center gap-2 mb-6">
          {/* <Heart className="w-5 h-5 text-destructive" /> */}
          Refill Lives
        </h3>
      </div>
      <div className="">
        <p className="text-sm text-muted-foreground mb-6">
          Out of lives? Refill and continue learning without interruptions!
        </p>
        <div className="p-3 bg-muted rounded-lg border border-muted-foreground/50 text-sm mb-4">
          <h5 className="font-medium mb-1">Quick Refill</h5>
          <p>
            Refill your hearts with gems or unlock unlimited hearts with Pro
          </p>
        </div>
        <div className="grid gap-2">
          <Button onClick={() => router.push("/store/gems")} variant="outline" className="w-full">
            Refill with Gems
          </Button>
          <Button onClick={() => router.push("/store")} className="w-full text-accent-foreground">
            Go Pro (Unlimited)
          </Button>
        </div>
      </div>
    </div>
  );
}
