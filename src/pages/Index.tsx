import { Hero } from "@/components/Hero";
import { WhatIsTribe } from "@/components/WhatIsTribe";
import { HowItWorks } from "@/components/HowItWorks";
import { StarterPack } from "@/components/StarterPack";
import { SignupForm } from "@/components/SignupForm";
import { CircleTeaser } from "@/components/CircleTeaser";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

const Index = () => {
  const scrollToApply = () => {
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero onApplyClick={scrollToApply} />
      <WhatIsTribe />
      <HowItWorks />
      <StarterPack />
      <SignupForm />
      <CircleTeaser />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;