-- Allow anyone to update wallet field for leaderboard entries with 8 or fewer moves
-- This enables players to add their wallet address retroactively
CREATE POLICY "leaderboard_update_wallet"
  ON public.leaderboard FOR UPDATE
  USING (moves <= 8)
  WITH CHECK (moves <= 8);

-- Add comment explaining the policy
COMMENT ON POLICY "leaderboard_update_wallet" ON public.leaderboard IS 'Allows updating wallet field for entries with 8 or fewer moves';
