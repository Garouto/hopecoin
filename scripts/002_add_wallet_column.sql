-- Add wallet column to leaderboard table for players who achieve 8 moves
ALTER TABLE leaderboard
ADD COLUMN wallet TEXT;

-- Add a comment to explain the column
COMMENT ON COLUMN leaderboard.wallet IS 'Wallet address for players who complete the game in exactly 8 moves';
