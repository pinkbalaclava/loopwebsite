/*
  # Add customer selection fields

  1. Changes to customers table
    - Add `selected_area` (text) - stores the selected region or development type
    - Add `area_type` (text) - stores whether selection was by 'region' or 'development'
    - Add `selected_plan_title` (text) - stores the plan name for reference
    - Add `selected_plan_speed` (text) - stores the plan speed
    - Add `selected_plan_price` (text) - stores the plan price
    - Add `selected_provider_name` (text) - stores the provider name

  2. Security
    - No changes to existing RLS policies needed
*/

-- Add new columns to customers table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'selected_area'
  ) THEN
    ALTER TABLE customers ADD COLUMN selected_area text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'area_type'
  ) THEN
    ALTER TABLE customers ADD COLUMN area_type text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'selected_plan_title'
  ) THEN
    ALTER TABLE customers ADD COLUMN selected_plan_title text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'selected_plan_speed'
  ) THEN
    ALTER TABLE customers ADD COLUMN selected_plan_speed text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'selected_plan_price'
  ) THEN
    ALTER TABLE customers ADD COLUMN selected_plan_price text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'selected_provider_name'
  ) THEN
    ALTER TABLE customers ADD COLUMN selected_provider_name text;
  END IF;
END $$;