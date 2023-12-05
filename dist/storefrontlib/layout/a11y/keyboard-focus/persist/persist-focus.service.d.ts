import { BaseFocusService } from '../base/base-focus.service';
import { PersistFocusConfig } from '../keyboard-focus.model';
import * as i0 from "@angular/core";
/**
 * Shared service to persist the focus for an element or a group
 * of elements. The persisted element focus can be used to persist
 * the focus for a DOM tree, so that the focus remains after a repaint
 * or reoccurs when a DOM tree is "unlocked".
 */
export declare class PersistFocusService extends BaseFocusService {
    protected focus: Map<string, string>;
    get(group?: string | null): string | undefined;
    /**
     * Persist the keyboard focus state for the given key. The focus is stored globally
     * or for the given group.
     */
    set(key: string | undefined, group?: string | null): void;
    /**
     * Clears the persisted keyboard focus state globally or for the given group.
     */
    clear(group?: string): void;
    /**
     * Returns the group for the host element based on the configured group or
     * by the `data-cx-focus-group` attribute stored on the host.
     */
    getPersistenceGroup(host: HTMLElement | undefined | null, config?: PersistFocusConfig): string | null | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<PersistFocusService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PersistFocusService>;
}
