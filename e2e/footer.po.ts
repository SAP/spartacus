import { browser, element, by } from 'protractor';
import { E2EUtil } from './util.po';
export class Footer {
  // FIXME
  getSiteLogoComponent() {
    return E2EUtil.getComponent('SiteLogoComponent', 'y-banner');
  }
}
