import * as i0 from '@angular/core';
import { EventEmitter, Injectable, Component, ChangeDetectionStrategy, Input, Output, ViewChild, NgModule, inject } from '@angular/core';
import * as i1$2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i2 from '@spartacus/core';
import { I18nModule, UrlModule, FeaturesConfigModule, LoggerService, GlobalMessageType, provideDefaultConfig } from '@spartacus/core';
import * as i1 from '@spartacus/storefront';
import { IconModule, SpinnerModule, ICON_TYPE, PromotionsModule, ItemCounterModule, MediaModule, ProductReferencesModule, CarouselModule } from '@spartacus/storefront';
import * as i1$1 from '@spartacus/epd-visualization/root';
import { EventListenerUtils, ContentType } from '@spartacus/epd-visualization/root';
import { BehaviorSubject, of, Observable, combineLatest, concat, Subject } from 'rxjs';
import { mergeMap, shareReplay, first, filter, catchError, map, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import * as i2$1 from '@spartacus/epd-visualization/core';
import * as i2$2 from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddToCartComponent } from '@spartacus/cart/base/components/add-to-cart';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VisualViewerAnimationSliderService {
    constructor(elementRef, windowRef, renderer, changeDetectorRef) {
        this.elementRef = elementRef;
        this.windowRef = windowRef;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        this._initialized = false;
        this.initializedChange = new EventEmitter();
        this._value = 0;
        this.valueChange = new EventEmitter();
        this._disabled = false;
        this._resizeObserver = undefined;
        this.eventListenerUtils = new EventListenerUtils();
        this._touchIdentifier = undefined;
        this.sizeChange = new EventEmitter();
        this.stepDelta = 1 / 50;
        this.pageDelta = 1 / 10;
        this.eventListenerUtils.initialize(this.renderer);
    }
    initialize() {
        this.updateEventBindings();
        this.setupResizeObserver();
        this.setInitialized();
    }
    setInitialized() {
        this._initialized = true;
        this.initializedChange.emit(true);
        this.initializedChange.complete();
    }
    get initialized() {
        return this._initialized;
    }
    /**
     * Slider value. Value is in the range [0-1].
     */
    set value(value) {
        value = this.clampToRange(value);
        if (this._value === value) {
            return;
        }
        this._value = value;
        this.valueChange.emit(this.value);
    }
    get value() {
        return this._value;
    }
    set disabled(disabled) {
        if (this._disabled === disabled) {
            return;
        }
        this._disabled = disabled;
        this.updateEventBindings();
    }
    get disabled() {
        return this._disabled;
    }
    set hidden(hidden) {
        if (this._hidden === hidden) {
            return;
        }
        this._hidden = hidden;
        // Ensure handle position is recalculated when the animation slider visibility changes
        // Fixes a bug in which the initial position of the slider handle is incorrect
        // because the bar width is calculated while the animation slider is hidden (noticeable in RTL mode)
        this.changeDetectorRef.detectChanges();
    }
    get hidden() {
        return this._hidden;
    }
    get position() {
        return this.valueToPosition(this.value);
    }
    get rightToLeft() {
        return this.windowRef.document.documentElement.dir === 'rtl';
    }
    set barElement(barElement) {
        this._barElement = barElement;
    }
    get barElement() {
        return this._barElement;
    }
    set handleElement(handleElement) {
        this._handleElement = handleElement;
    }
    get handleElement() {
        return this._handleElement;
    }
    set resizeObserver(resizeObserver) {
        this._resizeObserver = resizeObserver;
    }
    get resizeObserver() {
        return this._resizeObserver;
    }
    set touchIdentifier(touchIdentifier) {
        this._touchIdentifier = touchIdentifier;
    }
    get touchIdentifier() {
        return this._touchIdentifier;
    }
    getClientWidth(elementRef) {
        if (!elementRef || !elementRef.nativeElement) {
            return undefined;
        }
        const clientRect = this.getClientRect(elementRef);
        return clientRect.right - clientRect.left;
    }
    getClientRect(elementRef) {
        return elementRef.nativeElement.getBoundingClientRect();
    }
    resizeObserverSupported() {
        return window.ResizeObserver !== undefined;
    }
    setupResizeObserver() {
        if (this.resizeObserverSupported()) {
            this.resizeObserver = new ResizeObserver(this.onResize.bind(this));
            this.resizeObserver.observe(this.elementRef.nativeElement);
        }
    }
    onResize() {
        // Ensure handle position is recalculated on resize
        this.changeDetectorRef.detectChanges();
    }
    updateEventBindings() {
        if (this.disabled) {
            this.eventListenerUtils.detachAllEventListeners(document);
            this.eventListenerUtils.detachAllEventListeners(this.barElement.nativeElement);
            this.eventListenerUtils.detachAllEventListeners(this.handleElement.nativeElement);
        }
        else {
            this.eventListenerUtils.attachEventListener(this.handleElement.nativeElement, 'mousedown', this.onMouseDown.bind(this));
            this.eventListenerUtils.attachEventListener(this.barElement.nativeElement, 'mousedown', this.onMouseDownOnBar.bind(this));
            this.eventListenerUtils.attachEventListener(this.handleElement.nativeElement, 'touchstart', this.onTouchStart.bind(this));
            this.eventListenerUtils.attachEventListener(this.barElement.nativeElement, 'touchstart', this.onTouchStartOnBar.bind(this));
            this.eventListenerUtils.attachEventListener(this.handleElement.nativeElement, 'focus', this.onHandleFocus.bind(this));
        }
    }
    get handleWidth() {
        return this.getClientWidth(this.handleElement) ?? 0;
    }
    get barWidth() {
        return this.getClientWidth(this.barElement) ?? 0;
    }
    get handleMaxPosition() {
        return this.barWidth - this.handleWidth;
    }
    valueToPosition(value) {
        let position = this.clampToRange(value);
        if (this.rightToLeft) {
            position = 1 - position;
        }
        return position * this.handleMaxPosition;
    }
    positionToValue(position) {
        let value = position / this.handleMaxPosition;
        if (this.rightToLeft) {
            value = 1 - value;
        }
        return value;
    }
    findTouch(touchList, touchIdentifier) {
        for (let i = 0; i < touchList.length; i++) {
            const touch = touchList.item(i);
            if (touch.identifier === touchIdentifier) {
                return touch;
            }
        }
        return undefined;
    }
    get sliderClientPosition() {
        return this.getClientRect(this.elementRef).left;
    }
    onTouchStart(event) {
        event.stopPropagation();
        event.preventDefault();
        if (this.touchIdentifier !== undefined) {
            return;
        }
        this.eventListenerUtils.detachEventListeners(document, 'touchmove');
        this.eventListenerUtils.attachEventListener(document, 'touchmove', this.onTouchMove.bind(this));
        this.eventListenerUtils.detachEventListeners(document, 'touchend');
        this.eventListenerUtils.attachEventListener(document, 'touchend', this.onTouchEnd.bind(this));
        this.touchIdentifier = event.changedTouches[0].identifier;
    }
    onTouchStartOnBar(event) {
        this.onTouchStart(event);
        this.onTouchMove(event);
    }
    onMouseDown(event) {
        event.stopPropagation();
        event.preventDefault();
        this.eventListenerUtils.detachEventListeners(document, 'mousemove');
        this.eventListenerUtils.attachEventListener(document, 'mousemove', this.onMouseMove.bind(this));
        this.eventListenerUtils.detachEventListeners(document, 'mouseup');
        this.eventListenerUtils.attachEventListener(document, 'mouseup', this.onMouseUp.bind(this));
    }
    onMouseDownOnBar(event) {
        this.onMouseDown(event);
        this.onMouseMove(event);
    }
    onMouseMove(event) {
        const position = event.clientX - this.sliderClientPosition - this.handleWidth / 2;
        this.applyValue(this.positionToValue(position));
    }
    onMouseUp(_event) {
        this.eventListenerUtils.detachEventListeners(document, 'mousemove');
        this.eventListenerUtils.detachEventListeners(document, 'mouseup');
    }
    onTouchMove(event) {
        const touchInitiatedOnSlider = this.findTouch(event.changedTouches, this.touchIdentifier);
        if (touchInitiatedOnSlider === undefined) {
            return;
        }
        const touch = this.findTouch(event.touches, this.touchIdentifier);
        const position = touch.clientX - this.sliderClientPosition - this.handleWidth / 2;
        this.applyValue(this.positionToValue(position));
    }
    onTouchEnd(event) {
        const touchInitiatedOnSlider = this.findTouch(event.changedTouches, this.touchIdentifier);
        if (touchInitiatedOnSlider === undefined) {
            return;
        }
        this.touchIdentifier = undefined;
        this.eventListenerUtils.detachEventListeners(document, 'touchmove');
        this.eventListenerUtils.detachEventListeners(document, 'touchend');
    }
    onHandleFocus() {
        const nativeElement = this.handleElement.nativeElement;
        this.eventListenerUtils.attachEventListener(nativeElement, 'blur', this.onHandleBlur.bind(this));
        this.eventListenerUtils.attachEventListener(nativeElement, 'keydown', this.onKeyboardEvent.bind(this));
    }
    onHandleBlur() {
        const nativeElement = this.handleElement.nativeElement;
        this.eventListenerUtils.detachEventListeners(nativeElement, 'blur');
        this.eventListenerUtils.detachEventListeners(nativeElement, 'keydown');
        this.eventListenerUtils.detachEventListeners(nativeElement, 'keyup');
    }
    onKeyboardEvent(event) {
        const keyHandler = this.getKeyHandler(event.code, this.rightToLeft);
        if (keyHandler === undefined) {
            return;
        }
        event.preventDefault();
        this.applyValue(keyHandler(this.value));
    }
    getKeyHandler(keyCode, rightToLeft) {
        const increaseStep = (currentValue) => currentValue + this.stepDelta;
        const decreaseStep = (currentValue) => currentValue - this.stepDelta;
        const increasePage = (currentValue) => currentValue + this.pageDelta;
        const decreasePage = (currentValue) => currentValue - this.pageDelta;
        const stepLeft = rightToLeft ? increaseStep : decreaseStep;
        const stepRight = rightToLeft ? decreaseStep : increaseStep;
        const home = () => 0;
        const end = () => 1;
        switch (keyCode) {
            case 'ArrowUp':
                return increaseStep;
            case 'ArrowDown':
                return decreaseStep;
            case 'ArrowLeft':
                return stepLeft;
            case 'ArrowRight':
                return stepRight;
            case 'PageUp':
                return increasePage;
            case 'PageDown':
                return decreasePage;
            case 'Home':
                return home;
            case 'End':
                return end;
            default:
                return undefined;
        }
    }
    applyValue(value) {
        value = this.clampToRange(value);
        if (this.value !== value) {
            this.value = value;
            this.valueChange.emit(this.value);
        }
    }
    clampToRange(value) {
        return Math.min(Math.max(value, 0), 1);
    }
}
VisualViewerAnimationSliderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerAnimationSliderService, deps: [{ token: i0.ElementRef }, { token: i2.WindowRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Injectable });
VisualViewerAnimationSliderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerAnimationSliderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerAnimationSliderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i2.WindowRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VisualViewerAnimationSliderComponent {
    constructor(visualViewerAnimationSliderService) {
        this.visualViewerAnimationSliderService = visualViewerAnimationSliderService;
        this.valueChange = this.visualViewerAnimationSliderService.valueChange;
        this.initializedChange = this.visualViewerAnimationSliderService.initializedChange;
    }
    ngAfterViewInit() {
        this.visualViewerAnimationSliderService.initialize();
    }
    set hidden(hidden) {
        this.visualViewerAnimationSliderService.hidden = hidden;
    }
    get hidden() {
        return this.visualViewerAnimationSliderService.hidden;
    }
    set value(value) {
        this.visualViewerAnimationSliderService.value = value;
    }
    get value() {
        return this.visualViewerAnimationSliderService.value;
    }
    get position() {
        return this.visualViewerAnimationSliderService.position;
    }
    set disabled(disabled) {
        this.visualViewerAnimationSliderService.disabled = disabled;
    }
    get disabled() {
        return this.visualViewerAnimationSliderService.disabled;
    }
    get initialized() {
        return this.visualViewerAnimationSliderService.initialized;
    }
    set barElement(barElement) {
        this.visualViewerAnimationSliderService.barElement = barElement;
    }
    set handleElement(handleElement) {
        this.visualViewerAnimationSliderService.handleElement = handleElement;
    }
}
VisualViewerAnimationSliderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerAnimationSliderComponent, deps: [{ token: VisualViewerAnimationSliderService }], target: i0.ɵɵFactoryTarget.Component });
VisualViewerAnimationSliderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: VisualViewerAnimationSliderComponent, selector: "cx-epd-visualization-animation-slider", inputs: { hidden: "hidden", value: "value", disabled: "disabled" }, outputs: { valueChange: "valueChange", initializedChange: "initializedChange" }, providers: [VisualViewerAnimationSliderService], viewQueries: [{ propertyName: "barElement", first: true, predicate: ["bar"], descendants: true }, { propertyName: "handleElement", first: true, predicate: ["handle"], descendants: true }], ngImport: i0, template: "<div\n  class=\"cx-epd-visualization-animation-slider\"\n  [class.disabled]=\"disabled ? true : undefined\"\n>\n  <div class=\"cx-epd-visualization-animation-slider-wrapper\">\n    <span\n      cxVisualViewerAnimationSliderElement\n      #bar\n      class=\"\n        cx-epd-visualization-animation-slider-span\n        cx-epd-visualization-animation-slider-bar-wrapper\n      \"\n    >\n      <span\n        class=\"\n          cx-epd-visualization-animation-slider-span\n          cx-epd-visualization-animation-slider-bar\n        \"\n      ></span>\n    </span>\n\n    <span\n      cxVisualViewerAnimationSliderHandle\n      #handle\n      class=\"\n        cx-epd-visualization-animation-slider-span\n        cx-epd-visualization-animation-slider-pointer\n      \"\n      [style.left]=\"(position | cxNumeric: '1.0-0') + 'px'\"\n      [attr.role]=\"\n        'epdVisualization.visualViewer.toolbar.visualViewerAnimationSlider.role'\n          | cxTranslate\n      \"\n      [attr.aria-label]=\"\n        'epdVisualization.visualViewer.toolbar.visualViewerAnimationSlider.label'\n          | cxTranslate\n      \"\n      [attr.aria-valuenow]=\"value * 100 | cxNumeric: '1.0-0'\"\n      [attr.aria-valuemin]=\"'0'\"\n      [attr.aria-valuemax]=\"'100'\"\n      [attr.tabindex]=\"disabled ? null : 0\"\n    ></span>\n  </div>\n</div>\n", dependencies: [{ kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.CxNumericPipe, name: "cxNumeric" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerAnimationSliderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-epd-visualization-animation-slider', providers: [VisualViewerAnimationSliderService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"cx-epd-visualization-animation-slider\"\n  [class.disabled]=\"disabled ? true : undefined\"\n>\n  <div class=\"cx-epd-visualization-animation-slider-wrapper\">\n    <span\n      cxVisualViewerAnimationSliderElement\n      #bar\n      class=\"\n        cx-epd-visualization-animation-slider-span\n        cx-epd-visualization-animation-slider-bar-wrapper\n      \"\n    >\n      <span\n        class=\"\n          cx-epd-visualization-animation-slider-span\n          cx-epd-visualization-animation-slider-bar\n        \"\n      ></span>\n    </span>\n\n    <span\n      cxVisualViewerAnimationSliderHandle\n      #handle\n      class=\"\n        cx-epd-visualization-animation-slider-span\n        cx-epd-visualization-animation-slider-pointer\n      \"\n      [style.left]=\"(position | cxNumeric: '1.0-0') + 'px'\"\n      [attr.role]=\"\n        'epdVisualization.visualViewer.toolbar.visualViewerAnimationSlider.role'\n          | cxTranslate\n      \"\n      [attr.aria-label]=\"\n        'epdVisualization.visualViewer.toolbar.visualViewerAnimationSlider.label'\n          | cxTranslate\n      \"\n      [attr.aria-valuenow]=\"value * 100 | cxNumeric: '1.0-0'\"\n      [attr.aria-valuemin]=\"'0'\"\n      [attr.aria-valuemax]=\"'100'\"\n      [attr.tabindex]=\"disabled ? null : 0\"\n    ></span>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: VisualViewerAnimationSliderService }]; }, propDecorators: { hidden: [{
                type: Input
            }], value: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], disabled: [{
                type: Input
            }], initializedChange: [{
                type: Output
            }], barElement: [{
                type: ViewChild,
                args: ['bar']
            }], handleElement: [{
                type: ViewChild,
                args: ['handle']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VisualViewerAnimationSliderModule {
}
VisualViewerAnimationSliderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerAnimationSliderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VisualViewerAnimationSliderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerAnimationSliderModule, declarations: [VisualViewerAnimationSliderComponent], imports: [CommonModule, I18nModule], exports: [VisualViewerAnimationSliderComponent] });
VisualViewerAnimationSliderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerAnimationSliderModule, imports: [CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerAnimationSliderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule],
                    declarations: [VisualViewerAnimationSliderComponent],
                    exports: [VisualViewerAnimationSliderComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VisualViewerToolbarButtonComponent {
    constructor() {
        this.text = '';
        this.disabled = false;
        this.checked = false;
    }
}
VisualViewerToolbarButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerToolbarButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
VisualViewerToolbarButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: VisualViewerToolbarButtonComponent, selector: "cx-epd-visualization-viewer-toolbar-button", inputs: { text: "text", iconLibraryClass: "iconLibraryClass", iconClass: "iconClass", disabled: "disabled", checked: "checked" }, ngImport: i0, template: "<button\n  class=\"btn btn-link\"\n  type=\"submit\"\n  [disabled]=\"disabled\"\n  [class.checked]=\"checked\"\n  [attr.aria-checked]=\"checked\"\n>\n  <div class=\"buttonVBox\">\n    <cx-icon class=\"{{ iconLibraryClass }} {{ iconClass }}\"></cx-icon>\n    <span class=\"buttonText\">{{ text }}</span>\n  </div>\n</button>\n", dependencies: [{ kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerToolbarButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-epd-visualization-viewer-toolbar-button', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  class=\"btn btn-link\"\n  type=\"submit\"\n  [disabled]=\"disabled\"\n  [class.checked]=\"checked\"\n  [attr.aria-checked]=\"checked\"\n>\n  <div class=\"buttonVBox\">\n    <cx-icon class=\"{{ iconLibraryClass }} {{ iconClass }}\"></cx-icon>\n    <span class=\"buttonText\">{{ text }}</span>\n  </div>\n</button>\n" }]
        }], propDecorators: { text: [{
                type: Input
            }], iconLibraryClass: [{
                type: Input
            }], iconClass: [{
                type: Input
            }], disabled: [{
                type: Input
            }], checked: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VisualViewerToolbarButtonModule {
}
VisualViewerToolbarButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerToolbarButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VisualViewerToolbarButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerToolbarButtonModule, declarations: [VisualViewerToolbarButtonComponent], imports: [CommonModule, IconModule], exports: [VisualViewerToolbarButtonComponent] });
VisualViewerToolbarButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerToolbarButtonModule, imports: [CommonModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerToolbarButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, IconModule],
                    declarations: [VisualViewerToolbarButtonComponent],
                    exports: [VisualViewerToolbarButtonComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var NavigationMode;
(function (NavigationMode) {
    /**
     * Left mouse button drag causes turntable rotation.
     */
    NavigationMode[NavigationMode["Turntable"] = 0] = "Turntable";
    /**
     * Left mouse button drag performs panning.
     */
    NavigationMode[NavigationMode["Pan"] = 2] = "Pan";
    /**
     * Left mouse button drag performs zooming.
     */
    NavigationMode[NavigationMode["Zoom"] = 3] = "Zoom";
})(NavigationMode || (NavigationMode = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Defines the selection behaviour.
 */
var SelectionMode;
(function (SelectionMode) {
    /**
     * Clicking/tapping in the viewport can select at most one item.
     * Selecting a new item in this way will deselect any pre
     */
    SelectionMode["Exclusive"] = "exclusive";
    /**
     * Clicking/tapping in the viewport will not affect selection.
     */
    SelectionMode["None"] = "none";
    /**
     * A multiple selection mode in which clicking/tapping an item toggles its selection state.
     */
    SelectionMode["Sticky"] = "sticky";
})(SelectionMode || (SelectionMode = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var NodeContentType;
(function (NodeContentType) {
    NodeContentType["Annotation"] = "Annotation";
    NodeContentType["Background"] = "Background";
    NodeContentType["Hotspot"] = "Hotspot";
    NodeContentType["Reference"] = "Reference";
    NodeContentType["Regular"] = "Regular";
    NodeContentType["Symbol"] = "Symbol";
})(NodeContentType || (NodeContentType = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var SceneLoadState;
(function (SceneLoadState) {
    SceneLoadState[SceneLoadState["NotStarted"] = 0] = "NotStarted";
    SceneLoadState[SceneLoadState["Loading"] = 1] = "Loading";
    SceneLoadState[SceneLoadState["Loaded"] = 2] = "Loaded";
    SceneLoadState[SceneLoadState["Failed"] = 3] = "Failed";
})(SceneLoadState || (SceneLoadState = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var VisualizationLookupResult;
(function (VisualizationLookupResult) {
    VisualizationLookupResult["UniqueMatchFound"] = "UniqueMatchFound";
    VisualizationLookupResult["NoMatchFound"] = "NoMatchFound";
    VisualizationLookupResult["MultipleMatchesFound"] = "MultipleMatchesFound";
    VisualizationLookupResult["UnexpectedError"] = "UnexpectedError";
})(VisualizationLookupResult || (VisualizationLookupResult = {}));
var VisualizationLoadStatus;
(function (VisualizationLoadStatus) {
    VisualizationLoadStatus["NotStarted"] = "NotStarted";
    VisualizationLoadStatus["Loading"] = "Loading";
    VisualizationLoadStatus["Loaded"] = "Loaded";
    VisualizationLoadStatus["UnexpectedError"] = "UnexpectedError";
})(VisualizationLoadStatus || (VisualizationLoadStatus = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var ZoomTo;
(function (ZoomTo) {
    ZoomTo["All"] = "all";
    ZoomTo["Node"] = "node";
    ZoomTo["Selected"] = "selected";
    ZoomTo["ViewBack"] = "view_back";
    ZoomTo["ViewBottom"] = "view_bottom";
    ZoomTo["ViewFront"] = "view_front";
    ZoomTo["ViewLeft"] = "view_left";
    ZoomTo["ViewRight"] = "view_right";
    ZoomTo["ViewTop"] = "view_top";
    ZoomTo["Visible"] = "visible";
})(ZoomTo || (ZoomTo = {}));

/// <reference types="@sapui5/ts-types-esm" />
class VisualViewerService {
    constructor(epdVisualizationConfig, _sceneNodeToProductLookupService, visualizationLookupService, elementRef, changeDetectorRef, windowRef) {
        this.epdVisualizationConfig = epdVisualizationConfig;
        this._sceneNodeToProductLookupService = _sceneNodeToProductLookupService;
        this.visualizationLookupService = visualizationLookupService;
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.windowRef = windowRef;
        this._selectedNodeIds$ = new BehaviorSubject([]);
        this._sceneLoadInfo$ = new BehaviorSubject({
            sceneLoadState: SceneLoadState.NotStarted,
        });
        this.DEFAULT_BACKGROUND_TOP_COLOR = '--cx-color-inverse';
        this.DEFAULT_BACKGROUND_BOTTOM_COLOR = '--cx-color-inverse';
        this.DEFAULT_HOTSPOT_SELECTION_HIGHLIGHT_COLOR = 'rgba(255, 0, 0, 0.6)';
        this.DEFAULT_SHOW_ALL_HOTSPOTS_COLOR = 'rgba(255, 255, 0, 0.3)';
        this.DEFAULT_OUTLINE_COLOR = 'red';
        this.DEFAULT_OUTLINE_WIDTH = 5;
        this.DEFAULT_SELECTION_MODE = SelectionMode.Exclusive;
        this.DEFAULT_SHOW_ALL_HOTSPOTS_ENABLED = false;
        this.DEFAULT_EXCLUDED_OPACITY = 0.2;
        this.DEFAULT_ZOOM_TO_MARGIN = 0.2;
        this.DEFAULT_FLY_TO_DURATION = 1;
        this._flyToDurationInSeconds = this.DEFAULT_FLY_TO_DURATION;
        this._zoomToMargin = this.DEFAULT_ZOOM_TO_MARGIN;
        this.selectedProductCodesChange = new EventEmitter();
        this._excludedOpacity = this.DEFAULT_EXCLUDED_OPACITY;
        this.animationTimeChange = new EventEmitter();
        this._animationPosition = 0;
        this.animationPositionChange = new EventEmitter();
        this._animationPlaying = false;
        this.animationPlayingChange = new EventEmitter();
        this._isolateModeEnabled = false;
        this.isolateModeEnabledChange = new EventEmitter();
        this._viewportReady = false;
        this.viewportReadyChange = new EventEmitter();
        this.contentChangesFinished = new EventEmitter();
        this.contentLoadFinished = new EventEmitter();
        this.visualizationLoadInfoChange = new EventEmitter();
        if (!this.windowRef.isBrowser()) {
            return;
        }
        const ui5BootStrapped$ = this.bootstrapUi5('ui5bootstrap');
        const ui5Initialized$ = ui5BootStrapped$.pipe(mergeMap(this.initializeUi5.bind(this)));
        this.viewportAdded$ = ui5Initialized$.pipe(mergeMap(this.addViewport.bind(this)), shareReplay());
        this.executeWhenSceneLoaded(this.setInitialPropertyValues.bind(this));
    }
    ngOnDestroy() {
        this.selectedNodeIdsSubscription?.unsubscribe();
    }
    get sceneNodeToProductLookupService() {
        return this._sceneNodeToProductLookupService;
    }
    set sceneNodeToProductLookupService(value) {
        this._sceneNodeToProductLookupService = value;
    }
    get scene() {
        return this._scene;
    }
    set scene(value) {
        this._scene = value;
    }
    get nodeHierarchy() {
        return this._nodeHierarchy;
    }
    set nodeHierarchy(value) {
        this._nodeHierarchy = value;
    }
    get contentConnector() {
        return this._contentConnector;
    }
    set contentConnector(value) {
        this._contentConnector = value;
    }
    get viewport() {
        return this._viewport;
    }
    set viewport(value) {
        this._viewport = value;
    }
    get viewStateManager() {
        return this._viewStateManager;
    }
    set viewStateManager(value) {
        this._viewStateManager = value;
    }
    get animationPlayer() {
        return this._animationPlayer;
    }
    set animationPlayer(value) {
        this._animationPlayer = value;
    }
    get viewManager() {
        return this._viewManager;
    }
    set viewManager(value) {
        this._viewManager = value;
    }
    get drawerToolbar() {
        return this._drawerToolbar;
    }
    set drawerToolbar(value) {
        this._drawerToolbar = value;
    }
    get sceneId() {
        return this._sceneId;
    }
    set sceneId(value) {
        this._sceneId = value;
    }
    get contentType() {
        return this._contentType;
    }
    set contentType(value) {
        this._contentType = value;
    }
    get initialViewInfo() {
        return this._initialViewInfo;
    }
    set initialViewInfo(value) {
        this._initialViewInfo = value;
    }
    get leafNodeRefs() {
        return this._leafNodeRefs;
    }
    set leafNodeRefs(value) {
        this._leafNodeRefs = value;
    }
    get viewPriorToIsolateViewInfo() {
        return this._viewPriorToIsolateViewInfo;
    }
    set viewPriorToIsolateViewInfo(value) {
        this._viewPriorToIsolateViewInfo = value;
    }
    get viewportAdded$() {
        return this._viewportAdded$;
    }
    set viewportAdded$(value) {
        this._viewportAdded$ = value;
    }
    get selectedNodeIds$() {
        return this._selectedNodeIds$;
    }
    set selectedNodeIds$(value) {
        this._selectedNodeIds$ = value;
    }
    get sceneLoadInfo$() {
        return this._sceneLoadInfo$;
    }
    get flyToDurationInSeconds() {
        return this._flyToDurationInSeconds;
    }
    set flyToDurationInSeconds(value) {
        this._flyToDurationInSeconds = value;
    }
    get zoomToMargin() {
        return this._zoomToMargin;
    }
    set zoomToMargin(value) {
        this._zoomToMargin = value;
    }
    /**
     * The top colour of the background gradient.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-background' with the quotes.
     */
    set backgroundTopColor(backgroundTopColor) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._backgroundTopColor === backgroundTopColor) {
            return;
        }
        this._backgroundTopColor = backgroundTopColor;
        this.executeWhenSceneLoaded(() => {
            this.viewport.setBackgroundColorTop(this.getCSSColor(backgroundTopColor));
        });
    }
    get backgroundTopColor() {
        return this._backgroundTopColor;
    }
    /**
     * The bottom colour of the background gradient.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-background' with the quotes.
     */
    set backgroundBottomColor(backgroundBottomColor) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._backgroundBottomColor === backgroundBottomColor) {
            return;
        }
        this._backgroundBottomColor = backgroundBottomColor;
        this.executeWhenSceneLoaded(() => {
            this.viewport.setBackgroundColorBottom(this.getCSSColor(backgroundBottomColor));
        });
    }
    get backgroundBottomColor() {
        return this._backgroundBottomColor;
    }
    /**
     * The colour applied to selected 2D hotspots in 2D content.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
     */
    set hotspotSelectionColor(hotspotSelectionColor) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._hotspotSelectionColor === hotspotSelectionColor) {
            return;
        }
        this._hotspotSelectionColor = hotspotSelectionColor;
        this.executeWhenSceneLoaded(() => {
            this.viewStateManager.setHighlightColor(this.getCSSColor(hotspotSelectionColor));
        });
    }
    get hotspotSelectionColor() {
        return this._hotspotSelectionColor;
    }
    /**
     * Highlights all hotspots in 2D content that are included in the includedProductCodes property using the colour specified by the showAllHotspotsColor property.
     */
    set showAllHotspotsEnabled(showAllHotspotsEnabled) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._showAllHotspotsEnabled === showAllHotspotsEnabled) {
            return;
        }
        this._showAllHotspotsEnabled = showAllHotspotsEnabled;
        this.executeWhenSceneLoaded(() => {
            this.applyInclusionStyle(this._includedProductCodes);
        });
    }
    get showAllHotspotsEnabled() {
        return this._showAllHotspotsEnabled;
    }
    /**
     * The colour used to highlight hotspots in 2D content when the showAllHotspotsEnabled property has a value of true.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
     */
    set showAllHotspotsColor(showAllHotspotsColor) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._showAllHotspotsColor === showAllHotspotsColor) {
            return;
        }
        this._showAllHotspotsColor = showAllHotspotsColor;
        this.executeWhenSceneLoaded(() => {
            const cssColor = this.getCSSColor(showAllHotspotsColor);
            this.viewport.setShowAllHotspotsTintColor(cssColor);
        });
    }
    get showAllHotspotsColor() {
        return this._showAllHotspotsColor;
    }
    /**
     * The outline colour used to indicate selected objects in 3D content.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
     */
    set outlineColor(outlineColor) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._outlineColor === outlineColor) {
            return;
        }
        this._outlineColor = outlineColor;
        this.executeWhenSceneLoaded(() => {
            this.viewStateManager.setOutlineColor(this.getCSSColor(outlineColor));
        });
    }
    get outlineColor() {
        return this._outlineColor;
    }
    /**
     * The width of the outline used to indicate selected objects in 3D content.
     */
    set outlineWidth(outlineWidth) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._outlineWidth === outlineWidth) {
            return;
        }
        this._outlineWidth = outlineWidth;
        this.executeWhenSceneLoaded(() => {
            this.viewStateManager.setOutlineWidth(outlineWidth);
        });
    }
    get outlineWidth() {
        return this._outlineWidth;
    }
    /**
     * The selection mode.
     * None - Selection is disabled.
     * Exclusive - When selecting objects in the viewport, at most one object can be selected at a time. Clicking/tapping to select a new object will deselect any previously selected objects.
     * Sticky - A multiple selection mode in which clicking/tapping on an object that is not part of the current selection will toggle its selection state without modifying the selection state of the currently selected objects.
     */
    set selectionMode(selectionMode) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._selectionMode === selectionMode) {
            return;
        }
        this._selectionMode = selectionMode;
        this.executeWhenSceneLoaded(() => {
            this.viewport.setSelectionMode(selectionMode);
        });
    }
    get selectionMode() {
        return this._selectionMode;
    }
    /**
     * Gets/sets the selection in terms of product codes.
     * Gets the set of product codes applied to the selected scene nodes.
     * Sets the selection set based on the set of supplied product codes.
     */
    set selectedProductCodes(selectedProductCodes) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this._selectedProductCodes = selectedProductCodes;
        this.sceneNodeToProductLookupService
            .lookupNodeIds(selectedProductCodes)
            .pipe(first())
            .subscribe((selectedNodeIds) => {
            this.selectedNodeIds$.next(selectedNodeIds);
        });
    }
    get selectedProductCodes() {
        return this._selectedProductCodes;
    }
    /**
     * Gets/sets which objects should be selectable (in terms of product codes).
     * For 3D content:
     * - objects that are included will be selectable and opaque
     * - objects that are not included will not be selectable and will have an opacity specified by the excludedOpacity property.
     *
     * For 2D content:
     * - hotspots that are included will be selectable and can be made visible
     * - hotspots that are not included will not be selectable or visible
     */
    set includedProductCodes(includedProductCodes) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this._includedProductCodes = includedProductCodes;
        this.executeWhenSceneLoaded(() => {
            this.applyInclusionStyle(includedProductCodes);
        });
    }
    get includedProductCodes() {
        return this._includedProductCodes;
    }
    /**
     * Gets/sets the opacity to apply to 3D objects that are not in the set specified by the includedProductCodes property.
     */
    set excludedOpacity(excludedOpacity) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this._excludedOpacity = excludedOpacity;
    }
    get excludedOpacity() {
        return this._excludedOpacity;
    }
    /**
     * The current time position in seconds in the animation (if there is one).
     */
    set animationTime(animationTime) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this._animationTime = animationTime;
    }
    get animationTime() {
        return this._animationTime;
    }
    /**
     * The total duration of the animation in seconds.
     * Returns 0 when there is no animation present (or when a scene has not been loaded).
     */
    get animationTotalDuration() {
        if (this.animationPlayer) {
            return this.animationPlayer.getTotalDuration();
        }
        return 0;
    }
    /**
     * The animation playback position as a fractional value between 0 (start) and 1 (end).
     */
    set animationPosition(position) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._animationPosition === position) {
            return;
        }
        this._animationPosition = position;
        this.executeWhenSceneLoaded(() => {
            const time = position * this.animationPlayer.getTotalDuration();
            this.animationPlayerSetTime(time, false);
        });
    }
    get animationPosition() {
        return this._animationPosition;
    }
    /**
     * Gets/sets whether the animation (if there is one) is currently playing.
     */
    set animationPlaying(animationPlaying) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._animationPlaying === animationPlaying) {
            return;
        }
        this._animationPlaying = animationPlaying;
        this.executeWhenSceneLoaded(() => {
            if (animationPlaying) {
                if (this.animationPosition >= 1) {
                    this.animationPlayerSetTime(0, false);
                }
                this.animationPlayer.play();
            }
            else {
                this.animationPlayer.stop();
            }
            this.animationPlayingChange.emit(animationPlaying);
        });
    }
    get animationPlaying() {
        return this._animationPlaying;
    }
    /**
     * Controls the behaviour when a left mouse button drag is initiated in the viewport.
     * Turntable: A left mouse drag performs a turntable mode rotation.
     * Pan: A left mouse drag pans the camera in the viewport.
     * Zoom: A left mouse drag zooms the camera in the viewport in or out
     */
    set navigationMode(navigationMode) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._navigationMode === navigationMode) {
            return;
        }
        this._navigationMode = navigationMode;
        this.executeWhenSceneLoaded(() => {
            if (this.drawerToolbar && this.viewport) {
                // sap.ui.vk library will have a public API to set the navigation mode in a future UI5 version
                this.drawerToolbar._activateGesture(this.viewport.getImplementation(), navigationMode);
            }
        });
    }
    get navigationMode() {
        return this._navigationMode;
    }
    /**
     * Isolate mode allows a single object to be viewed in isolation.
     */
    set isolateModeEnabled(isolateModeEnabled) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this._isolateModeEnabled === isolateModeEnabled) {
            return;
        }
        this.executeWhenSceneLoaded(() => {
            this._isolateModeEnabled = isolateModeEnabled;
            if (isolateModeEnabled) {
                this.viewPriorToIsolateViewInfo = this.viewport.getViewInfo({
                    camera: true,
                    visibility: true,
                });
                const selectedNodeRefs = [];
                if (this.is2D) {
                    this.viewStateManager.enumerateSelection((nodeRef) => selectedNodeRefs.push(nodeRef));
                }
                else {
                    this.viewStateManager.enumerateOutlinedNodes((nodeRef) => selectedNodeRefs.push(nodeRef));
                }
                this.isolateNodes(selectedNodeRefs);
            }
            else {
                this.viewport.setViewInfo(this.viewPriorToIsolateViewInfo, this.flyToDurationInSeconds);
            }
            this.isolateModeEnabledChange.emit(this.isolateModeEnabled);
        });
    }
    get isolateModeEnabled() {
        return this._isolateModeEnabled;
    }
    /**
     * Gets whether the viewport is displaying 2D content.
     */
    get is2D() {
        return this._is2D;
    }
    setIs2D(is2D) {
        this._is2D = is2D;
    }
    /**
     * Indicates that a scene has been loaded and the viewport is ready for interaction.
     */
    get viewportReady() {
        return this._viewportReady;
    }
    setViewportReady(viewportReady) {
        if (this._viewportReady === viewportReady) {
            return;
        }
        this._viewportReady = viewportReady;
        this.viewportReadyChange.emit(viewportReady);
    }
    /**
     * Returns the user to the initial camera position used when a scene was first loaded.
     */
    activateHomeView() {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        if (this.is2D) {
            this.viewport.zoomTo(ZoomTo.All, null, this.flyToDurationInSeconds, this.zoomToMargin);
        }
        else {
            this.viewport.setViewInfo(this.initialViewInfo, this.flyToDurationInSeconds);
        }
        if (this.isolateModeEnabled) {
            // Exit out of the isolate mode but don't restore the view that was
            // saved before entering isolate mode
            this._isolateModeEnabled = false;
            this.isolateModeEnabledChange.emit(false);
        }
    }
    /**
     * Plays the animation (if one exists).
     */
    playAnimation() {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this.animationPlaying = true;
    }
    /**
     * Pauses animation playback.
     */
    pauseAnimation() {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this.animationPlaying = false;
    }
    setInitialPropertyValues() {
        if (this.backgroundTopColor === undefined) {
            this.backgroundTopColor = this.DEFAULT_BACKGROUND_TOP_COLOR;
        }
        if (this.backgroundBottomColor === undefined) {
            this.backgroundBottomColor = this.DEFAULT_BACKGROUND_BOTTOM_COLOR;
        }
        if (this.hotspotSelectionColor === undefined) {
            this.hotspotSelectionColor =
                this.DEFAULT_HOTSPOT_SELECTION_HIGHLIGHT_COLOR;
        }
        if (this.showAllHotspotsColor === undefined) {
            this.showAllHotspotsColor = this.DEFAULT_SHOW_ALL_HOTSPOTS_COLOR;
        }
        if (this.outlineColor === undefined) {
            this.outlineColor = this.DEFAULT_OUTLINE_COLOR;
        }
        if (this.outlineWidth === undefined) {
            this.outlineWidth = this.DEFAULT_OUTLINE_WIDTH;
        }
        if (this.selectionMode === undefined) {
            this.selectionMode = this.DEFAULT_SELECTION_MODE;
        }
        if (this.showAllHotspotsEnabled === undefined) {
            this.showAllHotspotsEnabled = this.DEFAULT_SHOW_ALL_HOTSPOTS_ENABLED;
        }
        if (this.is2D) {
            if (this.navigationMode === undefined ||
                this.navigationMode === NavigationMode.Turntable) {
                this.navigationMode = NavigationMode.Pan;
            }
        }
        else if (this.navigationMode === undefined) {
            this.navigationMode = NavigationMode.Turntable;
        }
        if (this.selectedProductCodes === undefined) {
            this.selectedProductCodes = this.selectedNodeIds$.getValue();
        }
    }
    executeWhenSceneLoaded(callback) {
        this.sceneLoadInfo$
            .pipe(filter((sceneLoadInfo) => sceneLoadInfo.sceneLoadState === SceneLoadState.Loaded ||
            sceneLoadInfo.sceneLoadState === SceneLoadState.Failed), first())
            .subscribe((sceneLoadInfo) => {
            if (sceneLoadInfo.sceneLoadState === SceneLoadState.Loaded) {
                callback(sceneLoadInfo.loadedSceneInfo);
            }
        });
    }
    applyInclusionStyle(productCodes) {
        if (productCodes === undefined) {
            return;
        }
        this.sceneNodeToProductLookupService
            .lookupNodeIds(productCodes)
            .pipe(first())
            .subscribe((sceneNodeIds) => {
            if (this.is2D) {
                this.applyInclusionStyle2D(sceneNodeIds);
            }
            else {
                this.applyInclusionStyle3D(sceneNodeIds);
            }
        });
    }
    applyInclusionStyle2D(sceneNodeIds) {
        const nodeRefsToInclude = this.persistentIdToNodeRef(sceneNodeIds, true);
        const hotspotNodeRefs = this.nodeHierarchy.getHotspotNodeIds();
        const hotspotNodeRefsSet = new Set(hotspotNodeRefs);
        // Hotspot nodes can have descendants that are also Hotspot nodes.
        // Ignore the descendant nodes and apply modifications at the highest level only.
        const topLevelHotspotNodeRefs = hotspotNodeRefs.filter((hotspotNodeRef) => this.isTopLevelHotspotNode(hotspotNodeRef, hotspotNodeRefsSet));
        if (this._showAllHotspotsEnabled) {
            const nodeRefsToIncludeSet = new Set(nodeRefsToInclude);
            const nodeRefsToExclude = topLevelHotspotNodeRefs.filter((nodeRef) => !nodeRefsToIncludeSet.has(nodeRef));
            this.viewport.showHotspots(nodeRefsToExclude, false, 0);
            this.viewport.showHotspots(nodeRefsToInclude, true, this.getCSSColor(this._showAllHotspotsColor));
        }
        else {
            this.viewport.showHotspots(topLevelHotspotNodeRefs, false, 0);
        }
    }
    applyInclusionStyle3D(sceneNodeIds) {
        const nodeRefsToInclude = this.persistentIdToNodeRef(sceneNodeIds, true);
        if (!this.leafNodeRefs) {
            this.leafNodeRefs = this.getAllLeafNodeRefs();
        }
        const leafNodeRefsToInclude = nodeRefsToInclude.flatMap((nodeRef) => this.getLeafDescendants(nodeRef, []));
        const leafNodeRefsToIncludeSet = new Set(leafNodeRefsToInclude);
        const leafNodeRefsToExclude = this.leafNodeRefs.filter((leafNodeRef) => !leafNodeRefsToIncludeSet.has(leafNodeRef));
        this.viewStateManager.setOpacity(leafNodeRefsToExclude, this.excludedOpacity);
        leafNodeRefsToInclude.forEach((nodeRef) => this.viewStateManager.setOpacity(nodeRef, this.viewStateManager.getRestOpacity(nodeRef)));
    }
    isTopLevelHotspotNode(hotspotNodeRef, hotspotNodeRefs) {
        return !this.nodeHierarchy
            .getAncestors(hotspotNodeRef)
            .some((ancestor) => hotspotNodeRefs.has(ancestor));
    }
    isReferenceNode(nodeRef) {
        return (this.nodeHierarchy.getNodeContentType(nodeRef) ===
            NodeContentType.Reference);
    }
    getLeafDescendants(nodeRef, leafNodeRefs) {
        if (!this.isReferenceNode(nodeRef)) {
            const children = this.nodeHierarchy
                .getChildren(nodeRef, false)
                .filter((childNodeRef) => !this.isReferenceNode(childNodeRef));
            if (children.length === 0) {
                leafNodeRefs.push(nodeRef);
            }
            else {
                children.forEach((childNodeRef) => this.getLeafDescendants(childNodeRef, leafNodeRefs));
            }
        }
        return leafNodeRefs;
    }
    getAllLeafNodeRefs() {
        return this.nodeHierarchy
            .getChildren(undefined)
            .flatMap((nodeRef) => this.getLeafDescendants(nodeRef, []));
    }
    isolateNodes(nodeRefsToIsolate) {
        // isolate just the first selected node
        nodeRefsToIsolate = nodeRefsToIsolate.slice(0, 1);
        this.viewport.zoomTo(ZoomTo.Node, nodeRefsToIsolate, this.flyToDurationInSeconds, this.zoomToMargin);
        const currentVisibleSids = this.viewPriorToIsolateViewInfo.visibility.visible || [];
        const currentVisibleNodeRefs = this.persistentIdToNodeRef(currentVisibleSids, true);
        this.viewStateManager.setVisibilityState(currentVisibleNodeRefs, false, true, false);
        this.viewStateManager.setVisibilityState(nodeRefsToIsolate, true, true, true);
    }
    animationPlayerSetTime(time, blockEvents) {
        // bug workaround
        // the overload with no sequence number parameter blows up
        this.animationPlayer.setTime(time, undefined, blockEvents);
    }
    onViewActivated() {
        this.initialViewInfo = this.viewport.getViewInfo({
            camera: true,
            visibility: true,
        });
    }
    onTimeChanged(oEvent) {
        let changes = false;
        const time = oEvent.getParameters().time;
        if (this.animationTime !== time) {
            this.animationTime = time;
            this.animationTimeChange.emit(time);
            changes = true;
        }
        const position = this.animationTotalDuration
            ? this.animationTime / this.animationTotalDuration
            : 0;
        if (this.animationPosition !== position) {
            this.animationPosition = position;
            this.animationPositionChange.emit(position);
            changes = true;
        }
        if (this.animationPlaying) {
            if (this.animationPosition >= 1) {
                this._animationPlaying = false;
                this.animationPlayingChange.emit(this._animationPlaying);
            }
        }
        if (changes) {
            // This is needed for the animation slider handle position to get updated
            // while an animation is playing.
            // Otherwise it typically only moves once the animation playback has paused.
            this.changeDetectorRef.detectChanges();
        }
    }
    setVisualizationLoadInfo(visualizationLoadInfo) {
        this._visualizationLoadInfo = visualizationLoadInfo;
        this.visualizationLoadInfoChange.emit(visualizationLoadInfo);
        this.changeDetectorRef.detectChanges();
    }
    get visualizationLoadInfo() {
        return this._visualizationLoadInfo;
    }
    loadVisualization(productCode) {
        if (!this.windowRef.isBrowser()) {
            return of({
                lookupResult: VisualizationLookupResult.UnexpectedError,
                loadStatus: VisualizationLoadStatus.UnexpectedError,
                errorMessage: 'Should not call loadVisualization in server side code',
            });
        }
        this.selectedNodeIdsSubscription?.unsubscribe();
        return this.viewportAdded$.pipe(mergeMap(() => this.resolveVisualization(productCode).pipe(mergeMap((visualizationLoadInfo) => {
            if (visualizationLoadInfo.lookupResult ===
                VisualizationLookupResult.UniqueMatchFound) {
                this.sceneNodeToProductLookupService.populateMapsForScene(this.sceneId);
                let mergedVisualizationLoadInfo = {
                    ...visualizationLoadInfo,
                    loadStatus: VisualizationLoadStatus.Loading,
                };
                this.setVisualizationLoadInfo(mergedVisualizationLoadInfo);
                return this.loadScene(this.sceneId, this.contentType).pipe(mergeMap((sceneLoadInfo) => {
                    if (sceneLoadInfo.sceneLoadState === SceneLoadState.Failed) {
                        mergedVisualizationLoadInfo = {
                            ...visualizationLoadInfo,
                            loadStatus: VisualizationLoadStatus.UnexpectedError,
                            errorMessage: sceneLoadInfo.errorMessage,
                        };
                    }
                    else {
                        this.selectedNodeIdsSubscription =
                            this.selectedNodeIds$.subscribe(this.handleSelectedNodeIds.bind(this));
                        mergedVisualizationLoadInfo = {
                            ...visualizationLoadInfo,
                            loadStatus: VisualizationLoadStatus.Loaded,
                        };
                    }
                    this.setVisualizationLoadInfo(mergedVisualizationLoadInfo);
                    return of(mergedVisualizationLoadInfo);
                }));
            }
            else {
                return of(visualizationLoadInfo);
            }
        }))));
    }
    isUi5BootStrapped() {
        return (!!this.windowRef.nativeWindow &&
            !!this.windowRef.nativeWindow.sap);
    }
    getCore() {
        return sap.ui.getCore();
    }
    bootstrapUi5(scriptElementId) {
        const epdVisualization = this.epdVisualizationConfig
            .epdVisualization;
        const ui5Config = epdVisualization.ui5;
        return new Observable((subscriber) => {
            if (this.isUi5BootStrapped()) {
                subscriber.next();
                subscriber.complete();
                return;
            }
            const script = this.windowRef.document.createElement('script');
            script.setAttribute('id', scriptElementId);
            this.windowRef.document
                .getElementsByTagName('head')[0]
                .appendChild(script);
            this.windowRef.document.onUi5Bootstrapped = () => {
                subscriber.next();
                subscriber.complete();
            };
            script.onerror = (error) => {
                subscriber.error(error);
                subscriber.complete();
            };
            script.id = 'sap-ui-bootstrap';
            script.type = 'text/javascript';
            script.setAttribute('data-sap-ui-compatVersion', 'edge');
            script.setAttribute('data-sap-ui-async', 'true');
            script.setAttribute('data-sap-ui-onInit', 'document.onUi5Bootstrapped()');
            script.src = ui5Config.bootstrapUrl;
        });
    }
    initializeUi5() {
        return new Observable((subscriber) => {
            const core = this.getCore();
            core.attachInit(() => {
                const loadLibraryOptions = { async: true };
                Promise.all([
                    core.loadLibrary('sap.m', loadLibraryOptions),
                    core.loadLibrary('sap.ui.layout', loadLibraryOptions),
                    core.loadLibrary('sap.ui.vk', loadLibraryOptions),
                    core.loadLibrary('sap.ui.richtexteditor', loadLibraryOptions),
                ]).then(() => {
                    subscriber.next();
                    subscriber.complete();
                });
            });
        });
    }
    destroyViewportAssociations(viewport) {
        const core = this.getCore();
        if (!core) {
            return;
        }
        this.destroyContentConnector(core, viewport);
        this.destroyViewManagers(core, viewport);
    }
    destroyContentConnector(core, viewport) {
        const contentConnectorId = viewport.getContentConnector();
        if (contentConnectorId) {
            const contentConnector = core.byId(contentConnectorId);
            if (contentConnector) {
                contentConnector.destroy();
            }
        }
    }
    destroyViewManagers(core, viewport) {
        const viewStateManagerId = viewport.getViewStateManager();
        if (viewStateManagerId && core.byId(viewStateManagerId)) {
            const viewStateManager = core.byId(viewStateManagerId);
            if (viewStateManager) {
                const animationPlayer = viewStateManager.getAnimationPlayer();
                if (animationPlayer) {
                    animationPlayer.destroy();
                }
                const viewManagerId = viewStateManager.getViewManager();
                if (viewManagerId) {
                    const viewManager = core.byId(viewManagerId);
                    if (viewManager) {
                        viewManager.destroy();
                    }
                }
                viewStateManager.destroy();
            }
        }
    }
    onContentChangesStarted() {
        this.viewport.detachNodesPicked(this.onNodesPicked);
    }
    onContentChangesFinished(event) {
        const content = event.getParameter('content');
        const failureReason = event.getParameter('failureReason');
        if (!!content && !failureReason) {
            this.scene = content;
            this.nodeHierarchy = this.scene.getDefaultNodeHierarchy();
            this.viewport.attachNodesPicked(this.onNodesPicked, this);
            if (content.loaders) {
                content.loaders.forEach((contentLoader) => {
                    if (contentLoader &&
                        contentLoader.attachLoadingFinished !== undefined) {
                        contentLoader.attachLoadingFinished(this.onContentLoadingFinished, this);
                    }
                });
            }
        }
        this.contentChangesFinished.emit({
            content,
            failureReason,
        });
    }
    onContentLoadingFinished(_event) {
        this.contentLoadFinished.emit({});
    }
    onNodesPicked(event) {
        if (this.is2D) {
            this.onNodesPicked2D(event);
        }
        else {
            this.onNodesPicked3D(event);
        }
    }
    isNodeIncluded(nodeRef) {
        const sids = this.nodeRefToPersistentId([nodeRef], true);
        const productCodes = this.sceneNodeToProductLookupService.syncLookupProductCodes(sids);
        return (!!productCodes &&
            productCodes.some((productCode) => this.includedProductCodes.includes(productCode)));
    }
    onNodesPicked2D(event) {
        const pickedNodes = event.getParameter('picked');
        if (pickedNodes.length === 0) {
            return;
        }
        const hotSpots = pickedNodes.filter((node) => node.nodeContentType && node.nodeContentType === NodeContentType.Hotspot);
        if (hotSpots.length === 0) {
            return;
        }
        const includedHotSpots = hotSpots.filter((nodeRef) => this.isNodeIncluded(nodeRef));
        pickedNodes.splice(0);
        includedHotSpots.forEach((includedHotSpot) => pickedNodes.push(includedHotSpot));
    }
    onNodesPicked3D(event) {
        const picked = event.getParameter('picked');
        const src = picked.splice(0, picked.length);
        src.forEach((node) => {
            while (!this.isNodeIncluded(node)) {
                node = node.parent;
                if (!node) {
                    break;
                }
            }
            if (node) {
                picked.push(node);
            }
        });
    }
    addViewport() {
        return new Observable((subscriber) => {
            sap.ui.require([
                'sap/ui/vk/ViewManager',
                'sap/ui/vk/Viewport',
                'sap/ui/vk/ViewStateManager',
                'sap/ui/vk/AnimationPlayer',
                'sap/ui/vk/ContentConnector',
                'sap/ui/vk/DrawerToolbar',
            ], (sap_ui_vk_ViewManager, sap_ui_vk_Viewport, sap_ui_vk_ViewStateManager, sap_ui_vk_AnimationPlayer, sap_ui_vk_ContentConnector, sap_ui_vk_DrawerToolbar) => {
                const core = this.getCore();
                const uiArea = core.getUIArea(this.elementRef.nativeElement);
                if (uiArea) {
                    const oldViewport = uiArea.getContent()[0];
                    this.destroyViewportAssociations(oldViewport);
                    uiArea.destroyContent();
                }
                this.viewport = new sap_ui_vk_Viewport({ visible: false });
                this.viewport.placeAt(this.elementRef.nativeElement);
                this.contentConnector = new sap_ui_vk_ContentConnector();
                this.contentConnector.attachContentChangesStarted(this.onContentChangesStarted, this);
                this.contentConnector.attachContentChangesFinished(this.onContentChangesFinished, this);
                this.contentConnector.attachContentLoadingFinished(this.onContentLoadingFinished, this);
                this.viewStateManager = new sap_ui_vk_ViewStateManager({
                    contentConnector: this.contentConnector,
                });
                this.viewport.setContentConnector(this.contentConnector);
                this.viewport.setViewStateManager(this.viewStateManager);
                this.animationPlayer = new sap_ui_vk_AnimationPlayer();
                this.animationPlayer.setViewStateManager(this.viewStateManager);
                this.animationPlayer.attachViewActivated(this.onViewActivated, this);
                this.animationPlayer.attachTimeChanged(this.onTimeChanged, this);
                this.viewManager = new sap_ui_vk_ViewManager({
                    contentConnector: this.contentConnector,
                    animationPlayer: this.animationPlayer,
                });
                this.viewStateManager.setViewManager(this.viewManager);
                this.viewStateManager.attachSelectionChanged(this.onSelectionChanged, this);
                this.viewStateManager.attachOutliningChanged(this.onOutliningChanged, this);
                this.drawerToolbar = new sap_ui_vk_DrawerToolbar({
                    viewport: this.viewport,
                    visible: false,
                });
                this.viewport.addDependent(this.drawerToolbar);
                subscriber.next();
                subscriber.complete();
            });
        });
    }
    getCSSPropertyValue(cssPropertyName) {
        const storefrontElement = document.getElementsByTagName('cx-storefront')[0];
        return getComputedStyle(storefrontElement).getPropertyValue(cssPropertyName);
    }
    getCSSColor(color) {
        return (this.getCSSPropertyValue(color) || color).trim();
    }
    resolveVisualization(productCode) {
        return this.visualizationLookupService
            .findMatchingVisualizations(productCode)
            .pipe(mergeMap((matches) => {
            let visualizationLoadInfo;
            switch (matches.length) {
                case 0:
                    visualizationLoadInfo = {
                        lookupResult: VisualizationLookupResult.NoMatchFound,
                        loadStatus: VisualizationLoadStatus.NotStarted,
                        matches,
                    };
                    break;
                case 1:
                    const matchingVisualization = matches[0];
                    this.sceneId = matchingVisualization.sceneId;
                    this.contentType = matchingVisualization.contentType;
                    visualizationLoadInfo = {
                        lookupResult: VisualizationLookupResult.UniqueMatchFound,
                        loadStatus: VisualizationLoadStatus.NotStarted,
                        matches,
                        visualization: matchingVisualization,
                    };
                    break;
                default:
                    visualizationLoadInfo = {
                        lookupResult: VisualizationLookupResult.MultipleMatchesFound,
                        loadStatus: VisualizationLoadStatus.NotStarted,
                        matches,
                    };
                    break;
            }
            this.setVisualizationLoadInfo(visualizationLoadInfo);
            return of(visualizationLoadInfo);
        }), catchError(() => {
            const visualizationLoadInfo = {
                lookupResult: VisualizationLookupResult.UnexpectedError,
                loadStatus: VisualizationLoadStatus.NotStarted,
            };
            this.setVisualizationLoadInfo(visualizationLoadInfo);
            return of(visualizationLoadInfo);
        }));
    }
    persistentIdToNodeRef(nodeIds, filterUnresolvedValues) {
        const nodeRefs = this.scene.persistentIdToNodeRef(nodeIds);
        return filterUnresolvedValues
            ? nodeRefs.filter((nodeRef) => !!nodeRef)
            : nodeRefs;
    }
    nodeRefToPersistentId(nodeRefs, filterUnresolvedValues) {
        const sids = this.scene.nodeRefToPersistentId(nodeRefs);
        return filterUnresolvedValues ? sids.filter((sid) => !!sid) : sids;
    }
    getViewStateManagerImplementation() {
        return this.viewStateManager.getImplementation();
    }
    handleSelectedNodeIds(nodeIds) {
        const nodeRefs = this.persistentIdToNodeRef(nodeIds, true);
        if (this.is2D) {
            this.handleSelectedNodes2D(nodeRefs);
        }
        else {
            this.handleSelectedNodes3D(nodeRefs);
        }
        if (this.isolateModeEnabled && nodeRefs.length > 0) {
            this.isolateNodes(nodeRefs);
        }
        // Need to ensure a frame render occurs since we are blocking events
        // when changing selection/outlining
        this.setShouldRenderFrame();
    }
    handleSelectedNodes2D(selectedNodes) {
        const existingSelection = [];
        this.viewStateManager.enumerateSelection((nodeRef) => existingSelection.push(nodeRef));
        this.viewStateManager.setSelectionStates([], existingSelection, false, true);
        this.viewStateManager.setSelectionStates(selectedNodes, [], false, true);
    }
    handleSelectedNodes3D(selectedNodes) {
        const existingOutlinedNodeRefs = [];
        this.viewStateManager.enumerateOutlinedNodes((nodeRef) => existingOutlinedNodeRefs.push(nodeRef));
        this.getViewStateManagerImplementation().setOutliningStates([], existingOutlinedNodeRefs, false, true);
        this.getViewStateManagerImplementation().setOutliningStates(selectedNodes, [], false, true);
    }
    setShouldRenderFrame() {
        this.viewport.setShouldRenderFrame();
    }
    is2DContentType(contentType) {
        return contentType === ContentType.Drawing2D;
    }
    loadScene(sceneId, contentType) {
        const epdVisualization = this.epdVisualizationConfig
            .epdVisualization;
        const visualizationApiConfig = epdVisualization.apis;
        if (this.viewportReady) {
            this.setViewportReady(false);
        }
        this.setIs2D(this.is2DContentType(contentType));
        return new Observable((subscriber) => {
            sap.ui.require(['sap/ui/vk/ContentResource'], (ContentResource) => {
                this.sceneLoadInfo$.next({
                    sceneLoadState: SceneLoadState.Loading,
                });
                this.viewport.setSelectionDisplayMode(this.is2D ? 'Highlight' : 'Outline');
                const baseUrl = visualizationApiConfig.baseUrl;
                const contentResource = new ContentResource({
                    useSecureConnection: false,
                    sourceType: this.is2D ? 'stream2d' : 'stream',
                    source: `${baseUrl}/vis/public/storage/v1`,
                    veid: sceneId,
                });
                this.contentChangesFinished
                    .pipe(first())
                    .subscribe((visualContentLoadFinished) => {
                    const succeeded = !!visualContentLoadFinished.content;
                    const sceneLoadInfo = succeeded
                        ? {
                            sceneLoadState: SceneLoadState.Loaded,
                            loadedSceneInfo: {
                                sceneId,
                                contentType,
                            },
                        }
                        : {
                            sceneLoadState: SceneLoadState.Failed,
                            errorMessage: visualContentLoadFinished.failureReason,
                        };
                    this.sceneLoadInfo$.next(sceneLoadInfo);
                    subscriber.next(sceneLoadInfo);
                    subscriber.complete();
                });
                this.contentLoadFinished.pipe(first()).subscribe(() => {
                    const sceneLoadInfo = this.sceneLoadInfo$.value;
                    if (sceneLoadInfo.sceneLoadState === SceneLoadState.Loaded) {
                        this.setViewportReady(true);
                        // Ensure that the spinner is hidden before the viewport becomes visible.
                        // Otherwise the position of the spinner changes
                        this.changeDetectorRef.detectChanges();
                        this.viewport.setVisible(true);
                    }
                });
                this.contentConnector.addContentResource(contentResource);
            });
        });
    }
    onSelectionChanged() {
        const nodeRefs = [];
        this.viewStateManager.enumerateSelection((nodeRef) => nodeRefs.push(nodeRef));
        const nodeIds = this.nodeRefToPersistentId(nodeRefs, true);
        this.sceneNodeToProductLookupService
            .lookupProductCodes(nodeIds)
            .pipe(first())
            .subscribe((productCodes) => {
            this.selectedProductCodesChange.emit(productCodes);
        });
    }
    onOutliningChanged() {
        const nodeRefs = [];
        this.viewStateManager.enumerateOutlinedNodes((nodeRef) => nodeRefs.push(nodeRef));
        const nodeIds = this.nodeRefToPersistentId(nodeRefs, true);
        this.sceneNodeToProductLookupService
            .lookupProductCodes(nodeIds)
            .pipe(first())
            .subscribe((productCodes) => {
            this.selectedProductCodesChange.emit(productCodes);
        });
    }
}
VisualViewerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerService, deps: [{ token: i1$1.EpdVisualizationConfig }, { token: i2$1.SceneNodeToProductLookupService }, { token: i2$1.VisualizationLookupService }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
VisualViewerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.EpdVisualizationConfig }, { type: i2$1.SceneNodeToProductLookupService }, { type: i2$1.VisualizationLookupService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i2.WindowRef }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VisualViewerComponent {
    constructor(visualViewerService) {
        this.visualViewerService = visualViewerService;
        this.selectedProductCodesChange = this.visualViewerService.selectedProductCodesChange;
        this.animationTimeChange = this.visualViewerService.animationTimeChange;
        this.animationPositionChange = this.visualViewerService.animationPositionChange;
        this.animationPlayingChange = this.visualViewerService.animationPlayingChange;
        this.isolateModeEnabledChange = this.visualViewerService.isolateModeEnabledChange;
        this.viewportReadyChange = this.visualViewerService.viewportReadyChange;
        // Provide access to enum types in template code
        this.SelectionMode = SelectionMode;
        this.NavigationMode = NavigationMode;
    }
    /**
     * The top colour of the background gradient.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-background' with the quotes.
     */
    set backgroundTopColor(backgroundTopColor) {
        this.visualViewerService.backgroundTopColor = backgroundTopColor;
    }
    get backgroundTopColor() {
        return this.visualViewerService.backgroundTopColor;
    }
    /**
     * The bottom colour of the background gradient.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-background' with the quotes.
     */
    set backgroundBottomColor(backgroundBottomColor) {
        this.visualViewerService.backgroundBottomColor = backgroundBottomColor;
    }
    get backgroundBottomColor() {
        return this.visualViewerService.backgroundBottomColor;
    }
    /**
     * The colour applied to selected 2D hotspots in 2D content.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
     */
    set hotspotSelectionColor(hotspotSelectionColor) {
        this.visualViewerService.hotspotSelectionColor = hotspotSelectionColor;
    }
    get hotspotSelectionColor() {
        return this.visualViewerService.hotspotSelectionColor;
    }
    /**
     * When true, all hotspots in 2D content that are included in the includedProductCodes property are highlighted using the colour specified by the showAllHotspotsColor property.
     */
    set showAllHotspotsEnabled(showAllHotspotsEnabled) {
        this.visualViewerService.showAllHotspotsEnabled = showAllHotspotsEnabled;
    }
    get showAllHotspotsEnabled() {
        return this.visualViewerService.showAllHotspotsEnabled;
    }
    /**
     * The colour used to highlight hotspots in 2D content when the showAllHotspotsEnabled property has a value of true.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
     */
    set showAllHotspotsColor(showAllHotspotsColor) {
        this.visualViewerService.showAllHotspotsColor = showAllHotspotsColor;
    }
    get showAllHotspotsColor() {
        return this.visualViewerService.showAllHotspotsColor;
    }
    /**
     * The outline colour used to indicate selected objects in 3D content.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
     */
    set outlineColor(outlineColor) {
        this.visualViewerService.outlineColor = outlineColor;
    }
    get outlineColor() {
        return this.visualViewerService.outlineColor;
    }
    /**
     * The width of the outline (in pixels) used to indicate selected objects in 3D content.
     */
    set outlineWidth(outlineWidth) {
        this.visualViewerService.outlineWidth = outlineWidth;
    }
    get outlineWidth() {
        return this.visualViewerService.outlineWidth;
    }
    /**
     * The selection mode.
     * None - Selection is disabled.
     * Exclusive - When selecting objects in the viewport, at most one object can be selected at a time. Clicking/tapping to select a new object will deselect any previously selected objects.
     * Sticky - A multiple selection mode in which clicking/tapping on an object that is not part of the current selection will toggle its selection state without modifying the selection state of the currently selected objects.
     */
    set selectionMode(selectionMode) {
        this.visualViewerService.selectionMode = selectionMode;
    }
    get selectionMode() {
        return this.visualViewerService.selectionMode;
    }
    /**
     * Gets/sets the selection in terms of product codes.
     * Gets the set of product codes applied to the selected scene nodes.
     * Sets the selection set based on the set of supplied product codes.
     */
    set selectedProductCodes(selectedProductCodes) {
        this.visualViewerService.selectedProductCodes = selectedProductCodes;
    }
    get selectedProductCodes() {
        return this.visualViewerService.selectedProductCodes;
    }
    /**
     * Gets/sets which objects should be selectable (in terms of product codes).
     * For 3D content:
     * - objects that are included will be selectable and opaque
     * - objects that are not included will not be selectable and will have an opacity specified by the excludedOpacity property.
     *
     * For 2D content:
     * - hotspots that are included will be selectable and can be made visible
     * - hotspots that are not included will not be selectable or visible
     */
    set includedProductCodes(includedProductCodes) {
        this.visualViewerService.includedProductCodes = includedProductCodes;
    }
    get includedProductCodes() {
        return this.visualViewerService.includedProductCodes;
    }
    /**
     *  Gets/sets the opacity to apply to 3D objects that are not in the set specified by the includedProductCodes property
     */
    set excludedOpacity(excludedOpacity) {
        this.visualViewerService.excludedOpacity = excludedOpacity;
    }
    get excludedOpacity() {
        return this.visualViewerService.excludedOpacity;
    }
    /**
     * The current time position in seconds in the animation (if there is one).
     */
    set animationTime(animationTime) {
        this.visualViewerService.animationTime = animationTime;
    }
    get animationTime() {
        return this.visualViewerService.animationTime;
    }
    /**
     * Gets the total duration of the animation (if there is one). A total duration of 0 indicates that there is no animation that can be played.
     */
    get animationTotalDuration() {
        return this.visualViewerService.animationTotalDuration;
    }
    /**
     *  The animation playback position as a fractional value between 0 (start) and 1 (end).
     */
    set animationPosition(animationPosition) {
        this.visualViewerService.animationPosition = animationPosition;
    }
    get animationPosition() {
        return this.visualViewerService.animationPosition;
    }
    /**
     * Gets/sets whether the animation (if there is one) is currently playing.
     */
    set animationPlaying(animationPlaying) {
        this.visualViewerService.animationPlaying = animationPlaying;
    }
    get animationPlaying() {
        return this.visualViewerService.animationPlaying;
    }
    /**
     * Controls the behaviour when a left mouse button drag is initiated in the viewport.
     * Turntable: A left mouse drag performs a turntable mode rotation.
     * Pan: A left mouse drag pans the camera in the viewport.
     * Zoom: A left mouse drag zooms the camera in the viewport in or out
     */
    set navigationMode(navigationMode) {
        this.visualViewerService.navigationMode = navigationMode;
    }
    get navigationMode() {
        return this.visualViewerService.navigationMode;
    }
    /**
     * Isolate mode allows a single object to be viewed in isolation.
     */
    set isolateModeEnabled(isolateModeEnabled) {
        this.visualViewerService.isolateModeEnabled = isolateModeEnabled;
    }
    get isolateModeEnabled() {
        return this.visualViewerService.isolateModeEnabled;
    }
    /**
     * Gets whether the viewport is displaying 2D content.
     */
    get is2D() {
        return this.visualViewerService.is2D;
    }
    /**
     * Indicates that a scene has been loaded and the viewport is ready for interaction.
     */
    get viewportReady() {
        return this.visualViewerService.viewportReady;
    }
    /**
     * Returns the user to the initial camera position used when a scene was first loaded.
     */
    activateHomeView() {
        this.visualViewerService.activateHomeView();
    }
    /**
     * Plays the animation (if one exists).
     */
    playAnimation() {
        this.visualViewerService.playAnimation();
    }
    /**
     * Pauses animation playback.
     */
    pauseAnimation() {
        this.visualViewerService.pauseAnimation();
    }
    /**
     * Loads the visualization specified by the product code.
     * @param productCode The product code of the visualization to load.
     * @returns An observable that returns a single VisualizationLoadInfo value.
     */
    loadVisualization(productCode) {
        return this.visualViewerService.loadVisualization(productCode);
    }
}
VisualViewerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerComponent, deps: [{ token: VisualViewerService }], target: i0.ɵɵFactoryTarget.Component });
VisualViewerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: VisualViewerComponent, selector: "cx-epd-visualization-viewer", inputs: { backgroundTopColor: "backgroundTopColor", backgroundBottomColor: "backgroundBottomColor", hotspotSelectionColor: "hotspotSelectionColor", showAllHotspotsEnabled: "showAllHotspotsEnabled", showAllHotspotsColor: "showAllHotspotsColor", outlineColor: "outlineColor", outlineWidth: "outlineWidth", selectionMode: "selectionMode", selectedProductCodes: "selectedProductCodes", includedProductCodes: "includedProductCodes", excludedOpacity: "excludedOpacity", animationTime: "animationTime", animationPosition: "animationPosition", animationPlaying: "animationPlaying", navigationMode: "navigationMode", isolateModeEnabled: "isolateModeEnabled" }, outputs: { selectedProductCodesChange: "selectedProductCodesChange", animationTimeChange: "animationTimeChange", animationPositionChange: "animationPositionChange", animationPlayingChange: "animationPlayingChange", isolateModeEnabledChange: "isolateModeEnabledChange", viewportReadyChange: "viewportReadyChange" }, providers: [VisualViewerService], ngImport: i0, template: "<ng-container *ngIf=\"viewportReady; else loading\">\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n  <div class=\"content-type-symbol\" [hidden]=\"!viewportReady\">\n    <span class=\"content-type-text\">{{\n      (is2D\n        ? 'epdVisualization.visualViewer.contentType.drawing2D'\n        : 'epdVisualization.visualViewer.contentType.model3D'\n      ) | cxTranslate\n    }}</span>\n  </div>\n\n  <div class=\"bottom overlay\">\n    <div [hidden]=\"!viewportReady\" class=\"toolbar\">\n      <div class=\"toolbarHBox\">\n        <div class=\"toolbarButtonsHBox\">\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"homeButton\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-home\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.homeButton.label'\n                | cxTranslate\n            }}\"\n            (click)=\"activateHomeView()\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"turntableButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-sync-alt\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.rotateButton.label'\n                | cxTranslate\n            }}\"\n            [hidden]=\"is2D\"\n            (click)=\"navigationMode = NavigationMode.Turntable\"\n            [checked]=\"navigationMode === NavigationMode.Turntable\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"panButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-arrows-alt\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.panButton.label'\n                | cxTranslate\n            }}\"\n            (click)=\"navigationMode = NavigationMode.Pan\"\n            [checked]=\"navigationMode === NavigationMode.Pan\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"zoomButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-search\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.zoomButton.label'\n                | cxTranslate\n            }}\"\n            (click)=\"navigationMode = NavigationMode.Zoom\"\n            [checked]=\"navigationMode === NavigationMode.Zoom\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"isolateButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            [hidden]=\"is2D\"\n            [disabled]=\"\n              !isolateModeEnabled && selectedProductCodes?.length === 0\n            \"\n            iconClass=\"fa-compress\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.isolateButton.label'\n                | cxTranslate\n            }}\"\n            (click)=\"isolateModeEnabled = !isolateModeEnabled\"\n            [checked]=\"isolateModeEnabled\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"playPauseButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"{{ animationPlaying ? 'fa-pause' : 'fa-play' }}\"\n            text=\"{{\n              (animationPlaying\n                ? 'epdVisualization.visualViewer.toolbar.pauseButton.label'\n                : 'epdVisualization.visualViewer.toolbar.playButton.label'\n              ) | cxTranslate\n            }}\"\n            [hidden]=\"is2D || animationTotalDuration <= 0\"\n            [disabled]=\"isolateModeEnabled\"\n            (click)=\"animationPlaying ? pauseAnimation() : playAnimation()\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"showAllHotpotsButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-highlighter\"\n            text=\"{{\n              (showAllHotspotsEnabled\n                ? 'epdVisualization.visualViewer.toolbar.hotspotsButton.hide'\n                : 'epdVisualization.visualViewer.toolbar.hotspotsButton.show'\n              ) | cxTranslate\n            }}\"\n            [checked]=\"showAllHotspotsEnabled\"\n            [hidden]=\"!is2D\"\n            (click)=\"showAllHotspotsEnabled = !showAllHotspotsEnabled\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n        </div>\n\n        <div [hidden]=\"is2D || animationTotalDuration <= 0\">\n          <cx-epd-visualization-animation-slider\n            [disabled]=\"isolateModeEnabled\"\n            [(value)]=\"animationPosition\"\n            (keydown.enter)=\"\n              animationPlaying ? pauseAnimation() : playAnimation();\n              $event.preventDefault()\n            \"\n            (keydown.space)=\"\n              animationPlaying ? pauseAnimation() : playAnimation();\n              $event.preventDefault()\n            \"\n          ></cx-epd-visualization-animation-slider>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: VisualViewerToolbarButtonComponent, selector: "cx-epd-visualization-viewer-toolbar-button", inputs: ["text", "iconLibraryClass", "iconClass", "disabled", "checked"] }, { kind: "component", type: VisualViewerAnimationSliderComponent, selector: "cx-epd-visualization-animation-slider", inputs: ["hidden", "value", "disabled"], outputs: ["valueChange", "initializedChange"] }, { kind: "component", type: i1.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-epd-visualization-viewer', providers: [VisualViewerService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"viewportReady; else loading\">\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n  <div class=\"content-type-symbol\" [hidden]=\"!viewportReady\">\n    <span class=\"content-type-text\">{{\n      (is2D\n        ? 'epdVisualization.visualViewer.contentType.drawing2D'\n        : 'epdVisualization.visualViewer.contentType.model3D'\n      ) | cxTranslate\n    }}</span>\n  </div>\n\n  <div class=\"bottom overlay\">\n    <div [hidden]=\"!viewportReady\" class=\"toolbar\">\n      <div class=\"toolbarHBox\">\n        <div class=\"toolbarButtonsHBox\">\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"homeButton\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-home\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.homeButton.label'\n                | cxTranslate\n            }}\"\n            (click)=\"activateHomeView()\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"turntableButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-sync-alt\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.rotateButton.label'\n                | cxTranslate\n            }}\"\n            [hidden]=\"is2D\"\n            (click)=\"navigationMode = NavigationMode.Turntable\"\n            [checked]=\"navigationMode === NavigationMode.Turntable\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"panButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-arrows-alt\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.panButton.label'\n                | cxTranslate\n            }}\"\n            (click)=\"navigationMode = NavigationMode.Pan\"\n            [checked]=\"navigationMode === NavigationMode.Pan\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"zoomButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-search\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.zoomButton.label'\n                | cxTranslate\n            }}\"\n            (click)=\"navigationMode = NavigationMode.Zoom\"\n            [checked]=\"navigationMode === NavigationMode.Zoom\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"isolateButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            [hidden]=\"is2D\"\n            [disabled]=\"\n              !isolateModeEnabled && selectedProductCodes?.length === 0\n            \"\n            iconClass=\"fa-compress\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.isolateButton.label'\n                | cxTranslate\n            }}\"\n            (click)=\"isolateModeEnabled = !isolateModeEnabled\"\n            [checked]=\"isolateModeEnabled\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"playPauseButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"{{ animationPlaying ? 'fa-pause' : 'fa-play' }}\"\n            text=\"{{\n              (animationPlaying\n                ? 'epdVisualization.visualViewer.toolbar.pauseButton.label'\n                : 'epdVisualization.visualViewer.toolbar.playButton.label'\n              ) | cxTranslate\n            }}\"\n            [hidden]=\"is2D || animationTotalDuration <= 0\"\n            [disabled]=\"isolateModeEnabled\"\n            (click)=\"animationPlaying ? pauseAnimation() : playAnimation()\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"showAllHotpotsButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-highlighter\"\n            text=\"{{\n              (showAllHotspotsEnabled\n                ? 'epdVisualization.visualViewer.toolbar.hotspotsButton.hide'\n                : 'epdVisualization.visualViewer.toolbar.hotspotsButton.show'\n              ) | cxTranslate\n            }}\"\n            [checked]=\"showAllHotspotsEnabled\"\n            [hidden]=\"!is2D\"\n            (click)=\"showAllHotspotsEnabled = !showAllHotspotsEnabled\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n        </div>\n\n        <div [hidden]=\"is2D || animationTotalDuration <= 0\">\n          <cx-epd-visualization-animation-slider\n            [disabled]=\"isolateModeEnabled\"\n            [(value)]=\"animationPosition\"\n            (keydown.enter)=\"\n              animationPlaying ? pauseAnimation() : playAnimation();\n              $event.preventDefault()\n            \"\n            (keydown.space)=\"\n              animationPlaying ? pauseAnimation() : playAnimation();\n              $event.preventDefault()\n            \"\n          ></cx-epd-visualization-animation-slider>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: VisualViewerService }]; }, propDecorators: { backgroundTopColor: [{
                type: Input
            }], backgroundBottomColor: [{
                type: Input
            }], hotspotSelectionColor: [{
                type: Input
            }], showAllHotspotsEnabled: [{
                type: Input
            }], showAllHotspotsColor: [{
                type: Input
            }], outlineColor: [{
                type: Input
            }], outlineWidth: [{
                type: Input
            }], selectionMode: [{
                type: Input
            }], selectedProductCodes: [{
                type: Input
            }], selectedProductCodesChange: [{
                type: Output
            }], includedProductCodes: [{
                type: Input
            }], excludedOpacity: [{
                type: Input
            }], animationTime: [{
                type: Input
            }], animationTimeChange: [{
                type: Output
            }], animationPosition: [{
                type: Input
            }], animationPositionChange: [{
                type: Output
            }], animationPlaying: [{
                type: Input
            }], animationPlayingChange: [{
                type: Output
            }], navigationMode: [{
                type: Input
            }], isolateModeEnabled: [{
                type: Input
            }], isolateModeEnabledChange: [{
                type: Output
            }], viewportReadyChange: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VisualViewerModule {
}
VisualViewerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VisualViewerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerModule, declarations: [VisualViewerComponent], imports: [CommonModule,
        RouterModule,
        I18nModule,
        VisualViewerToolbarButtonModule,
        VisualViewerAnimationSliderModule,
        SpinnerModule], exports: [VisualViewerComponent] });
VisualViewerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerModule, imports: [CommonModule,
        RouterModule,
        I18nModule,
        VisualViewerToolbarButtonModule,
        VisualViewerAnimationSliderModule,
        SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        I18nModule,
                        VisualViewerToolbarButtonModule,
                        VisualViewerAnimationSliderModule,
                        SpinnerModule,
                    ],
                    declarations: [VisualViewerComponent],
                    exports: [VisualViewerComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VisualPickingProductFilterService {
    constructor() {
        this._filter = '';
        this.filter$ = new EventEmitter();
        /**
         * The set of fields in product objects to perform matching against.
         */
        this.fieldsToMatch = ['code', 'name'];
        // Intentional empty constructor
    }
    /**
     * The current filter value.
     * @param filter The filter value to apply.
     */
    set filter(filterStr) {
        if (this._filter === filterStr) {
            return;
        }
        this._filter = filterStr;
        this.filter$.emit(filterStr);
    }
    get filter() {
        return this._filter;
    }
    applyFilter(filterToApply, unfilteredProductReferences) {
        filterToApply = filterToApply.toLowerCase();
        const filteredProductReferences = unfilteredProductReferences.filter((productReference) => {
            const product = productReference.target;
            return this.fieldsToMatch.some((field) => {
                const fieldValue = product[field];
                return (fieldValue !== undefined &&
                    fieldValue.toLowerCase().indexOf(filterToApply) !== -1);
            });
        });
        return filteredProductReferences;
    }
    /**
     * Returns an Observable that produces a ProductReference[] each time the filter is updated or the set of product references to filter changes.
     * @param unfilteredProductReferences$ An Observable that returns the unfiltered ProductReference[] to apply filtering to.
     * @returns An Observable that produces a ProductReference[] each time the filter is updated or the set of product references to filter changes.
     */
    getFilteredProducts(unfilteredProductReferences$) {
        return combineLatest([
            concat(of(''), this.filter$),
            unfilteredProductReferences$,
        ]).pipe(filter(([filterStr, productReferences]) => filterStr !== undefined && productReferences !== undefined), map(([filterToApply, productReferences]) => this.applyFilter(filterToApply, productReferences)));
    }
}
VisualPickingProductFilterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductFilterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
VisualPickingProductFilterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductFilterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductFilterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VisualPickingProductFilterComponent {
    constructor(visualPickingProductFilterService) {
        this.visualPickingProductFilterService = visualPickingProductFilterService;
        this.iconTypes = ICON_TYPE;
    }
    /**
     * The filter input value.
     */
    set filter(filter) {
        this.visualPickingProductFilterService.filter = filter;
    }
    get filter() {
        return this.visualPickingProductFilterService.filter;
    }
}
VisualPickingProductFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductFilterComponent, deps: [{ token: VisualPickingProductFilterService }], target: i0.ɵɵFactoryTarget.Component });
VisualPickingProductFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: VisualPickingProductFilterComponent, selector: "cx-epd-visualization-product-filter", inputs: { filter: "filter" }, ngImport: i0, template: "<div class=\"form-group search-wrapper\">\n  <input\n    type=\"text\"\n    [(ngModel)]=\"filter\"\n    class=\"form-control\"\n    placeholder=\"{{\n      'epdVisualization.visualPicking.visualPickingProductFilter.input.placeholder'\n        | cxTranslate\n    }}\"\n  />\n\n  <cx-icon\n    [type]=\"iconTypes.SEARCH\"\n    [attr.aria-label]=\"\n      'epdVisualization.visualPicking.visualPickingProductFilter.searchButton.label'\n        | cxTranslate\n    \"\n    class=\"search\"\n    [hidden]=\"filter.length > 0\"\n  ></cx-icon>\n\n  <cx-icon\n    [type]=\"iconTypes.RESET\"\n    [attr.aria-label]=\"\n      'epdVisualization.visualPicking.visualPickingProductFilter.resetButton.label'\n        | cxTranslate\n    \"\n    (mousedown)=\"filter = ''\"\n    (keydown.enter)=\"filter = ''\"\n    [hidden]=\"filter.length === 0\"\n    class=\"reset\"\n    tabindex=\"0\"\n  ></cx-icon>\n</div>\n", dependencies: [{ kind: "directive", type: i2$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductFilterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-epd-visualization-product-filter', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"form-group search-wrapper\">\n  <input\n    type=\"text\"\n    [(ngModel)]=\"filter\"\n    class=\"form-control\"\n    placeholder=\"{{\n      'epdVisualization.visualPicking.visualPickingProductFilter.input.placeholder'\n        | cxTranslate\n    }}\"\n  />\n\n  <cx-icon\n    [type]=\"iconTypes.SEARCH\"\n    [attr.aria-label]=\"\n      'epdVisualization.visualPicking.visualPickingProductFilter.searchButton.label'\n        | cxTranslate\n    \"\n    class=\"search\"\n    [hidden]=\"filter.length > 0\"\n  ></cx-icon>\n\n  <cx-icon\n    [type]=\"iconTypes.RESET\"\n    [attr.aria-label]=\"\n      'epdVisualization.visualPicking.visualPickingProductFilter.resetButton.label'\n        | cxTranslate\n    \"\n    (mousedown)=\"filter = ''\"\n    (keydown.enter)=\"filter = ''\"\n    [hidden]=\"filter.length === 0\"\n    class=\"reset\"\n    tabindex=\"0\"\n  ></cx-icon>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: VisualPickingProductFilterService }]; }, propDecorators: { filter: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VisualPickingProductFilterModule {
}
VisualPickingProductFilterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VisualPickingProductFilterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductFilterModule, declarations: [VisualPickingProductFilterComponent], imports: [CommonModule, FormsModule, IconModule, UrlModule, I18nModule], exports: [VisualPickingProductFilterComponent] });
VisualPickingProductFilterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductFilterModule, providers: [VisualPickingProductFilterService], imports: [CommonModule, FormsModule, IconModule, UrlModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule, IconModule, UrlModule, I18nModule],
                    providers: [VisualPickingProductFilterService],
                    declarations: [VisualPickingProductFilterComponent],
                    exports: [VisualPickingProductFilterComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CompactAddToCartComponent extends AddToCartComponent {
}
CompactAddToCartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CompactAddToCartComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
CompactAddToCartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CompactAddToCartComponent, selector: "cx-epd-visualization-compact-add-to-cart", usesInheritance: true, ngImport: i0, template: "<form *ngIf=\"productCode\" [formGroup]=\"addToCartForm\" (submit)=\"addToCart()\">\n  <button\n    *ngIf=\"hasStock\"\n    class=\"btn btn-sm btn-primary btn-block\"\n    type=\"submit\"\n    [disabled]=\"quantity <= 0 || quantity > maxQuantity\"\n  >\n    <cx-icon class=\"fa fa-cart-plus\"></cx-icon>\n  </button>\n</form>\n", dependencies: [{ kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2$2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2$2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CompactAddToCartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-epd-visualization-compact-add-to-cart', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form *ngIf=\"productCode\" [formGroup]=\"addToCartForm\" (submit)=\"addToCart()\">\n  <button\n    *ngIf=\"hasStock\"\n    class=\"btn btn-sm btn-primary btn-block\"\n    type=\"submit\"\n    [disabled]=\"quantity <= 0 || quantity > maxQuantity\"\n  >\n    <cx-icon class=\"fa fa-cart-plus\"></cx-icon>\n  </button>\n</form>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CompactAddToCartModule {
}
CompactAddToCartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CompactAddToCartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CompactAddToCartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CompactAddToCartModule, declarations: [CompactAddToCartComponent], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        SpinnerModule,
        PromotionsModule,
        FeaturesConfigModule,
        UrlModule,
        IconModule,
        I18nModule,
        ItemCounterModule], exports: [CompactAddToCartComponent] });
CompactAddToCartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CompactAddToCartModule, imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        SpinnerModule,
        PromotionsModule,
        FeaturesConfigModule,
        UrlModule,
        IconModule,
        I18nModule,
        ItemCounterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CompactAddToCartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        RouterModule,
                        SpinnerModule,
                        PromotionsModule,
                        FeaturesConfigModule,
                        UrlModule,
                        IconModule,
                        I18nModule,
                        ItemCounterModule,
                    ],
                    declarations: [CompactAddToCartComponent],
                    exports: [CompactAddToCartComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Generic in-memory paged list component that can be used to render arbitrary items in
 * a vertical orientation.
 * Previous/next buttons as well as indicator-buttons can used to navigate the slides (pages).
 *
 * To allow for flexible rendering of items, the rendering is delegated to the
 * given `template` and `headerTemplate`.
 */
class PagedListComponent {
    setActiveSlideStartIndex(activeSlideStartIndex) {
        this.activeSlideStartIndex = activeSlideStartIndex;
        this.activeSlideStartIndexChange.emit(activeSlideStartIndex);
    }
    constructor(el) {
        this.el = el;
        /**
         * The maximum number of items per slide
         */
        this.itemsPerSlide = 10;
        /**
         * Indicates whether the visual indicators are used.
         */
        this.hideIndicators = false;
        this.indicatorIcon = ICON_TYPE.CIRCLE;
        this.previousIcon = ICON_TYPE.CARET_LEFT;
        this.nextIcon = ICON_TYPE.CARET_RIGHT;
        this.activeSlideStartIndex = 0;
        this.activeSlideStartIndexChange = new EventEmitter();
        this.logger = inject(LoggerService);
    }
    ngOnInit() {
        if (!this.headerTemplate) {
            this.logger.error('No template reference provided to render the header for the `cx-epd-visualization-paged-list`');
            return;
        }
        if (!this.template) {
            this.logger.error('No template reference provided to render the items for the `cx-epd-visualization-paged-list`');
            return;
        }
    }
}
PagedListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PagedListComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
PagedListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: PagedListComponent, selector: "cx-epd-visualization-paged-list", inputs: { title: "title", items: "items", headerTemplate: "headerTemplate", template: "template", itemsPerSlide: "itemsPerSlide", hideIndicators: "hideIndicators", indicatorIcon: "indicatorIcon", previousIcon: "previousIcon", nextIcon: "nextIcon", activeSlideStartIndex: "activeSlideStartIndex" }, outputs: { activeSlideStartIndexChange: "activeSlideStartIndexChange" }, ngImport: i0, template: "<ng-container *ngIf=\"items?.length > 0 && itemsPerSlide\">\n  <h3 *ngIf=\"title\">{{ title }}</h3>\n\n  <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n\n  <div class=\"list-panel\">\n    <div class=\"slides\">\n      <ng-container *ngFor=\"let _ of items; let i = index\">\n        <div\n          class=\"slide\"\n          *ngIf=\"i % itemsPerSlide === 0\"\n          [class.active]=\"i === activeSlideStartIndex\"\n        >\n          <ng-container\n            *ngFor=\"\n              let item of items | slice: i:i + itemsPerSlide;\n              let j = index\n            \"\n          >\n            <div\n              *ngIf=\"item as data\"\n              class=\"item\"\n              [class.active]=\"i === activeSlideStartIndex\"\n            >\n              <ng-container\n                *ngTemplateOutlet=\"\n                  template;\n                  context: {\n                    item: data,\n                    active: i === activeSlideStartIndex\n                  }\n                \"\n              ></ng-container>\n            </div>\n          </ng-container>\n        </div>\n      </ng-container>\n    </div>\n  </div>\n\n  <div\n    *ngIf=\"!hideIndicators && itemsPerSlide < items.length\"\n    class=\"indicators\"\n  >\n    <button\n      *ngIf=\"itemsPerSlide < items.length\"\n      class=\"previous\"\n      (click)=\"setActiveSlideStartIndex(activeSlideStartIndex - itemsPerSlide)\"\n      [disabled]=\"activeSlideStartIndex === 0\"\n    >\n      <cx-icon [type]=\"previousIcon\"></cx-icon>\n    </button>\n\n    <ng-container *ngFor=\"let _ of items; let i = index\">\n      <button\n        *ngIf=\"i % itemsPerSlide === 0\"\n        (click)=\"setActiveSlideStartIndex(i)\"\n        [disabled]=\"i === activeSlideStartIndex\"\n        class=\"slide-indicator\"\n      >\n        <cx-icon [type]=\"indicatorIcon\"></cx-icon>\n      </button>\n    </ng-container>\n\n    <button\n      *ngIf=\"itemsPerSlide < items.length\"\n      class=\"next\"\n      (click)=\"setActiveSlideStartIndex(activeSlideStartIndex + itemsPerSlide)\"\n      [disabled]=\"activeSlideStartIndex > items.length - itemsPerSlide - 1\"\n    >\n      <cx-icon [type]=\"nextIcon\"></cx-icon>\n    </button>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i1$2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i1$2.SlicePipe, name: "slice" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PagedListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-epd-visualization-paged-list', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"items?.length > 0 && itemsPerSlide\">\n  <h3 *ngIf=\"title\">{{ title }}</h3>\n\n  <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n\n  <div class=\"list-panel\">\n    <div class=\"slides\">\n      <ng-container *ngFor=\"let _ of items; let i = index\">\n        <div\n          class=\"slide\"\n          *ngIf=\"i % itemsPerSlide === 0\"\n          [class.active]=\"i === activeSlideStartIndex\"\n        >\n          <ng-container\n            *ngFor=\"\n              let item of items | slice: i:i + itemsPerSlide;\n              let j = index\n            \"\n          >\n            <div\n              *ngIf=\"item as data\"\n              class=\"item\"\n              [class.active]=\"i === activeSlideStartIndex\"\n            >\n              <ng-container\n                *ngTemplateOutlet=\"\n                  template;\n                  context: {\n                    item: data,\n                    active: i === activeSlideStartIndex\n                  }\n                \"\n              ></ng-container>\n            </div>\n          </ng-container>\n        </div>\n      </ng-container>\n    </div>\n  </div>\n\n  <div\n    *ngIf=\"!hideIndicators && itemsPerSlide < items.length\"\n    class=\"indicators\"\n  >\n    <button\n      *ngIf=\"itemsPerSlide < items.length\"\n      class=\"previous\"\n      (click)=\"setActiveSlideStartIndex(activeSlideStartIndex - itemsPerSlide)\"\n      [disabled]=\"activeSlideStartIndex === 0\"\n    >\n      <cx-icon [type]=\"previousIcon\"></cx-icon>\n    </button>\n\n    <ng-container *ngFor=\"let _ of items; let i = index\">\n      <button\n        *ngIf=\"i % itemsPerSlide === 0\"\n        (click)=\"setActiveSlideStartIndex(i)\"\n        [disabled]=\"i === activeSlideStartIndex\"\n        class=\"slide-indicator\"\n      >\n        <cx-icon [type]=\"indicatorIcon\"></cx-icon>\n      </button>\n    </ng-container>\n\n    <button\n      *ngIf=\"itemsPerSlide < items.length\"\n      class=\"next\"\n      (click)=\"setActiveSlideStartIndex(activeSlideStartIndex + itemsPerSlide)\"\n      [disabled]=\"activeSlideStartIndex > items.length - itemsPerSlide - 1\"\n    >\n      <cx-icon [type]=\"nextIcon\"></cx-icon>\n    </button>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { title: [{
                type: Input
            }], items: [{
                type: Input
            }], headerTemplate: [{
                type: Input
            }], template: [{
                type: Input
            }], itemsPerSlide: [{
                type: Input
            }], hideIndicators: [{
                type: Input
            }], indicatorIcon: [{
                type: Input
            }], previousIcon: [{
                type: Input
            }], nextIcon: [{
                type: Input
            }], activeSlideStartIndex: [{
                type: Input
            }], activeSlideStartIndexChange: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PagedListModule {
}
PagedListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PagedListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PagedListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PagedListModule, declarations: [PagedListComponent], imports: [CommonModule, RouterModule, IconModule, MediaModule, UrlModule], exports: [PagedListComponent] });
PagedListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PagedListModule, imports: [CommonModule, RouterModule, IconModule, MediaModule, UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PagedListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, IconModule, MediaModule, UrlModule],
                    declarations: [PagedListComponent],
                    exports: [PagedListComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VisualPickingProductListService {
    constructor(currentProductService, productReferenceService, visualPickingProductFilterService, epdVisualizationConfig) {
        this.currentProductService = currentProductService;
        this.productReferenceService = productReferenceService;
        this.visualPickingProductFilterService = visualPickingProductFilterService;
        this.epdVisualizationConfig = epdVisualizationConfig;
        this.DEFAULT_ITEMS_PER_SLIDE = 7;
        this.currentProduct$ = this.currentProductService
            .getProduct()
            .pipe(filter((product) => !!product && !!product.code), map((product) => product), distinctUntilChanged((p1, p2) => p1.code === p2.code));
        this.productReferences$ = new Subject();
        this.activeSlideStartIndex = 0;
        this.itemsPerSlide = this.DEFAULT_ITEMS_PER_SLIDE;
        this.selectedProductCodesChange = new EventEmitter();
        this.filteredItems$ = this.getVisualPickingProductListItems(this.getFilteredProductReferences(), this.selectedProductCodesChange).pipe(shareReplay());
    }
    /**
     * Initializes the service.
     */
    initialize() {
        this.getFilteredProductReferencesSubscription =
            this.getFilteredProductReferences().subscribe(() => {
                this.activeSlideStartIndex = 0;
            });
        this.visualPickingProductFilterService.filter = '';
        this.filteredItemsSubscription = this.filteredItems$.subscribe((items) => {
            const firstSelectedItemIndex = items.findIndex((item) => item.selected);
            if (firstSelectedItemIndex !== -1) {
                this.activeSlideStartIndex =
                    firstSelectedItemIndex -
                        (firstSelectedItemIndex % this.itemsPerSlide);
            }
        });
        this.selectedProductCodes = [];
        this.productReferencesSubscription = this._getProductReferences().subscribe(this.productReferences$);
    }
    ngOnDestroy() {
        this.getFilteredProductReferencesSubscription?.unsubscribe();
        this.filteredItemsSubscription?.unsubscribe();
        this.productReferencesSubscription?.unsubscribe();
    }
    get productReferenceType() {
        const epdVisualization = this.epdVisualizationConfig
            .epdVisualization;
        const visualPickingConfig = epdVisualization.visualPicking;
        return visualPickingConfig.productReferenceType;
    }
    /**
     * Returns an Observable that produces the spare part product references for the current product.
     * @returns An Observable that produces the spare part product references for the current product.
     */
    getProductReferences() {
        return this.productReferences$;
    }
    _getProductReferences() {
        return this.currentProduct$.pipe(tap((product) => this.productReferenceService.loadProductReferences(product.code, this.productReferenceType)), switchMap((product) => this.productReferenceService.getProductReferences(product.code, this.productReferenceType)), filter((productReferences) => productReferences !== undefined));
    }
    /**
     * Returns an Observable that produces a filtered array of spare part product references for the current product.
     * Filtering is performed by the VisualPickingProductFilterService.
     * @returns An Observable that produces a filtered array of spare part product references for the current product.
     */
    getFilteredProductReferences() {
        return this.visualPickingProductFilterService
            .getFilteredProducts(this.getProductReferences())
            .pipe(shareReplay());
    }
    set selectedProductCodes(selectedProductCodes) {
        this._selectedProductCodes = selectedProductCodes;
        this.selectedProductCodesChange.next(selectedProductCodes);
    }
    get selectedProductCodes() {
        return this._selectedProductCodes;
    }
    /**
     * Used to create the list item model data for the visual picking product list.
     * Returns an observable containing an array of VisualPickingProductListItem objects created by combining the latest values from
     * an Observable producing an array of product references and
     * an Observable producing an array of selected product codes.
     * The VisualPickingProductListItem model object combines a ProductReference for a spare part and the selected state of the list item.
     * @param productReferences$ An Observable producing the array of ProductReference values to map.
     * @param selectedProductCodes$ An Observable producing the array of selected product codes.
     * @returns An Observable producing an array of VisualPickingProductListItem values.
     */
    getVisualPickingProductListItems(productReferences$, selectedProductCodes$) {
        return combineLatest([productReferences$, selectedProductCodes$]).pipe(filter(([productReferences, selectedProductCodes]) => !!productReferences && !!selectedProductCodes), map(([productReferences, selectedProductCodes]) => {
            return productReferences
                .filter((productReference) => !!productReference.target && !!productReference.target.code)
                .map((productReference) => {
                const product = productReference.target;
                const productCode = product.code;
                const selected = selectedProductCodes.indexOf(productCode) !== -1;
                return {
                    product,
                    selected,
                };
            });
        }));
    }
}
VisualPickingProductListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductListService, deps: [{ token: i1.CurrentProductService }, { token: i2.ProductReferenceService }, { token: VisualPickingProductFilterService }, { token: i1$1.EpdVisualizationConfig }], target: i0.ɵɵFactoryTarget.Injectable });
VisualPickingProductListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CurrentProductService }, { type: i2.ProductReferenceService }, { type: VisualPickingProductFilterService }, { type: i1$1.EpdVisualizationConfig }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VisualPickingProductListComponent {
    constructor(visualPickingProductListService) {
        this.visualPickingProductListService = visualPickingProductListService;
        this.singleSelection = true;
        this.selectedProductCodesChange = this.visualPickingProductListService.selectedProductCodesChange;
    }
    set selectedProductCodes(selectedProductCodes) {
        this.visualPickingProductListService.selectedProductCodes =
            selectedProductCodes;
    }
    get selectedProductCodes() {
        return this.visualPickingProductListService.selectedProductCodes;
    }
    get itemsPerSlide() {
        return this.visualPickingProductListService.itemsPerSlide;
    }
    set itemsPerSlide(itemsPerSlide) {
        this.visualPickingProductListService.itemsPerSlide = itemsPerSlide;
    }
    get activeSlideStartIndex() {
        return this.visualPickingProductListService.activeSlideStartIndex;
    }
    set activeSlideStartIndex(activeSlideStartIndex) {
        this.visualPickingProductListService.activeSlideStartIndex =
            activeSlideStartIndex;
    }
    get filteredItems$() {
        return this.visualPickingProductListService.filteredItems$;
    }
    ngOnInit() {
        this.visualPickingProductListService.initialize();
    }
}
VisualPickingProductListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductListComponent, deps: [{ token: VisualPickingProductListService }], target: i0.ɵɵFactoryTarget.Component });
VisualPickingProductListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: VisualPickingProductListComponent, selector: "cx-epd-visualization-product-list", inputs: { title: "title", singleSelection: "singleSelection", selectedProductCodes: "selectedProductCodes" }, outputs: { selectedProductCodesChange: "selectedProductCodesChange" }, providers: [VisualPickingProductListService], ngImport: i0, template: "<cx-epd-visualization-paged-list\n  [items]=\"filteredItems$ | async\"\n  [title]=\"title\"\n  [headerTemplate]=\"headerTemplate\"\n  [template]=\"itemTemplate\"\n  [itemsPerSlide]=\"itemsPerSlide\"\n  [(activeSlideStartIndex)]=\"activeSlideStartIndex\"\n>\n</cx-epd-visualization-paged-list>\n\n<ng-template #headerTemplate>\n  <div class=\"cx-item-list-header row\">\n    <div class=\"cx-item-list-desc col-6\">\n      {{\n        'epdVisualization.visualPicking.visualPickingProductList.description'\n          | cxTranslate\n      }}\n    </div>\n    <div class=\"cx-item-list-price col-4\">\n      {{\n        'epdVisualization.visualPicking.visualPickingProductList.itemPrice'\n          | cxTranslate\n      }}\n    </div>\n    <!-- Add to cart -->\n    <div class=\"cx-item-list-total col-2\"></div>\n  </div>\n</ng-template>\n\n<ng-template #itemTemplate let-item=\"item\" let-active=\"active\">\n  <div\n    *ngIf=\"active\"\n    class=\"row no-gutters list-item\"\n    tabindex=\"0\"\n    (click)=\"selectedProductCodes = [item.product.code]\"\n    (keydown.enter)=\"selectedProductCodes = [item.product.code]\"\n    (keydown.space)=\"selectedProductCodes = [item.product.code]\"\n    [class.selected]=\"item.selected\"\n  >\n    <!-- Item Description -->\n    <div class=\"col-6 flex-row\">\n      <!-- Thumbnail -->\n      <div class=\"thumbnail-container\">\n        <div class=\"thumbnail\" [class.selected]=\"item.selected\">\n          <cx-media\n            [container]=\"item.product.images?.PRIMARY\"\n            format=\"thumbnail\"\n          ></cx-media>\n        </div>\n      </div>\n\n      <!-- Name -->\n      <div class=\"flex-column\">\n        <div *ngIf=\"item.product.name\" class=\"cx-name\">\n          <a\n            class=\"cx-link\"\n            [routerLink]=\"{ cxRoute: 'product', params: item.product } | cxUrl\"\n            (keydown.enter)=\"$event.currentTarget.click()\"\n            >{{ item.product.name }}</a\n          >\n        </div>\n\n        <!-- ID -->\n        <div *ngIf=\"item.product.code\" class=\"cx-code\">\n          {{\n            'epdVisualization.visualPicking.visualPickingProductList.id'\n              | cxTranslate\n          }}\n          {{ item.product.code }}\n        </div>\n      </div>\n    </div>\n\n    <!-- Item Price -->\n    <div class=\"col-4 flex-column\">\n      <div *ngIf=\"item.product.price\" class=\"cx-price\">\n        {{ item.product.price?.formattedValue }}\n      </div>\n    </div>\n\n    <!-- Add to Cart -->\n    <div class=\"cx-add-to-cart col-2 flex-column\">\n      <ng-container\n        *ngIf=\"\n          item.product.price !== undefined &&\n          item.product.stock.stockLevelStatus !== 'outOfStock'\n        \"\n      >\n        <div\n          (click)=\"addToCartComponent.addToCart(); $event.preventDefault()\"\n          (keydown.enter)=\"\n            addToCartComponent.addToCart(); $event.preventDefault()\n          \"\n          (keydown.space)=\"\n            addToCartComponent.addToCart(); $event.preventDefault()\n          \"\n        >\n          <cx-epd-visualization-compact-add-to-cart\n            #addToCartComponent\n            [showQuantity]=\"false\"\n            [product]=\"item.product\"\n          ></cx-epd-visualization-compact-add-to-cart>\n        </div>\n      </ng-container>\n\n      <ng-container #noPrice *ngIf=\"item.product.price === undefined\">\n      </ng-container>\n\n      <ng-container\n        *ngIf=\"\n          item.product.price !== undefined &&\n          item.product.stock.stockLevelStatus === 'outOfStock'\n        \"\n      >\n        <div class=\"cx-out-of-stock\">\n          {{\n            'epdVisualization.visualPicking.visualPickingProductList.outOfStock'\n              | cxTranslate\n          }}\n        </div>\n      </ng-container>\n    </div>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i1$2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i1.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "component", type: PagedListComponent, selector: "cx-epd-visualization-paged-list", inputs: ["title", "items", "headerTemplate", "template", "itemsPerSlide", "hideIndicators", "indicatorIcon", "previousIcon", "nextIcon", "activeSlideStartIndex"], outputs: ["activeSlideStartIndexChange"] }, { kind: "component", type: CompactAddToCartComponent, selector: "cx-epd-visualization-compact-add-to-cart" }, { kind: "pipe", type: i1$2.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-epd-visualization-product-list', providers: [VisualPickingProductListService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<cx-epd-visualization-paged-list\n  [items]=\"filteredItems$ | async\"\n  [title]=\"title\"\n  [headerTemplate]=\"headerTemplate\"\n  [template]=\"itemTemplate\"\n  [itemsPerSlide]=\"itemsPerSlide\"\n  [(activeSlideStartIndex)]=\"activeSlideStartIndex\"\n>\n</cx-epd-visualization-paged-list>\n\n<ng-template #headerTemplate>\n  <div class=\"cx-item-list-header row\">\n    <div class=\"cx-item-list-desc col-6\">\n      {{\n        'epdVisualization.visualPicking.visualPickingProductList.description'\n          | cxTranslate\n      }}\n    </div>\n    <div class=\"cx-item-list-price col-4\">\n      {{\n        'epdVisualization.visualPicking.visualPickingProductList.itemPrice'\n          | cxTranslate\n      }}\n    </div>\n    <!-- Add to cart -->\n    <div class=\"cx-item-list-total col-2\"></div>\n  </div>\n</ng-template>\n\n<ng-template #itemTemplate let-item=\"item\" let-active=\"active\">\n  <div\n    *ngIf=\"active\"\n    class=\"row no-gutters list-item\"\n    tabindex=\"0\"\n    (click)=\"selectedProductCodes = [item.product.code]\"\n    (keydown.enter)=\"selectedProductCodes = [item.product.code]\"\n    (keydown.space)=\"selectedProductCodes = [item.product.code]\"\n    [class.selected]=\"item.selected\"\n  >\n    <!-- Item Description -->\n    <div class=\"col-6 flex-row\">\n      <!-- Thumbnail -->\n      <div class=\"thumbnail-container\">\n        <div class=\"thumbnail\" [class.selected]=\"item.selected\">\n          <cx-media\n            [container]=\"item.product.images?.PRIMARY\"\n            format=\"thumbnail\"\n          ></cx-media>\n        </div>\n      </div>\n\n      <!-- Name -->\n      <div class=\"flex-column\">\n        <div *ngIf=\"item.product.name\" class=\"cx-name\">\n          <a\n            class=\"cx-link\"\n            [routerLink]=\"{ cxRoute: 'product', params: item.product } | cxUrl\"\n            (keydown.enter)=\"$event.currentTarget.click()\"\n            >{{ item.product.name }}</a\n          >\n        </div>\n\n        <!-- ID -->\n        <div *ngIf=\"item.product.code\" class=\"cx-code\">\n          {{\n            'epdVisualization.visualPicking.visualPickingProductList.id'\n              | cxTranslate\n          }}\n          {{ item.product.code }}\n        </div>\n      </div>\n    </div>\n\n    <!-- Item Price -->\n    <div class=\"col-4 flex-column\">\n      <div *ngIf=\"item.product.price\" class=\"cx-price\">\n        {{ item.product.price?.formattedValue }}\n      </div>\n    </div>\n\n    <!-- Add to Cart -->\n    <div class=\"cx-add-to-cart col-2 flex-column\">\n      <ng-container\n        *ngIf=\"\n          item.product.price !== undefined &&\n          item.product.stock.stockLevelStatus !== 'outOfStock'\n        \"\n      >\n        <div\n          (click)=\"addToCartComponent.addToCart(); $event.preventDefault()\"\n          (keydown.enter)=\"\n            addToCartComponent.addToCart(); $event.preventDefault()\n          \"\n          (keydown.space)=\"\n            addToCartComponent.addToCart(); $event.preventDefault()\n          \"\n        >\n          <cx-epd-visualization-compact-add-to-cart\n            #addToCartComponent\n            [showQuantity]=\"false\"\n            [product]=\"item.product\"\n          ></cx-epd-visualization-compact-add-to-cart>\n        </div>\n      </ng-container>\n\n      <ng-container #noPrice *ngIf=\"item.product.price === undefined\">\n      </ng-container>\n\n      <ng-container\n        *ngIf=\"\n          item.product.price !== undefined &&\n          item.product.stock.stockLevelStatus === 'outOfStock'\n        \"\n      >\n        <div class=\"cx-out-of-stock\">\n          {{\n            'epdVisualization.visualPicking.visualPickingProductList.outOfStock'\n              | cxTranslate\n          }}\n        </div>\n      </ng-container>\n    </div>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: VisualPickingProductListService }]; }, propDecorators: { title: [{
                type: Input
            }], singleSelection: [{
                type: Input
            }], selectedProductCodes: [{
                type: Input,
                args: ['selectedProductCodes']
            }], selectedProductCodesChange: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VisualPickingProductListModule {
}
VisualPickingProductListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VisualPickingProductListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductListModule, declarations: [VisualPickingProductListComponent], imports: [CommonModule,
        RouterModule,
        ProductReferencesModule,
        MediaModule,
        IconModule,
        CarouselModule,
        PagedListModule,
        UrlModule,
        I18nModule,
        CompactAddToCartModule], exports: [VisualPickingProductListComponent] });
VisualPickingProductListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductListModule, imports: [CommonModule,
        RouterModule,
        ProductReferencesModule,
        MediaModule,
        IconModule,
        CarouselModule,
        PagedListModule,
        UrlModule,
        I18nModule,
        CompactAddToCartModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        ProductReferencesModule,
                        MediaModule,
                        IconModule,
                        CarouselModule,
                        PagedListModule,
                        UrlModule,
                        I18nModule,
                        CompactAddToCartModule,
                    ],
                    declarations: [VisualPickingProductListComponent],
                    exports: [VisualPickingProductListComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VisualPickingTabService {
    constructor(currentProductService, globalMessageService, changeDetectorRef, windowRef) {
        this.currentProductService = currentProductService;
        this.globalMessageService = globalMessageService;
        this.changeDetectorRef = changeDetectorRef;
        this.windowRef = windowRef;
        this._selectedProductCodes = [];
        /**
         * When true, error messages will be shown when visualization load/lookup failures occur.
         */
        this.showErrorMessages = true;
    }
    /**
     * Initialize the service.
     * @param visualViewerService The VisualViewerService instance to use.
     * @param visualPickingProductListService The VisualPickingProductListService instance to use.
     */
    initialize(visualViewerService, visualPickingProductListService) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this.visualViewerService = visualViewerService;
        this.visualPickingProductListService = visualPickingProductListService;
        this.visualizationLoadInfoChangeSubscription =
            this.visualViewerService.visualizationLoadInfoChange.subscribe(this.handleLoadVisualizationInfoChange.bind(this));
        this.getFilteredProductReferencesSubscription =
            this.visualPickingProductListService
                .getFilteredProductReferences()
                .subscribe((productReferences) => {
                const productCodes = productReferences.map((productReference) => productReference.target.code);
                this.visualViewerService.includedProductCodes = productCodes;
            });
        this.getProductReferencesSubscription = this.visualPickingProductListService
            .getProductReferences()
            .subscribe((productReferences) => {
            this.setProductReferences(productReferences);
            if (productReferences.length > 0) {
                this.visualPickingProductListService.currentProduct$
                    .pipe(first())
                    .subscribe((currentProduct) => {
                    this.visualViewerService
                        .loadVisualization(currentProduct.code)
                        .pipe(first())
                        .subscribe();
                });
            }
        });
    }
    ngOnDestroy() {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this.visualizationLoadInfoChangeSubscription?.unsubscribe();
        this.getProductReferencesSubscription?.unsubscribe();
        this.getFilteredProductReferencesSubscription?.unsubscribe();
    }
    get selectedProductCodes() {
        return this._selectedProductCodes;
    }
    set selectedProductCodes(selectedProducts) {
        this._selectedProductCodes = selectedProducts;
        this.changeDetectorRef.detectChanges();
    }
    get productReferences() {
        return this._productReferences;
    }
    setProductReferences(value) {
        this._productReferences = value;
        // hideNoProductReferencesText, hideProductList, hideViewport values may have changed
        this.changeDetectorRef.markForCheck();
    }
    get visualizationLoadStatus() {
        return (this.visualViewerService.visualizationLoadInfo?.loadStatus ??
            VisualizationLoadStatus.NotStarted);
    }
    get hideNoProductReferencesText() {
        if (!this.windowRef.isBrowser()) {
            return true;
        }
        return (this.productReferences === undefined ||
            this.productReferences.length > 0);
    }
    get hideProductList() {
        if (!this.windowRef.isBrowser()) {
            return true;
        }
        return (this.productReferences === undefined ||
            this.productReferences.length === 0);
    }
    get hideViewport() {
        if (!this.windowRef.isBrowser()) {
            return true;
        }
        return (this.productReferences === undefined ||
            this.productReferences.length === 0 ||
            !(this.visualizationLoadStatus === VisualizationLoadStatus.Loading ||
                this.visualizationLoadStatus === VisualizationLoadStatus.Loaded));
    }
    showErrorMessage(message) {
        if (this.showErrorMessages) {
            this.globalMessageService.add(message, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    handleLoadVisualizationInfoChange(visualizationLoadInfo) {
        switch (visualizationLoadInfo.lookupResult) {
            case VisualizationLookupResult.UniqueMatchFound:
                switch (visualizationLoadInfo.loadStatus) {
                    case VisualizationLoadStatus.Loading:
                        break;
                    case VisualizationLoadStatus.UnexpectedError:
                        this.showErrorMessage({
                            key: 'epdVisualization.errors.visualLoad.unexpectedLoadError',
                        });
                        break;
                }
                break;
            case VisualizationLookupResult.NoMatchFound:
                break;
            case VisualizationLookupResult.MultipleMatchesFound:
                this.showErrorMessage({
                    key: 'epdVisualization.errors.visualLoad.multipleMatchingVisualsFound',
                });
                break;
            case VisualizationLookupResult.UnexpectedError:
                this.showErrorMessage({
                    key: 'epdVisualization.errors.visualLoad.unexpectedLoadError',
                });
                break;
        }
        this.changeDetectorRef.detectChanges();
    }
    get visualViewerService() {
        return this._visualViewerService;
    }
    set visualViewerService(value) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this._visualViewerService = value;
    }
    get visualPickingProductListService() {
        return this._visualPickingProductListService;
    }
    set visualPickingProductListService(value) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        this._visualPickingProductListService = value;
    }
}
VisualPickingTabService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingTabService, deps: [{ token: i1.CurrentProductService }, { token: i2.GlobalMessageService }, { token: i0.ChangeDetectorRef }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
VisualPickingTabService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingTabService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingTabService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CurrentProductService }, { type: i2.GlobalMessageService }, { type: i0.ChangeDetectorRef }, { type: i2.WindowRef }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VisualPickingTabComponent {
    constructor(visualPickingTabService) {
        this.visualPickingTabService = visualPickingTabService;
    }
    ngAfterViewInit() {
        this.visualPickingTabService.initialize(this.visualViewerService, this.visualPickingProductListService);
    }
    get selectedProductCodes() {
        return this.visualPickingTabService.selectedProductCodes;
    }
    set selectedProductCodes(selectedProducts) {
        this.visualPickingTabService.selectedProductCodes = selectedProducts;
    }
    get hideNoProductReferencesIndicator() {
        return this.visualPickingTabService.hideNoProductReferencesText;
    }
    get hideProductList() {
        return this.visualPickingTabService.hideProductList;
    }
    get hideViewport() {
        return this.visualPickingTabService.hideViewport;
    }
}
VisualPickingTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingTabComponent, deps: [{ token: VisualPickingTabService }], target: i0.ɵɵFactoryTarget.Component });
VisualPickingTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: VisualPickingTabComponent, selector: "cx-epd-visualization-visual-picking-tab", providers: [VisualPickingTabService], viewQueries: [{ propertyName: "visualViewerService", first: true, predicate: VisualViewerComponent, descendants: true, read: VisualViewerService }, { propertyName: "visualPickingProductListService", first: true, predicate: VisualPickingProductListComponent, descendants: true, read: VisualPickingProductListService }], ngImport: i0, template: "<div\n  [class.container-fluid]=\"!hideViewport\"\n  [class.container]=\"hideViewport\"\n  [hidden]=\"!hideNoProductReferencesIndicator\"\n>\n  <cx-epd-visualization-viewer\n    [(selectedProductCodes)]=\"selectedProductCodes\"\n    [hidden]=\"hideViewport\"\n    [outlineColor]=\"'--cx-color-primary'\"\n    [outlineWidth]=\"8\"\n  >\n  </cx-epd-visualization-viewer>\n\n  <div\n    class=\"visual-picking-product-list-container\"\n    [hidden]=\"hideProductList\"\n    [class.viewportHidden]=\"hideViewport\"\n  >\n    <cx-epd-visualization-product-filter></cx-epd-visualization-product-filter>\n\n    <cx-epd-visualization-product-list\n      [(selectedProductCodes)]=\"selectedProductCodes\"\n    >\n    </cx-epd-visualization-product-list>\n  </div>\n</div>\n\n<div\n  class=\"container no-product-references\"\n  [hidden]=\"hideNoProductReferencesIndicator\"\n>\n  <span>{{\n    'epdVisualization.visualPicking.visualPickingTab.noProductReferences'\n      | cxTranslate\n  }}</span>\n</div>\n", dependencies: [{ kind: "component", type: VisualViewerComponent, selector: "cx-epd-visualization-viewer", inputs: ["backgroundTopColor", "backgroundBottomColor", "hotspotSelectionColor", "showAllHotspotsEnabled", "showAllHotspotsColor", "outlineColor", "outlineWidth", "selectionMode", "selectedProductCodes", "includedProductCodes", "excludedOpacity", "animationTime", "animationPosition", "animationPlaying", "navigationMode", "isolateModeEnabled"], outputs: ["selectedProductCodesChange", "animationTimeChange", "animationPositionChange", "animationPlayingChange", "isolateModeEnabledChange", "viewportReadyChange"] }, { kind: "component", type: VisualPickingProductListComponent, selector: "cx-epd-visualization-product-list", inputs: ["title", "singleSelection", "selectedProductCodes"], outputs: ["selectedProductCodesChange"] }, { kind: "component", type: VisualPickingProductFilterComponent, selector: "cx-epd-visualization-product-filter", inputs: ["filter"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingTabComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-epd-visualization-visual-picking-tab', providers: [VisualPickingTabService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  [class.container-fluid]=\"!hideViewport\"\n  [class.container]=\"hideViewport\"\n  [hidden]=\"!hideNoProductReferencesIndicator\"\n>\n  <cx-epd-visualization-viewer\n    [(selectedProductCodes)]=\"selectedProductCodes\"\n    [hidden]=\"hideViewport\"\n    [outlineColor]=\"'--cx-color-primary'\"\n    [outlineWidth]=\"8\"\n  >\n  </cx-epd-visualization-viewer>\n\n  <div\n    class=\"visual-picking-product-list-container\"\n    [hidden]=\"hideProductList\"\n    [class.viewportHidden]=\"hideViewport\"\n  >\n    <cx-epd-visualization-product-filter></cx-epd-visualization-product-filter>\n\n    <cx-epd-visualization-product-list\n      [(selectedProductCodes)]=\"selectedProductCodes\"\n    >\n    </cx-epd-visualization-product-list>\n  </div>\n</div>\n\n<div\n  class=\"container no-product-references\"\n  [hidden]=\"hideNoProductReferencesIndicator\"\n>\n  <span>{{\n    'epdVisualization.visualPicking.visualPickingTab.noProductReferences'\n      | cxTranslate\n  }}</span>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: VisualPickingTabService }]; }, propDecorators: { visualViewerService: [{
                type: ViewChild,
                args: [VisualViewerComponent, { read: VisualViewerService }]
            }], visualPickingProductListService: [{
                type: ViewChild,
                args: [VisualPickingProductListComponent, {
                        read: VisualPickingProductListService,
                    }]
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VisualPickingTabModule {
}
VisualPickingTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VisualPickingTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingTabModule, declarations: [VisualPickingTabComponent], imports: [CommonModule,
        RouterModule,
        I18nModule,
        VisualViewerModule,
        VisualPickingProductListModule,
        VisualPickingProductFilterModule], exports: [VisualPickingTabComponent] });
VisualPickingTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingTabModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                VisualPickingTabComponent: {
                    component: VisualPickingTabComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        I18nModule,
        VisualViewerModule,
        VisualPickingProductListModule,
        VisualPickingProductFilterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingTabModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        I18nModule,
                        VisualViewerModule,
                        VisualPickingProductListModule,
                        VisualPickingProductFilterModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                VisualPickingTabComponent: {
                                    component: VisualPickingTabComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [VisualPickingTabComponent],
                    exports: [VisualPickingTabComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class EpdVisualizationComponentsModule {
}
EpdVisualizationComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
EpdVisualizationComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationComponentsModule, imports: [VisualPickingTabModule, VisualViewerModule] });
EpdVisualizationComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationComponentsModule, imports: [VisualPickingTabModule, VisualViewerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [VisualPickingTabModule, VisualViewerModule],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// Don't export ./zoom-to

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CompactAddToCartComponent, CompactAddToCartModule, EpdVisualizationComponentsModule, NavigationMode, PagedListComponent, PagedListModule, SelectionMode, VisualPickingProductFilterComponent, VisualPickingProductFilterModule, VisualPickingProductFilterService, VisualPickingProductListComponent, VisualPickingProductListModule, VisualPickingProductListService, VisualPickingTabComponent, VisualPickingTabModule, VisualPickingTabService, VisualViewerAnimationSliderComponent, VisualViewerAnimationSliderModule, VisualViewerAnimationSliderService, VisualViewerComponent, VisualViewerModule, VisualViewerService, VisualViewerToolbarButtonComponent, VisualViewerToolbarButtonModule, VisualizationLoadStatus, VisualizationLookupResult };
//# sourceMappingURL=spartacus-epd-visualization-components.mjs.map
