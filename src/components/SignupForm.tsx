import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";

const formSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  phone_number: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid Indian phone number"),
  city: z.string().min(2, "City is required"),
  primary_instrument: z.string().min(2, "Please specify your instrument"),
  experience_level: z.enum(["Beginner", "Intermediate", "Advanced", "Professional"]),
  heard_from: z.string().optional(),
  note: z.string().max(250, "Note must be 250 characters or less").optional(),
  starter_pack_ack: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge the Starter Pack",
  }),
  circle_interest: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const SignupForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      starter_pack_ack: false,
      circle_interest: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Get UTM parameters from URL
      const params = new URLSearchParams(window.location.search);
      const utm_source = params.get('utm_source') || undefined;
      const utm_medium = params.get('utm_medium') || undefined;
      const utm_campaign = params.get('utm_campaign') || undefined;
      const user_agent = navigator.userAgent;

      // Insert into database
      const { error: dbError } = await supabase
        .from('applicants')
        .insert([{
          full_name: data.full_name,
          phone_number: data.phone_number,
          city: data.city,
          primary_instrument: data.primary_instrument,
          experience_level: data.experience_level,
          heard_from: data.heard_from,
          note: data.note,
          starter_pack_ack: data.starter_pack_ack,
          circle_interest: data.circle_interest || false,
          utm_source,
          utm_medium,
          utm_campaign,
          user_agent,
        }]);

      if (dbError) throw dbError;

      // Call edge function to send email notification
      const { error: emailError } = await supabase.functions.invoke('submit-application', {
        body: {
          ...data,
          utm_source,
          utm_medium,
          utm_campaign,
          user_agent,
        },
      });

      if (emailError) {
        console.error('Email notification error:', emailError);
        // Don't throw - the application is still saved
      }

      setIsSuccess(true);
      toast.success("Application submitted successfully!");
      
      // Track with GA4 if available
      if (typeof (window as any).gtag !== 'undefined') {
        (window as any).gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: 'tribe_signup',
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="p-12 bg-gradient-to-br from-card via-card to-primary/5 border-primary/20 text-center">
        <div className="space-y-6 max-w-md mx-auto">
          <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-3">
            <h3 className="text-3xl font-bold">Welcome to the Tribe!</h3>
            <p className="text-lg text-muted-foreground">
              Your application has been submitted successfully. Our crew will review it 
              and manually add you to the WhatsApp group within 24-48 hours.
            </p>
          </div>
          <div className="pt-4">
            <p className="text-sm text-muted-foreground">
              Check your phone for a WhatsApp message from our team.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <section id="apply" className="py-20 px-4 bg-card/50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Apply to <span className="text-primary">Join</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Ready to commit to 7 minutes a day? Fill out the form below to join OTS Tribe.
          </p>
        </div>

        <Card className="p-8 bg-card border-border">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                {...register("full_name")}
                placeholder="Enter your full name"
                className="bg-background"
              />
              {errors.full_name && (
                <p className="text-sm text-destructive">{errors.full_name.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number (India) *</Label>
              <Input
                id="phone_number"
                {...register("phone_number")}
                placeholder="98XXXXXXXX"
                maxLength={10}
                className="bg-background"
              />
              {errors.phone_number && (
                <p className="text-sm text-destructive">{errors.phone_number.message}</p>
              )}
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                {...register("city")}
                placeholder="Enter your city"
                className="bg-background"
              />
              {errors.city && (
                <p className="text-sm text-destructive">{errors.city.message}</p>
              )}
            </div>

            {/* Primary Instrument */}
            <div className="space-y-2">
              <Label htmlFor="primary_instrument">Primary Instrument *</Label>
              <Input
                id="primary_instrument"
                {...register("primary_instrument")}
                placeholder="e.g., Guitar, Vocals, Drums"
                className="bg-background"
              />
              {errors.primary_instrument && (
                <p className="text-sm text-destructive">{errors.primary_instrument.message}</p>
              )}
            </div>

            {/* Experience Level */}
            <div className="space-y-2">
              <Label htmlFor="experience_level">Experience Level *</Label>
              <Select
                onValueChange={(value) => setValue("experience_level", value as any)}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                </SelectContent>
              </Select>
              {errors.experience_level && (
                <p className="text-sm text-destructive">{errors.experience_level.message}</p>
              )}
            </div>

            {/* Heard From */}
            <div className="space-y-2">
              <Label htmlFor="heard_from">How did you hear about us?</Label>
              <Input
                id="heard_from"
                {...register("heard_from")}
                placeholder="Social media, friend, event, etc."
                className="bg-background"
              />
            </div>

            {/* Note */}
            <div className="space-y-2">
              <Label htmlFor="note">Tell us about yourself (optional, max 250 chars)</Label>
              <Textarea
                id="note"
                {...register("note")}
                placeholder="Share your musical journey, goals, or anything else you'd like us to know"
                maxLength={250}
                className="bg-background min-h-[100px]"
              />
              {errors.note && (
                <p className="text-sm text-destructive">{errors.note.message}</p>
              )}
            </div>

            {/* Starter Pack Acknowledgment */}
            <div className="flex items-start space-x-3 p-4 rounded-lg bg-background border border-border">
              <Checkbox
                id="starter_pack_ack"
                checked={watch("starter_pack_ack")}
                onCheckedChange={(checked) => setValue("starter_pack_ack", checked as boolean)}
              />
              <div className="space-y-1">
                <Label
                  htmlFor="starter_pack_ack"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  I acknowledge the Starter Pack *
                </Label>
                <p className="text-sm text-muted-foreground">
                  I've reviewed the Starter Pack and commit to the daily 7-minute practice challenge.
                </p>
              </div>
            </div>
            {errors.starter_pack_ack && (
              <p className="text-sm text-destructive">{errors.starter_pack_ack.message}</p>
            )}

            {/* Circle Interest */}
            <div className="flex items-start space-x-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <Checkbox
                id="circle_interest"
                checked={watch("circle_interest")}
                onCheckedChange={(checked) => setValue("circle_interest", checked as boolean)}
              />
              <div className="space-y-1">
                <Label
                  htmlFor="circle_interest"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  I'm interested in OTS Circle (paid tier)
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when OTS Circle launches with exclusive performance opportunities.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full text-lg py-6 bg-primary hover:bg-primary/90 shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};