import { LoggerService } from '../logger';
import { I18nConfig } from './config/i18n-config';
import * as i0 from "@angular/core";
export declare class TranslationChunkService {
    protected config: I18nConfig;
    protected duplicates: {
        [key: string]: string[];
    };
    protected chunks: {
        [key: string]: string;
    };
    protected logger: LoggerService;
    constructor(config: I18nConfig);
    protected readonly KEY_SEPARATOR = ".";
    getChunkNameForKey(key: string): string;
    private warnDuplicates;
    static ɵfac: i0.ɵɵFactoryDeclaration<TranslationChunkService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TranslationChunkService>;
}
