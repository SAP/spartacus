import { browser, element, by } from 'protractor';
export class HomePage {
  navigateTo() {
    return browser.get('/');
  }

  getSiteLogoComponent() {
    // <y-component-wrapper _ngcontent-c6="" _nghost-c11="" ng-reflect-component-type="SimpleBannerComponent" ng-reflect-component-uid="SiteLogoComponent">
    var componentWrapper = element(
      by.css('[ng-reflect-component-uid="SiteLogoComponent"]')
    );
    var component = componentWrapper.element(by.css('y-banner'));
    return component;
  }
}
