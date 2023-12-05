import { EscapeFocusService } from '../escape/escape-focus.service';
import { AutoFocusConfig, PersistFocusConfig } from '../keyboard-focus.model';
import * as i0 from "@angular/core";
export declare class AutoFocusService extends EscapeFocusService {
    /**
     * Returns the first focusable child element of the host element.
     */
    findFirstFocusable(host: HTMLElement | null | undefined, config?: AutoFocusConfig): HTMLElement | undefined | null;
    /**
     * Indicates whether any of the focusable child elements is focused.
     */
    hasPersistedFocus(host: HTMLElement | null | undefined, config: PersistFocusConfig): boolean;
    /**
     * Returns the element that has a persisted focus state.
     *
     * @param host the `HTMLElement` used to query for focusable children
     * @param group the optional group for the persistent state, to separate different focus
     *   groups and remain the persistence
     */
    protected getPersisted(host?: HTMLElement | null, group?: string | null): HTMLElement | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutoFocusService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AutoFocusService>;
}
