import { AppPage } from './../app.po';
import { browser, by, element, ElementFinder } from 'protractor';
import { E2EUtil } from './../util.po';
import { CategoryDslrPage } from './category-dslr.po';
export class HomePage extends AppPage {
  readonly YPAGE = 'y-home-page';

  readonly page: ElementFinder = element(by.tagName(this.YPAGE));
  readonly splashBanner: ElementFinder = this.page.element(
    by.css('.ElectronicsHompageSplashBannerComponent')
  );

  async navigateTo() {
    await browser.get('/');
  }

  async waitForReady() {
    await E2EUtil.wait4PresentElement(this.splashBanner);
  }

  getPage(): ElementFinder {
    return E2EUtil.getComponent(this.YPAGE);
  }

  getSplashBanner(): ElementFinder {
    return E2EUtil.getComponentWithinParentByCss(
      this.getPage(),
      '[data-component-uid="ElectronicsHompageSplashBannerComponent"]'
    );
  }

  async navigateViaSplashBanner() {
    await this.getSplashBanner().click();
    return new CategoryDslrPage();
  }
}
