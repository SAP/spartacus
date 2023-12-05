/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@spartacus/core";
export class ConfiguratorShowMoreComponent {
    constructor(cdRef) {
        this.cdRef = cdRef;
        this.showMore = false;
        this.showHiddenText = false;
        this.textSize = 60;
    }
    ngAfterViewInit() {
        this.textNormalized = this.normalize(this.text);
        if (this.textNormalized.length > this.textSize) {
            this.showMore = true;
            this.textToShow = this.textNormalized.substring(0, this.textSize);
        }
        else {
            this.textToShow = this.textNormalized;
        }
        this.cdRef.detectChanges();
    }
    toggleShowMore() {
        this.showHiddenText = !this.showHiddenText;
        this.showHiddenText
            ? (this.textToShow = this.textNormalized)
            : (this.textToShow = this.textNormalized.substring(0, this.textSize));
        this.cdRef.detectChanges();
    }
    normalize(text = '') {
        return text.replace(/<[^>]*>/g, '');
    }
}
ConfiguratorShowMoreComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorShowMoreComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorShowMoreComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorShowMoreComponent, selector: "cx-configurator-show-more", inputs: { text: "text", textSize: "textSize", productName: "productName" }, ngImport: i0, template: "<ng-container *ngIf=\"text\">\n  <span\n    [attr.aria-label]=\"\n      'configurator.a11y.itemDescription'\n        | cxTranslate\n          : {\n              item: productName\n            }\n    \"\n    [innerHTML]=\"textToShow\"\n  ></span>\n\n  <button (click)=\"toggleShowMore()\" *ngIf=\"showMore\" tabindex=\"-1\">\n    <ng-container *ngIf=\"showHiddenText; else less\"\n      >&nbsp;... {{ 'configurator.button.less' | cxTranslate }}</ng-container\n    >\n\n    <ng-template #less>\n      &nbsp;... {{ 'configurator.button.more' | cxTranslate }}</ng-template\n    >\n  </button>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorShowMoreComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-show-more', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"text\">\n  <span\n    [attr.aria-label]=\"\n      'configurator.a11y.itemDescription'\n        | cxTranslate\n          : {\n              item: productName\n            }\n    \"\n    [innerHTML]=\"textToShow\"\n  ></span>\n\n  <button (click)=\"toggleShowMore()\" *ngIf=\"showMore\" tabindex=\"-1\">\n    <ng-container *ngIf=\"showHiddenText; else less\"\n      >&nbsp;... {{ 'configurator.button.less' | cxTranslate }}</ng-container\n    >\n\n    <ng-template #less>\n      &nbsp;... {{ 'configurator.button.more' | cxTranslate }}</ng-template\n    >\n  </button>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { text: [{
                type: Input
            }], textSize: [{
                type: Input
            }], productName: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXNob3ctbW9yZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvc2hvdy1tb3JlL2NvbmZpZ3VyYXRvci1zaG93LW1vcmUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL3Nob3ctbW9yZS9jb25maWd1cmF0b3Itc2hvdy1tb3JlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxLQUFLLEdBQ04sTUFBTSxlQUFlLENBQUM7Ozs7QUFPdkIsTUFBTSxPQUFPLDZCQUE2QjtJQVV4QyxZQUFzQixLQUF3QjtRQUF4QixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQVQ5QyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBS2QsYUFBUSxHQUFHLEVBQUUsQ0FBQztJQUcwQixDQUFDO0lBRWxELGVBQWU7UUFDYixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhELElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUM5QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbkU7YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztTQUN2QztRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUUzQyxJQUFJLENBQUMsY0FBYztZQUNqQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFeEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRVMsU0FBUyxDQUFDLE9BQWUsRUFBRTtRQUNuQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7OzBIQXBDVSw2QkFBNkI7OEdBQTdCLDZCQUE2Qiw2SUNuQjFDLGltQkFzQkE7MkZESGEsNkJBQTZCO2tCQUx6QyxTQUFTOytCQUNFLDJCQUEyQixtQkFFcEIsdUJBQXVCLENBQUMsTUFBTTt3R0FRdEMsSUFBSTtzQkFBWixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWNvbmZpZ3VyYXRvci1zaG93LW1vcmUnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29uZmlndXJhdG9yLXNob3ctbW9yZS5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JTaG93TW9yZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBzaG93TW9yZSA9IGZhbHNlO1xuICBzaG93SGlkZGVuVGV4dCA9IGZhbHNlO1xuICB0ZXh0VG9TaG93OiBzdHJpbmc7XG4gIHRleHROb3JtYWxpemVkOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgdGV4dDogc3RyaW5nO1xuICBASW5wdXQoKSB0ZXh0U2l6ZSA9IDYwO1xuICBASW5wdXQoKSBwcm9kdWN0TmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMudGV4dE5vcm1hbGl6ZWQgPSB0aGlzLm5vcm1hbGl6ZSh0aGlzLnRleHQpO1xuXG4gICAgaWYgKHRoaXMudGV4dE5vcm1hbGl6ZWQubGVuZ3RoID4gdGhpcy50ZXh0U2l6ZSkge1xuICAgICAgdGhpcy5zaG93TW9yZSA9IHRydWU7XG4gICAgICB0aGlzLnRleHRUb1Nob3cgPSB0aGlzLnRleHROb3JtYWxpemVkLnN1YnN0cmluZygwLCB0aGlzLnRleHRTaXplKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50ZXh0VG9TaG93ID0gdGhpcy50ZXh0Tm9ybWFsaXplZDtcbiAgICB9XG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICB0b2dnbGVTaG93TW9yZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dIaWRkZW5UZXh0ID0gIXRoaXMuc2hvd0hpZGRlblRleHQ7XG5cbiAgICB0aGlzLnNob3dIaWRkZW5UZXh0XG4gICAgICA/ICh0aGlzLnRleHRUb1Nob3cgPSB0aGlzLnRleHROb3JtYWxpemVkKVxuICAgICAgOiAodGhpcy50ZXh0VG9TaG93ID0gdGhpcy50ZXh0Tm9ybWFsaXplZC5zdWJzdHJpbmcoMCwgdGhpcy50ZXh0U2l6ZSkpO1xuXG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbm9ybWFsaXplKHRleHQ6IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC88W14+XSo+L2csICcnKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cInRleHRcIj5cbiAgPHNwYW5cbiAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIlxuICAgICAgJ2NvbmZpZ3VyYXRvci5hMTF5Lml0ZW1EZXNjcmlwdGlvbidcbiAgICAgICAgfCBjeFRyYW5zbGF0ZVxuICAgICAgICAgIDoge1xuICAgICAgICAgICAgICBpdGVtOiBwcm9kdWN0TmFtZVxuICAgICAgICAgICAgfVxuICAgIFwiXG4gICAgW2lubmVySFRNTF09XCJ0ZXh0VG9TaG93XCJcbiAgPjwvc3Bhbj5cblxuICA8YnV0dG9uIChjbGljayk9XCJ0b2dnbGVTaG93TW9yZSgpXCIgKm5nSWY9XCJzaG93TW9yZVwiIHRhYmluZGV4PVwiLTFcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwic2hvd0hpZGRlblRleHQ7IGVsc2UgbGVzc1wiXG4gICAgICA+Jm5ic3A7Li4uIHt7ICdjb25maWd1cmF0b3IuYnV0dG9uLmxlc3MnIHwgY3hUcmFuc2xhdGUgfX08L25nLWNvbnRhaW5lclxuICAgID5cblxuICAgIDxuZy10ZW1wbGF0ZSAjbGVzcz5cbiAgICAgICZuYnNwOy4uLiB7eyAnY29uZmlndXJhdG9yLmJ1dHRvbi5tb3JlJyB8IGN4VHJhbnNsYXRlIH19PC9uZy10ZW1wbGF0ZVxuICAgID5cbiAgPC9idXR0b24+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==