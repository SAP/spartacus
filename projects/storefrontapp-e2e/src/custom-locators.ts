import { ProtractorBy, Locator } from 'protractor';

export function addCustomLocators(by: ProtractorBy) {
  by.addLocator('dynamicSlot', function(
    slotPosition,
    elementTag,
    opt_parentElement,
    opt_rootSelector
  ) {
    const using = opt_parentElement || document;
    return using.querySelectorAll(
      `y-dynamic-slot[position=${slotPosition}] ${elementTag}`
    );
  });

  by.addLocator('formControlName', function(
    formControlName: string,
    opt_parentElement,
    opt_rootSelector
  ) {
    const using = opt_parentElement || document;
    return using.querySelectorAll(`[formcontrolname=${formControlName}]`);
  });
}

declare module 'protractor/built/locators' {
  export interface ProtractorBy {
    dynamicSlot(slot: string, tagName: string): Locator;
    formControlName(name: string): Locator;
  }
}
