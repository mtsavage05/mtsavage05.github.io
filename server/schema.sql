
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  due_date TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Not Started','In Progress','Completed')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

-- Optional: a few seed rows to verify rendering end-to-end
INSERT INTO assignments (title, due_date, status) VALUES
  ('CS201 HW1',        '2025-10-10', 'Not Started'),
  ('Read Chapter 3',   '2025-10-07', 'In Progress'),
  ('Lab Report Draft', '2025-10-05', 'Completed');