# svelte-postgres-demo

A starting point for connecting SvelteKit with Postgres. Write pure SQL and save yourself the headaches with object relational mappers.

In [api.js](./src/lib/api.js) you can access the database like this:

```js
export async function createTodo (userId, { text, done }) {
  return db.one('INSERT INTO todos(user_id, text, done) VALUES($1, $2, $3) RETURNING *', [userId, text, done]);
}
```

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
