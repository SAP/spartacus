module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4000/'],
      startServerCommand: 'yarn serve:ssr',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
