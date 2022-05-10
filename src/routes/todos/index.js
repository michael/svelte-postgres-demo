import { getTodos, createTodo, updateTodo, deleteTodo } from '$lib/api';

export const get = async ({ locals }) => {
	// locals.userid comes from src/hooks.js
	try {
		const todos = await getTodos(locals.userId)
		return {
			body: {
				todos
			}
		};
	} catch (err) {
		console.error(err);
		return { status: 500 }
	}
};

export const post = async ({ request, locals }) => {
	const form = await request.formData();
	await createTodo(locals.userId, { text: form.get('text'), done: false})
	return {};
};

// If the user has JavaScript disabled, the URL will change to
// include the method override unless we redirect back to /todos
const redirect = {
	status: 303,
	headers: {
		location: '/todos'
	}
};

export const patch = async ({ request, locals }) => {
	const form = await request.formData();
	await updateTodo(locals.userId, form.get('todoId'), {
		text: form.has('text') ? form.get('text') : undefined,
		done: form.has('done') ? !!form.get('done') : undefined
	});
	return redirect;
};

export const del = async ({ request, locals }) => {
	const form = await request.formData();
	await deleteTodo(locals.userid, form.get('todoId'));
	return redirect;
};
