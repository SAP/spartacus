import { HomePage } from '../page-objects/home.po';

describe('App basics', () => {
  let home: HomePage;

  beforeEach(async () => {
    home = new HomePage();
  });

  it('should display title', async () => {
    await home.navigateTo();
    expect(await home.getBrowserPageTitle()).toEqual('Spartacus Storefront');
  });

  it('should have site logo', async () => {
    // go to homepage
    await home.navigateTo();
    // check if site logo is present
    expect(await home.header.siteLogoComponent.isPresent()).toEqual(true);
  });

  it('should have splash banner', async () => {
    // go to homepage
    await home.navigateTo();
    // check if site logo is present
    expect(await home.splashBanner.isPresent()).toEqual(true);
  });

  it('should have footer with footer navigation and notice', async () => {
    // go to homepage
    await home.navigateTo();
    const footer = home.footer;

    expect(await footer.footerNavigation.isPresent()).toEqual(true);

    expect(await footer.getSectionsCount()).toEqual(3);
    expect(await footer.getSectionHeader(2)).toEqual('Follow Us');
    expect(await footer.getLinkUrlByTitle('About SAP Commerce Cloud')).toEqual(
      'http://www.cx.sap.com/products/commerce'
    );

    expect(await footer.getNoticeText()).toEqual(
      'Copyright © 2018 SAP SE or an SAP affiliate company. All rights reserved.'
    );
  });
});
