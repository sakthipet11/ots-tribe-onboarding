import { Card } from "@/components/ui/card";
import { Clock, MessageSquare, Users } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Clock,
      title: "Daily 7-Min Challenge",
      description: "Commit to just 7 minutes of practice every day. Share your progress in the WhatsApp group.",
      color: "primary",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Community",
      description: "Get manually added to our vibrant WhatsApp group. Share videos, get feedback, and stay motivated.",
      color: "secondary",
    },
    {
      icon: Users,
      title: "Monthly Meetups",
      description: "Join in-person jam sessions and meetups. Connect with fellow musicians and perform together.",
      color: "primary",
    },
  ];

  return (
    <section className="py-20 px-4 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Three simple steps to become part of the tribe and transform your musical journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isSecondary = step.color === "secondary";
            
            return (
              <Card 
                key={index}
                className={`p-8 bg-card border-border hover:border-${step.color}/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--${step.color})/0.2)] group`}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className={`h-16 w-16 rounded-2xl bg-${step.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-8 w-8 text-${step.color}`} />
                    </div>
                    <span className={`text-5xl font-bold text-${step.color}/20`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">Note:</span> Our crew will manually review your application 
            and add you to the WhatsApp group. No automated join links!
          </p>
        </div>
      </div>
    </section>
  );
};