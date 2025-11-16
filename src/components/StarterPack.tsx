import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, BookOpen, Music, Target } from "lucide-react";

export const StarterPack = () => {
  const resources = [
    {
      icon: Target,
      title: "7-Minute Practice Framework",
      description: "Our proven structure to maximize your daily practice sessions",
    },
    {
      icon: Music,
      title: "Essential Techniques",
      description: "Core exercises for street musicians to build confidence and skill",
    },
    {
      icon: BookOpen,
      title: "Community Guidelines",
      description: "How to engage with the tribe and get the most out of the experience",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            The <span className="text-primary">Starter Pack</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to begin your journey with OTS Tribe. 
            Completely free, forever.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Card 
                key={index}
                className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]"
              >
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {resource.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-8 bg-gradient-to-br from-card via-card to-primary/5 border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-bold">Download the Full Starter Pack</h3>
              <p className="text-muted-foreground">
                Get instant access to all resources, practice guides, and community tips in one PDF.
              </p>
            </div>
            <Button 
              size="lg"
              className="group bg-primary hover:bg-primary/90 shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] transition-all duration-300 whitespace-nowrap"
              onClick={() => {
                // TODO: Implement actual PDF download
                console.log("Download Starter Pack PDF");
              }}
            >
              <Download className="mr-2 h-5 w-5 group-hover:-translate-y-1 transition-transform" />
              Download PDF
            </Button>
          </div>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            By joining OTS Tribe, you acknowledge that you've reviewed the Starter Pack 
            and agree to participate in the daily 7-minute challenge.
          </p>
        </div>
      </div>
    </section>
  );
};