-- Seed data for users table
-- Note: Replace the placeholder emails with actual emails as needed
INSERT INTO users (email, name) VALUES
('blah@exmaple.com 'Andy'),
('blah@exmaple.com', 'Alyssa'),
('blah@exmaple.com', 'Maya'),
('blah@exmaple.com', 'Mrinalini'),
('blah@exmaple.com', 'Patricia'),
('blah@exmaple.com', 'Yasmina'),
('blah@exmaple.com', 'Anya'),
('blah@exmaple.com', 'Jonathan')
ON CONFLICT (email) DO NOTHING;
