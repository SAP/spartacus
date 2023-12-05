import { DatePipe } from '@angular/common';
import { PipeTransform } from '@angular/core';
import { LoggerService } from '../logger';
import { LanguageService } from '../site-context/facade/language.service';
import * as i0 from "@angular/core";
export declare class CxDatePipe extends DatePipe implements PipeTransform {
    protected language: LanguageService;
    protected logger: LoggerService;
    constructor(language: LanguageService);
    transform(value: any, format?: string, timezone?: string): string | null;
    transform(value: null | undefined, format?: string, timezone?: string): null;
    private getLang;
    private getActiveLang;
    private reportMissingLocaleData;
    static ɵfac: i0.ɵɵFactoryDeclaration<CxDatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CxDatePipe, "cxDate", false>;
}
