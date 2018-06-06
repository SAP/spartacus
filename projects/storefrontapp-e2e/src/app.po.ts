import { Header } from './cmslib/header.po';
import { browser } from 'protractor';

export abstract class AppPage {
  private _header: Header;

  constructor() {
    this._header = new Header();
  }

  get header(): Header {
    return this._header;
  }

  getTitle() {
    const title = browser.getTitle();
    return title;
  }
}
