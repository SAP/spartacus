import { browser, element, by } from 'protractor';

export class SpacceleratorPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('spac-root h1')).getText();
  }
}
