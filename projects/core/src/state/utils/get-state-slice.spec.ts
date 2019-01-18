import { getStateSlice } from './get-state-slice';

describe('getStateSlice', () => {
  it('should get state slice from top branches', () => {
    const state = {
      products: { 1: 'als', 2: 'veta' },
      cms: { pages: { page1: 'saddsa', page2: 'page2' } },
      auth: 'authconfig'
    };

    const keys = { products: true, cms: true };

    const result = getStateSlice(state, keys);

    const expected = { products: state.products, cms: state.cms };

    expect(result).toEqual(expected);
  });

  it('should get state slice from branches 2 levels deep', () => {
    const state = {
      products: { 1: 'als', 2: 'veta' },
      cms: { pages: { page1: 'saddsa', page2: 'page2' }, navigation: 'ala' },
      auth: 'authconfig'
    };

    const keys = { products: true, cms: { pages: true } };

    const result = getStateSlice(state, keys);

    const expected = {
      products: state.products,
      cms: { pages: state.cms.pages }
    };

    expect(result).toEqual(expected);
  });

  it('should get state slice from branches 3 levels deep', () => {
    const state = {
      products: { 1: 'als', 2: 'veta' },
      cms: { pages: { page1: 'saddsa', page2: 'page2' }, navigation: 'ala' },
      auth: 'authconfig'
    };

    const keys = { cms: { pages: { page1: true } } };

    const result = getStateSlice(state, keys);

    const expected = { cms: { pages: { page1: state.cms.pages.page1 } } };

    expect(result).toEqual(expected);
  });

  it('should not get the state if key is not present', () => {
    const state = {
      products: { 1: 'als', 2: 'veta' },
      cms: { pages: { page1: 'saddsa', page2: 'page2' }, navigation: 'ala' },
      auth: 'authconfig'
    };

    const keys = { notPresent: true };

    const result = getStateSlice(state, keys);

    const expected = {};

    expect(result).toEqual(expected);
  });
});
