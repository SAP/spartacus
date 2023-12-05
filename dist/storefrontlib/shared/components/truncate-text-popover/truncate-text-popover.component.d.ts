import * as i0 from "@angular/core";
export declare class TruncateTextPopoverComponent {
    /**
     * String to be rendered inside popover wrapper component.
     */
    content: string;
    /**
     * The maximum length of the characters after which the text will be truncated
     */
    charactersLimit: number;
    customClass?: string;
    get isTruncated(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<TruncateTextPopoverComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TruncateTextPopoverComponent, "cx-truncate-text-popover", never, { "content": "content"; "charactersLimit": "charactersLimit"; "customClass": "customClass"; }, {}, never, never, false, never>;
}
