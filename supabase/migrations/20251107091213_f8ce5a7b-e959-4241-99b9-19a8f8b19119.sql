-- Add stream enum and column to exams table (only if not exists)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'exam_stream') THEN
        CREATE TYPE public.exam_stream AS ENUM ('science', 'arts', 'commerce', 'general', 'engineering', 'medical', 'law', 'management');
    END IF;
END $$;

-- Add stream column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'exams' AND column_name = 'stream') THEN
        ALTER TABLE public.exams ADD COLUMN stream exam_stream DEFAULT 'general';
    END IF;
END $$;

-- Clear existing exams data
TRUNCATE TABLE public.exams CASCADE;

-- Insert comprehensive exam data with streams and descriptions
INSERT INTO public.exams (name, description, stream) VALUES
-- Engineering Exams
('JEE Main', 'Joint Entrance Examination for admission to NITs, IIITs, and other engineering colleges across India. Tests Physics, Chemistry, and Mathematics.', 'engineering'),
('JEE Advanced', 'For admission to IITs and other premier engineering institutions. More challenging than JEE Main with advanced concepts.', 'engineering'),
('BITSAT', 'Birla Institute of Technology and Science Admission Test for admission to BITS Pilani campuses. Includes Physics, Chemistry, Mathematics, English, and Logical Reasoning.', 'engineering'),
('VITEEE', 'VIT Engineering Entrance Examination for admission to VIT campuses. Computer-based test covering Physics, Chemistry, and Mathematics.', 'engineering'),
('MHT CET', 'Maharashtra Common Entrance Test for engineering and pharmacy admissions in Maharashtra state colleges.', 'engineering'),
('WBJEE', 'West Bengal Joint Entrance Examination for engineering and medical admissions in West Bengal state.', 'engineering'),

-- Medical Exams
('NEET UG', 'National Eligibility cum Entrance Test for admission to MBBS and BDS courses across India. Covers Physics, Chemistry, and Biology.', 'medical'),
('AIIMS', 'All India Institute of Medical Sciences entrance exam for MBBS seats. Highly competitive with emphasis on Biology and medical concepts.', 'medical'),
('JIPMER', 'Jawaharlal Institute of Postgraduate Medical Education and Research entrance test for MBBS admissions.', 'medical'),

-- Management/Commerce Exams
('CAT', 'Common Admission Test for admission to IIMs and other top B-schools. Tests Verbal Ability, Data Interpretation, Logical Reasoning, and Quantitative Ability.', 'management'),
('XAT', 'Xavier Aptitude Test for admission to XLRI and other management institutes. Includes Decision Making and General Knowledge sections.', 'management'),
('NMAT', 'NMIMS Management Aptitude Test for admission to NMIMS and partner institutions. Computer-adaptive test format.', 'management'),
('SNAP', 'Symbiosis National Aptitude Test for admission to Symbiosis institutes. Tests Analytical, Logical, Verbal, and Quantitative skills.', 'management'),
('MAT', 'Management Aptitude Test accepted by many B-schools across India. Multiple test dates throughout the year.', 'management'),
('CMAT', 'Common Management Admission Test conducted by NTA for MBA admissions. Tests Language, Quantitative, Logical, and General Awareness.', 'management'),

-- Arts/Humanities Exams
('CUET', 'Common University Entrance Test for admission to central universities. Subject-specific tests for various undergraduate programs in Arts, Commerce, and Science.', 'arts'),
('DU JAT', 'Delhi University Joint Admission Test for BMS, BBA, and BA programs. Tests Reasoning, Quantitative, and English skills.', 'arts'),
('BHU UET', 'Banaras Hindu University Undergraduate Entrance Test for various arts and humanities programs.', 'arts'),
('JNUEE', 'Jawaharlal Nehru University Entrance Examination for undergraduate and postgraduate programs in arts and social sciences.', 'arts'),

-- Law Exams
('CLAT', 'Common Law Admission Test for admission to National Law Universities. Tests English, Legal Reasoning, Logical Reasoning, Current Affairs, and Quantitative Techniques.', 'law'),
('AILET', 'All India Law Entrance Test for admission to NLU Delhi. Similar pattern to CLAT with emphasis on legal aptitude.', 'law'),
('LSAT India', 'Law School Admission Test for admission to various private law schools. Tests Reading Comprehension, Analytical Reasoning, and Logical Reasoning.', 'law'),

-- General/Multiple Streams
('IPMAT', 'Integrated Program in Management Aptitude Test for 5-year integrated management programs at IIMs. For students after 12th standard.', 'management'),
('NDA', 'National Defence Academy entrance exam for admission to Army, Navy, and Air Force wings. Includes Mathematics and General Ability Test.', 'general'),
('AFCAT', 'Air Force Common Admission Test for officers in Indian Air Force. Tests Verbal, Numerical, Reasoning, and Military Aptitude.', 'general'),
('CDS', 'Combined Defence Services exam for admission to Indian Military Academy, Naval Academy, and Air Force Academy.', 'general');