import { SpacceleratorPage } from './app.po';

describe('spaccelerator App', () => {
  let page: SpacceleratorPage;

  beforeEach(() => {
    page = new SpacceleratorPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect<any>(page.getTitle()).toEqual('Spaccelerator');
  });
});
