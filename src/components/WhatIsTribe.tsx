import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";

export const WhatIsTribe = () => {
  const whatItIs = [
    "A daily 7-minute musical practice challenge",
    "A WhatsApp community of passionate musicians",
    "Monthly in-person meetups and jam sessions",
    "A supportive space to grow your skills",
    "Free access to the Starter Pack",
  ];

  const whatItIsNot = [
    "A paid program (Tribe is completely free)",
    "A music school or formal training",
    "A performance platform (that's OTS Circle)",
    "An online-only community",
  ];

  return (
    <section id="what-is-tribe" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            What is <span className="text-primary">OTS Tribe</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A judgment-free space where street musicians commit to daily practice 
            and grow together as a community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* What it IS */}
          <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)]">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">What Tribe IS</h3>
              </div>
              
              <ul className="space-y-4">
                {whatItIs.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* What it is NOT */}
          <Card className="p-8 bg-card border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--secondary)/0.2)]">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <X className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold">What Tribe is NOT</h3>
              </div>
              
              <ul className="space-y-4">
                {whatItIsNot.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};