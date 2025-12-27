-- Seed data for users table
-- Note: Replace the placeholder emails with actual emails as needed
INSERT INTO users (email, name) VALUES
('ng.andyc@gmail.com', 'Andy'),
('alyssa.j.torske@gmail.com', 'Alyssa'),
('maya.n.brooks@gmail.com', 'Maya'),
('mrinalinisinha05@gmail.com', 'Mrinalini'),
('poviedogis12@gmail.com', 'Patricia'),
('yasmina.shaush21@gmail.com', 'Yasmina'),
('anya37212@gmail.com', 'Anya'),
('cruzjone@gmail.com', 'Jonathan')
ON CONFLICT (email) DO NOTHING;
