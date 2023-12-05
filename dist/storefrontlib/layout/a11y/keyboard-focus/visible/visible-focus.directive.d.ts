import { BaseFocusDirective } from '../base/base-focus.directive';
import { VisibleFocusConfig } from '../keyboard-focus.model';
import * as i0 from "@angular/core";
/**
 * Directive implementation that adds a CSS class to the host element
 * when the moused is used to focus an element. As soon as the keyboard
 * is used, the class is removed.
 *
 * This feature must be explicitly enabled with the `disableMouseFocus` config.
 *
 * The appearance of the visual focus depends on the CSS implementation to
 * begin with. Spartacus styles add a blue border around each focusable element.
 * This can be considered annoying by keyboard users, as they won't need such a
 * strong indication of the selected element.
 */
export declare class VisibleFocusDirective extends BaseFocusDirective {
    protected defaultConfig: VisibleFocusConfig;
    protected config: VisibleFocusConfig;
    /** Controls a css class to hide focus visible CSS rules */
    mouseFocus: boolean;
    handleMousedown(): void;
    handleKeydown(event: KeyboardEvent): void;
    /**
     * Indicates whether the configurations setup to disable visual focus.
     */
    protected get shouldFocusVisible(): boolean | undefined;
    /**
     * Indicates whether the event is used to navigate the storefront. Some keyboard events
     * are used by mouse users to fill a form or interact with the OS or browser.
     */
    protected isNavigating(event: KeyboardEvent): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<VisibleFocusDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<VisibleFocusDirective, never, never, {}, {}, never, never, false, never>;
}
