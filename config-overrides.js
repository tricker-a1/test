module.exports = (config) => {
	config.module.rules[1].oneOf.splice(0, 0, {
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	});
	return config;
};
