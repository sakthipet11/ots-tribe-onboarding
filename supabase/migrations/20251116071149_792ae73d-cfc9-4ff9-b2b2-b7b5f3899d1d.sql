-- Create enum for application status
CREATE TYPE application_status AS ENUM ('New', 'Reviewed', 'Approved', 'Added', 'Rejected');

-- Create enum for experience levels
CREATE TYPE experience_level AS ENUM ('Beginner', 'Intermediate', 'Advanced', 'Professional');

-- Create applicants table
CREATE TABLE public.applicants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  city TEXT NOT NULL,
  primary_instrument TEXT NOT NULL,
  experience_level experience_level NOT NULL,
  heard_from TEXT,
  note TEXT,
  starter_pack_ack BOOLEAN NOT NULL DEFAULT false,
  circle_interest BOOLEAN DEFAULT false,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status application_status NOT NULL DEFAULT 'New',
  crew_notes TEXT,
  added_to_whatsapp_by TEXT,
  added_to_whatsapp_on TIMESTAMP WITH TIME ZONE,
  user_agent TEXT,
  ip_hash TEXT
);

-- Enable Row Level Security
ALTER TABLE public.applicants ENABLE ROW LEVEL SECURITY;

-- Create policy for public to insert (for signup form)
CREATE POLICY "Anyone can submit application"
  ON public.applicants
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy for authenticated users to view all (for admin)
CREATE POLICY "Authenticated users can view all applications"
  ON public.applicants
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for authenticated users to update (for admin)
CREATE POLICY "Authenticated users can update applications"
  ON public.applicants
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create index for faster queries
CREATE INDEX idx_applicants_status ON public.applicants(status);
CREATE INDEX idx_applicants_created_at ON public.applicants(created_at DESC);
CREATE INDEX idx_applicants_phone ON public.applicants(phone_number);