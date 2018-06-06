import { AppPage } from './../app.po';
import { Header } from './../cmslib/header.po';
import { browser, element, by, ElementFinder } from 'protractor';
import { E2EUtil } from './../util.po';
export class HomePage extends AppPage {
  navigateTo() {
    return browser.get('/');
  }

  homePageTag(): ElementFinder {
    return E2EUtil.getComponent('y-home-page');
  }

  getSplahBanner() {
    return E2EUtil.getComponentWithinParentByCss(
      this.homePageTag(),
      '[ng-reflect-component-uid="ElectronicsHompageSplashBanner"]'
    );
  }
}
