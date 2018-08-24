import {by} from 'protractor';
import {E2EUtil} from './../util.po';

export class Footer {

  readonly footerNavigation = E2EUtil.getComponentWithinDynamicSlot('Footer', 'y-footer-navigation');
  readonly notice = this.footerNavigation.element(by.css('.y-footer-navigation__notice'));
  readonly linkSections = this.footerNavigation.all(by.css('.y-footer-navigation__container'));
  readonly linkSectionHeader = (sectionNo: number) => this.linkSections.get(sectionNo).element(by.tagName('h1'));

  async getNoticeText() {
    return this.notice.getText();
  }

  async getSectionsCount() {
    return this.linkSections.count();
  }

  async getSectionHeader(sectionNo: number) {
    return this.linkSectionHeader(sectionNo).getText();
  }

  async getLinkUrlByTitle(title: string) {
    return this.footerNavigation.element(by.linkText(title)).getAttribute('href');
  }

}
