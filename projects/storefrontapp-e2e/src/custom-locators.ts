import { ProtractorBy } from 'protractor';

export function addCustomLocators(by: ProtractorBy) {
  by.addLocator('dynamicSlot', function(
    slotPosition,
    elementTag,
    opt_parentElement,
    _opt_rootSelector
  ) {
    const using = opt_parentElement || document;
    return using.querySelectorAll(
      `cx-dynamic-slot[position=${slotPosition}] ${elementTag}`
    );
  });

  by.addLocator('formControlName', function(
    formControlName: string,
    opt_parentElement,
    _opt_rootSelector
  ) {
    const using = opt_parentElement || document;
    return using.querySelectorAll(`[formcontrolname=${formControlName}]`);
  });

  by.addLocator('pageLayout', function(
    template,
    opt_parentElement,
    _opt_rootSelector
  ) {
    const using = opt_parentElement || document;
    return using.querySelectorAll(`cx-page-layout.${template}`);
  });
}

declare module 'protractor/built/locators' {
  export interface ProtractorBy {
    dynamicSlot(slot: string, tagName: string): Locator;
    formControlName(name: string): Locator;
    pageLayout(template: string): Locator;
  }
}
