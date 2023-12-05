import { WindowRef } from '@spartacus/core';
import { PopoverPosition, PopoverPositionArray } from '../../components/popover/popover.model';
import * as i0 from "@angular/core";
export interface UIPositionRectangle {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
}
export declare class PositioningService {
    protected winRef: WindowRef;
    constructor(winRef: WindowRef);
    protected get allowedPlacements(): Array<PopoverPositionArray>;
    protected get placementSeparator(): RegExp;
    protected get window(): Window | undefined;
    protected get document(): Document;
    protected getAllStyles(element: HTMLElement): CSSStyleDeclaration | undefined;
    protected getPositionStyleProperty(element: HTMLElement): string | undefined;
    protected isStaticPositioned(element: HTMLElement): boolean;
    protected offsetParent(element: HTMLElement): HTMLElement;
    protected position(element: HTMLElement, round?: boolean): UIPositionRectangle;
    protected offset(element: HTMLElement, round?: boolean): UIPositionRectangle;
    protected _positionElements(hostElement: HTMLElement, targetElement: HTMLElement, placement: string, appendToBody?: boolean): boolean;
    positionElements(hostElement: HTMLElement, targetElement: HTMLElement, placement: string | PopoverPosition | PopoverPositionArray, appendToBody?: boolean): PopoverPosition;
    getPositioningClass(position?: PopoverPosition, autoPositioning?: boolean): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PositioningService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PositioningService>;
}
