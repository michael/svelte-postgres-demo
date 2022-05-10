import _db from './_db';

/** Use a singleton DB instance */
const db = _db.instance;

/**
 * API
 * 
 * TODO: All data manipulation should be implemented as a Postgres function, including error handling.
 */
export async function getTodos (userId) {
  return db.any('SELECT * FROM todos WHERE user_id = $1', [userId]);
}

export async function createTodo (userId, { text, done }) {
  return db.one('INSERT INTO todos(user_id, text, done) VALUES($1, $2, $3) RETURNING *', [userId, text, done]);
}

export async function deleteTodo (userId, todoId) {
  return db.none('DELETE FROM todos WHERE user_id = $1 AND todo_id = $2', [userId, todoId]);
}

export async function updateTodo(userId, todoId, {text, done}) {
  await db.one(...__sqlUpdate('todos', {text, done}, {user_id: userId, todo_id: todoId}));
}

/**
 * Build an SQL Update statement, excluding all attrs that are undefined
 * 
 * @example db.one(...__sqlUpdate('todos', {text: 'some-text', done: undefined}, {todo_id: 'todo-1', user_id: 'user-1'}))
 */
function __sqlUpdate(relation, attrs, wheres) {
  const attrKeys = Object.keys(attrs);
  const whereKeys = Object.keys(wheres);
  const values = [];
  const setParts = [];
  const whereParts = [];
  let argCount = 0;
  
  for (let i = 0; i < attrKeys.length; i++) {
    const key = attrKeys[i];
    const value = attrs[key];
    if (value !== undefined) {
      argCount += 1;
      values.push(value);
      setParts.push(`${key} = $${argCount}`);
    }
  }

  for (let i = 0; i < whereKeys.length; i++) {
    const key = whereKeys[i];
    const value = wheres[key];
    if (value !== undefined) {
      argCount += 1;
      values.push(value);
      whereParts.push(`${key} = $${argCount}`);
    }
  }
  
  return [`UPDATE ${relation} SET ${setParts.join(', ')} WHERE ${whereParts.join(' AND ')} RETURNING *`, values];
}
