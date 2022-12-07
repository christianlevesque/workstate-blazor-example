import './ArticleSingle.css';

export default function ArticleSingle({ data }) {
	return (
	<article className="wiki-article my-3 border rounded py-4 px-5 d-flex flex-row">
		<div className="wiki-article__thumbnail-container d-flex justify-content-center align-items-center me-5 flex-shrink-0">
			<img src={data.thumbnail ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"}
			     alt={`${data.title} article header image`}
			     className="wiki-article__thumbnail"/>
		</div>

		<section className="wiki-data d-flex flex-column">
			<div className="flex-grow-1">
				<h2>
					<a href={`https://en.wikipedia.org/wiki/${createWiki(data.title)}`}
					   target="_blank"
					   className="wiki-article__link">
						{data.title}
					</a>
				</h2>
				<p dangerouslySetInnerHTML={{__html: data.snippet}}></p>
			</div>

			<p className="flex-shrink-0 small fst-italic text-muted text-end mb-0">
				Last updated {formatDate(data.timestamp)}
			</p>
		</section>
	</article>
	)
}

/**
 * Turns an article title into a partial Wikipedia URL
 *
 * @param {string} url
 * @returns {string}
 */
function createWiki(url) {
	return url.replaceAll(' ', '_');
}

/**
 * Formats a date in a standard format
 *
 * @param {string} dateString
 */
function formatDate(dateString) {
	const date = new Date(dateString);
	const isPm = date.getHours() >= 12;
	let hours = date.getHours();
	if (hours >= 13) {
		hours -= 12;
	} else if (hours === 0) {
		hours = 12;
	}

	return `${formatDayOfWeek(date.getDay())}, ${formatMonth(date.getMonth())} ${date.getDate()}, ${date.getFullYear()} ${hours}:${formatNumberWithLeadingZero(date.getMinutes())} ${isPm ? 'PM' : 'AM'}`;
}

/**
 * Converts a numeric day of the week to a day name
 *
 * @param {int} day The 0-indexed day of the week
 * @returns {string}
 */
function formatDayOfWeek(day) {
	switch (day) {
		case 0: return 'Sunday';
		case 1: return 'Monday';
		case 2: return 'Tuesday';
		case 3: return 'Wednesday';
		case 4: return 'Thursday';
		case 5: return 'Friday';
		case 6: return 'Saturday';
		default: throw new Error(`Invalid day supplied: ${day}`);
	}
}

/**
 * Converts a numeric month to a month name
 *
 * @param {int} month The 0-indexed month
 * @returns {string}
 */
function formatMonth(month) {
	switch (month) {
		case 0: return 'January';
		case 1: return 'February';
		case 2: return 'March';
		case 3: return 'April';
		case 4: return 'May';
		case 5: return 'June';
		case 6: return 'July';
		case 7: return 'August';
		case 8: return 'September';
		case 9: return 'October';
		case 10: return 'November';
		case 11: return 'December';
		default: throw new Error(`Invalid month supplied: ${month}`);
	}
}

/**
 * Ensures that a number always has a leading zero for uniform formatting
 *
 * @param {int} d
 * @returns {string}
 */
function formatNumberWithLeadingZero(d) {
	return d < 10 ? `0${d}` : d;
}