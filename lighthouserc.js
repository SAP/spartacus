module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4000/','http://localhost:4000/electronics-spa/en/USD/Brands/Canon/c/brand_10', 'http://localhost:4000/electronics-spa/en/USD/product/832386/ef-300mm-f-2.8l-is-usm'],
      startServerCommand: 'yarn serve:ssr',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
