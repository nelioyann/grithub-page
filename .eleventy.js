module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("./src/css");
	eleventyConfig.addPassthroughCopy("./src/images");
	eleventyConfig.addPassthroughCopy("./src/favicon.ico");
	eleventyConfig.addPassthroughCopy("./src/fonts");
	eleventyConfig.addPassthroughCopy("./src/admin");
	eleventyConfig.addPassthroughCopy("./src/scripts");
	return {
	 dir: {
		input: "src"
			},
		};
}