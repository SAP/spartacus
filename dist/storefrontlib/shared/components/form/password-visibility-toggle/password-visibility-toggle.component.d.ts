import { PasswordInputState } from './password-input-visibility.model';
import * as i0 from "@angular/core";
export declare class PasswordVisibilityToggleComponent {
    protected showState: PasswordInputState;
    protected hideState: PasswordInputState;
    inputElement: HTMLInputElement;
    state: PasswordInputState;
    /**
     * Toggle the visibility of the text of the input field.
     */
    toggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PasswordVisibilityToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PasswordVisibilityToggleComponent, "cx-password-visibility-toggle", never, { "inputElement": "inputElement"; }, {}, never, never, false, never>;
}
