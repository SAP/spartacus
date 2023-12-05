import { AfterViewInit, ElementRef, EventEmitter } from '@angular/core';
import { VisualViewerAnimationSliderService } from './visual-viewer-animation-slider.service';
import * as i0 from "@angular/core";
export declare class VisualViewerAnimationSliderComponent implements AfterViewInit {
    protected visualViewerAnimationSliderService: VisualViewerAnimationSliderService;
    constructor(visualViewerAnimationSliderService: VisualViewerAnimationSliderService);
    ngAfterViewInit(): void;
    set hidden(hidden: boolean);
    get hidden(): boolean;
    set value(value: number);
    get value(): number;
    valueChange: EventEmitter<number>;
    get position(): number;
    set disabled(disabled: boolean);
    get disabled(): boolean;
    get initialized(): boolean;
    initializedChange: EventEmitter<boolean>;
    set barElement(barElement: ElementRef);
    set handleElement(handleElement: ElementRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<VisualViewerAnimationSliderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VisualViewerAnimationSliderComponent, "cx-epd-visualization-animation-slider", never, { "hidden": "hidden"; "value": "value"; "disabled": "disabled"; }, { "valueChange": "valueChange"; "initializedChange": "initializedChange"; }, never, never, false, never>;
}
