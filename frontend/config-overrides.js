const { override } = require("customize-cra");

module.exports = override(
  (config) => {
    config.resolve.fallback = {
      "crypto": require.resolve("crypto-browserify"),
      "https": require.resolve("https-browserify"),
      "http": require.resolve("stream-http"),
      "stream": require.resolve("stream-browserify"),
      "zlib": require.resolve("browserify-zlib")
    };
    return config;
  }
);