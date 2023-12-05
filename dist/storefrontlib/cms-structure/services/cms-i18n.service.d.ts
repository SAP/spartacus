import { TranslationChunkService, TranslationService } from '@spartacus/core';
import { CmsComponentsService } from './cms-components.service';
import * as i0 from "@angular/core";
export declare class CmsI18nService {
    protected cmsComponentsService: CmsComponentsService;
    protected translation: TranslationService;
    protected translationChunk: TranslationChunkService;
    constructor(cmsComponentsService: CmsComponentsService, translation: TranslationService, translationChunk: TranslationChunkService);
    loadForComponents(componentTypes: string[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CmsI18nService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CmsI18nService>;
}
