-- Add claim_code column to leaderboard table for security
-- This ensures only the original player can add their wallet

ALTER TABLE leaderboard 
ADD COLUMN claim_code TEXT;

-- Create an index for faster claim code lookups
CREATE INDEX idx_leaderboard_claim_code ON leaderboard(claim_code);

-- Update the RLS policy to allow updates only with matching claim code
-- (This is enforced in the application layer for simplicity)
