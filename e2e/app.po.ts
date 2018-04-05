import { browser, element, by } from 'protractor';
export class SpacceleratorPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    var title = browser.getTitle();
    return title;
  }
}
