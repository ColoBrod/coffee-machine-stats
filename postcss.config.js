module.exports = {
  plugins: [
    require('postcss-import')({
      path: ["src"],
    }),
    require('autoprefixer'),
    require('postcss-custom-media'),
    require('postcss-preset-env')({
      stage: 1,
    }),
    require('precss'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
};