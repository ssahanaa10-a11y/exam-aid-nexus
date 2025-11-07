-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create boards table (CBSE, ICSE, State Boards, etc.)
CREATE TABLE public.boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.boards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Boards are viewable by everyone"
  ON public.boards FOR SELECT
  USING (true);

-- Create exams table (JEE, NEET, UPSC, etc.)
CREATE TABLE public.exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Exams are viewable by everyone"
  ON public.exams FOR SELECT
  USING (true);

-- Create publications table
CREATE TABLE public.publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Publications are viewable by everyone"
  ON public.publications FOR SELECT
  USING (true);

-- Create books table
CREATE TABLE public.books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT,
  description TEXT,
  preface TEXT,
  board_id UUID REFERENCES public.boards(id) ON DELETE SET NULL,
  exam_id UUID REFERENCES public.exams(id) ON DELETE SET NULL,
  cover_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Books are viewable by everyone"
  ON public.books FOR SELECT
  USING (true);

-- Create book_publications junction table (same book, different publishers)
CREATE TABLE public.book_publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id UUID REFERENCES public.books(id) ON DELETE CASCADE NOT NULL,
  publication_id UUID REFERENCES public.publications(id) ON DELETE CASCADE NOT NULL,
  isbn TEXT,
  price DECIMAL(10, 2),
  edition TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(book_id, publication_id)
);

ALTER TABLE public.book_publications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Book publications are viewable by everyone"
  ON public.book_publications FOR SELECT
  USING (true);

-- Create shopping platforms table
CREATE TABLE public.shopping_platforms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  base_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.shopping_platforms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Shopping platforms are viewable by everyone"
  ON public.shopping_platforms FOR SELECT
  USING (true);

-- Create book_links table (links to buy books)
CREATE TABLE public.book_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  book_publication_id UUID REFERENCES public.book_publications(id) ON DELETE CASCADE NOT NULL,
  platform_id UUID REFERENCES public.shopping_platforms(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  price DECIMAL(10, 2),
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(book_publication_id, platform_id)
);

ALTER TABLE public.book_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Book links are viewable by everyone"
  ON public.book_links FOR SELECT
  USING (true);

-- Insert sample boards
INSERT INTO public.boards (name, description) VALUES
  ('CBSE', 'Central Board of Secondary Education'),
  ('ICSE', 'Indian Certificate of Secondary Education'),
  ('State Boards', 'Various State Education Boards'),
  ('International Boards', 'IB, Cambridge, etc.');

-- Insert sample exams
INSERT INTO public.exams (name, description) VALUES
  ('JEE Main', 'Joint Entrance Examination for Engineering'),
  ('JEE Advanced', 'Advanced Engineering Entrance Exam'),
  ('NEET', 'National Eligibility cum Entrance Test for Medical'),
  ('UPSC', 'Union Public Service Commission'),
  ('CAT', 'Common Admission Test for MBA'),
  ('GATE', 'Graduate Aptitude Test in Engineering');

-- Insert sample publications
INSERT INTO public.publications (name, description) VALUES
  ('Arihant Publications', 'Leading educational publisher'),
  ('Cengage Learning', 'International educational content'),
  ('MTG Learning Media', 'Specialized in competitive exams'),
  ('S. Chand Publishing', 'Traditional educational publisher'),
  ('Pearson Education', 'Global learning company');

-- Insert sample shopping platforms
INSERT INTO public.shopping_platforms (name, base_url) VALUES
  ('Amazon India', 'https://www.amazon.in'),
  ('Flipkart', 'https://www.flipkart.com'),
  ('Snapdeal', 'https://www.snapdeal.com'),
  ('Book Depot', 'https://www.bookdepot.in');