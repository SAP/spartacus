import { AppPage } from './../app.po';
import { browser, ElementFinder } from 'protractor';
import { E2EUtil } from './../util.po';
export class HomePage extends AppPage {
  readonly YPAGE = 'y-home-page';

  navigateTo() {
    return browser.get('/');
  }

  getPage(): ElementFinder {
    return E2EUtil.getComponent(this.YPAGE);
  }

  getSplahBanner(): ElementFinder {
    return E2EUtil.getComponentWithinParentByCss(
      this.getPage(),
      '[data-component-uid="ElectronicsHompageSplashBanner"]'
    );
  }
}
