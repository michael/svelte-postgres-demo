import _db from './_db'

// Use the singleton db instance
const db = _db.instance

/**
 * API
 * 
 * TODO: All data manipulation should be implemented as a Postgres function, including error handling.
 */

export async function getTodos (userId) {
  return db.any('SELECT * FROM todos WHERE user_id = $1', [userId]);
}

export async function createTodo (userId, { text, done }) {
  return db.one('INSERT INTO todos(user_id, text, done) VALUES($1, $2, $3) RETURNING *', [userId, text, done])
}

export async function deleteTodo (userId, todoId) {
  return db.none('DELETE FROM todos WHERE user_id = $1 AND todo_id = $2', [userId, todoId])
}

export async function updateTodo(userId, todoId, {text, done}) {
  await db.one('UPDATE todos SET text = $1, done = $2 WHERE user_id= $1 AND todo_id = $2 RETURNING *', [text, done, userId, todoId])
}
