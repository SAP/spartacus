import { EscapeFocusConfig } from '../keyboard-focus.model';
import { PersistFocusService } from '../persist/persist-focus.service';
import { SelectFocusUtility } from '../services/select-focus.util';
import * as i0 from "@angular/core";
export declare class EscapeFocusService extends PersistFocusService {
    protected selectFocusUtil: SelectFocusUtility;
    constructor(selectFocusUtil: SelectFocusUtility);
    shouldFocus(config: EscapeFocusConfig): boolean;
    handleEscape(host: HTMLElement, config: EscapeFocusConfig, event: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EscapeFocusService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<EscapeFocusService>;
}
