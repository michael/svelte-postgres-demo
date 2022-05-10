CREATE EXTENSION IF NOT EXISTS pgcrypto;
DROP TABLE IF EXISTS todos CASCADE;

CREATE TABLE todos (
  todo_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text varchar(40) UNIQUE NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  user_id varchar(255) NOT NULL,
  created_at timestamptz DEFAULT NOW()::timestamptz
);
