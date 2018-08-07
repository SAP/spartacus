import { AppPage } from './../app.po';
import { browser, ElementFinder } from 'protractor';
import { E2EUtil } from './../util.po';
export class HomePage extends AppPage {
  navigateTo() {
    return browser.get('/');
  }

  homePageTag(): ElementFinder {
    return E2EUtil.getComponent('y-home-page');
  }

  getSplahBanner(): ElementFinder {
    return E2EUtil.getComponentWithinParentByCss(
      this.homePageTag(),
      '[ng-reflect-component-uid="ElectronicsHompageSplashBanner"]'
    );
  }
}
