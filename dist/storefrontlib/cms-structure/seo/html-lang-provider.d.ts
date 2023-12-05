import { Provider } from '@angular/core';
import { LanguageService, WindowRef } from '@spartacus/core';
export declare const htmlLangProvider: Provider;
/**
 * Sets active language in <html lang="">
 */
export declare function setHtmlLangAttribute(winRef: WindowRef, languageService: LanguageService): () => void;
