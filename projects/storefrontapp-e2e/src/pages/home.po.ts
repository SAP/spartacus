import { AppPage } from './../app.po';
import { Header } from './../cmslib/header.po';
import { browser, element, by } from 'protractor';
import { E2EUtil } from './../util.po';
export class HomePage extends AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getSplahBanner() {
    return E2EUtil.getComponent(
      'ElectronicsHompageSplashBanner',
      'y-responsive-banner'
    );
  }
}
