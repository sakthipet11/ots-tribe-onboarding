import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Crown, Star, Sparkles } from "lucide-react";

export const CircleTeaser = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="relative overflow-hidden p-12 bg-gradient-to-br from-secondary/20 via-card to-card border-secondary/30">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center space-y-8">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-secondary/20 flex items-center justify-center">
                <Crown className="h-10 w-10 text-secondary" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-secondary" />
                <span className="text-sm font-bold tracking-wider text-secondary uppercase">
                  Coming Soon
                </span>
                <Sparkles className="h-5 w-5 text-secondary" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold">
                Introducing <span className="text-secondary">OTS Circle</span>
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ready to take your street performance to the next level? OTS Circle is our premium tier 
                with exclusive performance opportunities, professional guidance, and monetization support.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-lg bg-card/50 border border-border">
                <Star className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="text-sm font-semibold">Performance Slots</p>
              </div>
              <div className="p-4 rounded-lg bg-card/50 border border-border">
                <Star className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="text-sm font-semibold">Pro Mentorship</p>
              </div>
              <div className="p-4 rounded-lg bg-card/50 border border-border">
                <Star className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="text-sm font-semibold">Earn from Your Art</p>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                variant="outline"
                size="lg"
                className="border-secondary/50 hover:border-secondary hover:bg-secondary/10 text-secondary hover:text-secondary transition-all duration-300"
              >
                Notify Me When It Launches
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Join OTS Tribe now and get early access to Circle when it launches!
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};