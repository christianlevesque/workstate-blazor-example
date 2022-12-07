const defaultParams = {
	action: 'query',
	format: 'json',
	formatversion: 2,
	origin: '*'
};

export async function search(input) {
	console.log(`Starting request to Wikipedia search API for string ${input}`);

	const params = Object.assign({
		list: 'search',
		srsearch: input
	}, defaultParams);

	const result = await send(params);
	if (!result) return [];

	const articles = result.query?.search ?? [];

	await Promise.all(articles.map(hydrateThumbnail))

	return articles;
}

async function send(params) {
	const url = `https://en.wikipedia.org/w/api.php?${createQueryString(params)}`;

	const response = await fetch(url);
	if (!response.ok) {
		console.warn(response.statusMessage);
		return null;
	}

	return await response.json();
}

function createQueryString(params) {
	let s = '';

	for (let key of Object.keys(params)) {
		s += `${key}=${params[key]}&`;
	}

	return s;
}

async function hydrateThumbnail(article) {
	const params = Object.assign({
		piprop: 'thumbnail',
		pilimit: 1,
		pithumbsize: 250,
		redirects: 1,
		prop: 'pageimages',
		titles: article.title
	}, defaultParams);

	const result = await send(params);
	if (!result) return;

	article.thumbnail = result.query?.pages[0]?.thumbnail?.source;
}