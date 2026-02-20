-- Add new fields to travel_plans for comprehensive logistics tracking

-- Rename arrival_datetime to just arrival_time for consistency, though we'll keep it as arrival_datetime to avoid breaking existing code just yet.
-- Using ADD COLUMN for the new requirements

ALTER TABLE travel_plans
ADD COLUMN departure_datetime timestamptz,
ADD COLUMN vehicle_details text,
ADD COLUMN drop_status text DEFAULT 'not_needed' CHECK (drop_status IN ('arranged', 'pending', 'not_needed'));

-- We already have 'mode' (Flight, Train, Bus, Car) and 'details' (Flight No. originally). Let's keep using 'details' for the Arrival details, and 'vehicle_details' for general notes or Departure details if we need to split them, but actually let's just use:
-- 'arrival_details' and 'departure_details' would be better, but to avoid dropping columns, let's use:
ALTER TABLE travel_plans
ADD COLUMN departure_mode text,
ADD COLUMN departure_details text;
