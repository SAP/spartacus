import { HomePage } from './home.po';

describe('home page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should have site logo', () => {
    // go to homepage
    page.navigateTo();
    // check if site logo is present
    expect<any>(page.getSiteLogoComponent().isPresent()).toEqual(true);
  });
});
