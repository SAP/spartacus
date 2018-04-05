import { browser, element, by } from 'protractor';
import { E2EUtil } from './util.po';
export class Header {
  getSiteLogoComponent() {
    return E2EUtil.getComponent('SiteLogoComponent', 'y-banner');
  }

  getSearchComponent() {
    return E2EUtil.getComponent('SearchBox', 'y-searchbox');
  }

  getNavigationComponent() {
    return E2EUtil.getComponent('OrderComponent', 'y-searchbox');
  }
}
