-- Create leaderboard table for memory game scores
CREATE TABLE IF NOT EXISTS public.leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nickname TEXT NOT NULL,
  moves INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the leaderboard
CREATE POLICY "leaderboard_select_all"
  ON public.leaderboard FOR SELECT
  USING (true);

-- Allow anyone to insert scores (no auth required for this game)
CREATE POLICY "leaderboard_insert_all"
  ON public.leaderboard FOR INSERT
  WITH CHECK (true);

-- Create index for faster queries sorted by moves
CREATE INDEX IF NOT EXISTS idx_leaderboard_moves ON public.leaderboard(moves ASC, created_at ASC);
