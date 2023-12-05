/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { EventEmitter, Injectable, } from '@angular/core';
import { EventListenerUtils } from '@spartacus/epd-visualization/root';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class VisualViewerAnimationSliderService {
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
VisualViewerAnimationSliderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerAnimationSliderService, deps: [{ token: i0.ElementRef }, { token: i1.WindowRef }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Injectable });
VisualViewerAnimationSliderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerAnimationSliderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerAnimationSliderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.WindowRef }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsLXZpZXdlci1hbmltYXRpb24tc2xpZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2VwZC12aXN1YWxpemF0aW9uL2NvbXBvbmVudHMvdmlzdWFsLXZpZXdlci90b29sYmFyL3Zpc3VhbC12aWV3ZXItYW5pbWF0aW9uLXNsaWRlci92aXN1YWwtdmlld2VyLWFuaW1hdGlvbi1zbGlkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUdMLFlBQVksRUFDWixVQUFVLEdBRVgsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7OztBQUt2RSxNQUFNLE9BQU8sa0NBQWtDO0lBQzdDLFlBQ1UsVUFBc0IsRUFDdEIsU0FBb0IsRUFDcEIsUUFBbUIsRUFDbkIsaUJBQW9DO1FBSHBDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFtQnRDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLHNCQUFpQixHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFnQi9DLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDM0IsZ0JBQVcsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVkvQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBK0MzQixvQkFBZSxHQUFvQixTQUFTLENBQUM7UUFDN0MsdUJBQWtCLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1FBUTlDLHFCQUFnQixHQUFZLFNBQVMsQ0FBQztRQTZCOUMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUErTWIsY0FBUyxHQUFHLENBQUMsR0FBRyxFQUFFLENB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QUM7OytIQTlZVSxrQ0FBa0M7bUlBQWxDLGtDQUFrQyxjQUZqQyxNQUFNOzJGQUVQLGtDQUFrQztrQkFIOUMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3RhYmxlLFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2luZG93UmVmIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEV2ZW50TGlzdGVuZXJVdGlscyB9IGZyb20gJ0BzcGFydGFjdXMvZXBkLXZpc3VhbGl6YXRpb24vcm9vdCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBWaXN1YWxWaWV3ZXJBbmltYXRpb25TbGlkZXJTZXJ2aWNlIHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHdpbmRvd1JlZjogV2luZG93UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5pbml0aWFsaXplKHRoaXMucmVuZGVyZXIpO1xuICB9XG5cbiAgcHVibGljIGluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVFdmVudEJpbmRpbmdzKCk7XG4gICAgdGhpcy5zZXR1cFJlc2l6ZU9ic2VydmVyKCk7XG4gICAgdGhpcy5zZXRJbml0aWFsaXplZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbml0aWFsaXplZCgpIHtcbiAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgdGhpcy5pbml0aWFsaXplZENoYW5nZS5lbWl0KHRydWUpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZWRDaGFuZ2UuY29tcGxldGUoKTtcbiAgfVxuICBwdWJsaWMgZ2V0IGluaXRpYWxpemVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pbml0aWFsaXplZDtcbiAgfVxuICBwcml2YXRlIF9pbml0aWFsaXplZCA9IGZhbHNlO1xuICBwdWJsaWMgaW5pdGlhbGl6ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLyoqXG4gICAqIFNsaWRlciB2YWx1ZS4gVmFsdWUgaXMgaW4gdGhlIHJhbmdlIFswLTFdLlxuICAgKi9cbiAgc2V0IHZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICB2YWx1ZSA9IHRoaXMuY2xhbXBUb1JhbmdlKHZhbHVlKTtcbiAgICBpZiAodGhpcy5fdmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfdmFsdWU6IG51bWJlciA9IDA7XG4gIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5fZGlzYWJsZWQgPT09IGRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2Rpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgdGhpcy51cGRhdGVFdmVudEJpbmRpbmdzKCk7XG4gIH1cbiAgZ2V0IGRpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHNldCBoaWRkZW4oaGlkZGVuOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX2hpZGRlbiA9PT0gaGlkZGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2hpZGRlbiA9IGhpZGRlbjtcbiAgICAvLyBFbnN1cmUgaGFuZGxlIHBvc2l0aW9uIGlzIHJlY2FsY3VsYXRlZCB3aGVuIHRoZSBhbmltYXRpb24gc2xpZGVyIHZpc2liaWxpdHkgY2hhbmdlc1xuICAgIC8vIEZpeGVzIGEgYnVnIGluIHdoaWNoIHRoZSBpbml0aWFsIHBvc2l0aW9uIG9mIHRoZSBzbGlkZXIgaGFuZGxlIGlzIGluY29ycmVjdFxuICAgIC8vIGJlY2F1c2UgdGhlIGJhciB3aWR0aCBpcyBjYWxjdWxhdGVkIHdoaWxlIHRoZSBhbmltYXRpb24gc2xpZGVyIGlzIGhpZGRlbiAobm90aWNlYWJsZSBpbiBSVEwgbW9kZSlcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuICBnZXQgaGlkZGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oaWRkZW47XG4gIH1cbiAgcHJpdmF0ZSBfaGlkZGVuOiBib29sZWFuO1xuXG4gIGdldCBwb3NpdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnZhbHVlVG9Qb3NpdGlvbih0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGdldCByaWdodFRvTGVmdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy53aW5kb3dSZWYuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRpciA9PT0gJ3J0bCc7XG4gIH1cblxuICBzZXQgYmFyRWxlbWVudChiYXJFbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5fYmFyRWxlbWVudCA9IGJhckVsZW1lbnQ7XG4gIH1cbiAgZ2V0IGJhckVsZW1lbnQoKTogRWxlbWVudFJlZiB7XG4gICAgcmV0dXJuIHRoaXMuX2JhckVsZW1lbnQ7XG4gIH1cbiAgX2JhckVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgc2V0IGhhbmRsZUVsZW1lbnQoaGFuZGxlRWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuX2hhbmRsZUVsZW1lbnQgPSBoYW5kbGVFbGVtZW50O1xuICB9XG4gIGdldCBoYW5kbGVFbGVtZW50KCk6IEVsZW1lbnRSZWYge1xuICAgIHJldHVybiB0aGlzLl9oYW5kbGVFbGVtZW50O1xuICB9XG4gIF9oYW5kbGVFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgc2V0IHJlc2l6ZU9ic2VydmVyKHJlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlciB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX3Jlc2l6ZU9ic2VydmVyID0gcmVzaXplT2JzZXJ2ZXI7XG4gIH1cbiAgcHJpdmF0ZSBnZXQgcmVzaXplT2JzZXJ2ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jlc2l6ZU9ic2VydmVyO1xuICB9XG4gIHByaXZhdGUgX3Jlc2l6ZU9ic2VydmVyPzogUmVzaXplT2JzZXJ2ZXIgPSB1bmRlZmluZWQ7XG4gIHByaXZhdGUgZXZlbnRMaXN0ZW5lclV0aWxzID0gbmV3IEV2ZW50TGlzdGVuZXJVdGlscygpO1xuXG4gIHByaXZhdGUgc2V0IHRvdWNoSWRlbnRpZmllcih0b3VjaElkZW50aWZpZXI6IG51bWJlciB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX3RvdWNoSWRlbnRpZmllciA9IHRvdWNoSWRlbnRpZmllcjtcbiAgfVxuICBwcml2YXRlIGdldCB0b3VjaElkZW50aWZpZXIoKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fdG91Y2hJZGVudGlmaWVyO1xuICB9XG4gIHByaXZhdGUgX3RvdWNoSWRlbnRpZmllcj86IG51bWJlciA9IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIGdldENsaWVudFdpZHRoKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIGlmICghZWxlbWVudFJlZiB8fCAhZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCBjbGllbnRSZWN0ID0gdGhpcy5nZXRDbGllbnRSZWN0KGVsZW1lbnRSZWYpO1xuICAgIHJldHVybiBjbGllbnRSZWN0LnJpZ2h0IC0gY2xpZW50UmVjdC5sZWZ0O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDbGllbnRSZWN0KGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpOiBET01SZWN0IHtcbiAgICByZXR1cm4gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNpemVPYnNlcnZlclN1cHBvcnRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gd2luZG93LlJlc2l6ZU9ic2VydmVyICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIHNldHVwUmVzaXplT2JzZXJ2ZXIoKSB7XG4gICAgaWYgKHRoaXMucmVzaXplT2JzZXJ2ZXJTdXBwb3J0ZWQoKSkge1xuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcih0aGlzLm9uUmVzaXplLmJpbmQodGhpcykpO1xuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uUmVzaXplKCkge1xuICAgIC8vIEVuc3VyZSBoYW5kbGUgcG9zaXRpb24gaXMgcmVjYWxjdWxhdGVkIG9uIHJlc2l6ZVxuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG4gIHNpemVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSB1cGRhdGVFdmVudEJpbmRpbmdzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5kZXRhY2hBbGxFdmVudExpc3RlbmVycyhkb2N1bWVudCk7XG4gICAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5kZXRhY2hBbGxFdmVudExpc3RlbmVycyhcbiAgICAgICAgdGhpcy5iYXJFbGVtZW50Lm5hdGl2ZUVsZW1lbnRcbiAgICAgICk7XG4gICAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5kZXRhY2hBbGxFdmVudExpc3RlbmVycyhcbiAgICAgICAgdGhpcy5oYW5kbGVFbGVtZW50Lm5hdGl2ZUVsZW1lbnRcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclV0aWxzLmF0dGFjaEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIHRoaXMuaGFuZGxlRWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAnbW91c2Vkb3duJyxcbiAgICAgICAgdGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpXG4gICAgICApO1xuICAgICAgdGhpcy5ldmVudExpc3RlbmVyVXRpbHMuYXR0YWNoRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgdGhpcy5iYXJFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICdtb3VzZWRvd24nLFxuICAgICAgICB0aGlzLm9uTW91c2VEb3duT25CYXIuYmluZCh0aGlzKVxuICAgICAgKTtcbiAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lclV0aWxzLmF0dGFjaEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIHRoaXMuaGFuZGxlRWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAndG91Y2hzdGFydCcsXG4gICAgICAgIHRoaXMub25Ub3VjaFN0YXJ0LmJpbmQodGhpcylcbiAgICAgICk7XG4gICAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5hdHRhY2hFdmVudExpc3RlbmVyKFxuICAgICAgICB0aGlzLmJhckVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgJ3RvdWNoc3RhcnQnLFxuICAgICAgICB0aGlzLm9uVG91Y2hTdGFydE9uQmFyLmJpbmQodGhpcylcbiAgICAgICk7XG4gICAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5hdHRhY2hFdmVudExpc3RlbmVyKFxuICAgICAgICB0aGlzLmhhbmRsZUVsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgJ2ZvY3VzJyxcbiAgICAgICAgdGhpcy5vbkhhbmRsZUZvY3VzLmJpbmQodGhpcylcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGhhbmRsZVdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2xpZW50V2lkdGgodGhpcy5oYW5kbGVFbGVtZW50KSA/PyAwO1xuICB9XG5cbiAgZ2V0IGJhcldpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2xpZW50V2lkdGgodGhpcy5iYXJFbGVtZW50KSA/PyAwO1xuICB9XG5cbiAgZ2V0IGhhbmRsZU1heFBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuYmFyV2lkdGggLSB0aGlzLmhhbmRsZVdpZHRoO1xuICB9XG5cbiAgcHJpdmF0ZSB2YWx1ZVRvUG9zaXRpb24odmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHBvc2l0aW9uOiBudW1iZXIgPSB0aGlzLmNsYW1wVG9SYW5nZSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMucmlnaHRUb0xlZnQpIHtcbiAgICAgIHBvc2l0aW9uID0gMSAtIHBvc2l0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gcG9zaXRpb24gKiB0aGlzLmhhbmRsZU1heFBvc2l0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBwb3NpdGlvblRvVmFsdWUocG9zaXRpb246IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IHZhbHVlOiBudW1iZXIgPSBwb3NpdGlvbiAvIHRoaXMuaGFuZGxlTWF4UG9zaXRpb247XG4gICAgaWYgKHRoaXMucmlnaHRUb0xlZnQpIHtcbiAgICAgIHZhbHVlID0gMSAtIHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIGZpbmRUb3VjaChcbiAgICB0b3VjaExpc3Q6IFRvdWNoTGlzdCxcbiAgICB0b3VjaElkZW50aWZpZXI/OiBudW1iZXJcbiAgKTogVG91Y2ggfCB1bmRlZmluZWQge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG91Y2hMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB0b3VjaCA9IHRvdWNoTGlzdC5pdGVtKGkpIGFzIFRvdWNoO1xuICAgICAgaWYgKHRvdWNoLmlkZW50aWZpZXIgPT09IHRvdWNoSWRlbnRpZmllcikge1xuICAgICAgICByZXR1cm4gdG91Y2g7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIGdldCBzbGlkZXJDbGllbnRQb3NpdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmdldENsaWVudFJlY3QodGhpcy5lbGVtZW50UmVmKS5sZWZ0O1xuICB9XG5cbiAgcHJpdmF0ZSBvblRvdWNoU3RhcnQoZXZlbnQ6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWYgKHRoaXMudG91Y2hJZGVudGlmaWVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5kZXRhY2hFdmVudExpc3RlbmVycyhkb2N1bWVudCwgJ3RvdWNobW92ZScpO1xuICAgIHRoaXMuZXZlbnRMaXN0ZW5lclV0aWxzLmF0dGFjaEV2ZW50TGlzdGVuZXIoXG4gICAgICBkb2N1bWVudCxcbiAgICAgICd0b3VjaG1vdmUnLFxuICAgICAgdGhpcy5vblRvdWNoTW92ZS5iaW5kKHRoaXMpXG4gICAgKTtcblxuICAgIHRoaXMuZXZlbnRMaXN0ZW5lclV0aWxzLmRldGFjaEV2ZW50TGlzdGVuZXJzKGRvY3VtZW50LCAndG91Y2hlbmQnKTtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5hdHRhY2hFdmVudExpc3RlbmVyKFxuICAgICAgZG9jdW1lbnQsXG4gICAgICAndG91Y2hlbmQnLFxuICAgICAgdGhpcy5vblRvdWNoRW5kLmJpbmQodGhpcylcbiAgICApO1xuXG4gICAgdGhpcy50b3VjaElkZW50aWZpZXIgPSAoZXZlbnQuY2hhbmdlZFRvdWNoZXMgYXMgVG91Y2hMaXN0KVswXS5pZGVudGlmaWVyO1xuICB9XG5cbiAgcHJpdmF0ZSBvblRvdWNoU3RhcnRPbkJhcihldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaFN0YXJ0KGV2ZW50KTtcbiAgICB0aGlzLm9uVG91Y2hNb3ZlKGV2ZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy5ldmVudExpc3RlbmVyVXRpbHMuZGV0YWNoRXZlbnRMaXN0ZW5lcnMoZG9jdW1lbnQsICdtb3VzZW1vdmUnKTtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5hdHRhY2hFdmVudExpc3RlbmVyKFxuICAgICAgZG9jdW1lbnQsXG4gICAgICAnbW91c2Vtb3ZlJyxcbiAgICAgIHRoaXMub25Nb3VzZU1vdmUuYmluZCh0aGlzKVxuICAgICk7XG5cbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5kZXRhY2hFdmVudExpc3RlbmVycyhkb2N1bWVudCwgJ21vdXNldXAnKTtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5hdHRhY2hFdmVudExpc3RlbmVyKFxuICAgICAgZG9jdW1lbnQsXG4gICAgICAnbW91c2V1cCcsXG4gICAgICB0aGlzLm9uTW91c2VVcC5iaW5kKHRoaXMpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgb25Nb3VzZURvd25PbkJhcihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMub25Nb3VzZURvd24oZXZlbnQpO1xuICAgIHRoaXMub25Nb3VzZU1vdmUoZXZlbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBvbk1vdXNlTW92ZShldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHBvc2l0aW9uID1cbiAgICAgIGV2ZW50LmNsaWVudFggLSB0aGlzLnNsaWRlckNsaWVudFBvc2l0aW9uIC0gdGhpcy5oYW5kbGVXaWR0aCAvIDI7XG4gICAgdGhpcy5hcHBseVZhbHVlKHRoaXMucG9zaXRpb25Ub1ZhbHVlKHBvc2l0aW9uKSk7XG4gIH1cblxuICBwcml2YXRlIG9uTW91c2VVcChfZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5kZXRhY2hFdmVudExpc3RlbmVycyhkb2N1bWVudCwgJ21vdXNlbW92ZScpO1xuICAgIHRoaXMuZXZlbnRMaXN0ZW5lclV0aWxzLmRldGFjaEV2ZW50TGlzdGVuZXJzKGRvY3VtZW50LCAnbW91c2V1cCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblRvdWNoTW92ZShldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHRvdWNoSW5pdGlhdGVkT25TbGlkZXIgPSB0aGlzLmZpbmRUb3VjaChcbiAgICAgIGV2ZW50LmNoYW5nZWRUb3VjaGVzLFxuICAgICAgdGhpcy50b3VjaElkZW50aWZpZXJcbiAgICApO1xuICAgIGlmICh0b3VjaEluaXRpYXRlZE9uU2xpZGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdG91Y2ggPSB0aGlzLmZpbmRUb3VjaChldmVudC50b3VjaGVzLCB0aGlzLnRvdWNoSWRlbnRpZmllcikgYXMgVG91Y2g7XG4gICAgY29uc3QgcG9zaXRpb246IG51bWJlciA9XG4gICAgICB0b3VjaC5jbGllbnRYIC0gdGhpcy5zbGlkZXJDbGllbnRQb3NpdGlvbiAtIHRoaXMuaGFuZGxlV2lkdGggLyAyO1xuICAgIHRoaXMuYXBwbHlWYWx1ZSh0aGlzLnBvc2l0aW9uVG9WYWx1ZShwb3NpdGlvbikpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblRvdWNoRW5kKGV2ZW50OiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgdG91Y2hJbml0aWF0ZWRPblNsaWRlciA9IHRoaXMuZmluZFRvdWNoKFxuICAgICAgZXZlbnQuY2hhbmdlZFRvdWNoZXMsXG4gICAgICB0aGlzLnRvdWNoSWRlbnRpZmllclxuICAgICk7XG4gICAgaWYgKHRvdWNoSW5pdGlhdGVkT25TbGlkZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnRvdWNoSWRlbnRpZmllciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5kZXRhY2hFdmVudExpc3RlbmVycyhkb2N1bWVudCwgJ3RvdWNobW92ZScpO1xuICAgIHRoaXMuZXZlbnRMaXN0ZW5lclV0aWxzLmRldGFjaEV2ZW50TGlzdGVuZXJzKGRvY3VtZW50LCAndG91Y2hlbmQnKTtcbiAgfVxuXG4gIHByaXZhdGUgb25IYW5kbGVGb2N1cygpOiB2b2lkIHtcbiAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5oYW5kbGVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5ldmVudExpc3RlbmVyVXRpbHMuYXR0YWNoRXZlbnRMaXN0ZW5lcihcbiAgICAgIG5hdGl2ZUVsZW1lbnQsXG4gICAgICAnYmx1cicsXG4gICAgICB0aGlzLm9uSGFuZGxlQmx1ci5iaW5kKHRoaXMpXG4gICAgKTtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5hdHRhY2hFdmVudExpc3RlbmVyKFxuICAgICAgbmF0aXZlRWxlbWVudCxcbiAgICAgICdrZXlkb3duJyxcbiAgICAgIHRoaXMub25LZXlib2FyZEV2ZW50LmJpbmQodGhpcylcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkhhbmRsZUJsdXIoKTogdm9pZCB7XG4gICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuaGFuZGxlRWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuZXZlbnRMaXN0ZW5lclV0aWxzLmRldGFjaEV2ZW50TGlzdGVuZXJzKG5hdGl2ZUVsZW1lbnQsICdibHVyJyk7XG4gICAgdGhpcy5ldmVudExpc3RlbmVyVXRpbHMuZGV0YWNoRXZlbnRMaXN0ZW5lcnMobmF0aXZlRWxlbWVudCwgJ2tleWRvd24nKTtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJVdGlscy5kZXRhY2hFdmVudExpc3RlbmVycyhuYXRpdmVFbGVtZW50LCAna2V5dXAnKTtcbiAgfVxuXG4gIHByaXZhdGUgb25LZXlib2FyZEV2ZW50KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3Qga2V5SGFuZGxlciA9IHRoaXMuZ2V0S2V5SGFuZGxlcihldmVudC5jb2RlLCB0aGlzLnJpZ2h0VG9MZWZ0KTtcbiAgICBpZiAoa2V5SGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5hcHBseVZhbHVlKGtleUhhbmRsZXIodGhpcy52YWx1ZSkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHN0ZXBEZWx0YSA9IDEgLyA1MDtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHBhZ2VEZWx0YSA9IDEgLyAxMDtcblxuICBwcml2YXRlIGdldEtleUhhbmRsZXIoXG4gICAga2V5Q29kZTogc3RyaW5nLFxuICAgIHJpZ2h0VG9MZWZ0OiBib29sZWFuXG4gICk6ICgodmFsdWU6IG51bWJlcikgPT4gbnVtYmVyKSB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgaW5jcmVhc2VTdGVwID0gKGN1cnJlbnRWYWx1ZTogbnVtYmVyKSA9PlxuICAgICAgY3VycmVudFZhbHVlICsgdGhpcy5zdGVwRGVsdGE7XG4gICAgY29uc3QgZGVjcmVhc2VTdGVwID0gKGN1cnJlbnRWYWx1ZTogbnVtYmVyKSA9PlxuICAgICAgY3VycmVudFZhbHVlIC0gdGhpcy5zdGVwRGVsdGE7XG4gICAgY29uc3QgaW5jcmVhc2VQYWdlID0gKGN1cnJlbnRWYWx1ZTogbnVtYmVyKSA9PlxuICAgICAgY3VycmVudFZhbHVlICsgdGhpcy5wYWdlRGVsdGE7XG4gICAgY29uc3QgZGVjcmVhc2VQYWdlID0gKGN1cnJlbnRWYWx1ZTogbnVtYmVyKSA9PlxuICAgICAgY3VycmVudFZhbHVlIC0gdGhpcy5wYWdlRGVsdGE7XG4gICAgY29uc3Qgc3RlcExlZnQgPSByaWdodFRvTGVmdCA/IGluY3JlYXNlU3RlcCA6IGRlY3JlYXNlU3RlcDtcbiAgICBjb25zdCBzdGVwUmlnaHQgPSByaWdodFRvTGVmdCA/IGRlY3JlYXNlU3RlcCA6IGluY3JlYXNlU3RlcDtcbiAgICBjb25zdCBob21lID0gKCkgPT4gMDtcbiAgICBjb25zdCBlbmQgPSAoKSA9PiAxO1xuXG4gICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgcmV0dXJuIGluY3JlYXNlU3RlcDtcbiAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgIHJldHVybiBkZWNyZWFzZVN0ZXA7XG4gICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICByZXR1cm4gc3RlcExlZnQ7XG4gICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgcmV0dXJuIHN0ZXBSaWdodDtcbiAgICAgIGNhc2UgJ1BhZ2VVcCc6XG4gICAgICAgIHJldHVybiBpbmNyZWFzZVBhZ2U7XG4gICAgICBjYXNlICdQYWdlRG93bic6XG4gICAgICAgIHJldHVybiBkZWNyZWFzZVBhZ2U7XG4gICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgcmV0dXJuIGhvbWU7XG4gICAgICBjYXNlICdFbmQnOlxuICAgICAgICByZXR1cm4gZW5kO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGx5VmFsdWUodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHZhbHVlID0gdGhpcy5jbGFtcFRvUmFuZ2UodmFsdWUpO1xuICAgIGlmICh0aGlzLnZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xhbXBUb1JhbmdlKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgMCksIDEpO1xuICB9XG59XG4iXX0=