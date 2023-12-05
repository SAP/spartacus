import { Observable } from 'rxjs';
import { KeyboardFocusService } from '../../keyboard-focus/services/keyboard-focus.service';
import { SkipLink, SkipLinkConfig } from '../config/skip-link.config';
import * as i0 from "@angular/core";
export declare class SkipLinkService {
    protected config: SkipLinkConfig;
    protected keyboardFocusService: KeyboardFocusService;
    private skipLinks$;
    constructor(config: SkipLinkConfig, keyboardFocusService: KeyboardFocusService);
    getSkipLinks(): Observable<SkipLink[]>;
    add(key: string, target: HTMLElement): void;
    remove(key: string): void;
    scrollToTarget(skipLink: SkipLink): void;
    protected getSkipLinkIndexInArray(key: string): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<SkipLinkService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SkipLinkService>;
}
