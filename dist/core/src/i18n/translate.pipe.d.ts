import { ChangeDetectorRef, OnDestroy, PipeTransform } from '@angular/core';
import { LoggerService } from '../logger';
import { Translatable, TranslatableParams } from './translatable';
import { TranslationService } from './translation.service';
import * as i0 from "@angular/core";
export declare class TranslatePipe implements PipeTransform, OnDestroy {
    protected service: TranslationService;
    protected cd: ChangeDetectorRef;
    private lastKey;
    private lastOptions;
    private translatedValue;
    private sub;
    protected logger: LoggerService;
    constructor(service: TranslationService, cd: ChangeDetectorRef);
    transform(input: Translatable | string, options?: TranslatableParams): string;
    private translate;
    private markForCheck;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TranslatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TranslatePipe, "cxTranslate", false>;
}
