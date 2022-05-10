# svelte-postgres-demo

A starting point for connecting SvelteKit with Postgres. Write pure SQL and save yourself the headaches with object relational mappers.

## Development

Make sure you have a Postgres DB instance running and provide your connection string as an environment variable.

```zsh
VITE_DB_URL=postgresql://postgres@localhost:5432/svelte-postgres-demo
psql -Atx $VITE_DB_URL -f schema.sql
```

Now run the development server:

```zsh
npm run dev
```

## Questions?

Ping @_mql on Twitter.
