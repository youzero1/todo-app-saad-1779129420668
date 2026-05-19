-- Create items table
CREATE TABLE IF NOT EXISTS items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Allow anon to read
CREATE POLICY "anon can read items"
  ON items FOR SELECT TO anon USING (true);

-- Allow anon to insert
CREATE POLICY "anon can insert items"
  ON items FOR INSERT TO anon WITH CHECK (true);

-- Allow anon to update
CREATE POLICY "anon can update items"
  ON items FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Allow anon to delete
CREATE POLICY "anon can delete items"
  ON items FOR DELETE TO anon USING (true);
