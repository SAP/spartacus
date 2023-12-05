import { i18n } from 'i18next';
import { Observable } from 'rxjs';
import { LoggerService } from '../../logger';
import { I18nConfig } from '../config/i18n-config';
import { TranslationChunkService } from '../translation-chunk.service';
import { TranslationService } from '../translation.service';
import * as i0 from "@angular/core";
export declare class I18nextTranslationService implements TranslationService {
    protected config: I18nConfig;
    protected translationChunk: TranslationChunkService;
    protected i18next: i18n;
    private readonly NON_BREAKING_SPACE;
    protected readonly NAMESPACE_SEPARATOR = ":";
    protected logger: LoggerService;
    constructor(config: I18nConfig, translationChunk: TranslationChunkService, i18next: i18n);
    translate(key: string, options?: any, whitespaceUntilLoaded?: boolean): Observable<string>;
    loadChunks(chunkNames: string | string[]): Promise<any>;
    /**
     * Returns a fallback value in case when the given key is missing
     * @param key
     */
    protected getFallbackValue(key: string): string;
    private reportMissingKey;
    private getNamespacedKey;
    static ɵfac: i0.ɵɵFactoryDeclaration<I18nextTranslationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<I18nextTranslationService>;
}
