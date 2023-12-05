/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, } from '@angular/core';
import { ImageLoadingStrategy } from './media.model';
import * as i0 from "@angular/core";
import * as i1 from "./media.service";
import * as i2 from "@angular/common";
export class MediaComponent {
    constructor(mediaService) {
        this.mediaService = mediaService;
        /**
         * Set the loading strategy of the media. Defaults to global loading strategy.
         * Use 'lazy' or 'eager' strategies.
         */
        this.loading = this.loadingStrategy;
        /**
         * Once the media is loaded, we emit an event.
         */
        this.loaded = new EventEmitter();
        /**
         * The `cx-media` component has an `is-initialized` class as long as the
         * media is being initialized.
         */
        this.isInitialized = false;
        /**
         * The `cx-media` component has a `is-loading` class as long as the
         * media is loaded. Wehn the media is loaded, the `is-initialized` class
         * is added.
         */
        this.isLoading = true;
        /**
         * When there's no media provided for the content, or in case an error
         * happened during loading, we add the `is-missing` class. Visual effects
         * can be controlled by CSS.
         */
        this.isMissing = false;
    }
    ngOnChanges() {
        this.create();
    }
    /**
     * Creates the `Media` object
     */
    create() {
        this.media = this.mediaService.getMedia(this.container instanceof Array ? this.container[0] : this.container, this.format, this.alt, this.role);
        if (!this.media?.src) {
            this.handleMissing();
        }
    }
    /**
     * This handler is called from the UI when the image is loaded.
     */
    loadHandler() {
        this.isLoading = false;
        this.isInitialized = true;
        this.isMissing = false;
        this.loaded.emit(true);
    }
    /**
     * Indicates whether the browser should lazy load the image.
     */
    get loadingStrategy() {
        return this.mediaService.loadingStrategy === ImageLoadingStrategy.LAZY
            ? ImageLoadingStrategy.LAZY
            : null;
    }
    /**
     * Whenever an error happens during load, we mark the component
     * with css classes to have a missing media.
     */
    errorHandler() {
        this.handleMissing();
    }
    handleMissing() {
        this.isLoading = false;
        this.isInitialized = true;
        this.isMissing = true;
        this.loaded.emit(false);
    }
}
MediaComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MediaComponent, deps: [{ token: i1.MediaService }], target: i0.ɵɵFactoryTarget.Component });
MediaComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: MediaComponent, selector: "cx-media", inputs: { container: "container", format: "format", alt: "alt", role: "role", loading: "loading" }, outputs: { loaded: "loaded" }, host: { properties: { "class.is-initialized": "this.isInitialized", "class.is-loading": "this.isLoading", "class.is-missing": "this.isMissing" } }, usesOnChanges: true, ngImport: i0, template: "<img\n  *ngIf=\"media && media.src\"\n  [attr.src]=\"media.src\"\n  [attr.srcset]=\"media.srcset\"\n  [attr.alt]=\"media.alt\"\n  [attr.role]=\"media.role\"\n  [attr.loading]=\"loading\"\n  (load)=\"loadHandler()\"\n  (error)=\"errorHandler()\"\n/>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MediaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-media', changeDetection: ChangeDetectionStrategy.OnPush, template: "<img\n  *ngIf=\"media && media.src\"\n  [attr.src]=\"media.src\"\n  [attr.srcset]=\"media.srcset\"\n  [attr.alt]=\"media.alt\"\n  [attr.role]=\"media.role\"\n  [attr.loading]=\"loading\"\n  (load)=\"loadHandler()\"\n  (error)=\"errorHandler()\"\n/>\n" }]
        }], ctorParameters: function () { return [{ type: i1.MediaService }]; }, propDecorators: { container: [{
                type: Input
            }], format: [{
                type: Input
            }], alt: [{
                type: Input
            }], role: [{
                type: Input
            }], loading: [{
                type: Input
            }], loaded: [{
                type: Output
            }], isInitialized: [{
                type: HostBinding,
                args: ['class.is-initialized']
            }], isLoading: [{
                type: HostBinding,
                args: ['class.is-loading']
            }], isMissing: [{
                type: HostBinding,
                args: ['class.is-missing']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9tZWRpYS9tZWRpYS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL21lZGlhL21lZGlhLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLEtBQUssRUFFTCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLG9CQUFvQixFQUF5QixNQUFNLGVBQWUsQ0FBQzs7OztBQVE1RSxNQUFNLE9BQU8sY0FBYztJQW1FekIsWUFBc0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFyQ2hEOzs7V0FHRztRQUNNLFlBQU8sR0FBZ0MsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUVyRTs7V0FFRztRQUNPLFdBQU0sR0FBMEIsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQVF0RTs7O1dBR0c7UUFDa0Msa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFFM0Q7Ozs7V0FJRztRQUM4QixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBRWxEOzs7O1dBSUc7UUFDOEIsY0FBUyxHQUFHLEtBQUssQ0FBQztJQUVBLENBQUM7SUFFcEQsV0FBVztRQUNULElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQ7O09BRUc7SUFDTyxNQUFNO1FBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FDckMsSUFBSSxDQUFDLFNBQVMsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQ3BFLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLEdBQUcsRUFDUixJQUFJLENBQUMsSUFBSSxDQUNWLENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxLQUFLLG9CQUFvQixDQUFDLElBQUk7WUFDcEUsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLElBQUk7WUFDM0IsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNYLENBQUM7SUFFRDs7O09BR0c7SUFDSCxZQUFZO1FBQ1YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFUyxhQUFhO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7OzJHQXhIVSxjQUFjOytGQUFkLGNBQWMsNFZDeEIzQiw0UEFVQTsyRkRjYSxjQUFjO2tCQUwxQixTQUFTOytCQUNFLFVBQVUsbUJBRUgsdUJBQXVCLENBQUMsTUFBTTttR0FTdEMsU0FBUztzQkFBakIsS0FBSztnQkFVRyxNQUFNO3NCQUFkLEtBQUs7Z0JBTUcsR0FBRztzQkFBWCxLQUFLO2dCQUtHLElBQUk7c0JBQVosS0FBSztnQkFNRyxPQUFPO3NCQUFmLEtBQUs7Z0JBS0ksTUFBTTtzQkFBZixNQUFNO2dCQVk4QixhQUFhO3NCQUFqRCxXQUFXO3VCQUFDLHNCQUFzQjtnQkFPRixTQUFTO3NCQUF6QyxXQUFXO3VCQUFDLGtCQUFrQjtnQkFPRSxTQUFTO3NCQUF6QyxXQUFXO3VCQUFDLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbWFnZSwgSW1hZ2VHcm91cCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBJbWFnZUxvYWRpbmdTdHJhdGVneSwgTWVkaWEsIE1lZGlhQ29udGFpbmVyIH0gZnJvbSAnLi9tZWRpYS5tb2RlbCc7XG5pbXBvcnQgeyBNZWRpYVNlcnZpY2UgfSBmcm9tICcuL21lZGlhLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1tZWRpYScsXG4gIHRlbXBsYXRlVXJsOiAnLi9tZWRpYS5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNZWRpYUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBUaGUgbWVkaWEgY29udGFpbmVyIGNhbiBob2xkIG11bHRpcGxlIG1lZGlhIGl0ZW1zLCBzbyB0aGF0XG4gICAqIGEgc3BlY2lmaWMgbWVkaWEgKGJ5IGZvcm1hdCkgY2FuIGJlIHVzZWQgb3IgbXVsdGlwbGUgbWVkaWFcbiAgICogY2FuIGJlIHByb3ZpZGVkIGluIGEgYHNyY3NldGAgc28gdGhlIGJyb3dzZXIgd2lsbCBmaWd1cmUgb3V0XG4gICAqIHRoZSBiZXN0IG1lZGlhIGZvciB0aGUgZGV2aWNlLlxuICAgKi9cbiAgQElucHV0KCkgY29udGFpbmVyOlxuICAgIHwgTWVkaWFDb250YWluZXJcbiAgICB8IEltYWdlXG4gICAgfCBJbWFnZUdyb3VwXG4gICAgfCBJbWFnZUdyb3VwW11cbiAgICB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogaWYgYSBtZWRpYSBmb3JtYXQgaXMgZ2l2ZW4sIGEgbWVkaWEgZm9yIHRoZSBnaXZlbiBmb3JtYXQgd2lsbCBiZSByZW5kZXJlZFxuICAgKi9cbiAgQElucHV0KCkgZm9ybWF0OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgc3BlY2lmaWMgYWx0IHRleHQgZm9yIGFuIGltYWdlLCB3aGljaCBvdmVycnVsZXMgdGhlIGFsdCB0ZXh0XG4gICAqIGZyb20gdGhlIGNvbnRhaW5lciBkYXRhLlxuICAgKi9cbiAgQElucHV0KCkgYWx0OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIHNldCByb2xlIG9mIHRoZSBpbWFnZSBpZiBkaWZmZXJlbnQgdGhhbiB3aGF0IGlzIGludGVuZGVkIChlZywgcm9sZT1cInByZXNlbnRhdGlvblwiKVxuICAgKi9cbiAgQElucHV0KCkgcm9sZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGxvYWRpbmcgc3RyYXRlZ3kgb2YgdGhlIG1lZGlhLiBEZWZhdWx0cyB0byBnbG9iYWwgbG9hZGluZyBzdHJhdGVneS5cbiAgICogVXNlICdsYXp5JyBvciAnZWFnZXInIHN0cmF0ZWdpZXMuXG4gICAqL1xuICBASW5wdXQoKSBsb2FkaW5nOiBJbWFnZUxvYWRpbmdTdHJhdGVneSB8IG51bGwgPSB0aGlzLmxvYWRpbmdTdHJhdGVneTtcblxuICAvKipcbiAgICogT25jZSB0aGUgbWVkaWEgaXMgbG9hZGVkLCB3ZSBlbWl0IGFuIGV2ZW50LlxuICAgKi9cbiAgQE91dHB1dCgpIGxvYWRlZDogRXZlbnRFbWl0dGVyPEJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxCb29sZWFuPigpO1xuXG4gIC8qKlxuICAgKiBUaGUgbWVkaWEgY29udGFpbnMgdGhlIGluZm8gZm9yIHRoZSBVSSB0byBjcmVhdGUgdGhlIGltYWdlLiBUaGlzIG1lZGlhXG4gICAqIG9iamVjdCBtaWdodCBjb250YWluIG1vcmUgaW5mbyBvbmNlIG90aGVyIG1lZGlhIHR5cGVzIChpLmUuIHZpZGVvKSBpcyBzdXBwb3J0ZWQuXG4gICAqL1xuICBtZWRpYTogTWVkaWEgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFRoZSBgY3gtbWVkaWFgIGNvbXBvbmVudCBoYXMgYW4gYGlzLWluaXRpYWxpemVkYCBjbGFzcyBhcyBsb25nIGFzIHRoZVxuICAgKiBtZWRpYSBpcyBiZWluZyBpbml0aWFsaXplZC5cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaXMtaW5pdGlhbGl6ZWQnKSBpc0luaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBgY3gtbWVkaWFgIGNvbXBvbmVudCBoYXMgYSBgaXMtbG9hZGluZ2AgY2xhc3MgYXMgbG9uZyBhcyB0aGVcbiAgICogbWVkaWEgaXMgbG9hZGVkLiBXZWhuIHRoZSBtZWRpYSBpcyBsb2FkZWQsIHRoZSBgaXMtaW5pdGlhbGl6ZWRgIGNsYXNzXG4gICAqIGlzIGFkZGVkLlxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5pcy1sb2FkaW5nJykgaXNMb2FkaW5nID0gdHJ1ZTtcblxuICAvKipcbiAgICogV2hlbiB0aGVyZSdzIG5vIG1lZGlhIHByb3ZpZGVkIGZvciB0aGUgY29udGVudCwgb3IgaW4gY2FzZSBhbiBlcnJvclxuICAgKiBoYXBwZW5lZCBkdXJpbmcgbG9hZGluZywgd2UgYWRkIHRoZSBgaXMtbWlzc2luZ2AgY2xhc3MuIFZpc3VhbCBlZmZlY3RzXG4gICAqIGNhbiBiZSBjb250cm9sbGVkIGJ5IENTUy5cbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaXMtbWlzc2luZycpIGlzTWlzc2luZyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBtZWRpYVNlcnZpY2U6IE1lZGlhU2VydmljZSkge31cblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLmNyZWF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIGBNZWRpYWAgb2JqZWN0XG4gICAqL1xuICBwcm90ZWN0ZWQgY3JlYXRlKCk6IHZvaWQge1xuICAgIHRoaXMubWVkaWEgPSB0aGlzLm1lZGlhU2VydmljZS5nZXRNZWRpYShcbiAgICAgIHRoaXMuY29udGFpbmVyIGluc3RhbmNlb2YgQXJyYXkgPyB0aGlzLmNvbnRhaW5lclswXSA6IHRoaXMuY29udGFpbmVyLFxuICAgICAgdGhpcy5mb3JtYXQsXG4gICAgICB0aGlzLmFsdCxcbiAgICAgIHRoaXMucm9sZVxuICAgICk7XG4gICAgaWYgKCF0aGlzLm1lZGlhPy5zcmMpIHtcbiAgICAgIHRoaXMuaGFuZGxlTWlzc2luZygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGhhbmRsZXIgaXMgY2FsbGVkIGZyb20gdGhlIFVJIHdoZW4gdGhlIGltYWdlIGlzIGxvYWRlZC5cbiAgICovXG4gIGxvYWRIYW5kbGVyKCk6IHZvaWQge1xuICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB0aGlzLmlzTWlzc2luZyA9IGZhbHNlO1xuICAgIHRoaXMubG9hZGVkLmVtaXQodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGJyb3dzZXIgc2hvdWxkIGxhenkgbG9hZCB0aGUgaW1hZ2UuXG4gICAqL1xuICBnZXQgbG9hZGluZ1N0cmF0ZWd5KCk6IEltYWdlTG9hZGluZ1N0cmF0ZWd5IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMubWVkaWFTZXJ2aWNlLmxvYWRpbmdTdHJhdGVneSA9PT0gSW1hZ2VMb2FkaW5nU3RyYXRlZ3kuTEFaWVxuICAgICAgPyBJbWFnZUxvYWRpbmdTdHJhdGVneS5MQVpZXG4gICAgICA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogV2hlbmV2ZXIgYW4gZXJyb3IgaGFwcGVucyBkdXJpbmcgbG9hZCwgd2UgbWFyayB0aGUgY29tcG9uZW50XG4gICAqIHdpdGggY3NzIGNsYXNzZXMgdG8gaGF2ZSBhIG1pc3NpbmcgbWVkaWEuXG4gICAqL1xuICBlcnJvckhhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5oYW5kbGVNaXNzaW5nKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaGFuZGxlTWlzc2luZygpIHtcbiAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgdGhpcy5pc01pc3NpbmcgPSB0cnVlO1xuICAgIHRoaXMubG9hZGVkLmVtaXQoZmFsc2UpO1xuICB9XG59XG4iLCI8aW1nXG4gICpuZ0lmPVwibWVkaWEgJiYgbWVkaWEuc3JjXCJcbiAgW2F0dHIuc3JjXT1cIm1lZGlhLnNyY1wiXG4gIFthdHRyLnNyY3NldF09XCJtZWRpYS5zcmNzZXRcIlxuICBbYXR0ci5hbHRdPVwibWVkaWEuYWx0XCJcbiAgW2F0dHIucm9sZV09XCJtZWRpYS5yb2xlXCJcbiAgW2F0dHIubG9hZGluZ109XCJsb2FkaW5nXCJcbiAgKGxvYWQpPVwibG9hZEhhbmRsZXIoKVwiXG4gIChlcnJvcik9XCJlcnJvckhhbmRsZXIoKVwiXG4vPlxuIl19