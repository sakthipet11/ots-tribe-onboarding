import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// Using Resend API directly via fetch instead of npm package
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ApplicationData {
  full_name: string;
  phone_number: string;
  city: string;
  primary_instrument: string;
  experience_level: string;
  heard_from?: string;
  note?: string;
  starter_pack_ack: boolean;
  circle_interest: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  user_agent?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const applicationData: ApplicationData = await req.json();
    
    console.log("Received application:", applicationData);

    // Get crew email list from environment
    const crewEmailsString = Deno.env.get("CREW_EMAIL_LIST") || "";
    const crewEmails = crewEmailsString.split(",").map(email => email.trim()).filter(Boolean);

    if (crewEmails.length === 0) {
      console.error("No crew emails configured");
      return new Response(
        JSON.stringify({ error: "Email notification configuration missing" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send notification emails to crew using Resend API
    const emailHtml = `
      <h1>New OTS Tribe Application</h1>
      <h2>Applicant Details:</h2>
      <ul>
        <li><strong>Name:</strong> ${applicationData.full_name}</li>
        <li><strong>Phone:</strong> ${applicationData.phone_number}</li>
        <li><strong>City:</strong> ${applicationData.city}</li>
        <li><strong>Primary Instrument:</strong> ${applicationData.primary_instrument}</li>
        <li><strong>Experience Level:</strong> ${applicationData.experience_level}</li>
        ${applicationData.heard_from ? `<li><strong>Heard From:</strong> ${applicationData.heard_from}</li>` : ''}
        ${applicationData.note ? `<li><strong>Note:</strong> ${applicationData.note}</li>` : ''}
        <li><strong>Starter Pack Acknowledged:</strong> ${applicationData.starter_pack_ack ? 'Yes' : 'No'}</li>
        <li><strong>Circle Interest:</strong> ${applicationData.circle_interest ? 'Yes' : 'No'}</li>
      </ul>
      ${applicationData.utm_source || applicationData.utm_medium || applicationData.utm_campaign ? `
      <h3>UTM Parameters:</h3>
      <ul>
        ${applicationData.utm_source ? `<li><strong>Source:</strong> ${applicationData.utm_source}</li>` : ''}
        ${applicationData.utm_medium ? `<li><strong>Medium:</strong> ${applicationData.utm_medium}</li>` : ''}
        ${applicationData.utm_campaign ? `<li><strong>Campaign:</strong> ${applicationData.utm_campaign}</li>` : ''}
      </ul>
      ` : ''}
      <p><em>Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</em></p>
    `;

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'OTS Tribe <onboarding@resend.dev>',
        to: crewEmails,
        subject: `New OTS Tribe Application - ${applicationData.full_name}`,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Email sending failed: ${errorData}`);
    }

    const emailResult = await emailResponse.json();
    console.log("Email notification sent:", emailResult);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Application submitted successfully",
        emailSent: true 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in submit-application function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
