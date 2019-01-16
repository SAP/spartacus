import { getStateSlice } from './transfer-state.reducer';

fdescribe('getStateSlice', () => {
  it('should return a proper localStorageSync function', () => {
    const state = {
      products: { 1: 'als', 2: 'veta' },
      cms: { pages: { page1: 'saddsa', page2: 'page2' } },
      auth: 'authconfig'
    };

    const keys = { products: true, cms: true };

    const result = getStateSlice(state, keys);

    const expedted = { products: state.products, cms: state.cms };

    expect(result).toEqual(expedted);
  });

  it('should return a proper localStorageSync function', () => {
    const state = {
      products: { 1: 'als', 2: 'veta' },
      cms: { pages: { page1: 'saddsa', page2: 'page2' }, navigation: 'ala' },
      auth: 'authconfig'
    };

    const keys = { products: true, cms: { pages: true } };

    const result = getStateSlice(state, keys);

    const expedted = {
      products: state.products,
      cms: { pages: state.cms.pages }
    };

    expect(result).toEqual(expedted);
  });

  it('should return a proper localStorageSync function', () => {
    const state = {
      products: { 1: 'als', 2: 'veta' },
      cms: { pages: { page1: 'saddsa', page2: 'page2' }, navigation: 'ala' },
      auth: 'authconfig'
    };

    const keys = { cms: { pages: { page1: true } } };

    const result = getStateSlice(state, keys);

    const expedted = { cms: { pages: { page1: state.cms.pages.page1 } } };

    expect(result).toEqual(expedted);
  });

  it('should return a proper localStorageSync function', () => {
    const state = {
      products: { 1: 'als', 2: 'veta' },
      cms: { pages: { page1: 'saddsa', page2: 'page2' }, navigation: 'ala' },
      auth: 'authconfig'
    };

    const keys = { cms: { pages: { page1: true } } };

    const result = getStateSlice(state, keys);

    const expedted = { cms: { pages: { page1: state.cms.pages.page1 } } };

    expect(result).toEqual(expedted);
  });
});
