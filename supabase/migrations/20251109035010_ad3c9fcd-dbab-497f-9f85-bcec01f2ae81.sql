-- Add grades support for boards
CREATE TABLE IF NOT EXISTS public.grades (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  board_id UUID NOT NULL REFERENCES public.boards(id) ON DELETE CASCADE,
  grade_level TEXT NOT NULL,
  display_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing grades
CREATE POLICY "Grades are viewable by everyone" 
ON public.grades 
FOR SELECT 
USING (true);

-- Add index for better performance
CREATE INDEX idx_grades_board_id ON public.grades(board_id);

-- Add grade_id to books table for filtering
ALTER TABLE public.books 
ADD COLUMN IF NOT EXISTS grade_id UUID REFERENCES public.grades(id) ON DELETE SET NULL;