module.exports = {
  root: '..',
  src: 'src',
  dist: 'dist',
  entry: {
    app: 'main.js',
  },
  pages: '../static',
  assets: {
    js: {
      src: 'js',
      dist: 'assets/js',
    },
    css: {
      src: 'scss',
      dist: 'assets/css',
    },
    img: 'assets/images',
    svg: {
      src: 'assets/svg',
      dist: 'assets/images',
    },
    fonts: {
      src: 'assets/fonts',
      dist: 'assets/fonts',
    },
    media: {
      src: 'assets/media',
      dist: 'assets/media',
    },
  },
};
