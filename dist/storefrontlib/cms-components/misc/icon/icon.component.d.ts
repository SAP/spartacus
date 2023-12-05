import { ElementRef, Renderer2 } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { IconLoaderService } from './icon-loader.service';
import { ICON_TYPE as DEFAULT_ICON_TYPE } from './icon.model';
import * as i0 from "@angular/core";
type ICON_TYPE = DEFAULT_ICON_TYPE | string;
/**
 *
 * The icon component can be added in different ways:
 *
 * With the component selector:
 * `<cx-icon type="SEARCH"></cx-icon>`
 *
 * With the attribute selector:
 * `<span cxIcon="STAR"></span>`
 *
 * Additionally, content can be projected to the icon:
 *
 * `<button cxIcon="HAPPY">happy label</button>`
 *
 * The above button would become (based on a TEXT resource type):
 * `<button>😊happy label</button>`
 *
 * While the content is projected, the icon itself doesn't require an
 * additional DOM node which is an advantage over the component selector.
 */
export declare class IconComponent {
    protected iconLoader: IconLoaderService;
    protected elementRef: ElementRef<HTMLElement>;
    protected renderer: Renderer2;
    /**
     * The cxIcon directive is bound to the icon type. You can feed the `ICON_TYPE` to
     * accomplish a configurable button in the UI.
     */
    set cxIcon(type: ICON_TYPE);
    /**
     * The type input parameter is bound to the icon type. You can feed the `ICON_TYPE` to
     * accomplish a configurable button in the UI.
     */
    set type(type: ICON_TYPE);
    /**
     * the icon provides an html fragment that is used to add SVG or text based icons.
     */
    icon: SafeHtml | undefined;
    /**
     * The `flip-at-rtl` class is added to the DOM for the style layer to flip the icon in RTL direction.
     */
    flipAtRtl: boolean;
    /**
     * The `flip-at-ltr` class is added to the DOM for the style layer to flip the icon in LTR direction.
     */
    flipAtLtr: boolean;
    /**
     * Maintains the applied style classes so we can remove them when the
     * icon type changes at run time.
     */
    protected styleClasses: string[];
    constructor(iconLoader: IconLoaderService, elementRef: ElementRef<HTMLElement>, renderer: Renderer2);
    protected setIcon(type: ICON_TYPE): void;
    /**
     * The icons supports flipping for some icons to support rtl and ltr directions.
     */
    protected flipIcon(type: ICON_TYPE): void;
    /**
     * Adds the style classes and the link resource (if available).
     */
    protected addStyleClasses(type: ICON_TYPE): void;
    protected get host(): HTMLElement;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconComponent, "cx-icon,[cxIcon]", never, { "cxIcon": "cxIcon"; "type": "type"; }, {}, never, ["*"], false, never>;
}
export {};
