CREATE TABLE IF NOT EXISTS results (
  session_hash TEXT PRIMARY KEY,
  version TEXT NOT NULL,
  study_group TEXT NOT NULL CHECK(study_group IN ('classic','context')),
  pre INTEGER CHECK(pre BETWEEN 0 AND 30),
  post INTEGER CHECK(post BETWEEN 0 AND 30),
  delayed INTEGER CHECK(delayed BETWEEN 0 AND 30),
  early_delayed INTEGER NOT NULL DEFAULT 0,
  updated INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS results_version ON results(version);
