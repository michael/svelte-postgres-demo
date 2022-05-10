import { v4 as uuid } from '@lukeed/uuid';

import * as cookie from 'cookie';

export const handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.userId = cookies['userId'] || uuid();

	const response = await resolve(event);

	if (!cookies['userId']) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers.set(
			'set-cookie',
			cookie.serialize('userId', event.locals.userId, {
				path: '/',
				httpOnly: true
			})
		);
	}

	return response;
};
