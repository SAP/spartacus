import { APP_INITIALIZER, Provider } from '@angular/core';
import { WindowRef, LanguageService } from '@spartacus/core';

export const htmlLangProvider: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: setHtmlLangAttribute,
  deps: [WindowRef, LanguageService],
};

/**
 * Sets active language in <html lang="">
 */
export function setHtmlLangAttribute(
  winRef: WindowRef,
  languageService: LanguageService
) {
  const result = () => {
    languageService.getActive().subscribe((lang) => {
      winRef.document.documentElement.lang = lang.replace(/_/g, '-');
    });
  };
  return result;
}
