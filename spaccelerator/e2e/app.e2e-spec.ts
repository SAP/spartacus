import { SpacceleratorPage } from './app.po';

describe('spaccelerator App', () => {
  let page: SpacceleratorPage;

  beforeEach(() => {
    page = new SpacceleratorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('spac works!');
  });
});
