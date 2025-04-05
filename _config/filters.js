import { DateTime } from "luxon";
import MarkdownIt from "markdown-it";

export default function (eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
			format || "yyyy-LL-dd"
		);
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if (!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if (n < 0) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", (target) => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter((tag) => ["all", "posts"].indexOf(tag) === -1);
	});

	eleventyConfig.addFilter("sortAlphabetically", (strings) =>
		(strings || []).sort((b, a) => b.localeCompare(a))
	);

	// Configure markdown-it with lazy loading for images
	const md = MarkdownIt({
		html: true,
		breaks: true,
		linkify: true,
	});

	// Store the default renderer
	const defaultRender =
		md.renderer.rules.image ||
		((tokens, idx, options, env, self) => {
			return self.renderToken(tokens, idx, options);
		});

	// Override image renderer to add lazy loading
	md.renderer.rules.image = (tokens, idx, options, env, self) => {
		const token = tokens[idx];
		token.attrSet("loading", "lazy");
		token.attrSet("decoding", "async");
		return defaultRender(tokens, idx, options, env, self);
	};

	eleventyConfig.setLibrary("md", md);
}
