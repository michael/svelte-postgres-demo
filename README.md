# sveltekit-postgres-demo

A starting point for connecting SvelteKit with Postgres. Write pure SQL and save yourself the headaches with object relational mappers.

## Setup

Make sure you have a Postgres DB instance running and `.env` updated.

```zsh
VITE_DB_URL=postgresql://postgres@localhost:5432/sveltekit-postgres-demo
psql -Atx $VITE_DB_URL -f schema.sql
```

Now run the app:

```zsh
npm run dev
```
