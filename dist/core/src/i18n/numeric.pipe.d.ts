import { DecimalPipe } from '@angular/common';
import { PipeTransform } from '@angular/core';
import { LoggerService } from '../logger';
import { LanguageService } from '../site-context/facade/language.service';
import * as i0 from "@angular/core";
export declare class CxNumericPipe extends DecimalPipe implements PipeTransform {
    protected language: LanguageService;
    protected logger: LoggerService;
    constructor(language: LanguageService);
    transform(value: any | number | string, digitsInfo?: string): string | null;
    transform(value: null | undefined, digitsInfo?: string): null;
    protected getLang(): string;
    protected getActiveLang(): string;
    protected reportMissingLocaleData(lang: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CxNumericPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CxNumericPipe, "cxNumeric", false>;
}
