// postcss.config.js
module.exports = {
  plugins: {
    "postcss-import": {}, // Handles importing other CSS files
    tailwindcss: {}, // Adds Tailwind CSS (if you’re using it)
    "postcss-nesting": {}, // Adds support for nesting (if needed)
    autoprefixer: {}, // Adds vendor prefixes for cross-browser compatibility
  },
};
