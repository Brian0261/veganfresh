PRAGMA foreign_keys = ON;

CREATE TABLE leads (
  id TEXT PRIMARY KEY NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_type TEXT NOT NULL,
  district TEXT NOT NULL,
  products_and_quantities TEXT NOT NULL,
  frequency TEXT,
  location_count INTEGER CHECK (location_count BETWEEN 1 AND 100),
  comments TEXT,
  privacy_notice_version TEXT NOT NULL,
  marketing_consent INTEGER DEFAULT NULL,
  source_page TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'qualified', 'quoted', 'won', 'lost')),
  idempotency_hash TEXT UNIQUE NOT NULL,
  payload_hash TEXT NOT NULL,
  challenge_hash TEXT UNIQUE,
  notification_status TEXT NOT NULL DEFAULT 'pending' CHECK (notification_status IN ('pending', 'sent', 'failed')),
  notification_attempts INTEGER NOT NULL DEFAULT 0,
  notification_next_at INTEGER NOT NULL,
  notification_claim TEXT
);

CREATE INDEX leads_created ON leads (created_at);
CREATE INDEX leads_status_created ON leads (status, created_at);
CREATE INDEX leads_notification_due ON leads (notification_next_at)
  WHERE notification_status IN ('pending', 'failed');

CREATE TABLE notification_attempts (
  lead_id TEXT NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  attempt INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('sent', 'failed')),
  occurred_at INTEGER NOT NULL,
  error_category TEXT,
  PRIMARY KEY (lead_id, attempt)
);
