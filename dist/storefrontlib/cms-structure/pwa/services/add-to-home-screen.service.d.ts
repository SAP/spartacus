import { GlobalMessageService, WindowRef } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PWAModuleConfig } from '../pwa.module-config';
import * as i0 from "@angular/core";
export declare class AddToHomeScreenService {
    protected config: PWAModuleConfig;
    protected globalMessageService: GlobalMessageService;
    protected winRef: WindowRef;
    protected deferredEvent: any;
    protected canPrompt: BehaviorSubject<boolean>;
    canPrompt$: Observable<boolean>;
    constructor(config: PWAModuleConfig, globalMessageService: GlobalMessageService, winRef: WindowRef);
    init(): void;
    enableAddToHomeScreen(): void;
    disableAddToHomeScreen(): void;
    firePrompt(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddToHomeScreenService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AddToHomeScreenService>;
}
