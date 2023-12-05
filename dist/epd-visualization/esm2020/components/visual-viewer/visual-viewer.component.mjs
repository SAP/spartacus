/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input, Output, } from '@angular/core';
import { NavigationMode } from './models/navigation-mode';
import { SelectionMode } from './models/selection-mode';
import { VisualViewerService } from './visual-viewer.service';
import * as i0 from "@angular/core";
import * as i1 from "./visual-viewer.service";
import * as i2 from "@angular/common";
import * as i3 from "./toolbar/visual-viewer-toolbar-button/visual-viewer-toolbar-button.component";
import * as i4 from "./toolbar/visual-viewer-animation-slider/visual-viewer-animation-slider.component";
import * as i5 from "@spartacus/storefront";
import * as i6 from "@spartacus/core";
export class VisualViewerComponent {
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
VisualViewerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerComponent, deps: [{ token: i1.VisualViewerService }], target: i0.ɵɵFactoryTarget.Component });
VisualViewerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: VisualViewerComponent, selector: "cx-epd-visualization-viewer", inputs: { backgroundTopColor: "backgroundTopColor", backgroundBottomColor: "backgroundBottomColor", hotspotSelectionColor: "hotspotSelectionColor", showAllHotspotsEnabled: "showAllHotspotsEnabled", showAllHotspotsColor: "showAllHotspotsColor", outlineColor: "outlineColor", outlineWidth: "outlineWidth", selectionMode: "selectionMode", selectedProductCodes: "selectedProductCodes", includedProductCodes: "includedProductCodes", excludedOpacity: "excludedOpacity", animationTime: "animationTime", animationPosition: "animationPosition", animationPlaying: "animationPlaying", navigationMode: "navigationMode", isolateModeEnabled: "isolateModeEnabled" }, outputs: { selectedProductCodesChange: "selectedProductCodesChange", animationTimeChange: "animationTimeChange", animationPositionChange: "animationPositionChange", animationPlayingChange: "animationPlayingChange", isolateModeEnabledChange: "isolateModeEnabledChange", viewportReadyChange: "viewportReadyChange" }, providers: [VisualViewerService], ngImport: i0, template: "<ng-container *ngIf=\"viewportReady; else loading\">\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n  <div class=\"content-type-symbol\" [hidden]=\"!viewportReady\">\n    <span class=\"content-type-text\">{{\n      (is2D\n        ? 'epdVisualization.visualViewer.contentType.drawing2D'\n        : 'epdVisualization.visualViewer.contentType.model3D'\n      ) | cxTranslate\n    }}</span>\n  </div>\n\n  <div class=\"bottom overlay\">\n    <div [hidden]=\"!viewportReady\" class=\"toolbar\">\n      <div class=\"toolbarHBox\">\n        <div class=\"toolbarButtonsHBox\">\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"homeButton\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-home\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.homeButton.label'\n                | cxTranslate\n            }}\"\n            (click)=\"activateHomeView()\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"turntableButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-sync-alt\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.rotateButton.label'\n                | cxTranslate\n            }}\"\n            [hidden]=\"is2D\"\n            (click)=\"navigationMode = NavigationMode.Turntable\"\n            [checked]=\"navigationMode === NavigationMode.Turntable\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"panButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-arrows-alt\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.panButton.label'\n                | cxTranslate\n            }}\"\n            (click)=\"navigationMode = NavigationMode.Pan\"\n            [checked]=\"navigationMode === NavigationMode.Pan\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"zoomButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-search\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.zoomButton.label'\n                | cxTranslate\n            }}\"\n            (click)=\"navigationMode = NavigationMode.Zoom\"\n            [checked]=\"navigationMode === NavigationMode.Zoom\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"isolateButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            [hidden]=\"is2D\"\n            [disabled]=\"\n              !isolateModeEnabled && selectedProductCodes?.length === 0\n            \"\n            iconClass=\"fa-compress\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.isolateButton.label'\n                | cxTranslate\n            }}\"\n            (click)=\"isolateModeEnabled = !isolateModeEnabled\"\n            [checked]=\"isolateModeEnabled\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"playPauseButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"{{ animationPlaying ? 'fa-pause' : 'fa-play' }}\"\n            text=\"{{\n              (animationPlaying\n                ? 'epdVisualization.visualViewer.toolbar.pauseButton.label'\n                : 'epdVisualization.visualViewer.toolbar.playButton.label'\n              ) | cxTranslate\n            }}\"\n            [hidden]=\"is2D || animationTotalDuration <= 0\"\n            [disabled]=\"isolateModeEnabled\"\n            (click)=\"animationPlaying ? pauseAnimation() : playAnimation()\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"showAllHotpotsButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-highlighter\"\n            text=\"{{\n              (showAllHotspotsEnabled\n                ? 'epdVisualization.visualViewer.toolbar.hotspotsButton.hide'\n                : 'epdVisualization.visualViewer.toolbar.hotspotsButton.show'\n              ) | cxTranslate\n            }}\"\n            [checked]=\"showAllHotspotsEnabled\"\n            [hidden]=\"!is2D\"\n            (click)=\"showAllHotspotsEnabled = !showAllHotspotsEnabled\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n        </div>\n\n        <div [hidden]=\"is2D || animationTotalDuration <= 0\">\n          <cx-epd-visualization-animation-slider\n            [disabled]=\"isolateModeEnabled\"\n            [(value)]=\"animationPosition\"\n            (keydown.enter)=\"\n              animationPlaying ? pauseAnimation() : playAnimation();\n              $event.preventDefault()\n            \"\n            (keydown.space)=\"\n              animationPlaying ? pauseAnimation() : playAnimation();\n              $event.preventDefault()\n            \"\n          ></cx-epd-visualization-animation-slider>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.VisualViewerToolbarButtonComponent, selector: "cx-epd-visualization-viewer-toolbar-button", inputs: ["text", "iconLibraryClass", "iconClass", "disabled", "checked"] }, { kind: "component", type: i4.VisualViewerAnimationSliderComponent, selector: "cx-epd-visualization-animation-slider", inputs: ["hidden", "value", "disabled"], outputs: ["valueChange", "initializedChange"] }, { kind: "component", type: i5.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i6.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-epd-visualization-viewer', providers: [VisualViewerService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"viewportReady; else loading\">\n  <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n  <div class=\"content-type-symbol\" [hidden]=\"!viewportReady\">\n    <span class=\"content-type-text\">{{\n      (is2D\n        ? 'epdVisualization.visualViewer.contentType.drawing2D'\n        : 'epdVisualization.visualViewer.contentType.model3D'\n      ) | cxTranslate\n    }}</span>\n  </div>\n\n  <div class=\"bottom overlay\">\n    <div [hidden]=\"!viewportReady\" class=\"toolbar\">\n      <div class=\"toolbarHBox\">\n        <div class=\"toolbarButtonsHBox\">\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"homeButton\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-home\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.homeButton.label'\n                | cxTranslate\n            }}\"\n            (click)=\"activateHomeView()\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"turntableButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-sync-alt\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.rotateButton.label'\n                | cxTranslate\n            }}\"\n            [hidden]=\"is2D\"\n            (click)=\"navigationMode = NavigationMode.Turntable\"\n            [checked]=\"navigationMode === NavigationMode.Turntable\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"panButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-arrows-alt\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.panButton.label'\n                | cxTranslate\n            }}\"\n            (click)=\"navigationMode = NavigationMode.Pan\"\n            [checked]=\"navigationMode === NavigationMode.Pan\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"zoomButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-search\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.zoomButton.label'\n                | cxTranslate\n            }}\"\n            (click)=\"navigationMode = NavigationMode.Zoom\"\n            [checked]=\"navigationMode === NavigationMode.Zoom\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"isolateButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            [hidden]=\"is2D\"\n            [disabled]=\"\n              !isolateModeEnabled && selectedProductCodes?.length === 0\n            \"\n            iconClass=\"fa-compress\"\n            text=\"{{\n              'epdVisualization.visualViewer.toolbar.isolateButton.label'\n                | cxTranslate\n            }}\"\n            (click)=\"isolateModeEnabled = !isolateModeEnabled\"\n            [checked]=\"isolateModeEnabled\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"playPauseButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"{{ animationPlaying ? 'fa-pause' : 'fa-play' }}\"\n            text=\"{{\n              (animationPlaying\n                ? 'epdVisualization.visualViewer.toolbar.pauseButton.label'\n                : 'epdVisualization.visualViewer.toolbar.playButton.label'\n              ) | cxTranslate\n            }}\"\n            [hidden]=\"is2D || animationTotalDuration <= 0\"\n            [disabled]=\"isolateModeEnabled\"\n            (click)=\"animationPlaying ? pauseAnimation() : playAnimation()\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n\n          <cx-epd-visualization-viewer-toolbar-button\n            class=\"showAllHotpotsButton toolbarItem\"\n            iconLibraryClass=\"fas\"\n            iconClass=\"fa-highlighter\"\n            text=\"{{\n              (showAllHotspotsEnabled\n                ? 'epdVisualization.visualViewer.toolbar.hotspotsButton.hide'\n                : 'epdVisualization.visualViewer.toolbar.hotspotsButton.show'\n              ) | cxTranslate\n            }}\"\n            [checked]=\"showAllHotspotsEnabled\"\n            [hidden]=\"!is2D\"\n            (click)=\"showAllHotspotsEnabled = !showAllHotspotsEnabled\"\n          ></cx-epd-visualization-viewer-toolbar-button>\n        </div>\n\n        <div [hidden]=\"is2D || animationTotalDuration <= 0\">\n          <cx-epd-visualization-animation-slider\n            [disabled]=\"isolateModeEnabled\"\n            [(value)]=\"animationPosition\"\n            (keydown.enter)=\"\n              animationPlaying ? pauseAnimation() : playAnimation();\n              $event.preventDefault()\n            \"\n            (keydown.space)=\"\n              animationPlaying ? pauseAnimation() : playAnimation();\n              $event.preventDefault()\n            \"\n          ></cx-epd-visualization-animation-slider>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.VisualViewerService }]; }, propDecorators: { backgroundTopColor: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsLXZpZXdlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2VwZC12aXN1YWxpemF0aW9uL2NvbXBvbmVudHMvdmlzdWFsLXZpZXdlci92aXN1YWwtdmlld2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvZXBkLXZpc3VhbGl6YXRpb24vY29tcG9uZW50cy92aXN1YWwtdmlld2VyL3Zpc3VhbC12aWV3ZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV4RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7Ozs7QUFROUQsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUFzQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQStHOUQsK0JBQTBCLEdBQ3hCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQywwQkFBMEIsQ0FBQztRQTBDdEQsd0JBQW1CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixDQUFDO1FBbUJ6RCw0QkFBdUIsR0FDL0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHVCQUF1QixDQUFDO1FBYW5ELDJCQUFzQixHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQztRQTJCekUsNkJBQXdCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHdCQUF3QixDQUFDO1FBZW5FLHdCQUFtQixHQUFHLElBQUksQ0FB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QyxNQUFNOzBHQVUzQyxrQkFBa0I7c0JBRHJCLEtBQUs7Z0JBYUYscUJBQXFCO3NCQUR4QixLQUFLO2dCQWFGLHFCQUFxQjtzQkFEeEIsS0FBSztnQkFZRixzQkFBc0I7c0JBRHpCLEtBQUs7Z0JBYUYsb0JBQW9CO3NCQUR2QixLQUFLO2dCQWFGLFlBQVk7c0JBRGYsS0FBSztnQkFZRixZQUFZO3NCQURmLEtBQUs7Z0JBZUYsYUFBYTtzQkFEaEIsS0FBSztnQkFjRixvQkFBb0I7c0JBRHZCLEtBQUs7Z0JBUU4sMEJBQTBCO3NCQUR6QixNQUFNO2dCQWVILG9CQUFvQjtzQkFEdkIsS0FBSztnQkFZRixlQUFlO3NCQURsQixLQUFLO2dCQVlGLGFBQWE7c0JBRGhCLEtBQUs7Z0JBUU4sbUJBQW1CO3NCQURsQixNQUFNO2dCQWNILGlCQUFpQjtzQkFEcEIsS0FBSztnQkFPSSx1QkFBdUI7c0JBQWhDLE1BQU07Z0JBT0gsZ0JBQWdCO3NCQURuQixLQUFLO2dCQVFOLHNCQUFzQjtzQkFEckIsTUFBTTtnQkFVSCxjQUFjO3NCQURqQixLQUFLO2dCQVlGLGtCQUFrQjtzQkFEckIsS0FBSztnQkFRTix3QkFBd0I7c0JBRHZCLE1BQU07Z0JBZ0JHLG1CQUFtQjtzQkFBNUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbk1vZGUgfSBmcm9tICcuL21vZGVscy9uYXZpZ2F0aW9uLW1vZGUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZSB9IGZyb20gJy4vbW9kZWxzL3NlbGVjdGlvbi1tb2RlJztcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Mb2FkSW5mbyB9IGZyb20gJy4vbW9kZWxzL3Zpc3VhbGl6YXRpb24tbG9hZC1pbmZvJztcbmltcG9ydCB7IFZpc3VhbFZpZXdlclNlcnZpY2UgfSBmcm9tICcuL3Zpc3VhbC12aWV3ZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWVwZC12aXN1YWxpemF0aW9uLXZpZXdlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi92aXN1YWwtdmlld2VyLmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbVmlzdWFsVmlld2VyU2VydmljZV0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBWaXN1YWxWaWV3ZXJDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdmlzdWFsVmlld2VyU2VydmljZTogVmlzdWFsVmlld2VyU2VydmljZSkge31cblxuICAvKipcbiAgICogVGhlIHRvcCBjb2xvdXIgb2YgdGhlIGJhY2tncm91bmQgZ3JhZGllbnQuXG4gICAqIENhbiBiZSBwYXNzZWQgaW4gdGhlIENTUyBjb2xvciBmb3JtYXQgb3IgYXMgYSBTcGFydGFjdXMgdGhlbWUgY29sb3IgaS5lLiAnLS1jeC1jb2xvci1iYWNrZ3JvdW5kJyB3aXRoIHRoZSBxdW90ZXMuXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgYmFja2dyb3VuZFRvcENvbG9yKGJhY2tncm91bmRUb3BDb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy52aXN1YWxWaWV3ZXJTZXJ2aWNlLmJhY2tncm91bmRUb3BDb2xvciA9IGJhY2tncm91bmRUb3BDb2xvcjtcbiAgfVxuICBnZXQgYmFja2dyb3VuZFRvcENvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5iYWNrZ3JvdW5kVG9wQ29sb3I7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGJvdHRvbSBjb2xvdXIgb2YgdGhlIGJhY2tncm91bmQgZ3JhZGllbnQuXG4gICAqIENhbiBiZSBwYXNzZWQgaW4gdGhlIENTUyBjb2xvciBmb3JtYXQgb3IgYXMgYSBTcGFydGFjdXMgdGhlbWUgY29sb3IgaS5lLiAnLS1jeC1jb2xvci1iYWNrZ3JvdW5kJyB3aXRoIHRoZSBxdW90ZXMuXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgYmFja2dyb3VuZEJvdHRvbUNvbG9yKGJhY2tncm91bmRCb3R0b21Db2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy52aXN1YWxWaWV3ZXJTZXJ2aWNlLmJhY2tncm91bmRCb3R0b21Db2xvciA9IGJhY2tncm91bmRCb3R0b21Db2xvcjtcbiAgfVxuICBnZXQgYmFja2dyb3VuZEJvdHRvbUNvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5iYWNrZ3JvdW5kQm90dG9tQ29sb3I7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGNvbG91ciBhcHBsaWVkIHRvIHNlbGVjdGVkIDJEIGhvdHNwb3RzIGluIDJEIGNvbnRlbnQuXG4gICAqIENhbiBiZSBwYXNzZWQgaW4gdGhlIENTUyBjb2xvciBmb3JtYXQgb3IgYXMgYSBTcGFydGFjdXMgdGhlbWUgY29sb3IgaS5lLiAnLS1jeC1jb2xvci1wcmltYXJ5JyB3aXRoIHRoZSBxdW90ZXMuXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgaG90c3BvdFNlbGVjdGlvbkNvbG9yKGhvdHNwb3RTZWxlY3Rpb25Db2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy52aXN1YWxWaWV3ZXJTZXJ2aWNlLmhvdHNwb3RTZWxlY3Rpb25Db2xvciA9IGhvdHNwb3RTZWxlY3Rpb25Db2xvcjtcbiAgfVxuICBnZXQgaG90c3BvdFNlbGVjdGlvbkNvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5ob3RzcG90U2VsZWN0aW9uQ29sb3I7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiB0cnVlLCBhbGwgaG90c3BvdHMgaW4gMkQgY29udGVudCB0aGF0IGFyZSBpbmNsdWRlZCBpbiB0aGUgaW5jbHVkZWRQcm9kdWN0Q29kZXMgcHJvcGVydHkgYXJlIGhpZ2hsaWdodGVkIHVzaW5nIHRoZSBjb2xvdXIgc3BlY2lmaWVkIGJ5IHRoZSBzaG93QWxsSG90c3BvdHNDb2xvciBwcm9wZXJ0eS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBzaG93QWxsSG90c3BvdHNFbmFibGVkKHNob3dBbGxIb3RzcG90c0VuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnZpc3VhbFZpZXdlclNlcnZpY2Uuc2hvd0FsbEhvdHNwb3RzRW5hYmxlZCA9IHNob3dBbGxIb3RzcG90c0VuYWJsZWQ7XG4gIH1cbiAgZ2V0IHNob3dBbGxIb3RzcG90c0VuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5zaG93QWxsSG90c3BvdHNFbmFibGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjb2xvdXIgdXNlZCB0byBoaWdobGlnaHQgaG90c3BvdHMgaW4gMkQgY29udGVudCB3aGVuIHRoZSBzaG93QWxsSG90c3BvdHNFbmFibGVkIHByb3BlcnR5IGhhcyBhIHZhbHVlIG9mIHRydWUuXG4gICAqIENhbiBiZSBwYXNzZWQgaW4gdGhlIENTUyBjb2xvciBmb3JtYXQgb3IgYXMgYSBTcGFydGFjdXMgdGhlbWUgY29sb3IgaS5lLiAnLS1jeC1jb2xvci1wcmltYXJ5JyB3aXRoIHRoZSBxdW90ZXMuXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgc2hvd0FsbEhvdHNwb3RzQ29sb3Ioc2hvd0FsbEhvdHNwb3RzQ29sb3I6IHN0cmluZykge1xuICAgIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5zaG93QWxsSG90c3BvdHNDb2xvciA9IHNob3dBbGxIb3RzcG90c0NvbG9yO1xuICB9XG4gIGdldCBzaG93QWxsSG90c3BvdHNDb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnZpc3VhbFZpZXdlclNlcnZpY2Uuc2hvd0FsbEhvdHNwb3RzQ29sb3I7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG91dGxpbmUgY29sb3VyIHVzZWQgdG8gaW5kaWNhdGUgc2VsZWN0ZWQgb2JqZWN0cyBpbiAzRCBjb250ZW50LlxuICAgKiBDYW4gYmUgcGFzc2VkIGluIHRoZSBDU1MgY29sb3IgZm9ybWF0IG9yIGFzIGEgU3BhcnRhY3VzIHRoZW1lIGNvbG9yIGkuZS4gJy0tY3gtY29sb3ItcHJpbWFyeScgd2l0aCB0aGUgcXVvdGVzLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IG91dGxpbmVDb2xvcihvdXRsaW5lQ29sb3I6IHN0cmluZykge1xuICAgIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5vdXRsaW5lQ29sb3IgPSBvdXRsaW5lQ29sb3I7XG4gIH1cbiAgZ2V0IG91dGxpbmVDb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnZpc3VhbFZpZXdlclNlcnZpY2Uub3V0bGluZUNvbG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgb3V0bGluZSAoaW4gcGl4ZWxzKSB1c2VkIHRvIGluZGljYXRlIHNlbGVjdGVkIG9iamVjdHMgaW4gM0QgY29udGVudC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBvdXRsaW5lV2lkdGgob3V0bGluZVdpZHRoOiBudW1iZXIpIHtcbiAgICB0aGlzLnZpc3VhbFZpZXdlclNlcnZpY2Uub3V0bGluZVdpZHRoID0gb3V0bGluZVdpZHRoO1xuICB9XG4gIGdldCBvdXRsaW5lV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy52aXN1YWxWaWV3ZXJTZXJ2aWNlLm91dGxpbmVXaWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgc2VsZWN0aW9uIG1vZGUuXG4gICAqIE5vbmUgLSBTZWxlY3Rpb24gaXMgZGlzYWJsZWQuXG4gICAqIEV4Y2x1c2l2ZSAtIFdoZW4gc2VsZWN0aW5nIG9iamVjdHMgaW4gdGhlIHZpZXdwb3J0LCBhdCBtb3N0IG9uZSBvYmplY3QgY2FuIGJlIHNlbGVjdGVkIGF0IGEgdGltZS4gQ2xpY2tpbmcvdGFwcGluZyB0byBzZWxlY3QgYSBuZXcgb2JqZWN0IHdpbGwgZGVzZWxlY3QgYW55IHByZXZpb3VzbHkgc2VsZWN0ZWQgb2JqZWN0cy5cbiAgICogU3RpY2t5IC0gQSBtdWx0aXBsZSBzZWxlY3Rpb24gbW9kZSBpbiB3aGljaCBjbGlja2luZy90YXBwaW5nIG9uIGFuIG9iamVjdCB0aGF0IGlzIG5vdCBwYXJ0IG9mIHRoZSBjdXJyZW50IHNlbGVjdGlvbiB3aWxsIHRvZ2dsZSBpdHMgc2VsZWN0aW9uIHN0YXRlIHdpdGhvdXQgbW9kaWZ5aW5nIHRoZSBzZWxlY3Rpb24gc3RhdGUgb2YgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBvYmplY3RzLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHNlbGVjdGlvbk1vZGUoc2VsZWN0aW9uTW9kZTogU2VsZWN0aW9uTW9kZSkge1xuICAgIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5zZWxlY3Rpb25Nb2RlID0gc2VsZWN0aW9uTW9kZTtcbiAgfVxuICBnZXQgc2VsZWN0aW9uTW9kZSgpOiBTZWxlY3Rpb25Nb2RlIHtcbiAgICByZXR1cm4gdGhpcy52aXN1YWxWaWV3ZXJTZXJ2aWNlLnNlbGVjdGlvbk1vZGU7XG4gIH1cblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBzZWxlY3Rpb24gaW4gdGVybXMgb2YgcHJvZHVjdCBjb2Rlcy5cbiAgICogR2V0cyB0aGUgc2V0IG9mIHByb2R1Y3QgY29kZXMgYXBwbGllZCB0byB0aGUgc2VsZWN0ZWQgc2NlbmUgbm9kZXMuXG4gICAqIFNldHMgdGhlIHNlbGVjdGlvbiBzZXQgYmFzZWQgb24gdGhlIHNldCBvZiBzdXBwbGllZCBwcm9kdWN0IGNvZGVzLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHNlbGVjdGVkUHJvZHVjdENvZGVzKHNlbGVjdGVkUHJvZHVjdENvZGVzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5zZWxlY3RlZFByb2R1Y3RDb2RlcyA9IHNlbGVjdGVkUHJvZHVjdENvZGVzO1xuICB9XG4gIGdldCBzZWxlY3RlZFByb2R1Y3RDb2RlcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5zZWxlY3RlZFByb2R1Y3RDb2RlcztcbiAgfVxuICBAT3V0cHV0KClcbiAgc2VsZWN0ZWRQcm9kdWN0Q29kZXNDaGFuZ2UgPVxuICAgIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5zZWxlY3RlZFByb2R1Y3RDb2Rlc0NoYW5nZTtcblxuICAvKipcbiAgICogR2V0cy9zZXRzIHdoaWNoIG9iamVjdHMgc2hvdWxkIGJlIHNlbGVjdGFibGUgKGluIHRlcm1zIG9mIHByb2R1Y3QgY29kZXMpLlxuICAgKiBGb3IgM0QgY29udGVudDpcbiAgICogLSBvYmplY3RzIHRoYXQgYXJlIGluY2x1ZGVkIHdpbGwgYmUgc2VsZWN0YWJsZSBhbmQgb3BhcXVlXG4gICAqIC0gb2JqZWN0cyB0aGF0IGFyZSBub3QgaW5jbHVkZWQgd2lsbCBub3QgYmUgc2VsZWN0YWJsZSBhbmQgd2lsbCBoYXZlIGFuIG9wYWNpdHkgc3BlY2lmaWVkIGJ5IHRoZSBleGNsdWRlZE9wYWNpdHkgcHJvcGVydHkuXG4gICAqXG4gICAqIEZvciAyRCBjb250ZW50OlxuICAgKiAtIGhvdHNwb3RzIHRoYXQgYXJlIGluY2x1ZGVkIHdpbGwgYmUgc2VsZWN0YWJsZSBhbmQgY2FuIGJlIG1hZGUgdmlzaWJsZVxuICAgKiAtIGhvdHNwb3RzIHRoYXQgYXJlIG5vdCBpbmNsdWRlZCB3aWxsIG5vdCBiZSBzZWxlY3RhYmxlIG9yIHZpc2libGVcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBpbmNsdWRlZFByb2R1Y3RDb2RlcyhpbmNsdWRlZFByb2R1Y3RDb2Rlczogc3RyaW5nW10pIHtcbiAgICB0aGlzLnZpc3VhbFZpZXdlclNlcnZpY2UuaW5jbHVkZWRQcm9kdWN0Q29kZXMgPSBpbmNsdWRlZFByb2R1Y3RDb2RlcztcbiAgfVxuICBnZXQgaW5jbHVkZWRQcm9kdWN0Q29kZXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLnZpc3VhbFZpZXdlclNlcnZpY2UuaW5jbHVkZWRQcm9kdWN0Q29kZXM7XG4gIH1cblxuICAvKipcbiAgICogIEdldHMvc2V0cyB0aGUgb3BhY2l0eSB0byBhcHBseSB0byAzRCBvYmplY3RzIHRoYXQgYXJlIG5vdCBpbiB0aGUgc2V0IHNwZWNpZmllZCBieSB0aGUgaW5jbHVkZWRQcm9kdWN0Q29kZXMgcHJvcGVydHlcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBleGNsdWRlZE9wYWNpdHkoZXhjbHVkZWRPcGFjaXR5OiBudW1iZXIpIHtcbiAgICB0aGlzLnZpc3VhbFZpZXdlclNlcnZpY2UuZXhjbHVkZWRPcGFjaXR5ID0gZXhjbHVkZWRPcGFjaXR5O1xuICB9XG4gIGdldCBleGNsdWRlZE9wYWNpdHkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy52aXN1YWxWaWV3ZXJTZXJ2aWNlLmV4Y2x1ZGVkT3BhY2l0eTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCB0aW1lIHBvc2l0aW9uIGluIHNlY29uZHMgaW4gdGhlIGFuaW1hdGlvbiAoaWYgdGhlcmUgaXMgb25lKS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBhbmltYXRpb25UaW1lKGFuaW1hdGlvblRpbWU6IG51bWJlcikge1xuICAgIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5hbmltYXRpb25UaW1lID0gYW5pbWF0aW9uVGltZTtcbiAgfVxuICBnZXQgYW5pbWF0aW9uVGltZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnZpc3VhbFZpZXdlclNlcnZpY2UuYW5pbWF0aW9uVGltZTtcbiAgfVxuICBAT3V0cHV0KClcbiAgYW5pbWF0aW9uVGltZUNoYW5nZSA9IHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5hbmltYXRpb25UaW1lQ2hhbmdlO1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB0b3RhbCBkdXJhdGlvbiBvZiB0aGUgYW5pbWF0aW9uIChpZiB0aGVyZSBpcyBvbmUpLiBBIHRvdGFsIGR1cmF0aW9uIG9mIDAgaW5kaWNhdGVzIHRoYXQgdGhlcmUgaXMgbm8gYW5pbWF0aW9uIHRoYXQgY2FuIGJlIHBsYXllZC5cbiAgICovXG4gIGdldCBhbmltYXRpb25Ub3RhbER1cmF0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5hbmltYXRpb25Ub3RhbER1cmF0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqICBUaGUgYW5pbWF0aW9uIHBsYXliYWNrIHBvc2l0aW9uIGFzIGEgZnJhY3Rpb25hbCB2YWx1ZSBiZXR3ZWVuIDAgKHN0YXJ0KSBhbmQgMSAoZW5kKS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBhbmltYXRpb25Qb3NpdGlvbihhbmltYXRpb25Qb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgdGhpcy52aXN1YWxWaWV3ZXJTZXJ2aWNlLmFuaW1hdGlvblBvc2l0aW9uID0gYW5pbWF0aW9uUG9zaXRpb247XG4gIH1cbiAgZ2V0IGFuaW1hdGlvblBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5hbmltYXRpb25Qb3NpdGlvbjtcbiAgfVxuICBAT3V0cHV0KCkgYW5pbWF0aW9uUG9zaXRpb25DaGFuZ2UgPVxuICAgIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5hbmltYXRpb25Qb3NpdGlvbkNoYW5nZTtcblxuICAvKipcbiAgICogR2V0cy9zZXRzIHdoZXRoZXIgdGhlIGFuaW1hdGlvbiAoaWYgdGhlcmUgaXMgb25lKSBpcyBjdXJyZW50bHkgcGxheWluZy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBhbmltYXRpb25QbGF5aW5nKGFuaW1hdGlvblBsYXlpbmc6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnZpc3VhbFZpZXdlclNlcnZpY2UuYW5pbWF0aW9uUGxheWluZyA9IGFuaW1hdGlvblBsYXlpbmc7XG4gIH1cbiAgZ2V0IGFuaW1hdGlvblBsYXlpbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5hbmltYXRpb25QbGF5aW5nO1xuICB9XG4gIEBPdXRwdXQoKVxuICBhbmltYXRpb25QbGF5aW5nQ2hhbmdlID0gdGhpcy52aXN1YWxWaWV3ZXJTZXJ2aWNlLmFuaW1hdGlvblBsYXlpbmdDaGFuZ2U7XG5cbiAgLyoqXG4gICAqIENvbnRyb2xzIHRoZSBiZWhhdmlvdXIgd2hlbiBhIGxlZnQgbW91c2UgYnV0dG9uIGRyYWcgaXMgaW5pdGlhdGVkIGluIHRoZSB2aWV3cG9ydC5cbiAgICogVHVybnRhYmxlOiBBIGxlZnQgbW91c2UgZHJhZyBwZXJmb3JtcyBhIHR1cm50YWJsZSBtb2RlIHJvdGF0aW9uLlxuICAgKiBQYW46IEEgbGVmdCBtb3VzZSBkcmFnIHBhbnMgdGhlIGNhbWVyYSBpbiB0aGUgdmlld3BvcnQuXG4gICAqIFpvb206IEEgbGVmdCBtb3VzZSBkcmFnIHpvb21zIHRoZSBjYW1lcmEgaW4gdGhlIHZpZXdwb3J0IGluIG9yIG91dFxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IG5hdmlnYXRpb25Nb2RlKG5hdmlnYXRpb25Nb2RlOiBOYXZpZ2F0aW9uTW9kZSkge1xuICAgIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5uYXZpZ2F0aW9uTW9kZSA9IG5hdmlnYXRpb25Nb2RlO1xuICB9XG4gIGdldCBuYXZpZ2F0aW9uTW9kZSgpOiBOYXZpZ2F0aW9uTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5uYXZpZ2F0aW9uTW9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJc29sYXRlIG1vZGUgYWxsb3dzIGEgc2luZ2xlIG9iamVjdCB0byBiZSB2aWV3ZWQgaW4gaXNvbGF0aW9uLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IGlzb2xhdGVNb2RlRW5hYmxlZChpc29sYXRlTW9kZUVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnZpc3VhbFZpZXdlclNlcnZpY2UuaXNvbGF0ZU1vZGVFbmFibGVkID0gaXNvbGF0ZU1vZGVFbmFibGVkO1xuICB9XG4gIGdldCBpc29sYXRlTW9kZUVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5pc29sYXRlTW9kZUVuYWJsZWQ7XG4gIH1cbiAgQE91dHB1dCgpXG4gIGlzb2xhdGVNb2RlRW5hYmxlZENoYW5nZSA9IHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5pc29sYXRlTW9kZUVuYWJsZWRDaGFuZ2U7XG5cbiAgLyoqXG4gICAqIEdldHMgd2hldGhlciB0aGUgdmlld3BvcnQgaXMgZGlzcGxheWluZyAyRCBjb250ZW50LlxuICAgKi9cbiAgZ2V0IGlzMkQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5pczJEO1xuICB9XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB0aGF0IGEgc2NlbmUgaGFzIGJlZW4gbG9hZGVkIGFuZCB0aGUgdmlld3BvcnQgaXMgcmVhZHkgZm9yIGludGVyYWN0aW9uLlxuICAgKi9cbiAgZ2V0IHZpZXdwb3J0UmVhZHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS52aWV3cG9ydFJlYWR5O1xuICB9XG4gIEBPdXRwdXQoKSB2aWV3cG9ydFJlYWR5Q2hhbmdlID0gdGhpcy52aXN1YWxWaWV3ZXJTZXJ2aWNlLnZpZXdwb3J0UmVhZHlDaGFuZ2U7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHVzZXIgdG8gdGhlIGluaXRpYWwgY2FtZXJhIHBvc2l0aW9uIHVzZWQgd2hlbiBhIHNjZW5lIHdhcyBmaXJzdCBsb2FkZWQuXG4gICAqL1xuICBwdWJsaWMgYWN0aXZhdGVIb21lVmlldygpIHtcbiAgICB0aGlzLnZpc3VhbFZpZXdlclNlcnZpY2UuYWN0aXZhdGVIb21lVmlldygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBsYXlzIHRoZSBhbmltYXRpb24gKGlmIG9uZSBleGlzdHMpLlxuICAgKi9cbiAgcHVibGljIHBsYXlBbmltYXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy52aXN1YWxWaWV3ZXJTZXJ2aWNlLnBsYXlBbmltYXRpb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXVzZXMgYW5pbWF0aW9uIHBsYXliYWNrLlxuICAgKi9cbiAgcHVibGljIHBhdXNlQW5pbWF0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMudmlzdWFsVmlld2VyU2VydmljZS5wYXVzZUFuaW1hdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIHRoZSB2aXN1YWxpemF0aW9uIHNwZWNpZmllZCBieSB0aGUgcHJvZHVjdCBjb2RlLlxuICAgKiBAcGFyYW0gcHJvZHVjdENvZGUgVGhlIHByb2R1Y3QgY29kZSBvZiB0aGUgdmlzdWFsaXphdGlvbiB0byBsb2FkLlxuICAgKiBAcmV0dXJucyBBbiBvYnNlcnZhYmxlIHRoYXQgcmV0dXJucyBhIHNpbmdsZSBWaXN1YWxpemF0aW9uTG9hZEluZm8gdmFsdWUuXG4gICAqL1xuICBwdWJsaWMgbG9hZFZpc3VhbGl6YXRpb24oXG4gICAgcHJvZHVjdENvZGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPFZpc3VhbGl6YXRpb25Mb2FkSW5mbz4ge1xuICAgIHJldHVybiB0aGlzLnZpc3VhbFZpZXdlclNlcnZpY2UubG9hZFZpc3VhbGl6YXRpb24ocHJvZHVjdENvZGUpO1xuICB9XG5cbiAgLy8gUHJvdmlkZSBhY2Nlc3MgdG8gZW51bSB0eXBlcyBpbiB0ZW1wbGF0ZSBjb2RlXG4gIFNlbGVjdGlvbk1vZGUgPSBTZWxlY3Rpb25Nb2RlO1xuICBOYXZpZ2F0aW9uTW9kZSA9IE5hdmlnYXRpb25Nb2RlO1xufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cInZpZXdwb3J0UmVhZHk7IGVsc2UgbG9hZGluZ1wiPlxuICA8ZGl2IHJvbGU9XCJzdGF0dXNcIiBbYXR0ci5hcmlhLWxhYmVsXT1cIidjb21tb24ubG9hZGVkJyB8IGN4VHJhbnNsYXRlXCI+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb250ZW50LXR5cGUtc3ltYm9sXCIgW2hpZGRlbl09XCIhdmlld3BvcnRSZWFkeVwiPlxuICAgIDxzcGFuIGNsYXNzPVwiY29udGVudC10eXBlLXRleHRcIj57e1xuICAgICAgKGlzMkRcbiAgICAgICAgPyAnZXBkVmlzdWFsaXphdGlvbi52aXN1YWxWaWV3ZXIuY29udGVudFR5cGUuZHJhd2luZzJEJ1xuICAgICAgICA6ICdlcGRWaXN1YWxpemF0aW9uLnZpc3VhbFZpZXdlci5jb250ZW50VHlwZS5tb2RlbDNEJ1xuICAgICAgKSB8IGN4VHJhbnNsYXRlXG4gICAgfX08L3NwYW4+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJib3R0b20gb3ZlcmxheVwiPlxuICAgIDxkaXYgW2hpZGRlbl09XCIhdmlld3BvcnRSZWFkeVwiIGNsYXNzPVwidG9vbGJhclwiPlxuICAgICAgPGRpdiBjbGFzcz1cInRvb2xiYXJIQm94XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b29sYmFyQnV0dG9uc0hCb3hcIj5cbiAgICAgICAgICA8Y3gtZXBkLXZpc3VhbGl6YXRpb24tdmlld2VyLXRvb2xiYXItYnV0dG9uXG4gICAgICAgICAgICBjbGFzcz1cImhvbWVCdXR0b25cIlxuICAgICAgICAgICAgaWNvbkxpYnJhcnlDbGFzcz1cImZhc1wiXG4gICAgICAgICAgICBpY29uQ2xhc3M9XCJmYS1ob21lXCJcbiAgICAgICAgICAgIHRleHQ9XCJ7e1xuICAgICAgICAgICAgICAnZXBkVmlzdWFsaXphdGlvbi52aXN1YWxWaWV3ZXIudG9vbGJhci5ob21lQnV0dG9uLmxhYmVsJ1xuICAgICAgICAgICAgICAgIHwgY3hUcmFuc2xhdGVcbiAgICAgICAgICAgIH19XCJcbiAgICAgICAgICAgIChjbGljayk9XCJhY3RpdmF0ZUhvbWVWaWV3KClcIlxuICAgICAgICAgID48L2N4LWVwZC12aXN1YWxpemF0aW9uLXZpZXdlci10b29sYmFyLWJ1dHRvbj5cblxuICAgICAgICAgIDxjeC1lcGQtdmlzdWFsaXphdGlvbi12aWV3ZXItdG9vbGJhci1idXR0b25cbiAgICAgICAgICAgIGNsYXNzPVwidHVybnRhYmxlQnV0dG9uIHRvb2xiYXJJdGVtXCJcbiAgICAgICAgICAgIGljb25MaWJyYXJ5Q2xhc3M9XCJmYXNcIlxuICAgICAgICAgICAgaWNvbkNsYXNzPVwiZmEtc3luYy1hbHRcIlxuICAgICAgICAgICAgdGV4dD1cInt7XG4gICAgICAgICAgICAgICdlcGRWaXN1YWxpemF0aW9uLnZpc3VhbFZpZXdlci50b29sYmFyLnJvdGF0ZUJ1dHRvbi5sYWJlbCdcbiAgICAgICAgICAgICAgICB8IGN4VHJhbnNsYXRlXG4gICAgICAgICAgICB9fVwiXG4gICAgICAgICAgICBbaGlkZGVuXT1cImlzMkRcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm5hdmlnYXRpb25Nb2RlID0gTmF2aWdhdGlvbk1vZGUuVHVybnRhYmxlXCJcbiAgICAgICAgICAgIFtjaGVja2VkXT1cIm5hdmlnYXRpb25Nb2RlID09PSBOYXZpZ2F0aW9uTW9kZS5UdXJudGFibGVcIlxuICAgICAgICAgID48L2N4LWVwZC12aXN1YWxpemF0aW9uLXZpZXdlci10b29sYmFyLWJ1dHRvbj5cblxuICAgICAgICAgIDxjeC1lcGQtdmlzdWFsaXphdGlvbi12aWV3ZXItdG9vbGJhci1idXR0b25cbiAgICAgICAgICAgIGNsYXNzPVwicGFuQnV0dG9uIHRvb2xiYXJJdGVtXCJcbiAgICAgICAgICAgIGljb25MaWJyYXJ5Q2xhc3M9XCJmYXNcIlxuICAgICAgICAgICAgaWNvbkNsYXNzPVwiZmEtYXJyb3dzLWFsdFwiXG4gICAgICAgICAgICB0ZXh0PVwie3tcbiAgICAgICAgICAgICAgJ2VwZFZpc3VhbGl6YXRpb24udmlzdWFsVmlld2VyLnRvb2xiYXIucGFuQnV0dG9uLmxhYmVsJ1xuICAgICAgICAgICAgICAgIHwgY3hUcmFuc2xhdGVcbiAgICAgICAgICAgIH19XCJcbiAgICAgICAgICAgIChjbGljayk9XCJuYXZpZ2F0aW9uTW9kZSA9IE5hdmlnYXRpb25Nb2RlLlBhblwiXG4gICAgICAgICAgICBbY2hlY2tlZF09XCJuYXZpZ2F0aW9uTW9kZSA9PT0gTmF2aWdhdGlvbk1vZGUuUGFuXCJcbiAgICAgICAgICA+PC9jeC1lcGQtdmlzdWFsaXphdGlvbi12aWV3ZXItdG9vbGJhci1idXR0b24+XG5cbiAgICAgICAgICA8Y3gtZXBkLXZpc3VhbGl6YXRpb24tdmlld2VyLXRvb2xiYXItYnV0dG9uXG4gICAgICAgICAgICBjbGFzcz1cInpvb21CdXR0b24gdG9vbGJhckl0ZW1cIlxuICAgICAgICAgICAgaWNvbkxpYnJhcnlDbGFzcz1cImZhc1wiXG4gICAgICAgICAgICBpY29uQ2xhc3M9XCJmYS1zZWFyY2hcIlxuICAgICAgICAgICAgdGV4dD1cInt7XG4gICAgICAgICAgICAgICdlcGRWaXN1YWxpemF0aW9uLnZpc3VhbFZpZXdlci50b29sYmFyLnpvb21CdXR0b24ubGFiZWwnXG4gICAgICAgICAgICAgICAgfCBjeFRyYW5zbGF0ZVxuICAgICAgICAgICAgfX1cIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm5hdmlnYXRpb25Nb2RlID0gTmF2aWdhdGlvbk1vZGUuWm9vbVwiXG4gICAgICAgICAgICBbY2hlY2tlZF09XCJuYXZpZ2F0aW9uTW9kZSA9PT0gTmF2aWdhdGlvbk1vZGUuWm9vbVwiXG4gICAgICAgICAgPjwvY3gtZXBkLXZpc3VhbGl6YXRpb24tdmlld2VyLXRvb2xiYXItYnV0dG9uPlxuXG4gICAgICAgICAgPGN4LWVwZC12aXN1YWxpemF0aW9uLXZpZXdlci10b29sYmFyLWJ1dHRvblxuICAgICAgICAgICAgY2xhc3M9XCJpc29sYXRlQnV0dG9uIHRvb2xiYXJJdGVtXCJcbiAgICAgICAgICAgIGljb25MaWJyYXJ5Q2xhc3M9XCJmYXNcIlxuICAgICAgICAgICAgW2hpZGRlbl09XCJpczJEXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJcbiAgICAgICAgICAgICAgIWlzb2xhdGVNb2RlRW5hYmxlZCAmJiBzZWxlY3RlZFByb2R1Y3RDb2Rlcz8ubGVuZ3RoID09PSAwXG4gICAgICAgICAgICBcIlxuICAgICAgICAgICAgaWNvbkNsYXNzPVwiZmEtY29tcHJlc3NcIlxuICAgICAgICAgICAgdGV4dD1cInt7XG4gICAgICAgICAgICAgICdlcGRWaXN1YWxpemF0aW9uLnZpc3VhbFZpZXdlci50b29sYmFyLmlzb2xhdGVCdXR0b24ubGFiZWwnXG4gICAgICAgICAgICAgICAgfCBjeFRyYW5zbGF0ZVxuICAgICAgICAgICAgfX1cIlxuICAgICAgICAgICAgKGNsaWNrKT1cImlzb2xhdGVNb2RlRW5hYmxlZCA9ICFpc29sYXRlTW9kZUVuYWJsZWRcIlxuICAgICAgICAgICAgW2NoZWNrZWRdPVwiaXNvbGF0ZU1vZGVFbmFibGVkXCJcbiAgICAgICAgICA+PC9jeC1lcGQtdmlzdWFsaXphdGlvbi12aWV3ZXItdG9vbGJhci1idXR0b24+XG5cbiAgICAgICAgICA8Y3gtZXBkLXZpc3VhbGl6YXRpb24tdmlld2VyLXRvb2xiYXItYnV0dG9uXG4gICAgICAgICAgICBjbGFzcz1cInBsYXlQYXVzZUJ1dHRvbiB0b29sYmFySXRlbVwiXG4gICAgICAgICAgICBpY29uTGlicmFyeUNsYXNzPVwiZmFzXCJcbiAgICAgICAgICAgIGljb25DbGFzcz1cInt7IGFuaW1hdGlvblBsYXlpbmcgPyAnZmEtcGF1c2UnIDogJ2ZhLXBsYXknIH19XCJcbiAgICAgICAgICAgIHRleHQ9XCJ7e1xuICAgICAgICAgICAgICAoYW5pbWF0aW9uUGxheWluZ1xuICAgICAgICAgICAgICAgID8gJ2VwZFZpc3VhbGl6YXRpb24udmlzdWFsVmlld2VyLnRvb2xiYXIucGF1c2VCdXR0b24ubGFiZWwnXG4gICAgICAgICAgICAgICAgOiAnZXBkVmlzdWFsaXphdGlvbi52aXN1YWxWaWV3ZXIudG9vbGJhci5wbGF5QnV0dG9uLmxhYmVsJ1xuICAgICAgICAgICAgICApIHwgY3hUcmFuc2xhdGVcbiAgICAgICAgICAgIH19XCJcbiAgICAgICAgICAgIFtoaWRkZW5dPVwiaXMyRCB8fCBhbmltYXRpb25Ub3RhbER1cmF0aW9uIDw9IDBcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImlzb2xhdGVNb2RlRW5hYmxlZFwiXG4gICAgICAgICAgICAoY2xpY2spPVwiYW5pbWF0aW9uUGxheWluZyA/IHBhdXNlQW5pbWF0aW9uKCkgOiBwbGF5QW5pbWF0aW9uKClcIlxuICAgICAgICAgID48L2N4LWVwZC12aXN1YWxpemF0aW9uLXZpZXdlci10b29sYmFyLWJ1dHRvbj5cblxuICAgICAgICAgIDxjeC1lcGQtdmlzdWFsaXphdGlvbi12aWV3ZXItdG9vbGJhci1idXR0b25cbiAgICAgICAgICAgIGNsYXNzPVwic2hvd0FsbEhvdHBvdHNCdXR0b24gdG9vbGJhckl0ZW1cIlxuICAgICAgICAgICAgaWNvbkxpYnJhcnlDbGFzcz1cImZhc1wiXG4gICAgICAgICAgICBpY29uQ2xhc3M9XCJmYS1oaWdobGlnaHRlclwiXG4gICAgICAgICAgICB0ZXh0PVwie3tcbiAgICAgICAgICAgICAgKHNob3dBbGxIb3RzcG90c0VuYWJsZWRcbiAgICAgICAgICAgICAgICA/ICdlcGRWaXN1YWxpemF0aW9uLnZpc3VhbFZpZXdlci50b29sYmFyLmhvdHNwb3RzQnV0dG9uLmhpZGUnXG4gICAgICAgICAgICAgICAgOiAnZXBkVmlzdWFsaXphdGlvbi52aXN1YWxWaWV3ZXIudG9vbGJhci5ob3RzcG90c0J1dHRvbi5zaG93J1xuICAgICAgICAgICAgICApIHwgY3hUcmFuc2xhdGVcbiAgICAgICAgICAgIH19XCJcbiAgICAgICAgICAgIFtjaGVja2VkXT1cInNob3dBbGxIb3RzcG90c0VuYWJsZWRcIlxuICAgICAgICAgICAgW2hpZGRlbl09XCIhaXMyRFwiXG4gICAgICAgICAgICAoY2xpY2spPVwic2hvd0FsbEhvdHNwb3RzRW5hYmxlZCA9ICFzaG93QWxsSG90c3BvdHNFbmFibGVkXCJcbiAgICAgICAgICA+PC9jeC1lcGQtdmlzdWFsaXphdGlvbi12aWV3ZXItdG9vbGJhci1idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgW2hpZGRlbl09XCJpczJEIHx8IGFuaW1hdGlvblRvdGFsRHVyYXRpb24gPD0gMFwiPlxuICAgICAgICAgIDxjeC1lcGQtdmlzdWFsaXphdGlvbi1hbmltYXRpb24tc2xpZGVyXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNvbGF0ZU1vZGVFbmFibGVkXCJcbiAgICAgICAgICAgIFsodmFsdWUpXT1cImFuaW1hdGlvblBvc2l0aW9uXCJcbiAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cIlxuICAgICAgICAgICAgICBhbmltYXRpb25QbGF5aW5nID8gcGF1c2VBbmltYXRpb24oKSA6IHBsYXlBbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAoa2V5ZG93bi5zcGFjZSk9XCJcbiAgICAgICAgICAgICAgYW5pbWF0aW9uUGxheWluZyA/IHBhdXNlQW5pbWF0aW9uKCkgOiBwbGF5QW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBcIlxuICAgICAgICAgID48L2N4LWVwZC12aXN1YWxpemF0aW9uLWFuaW1hdGlvbi1zbGlkZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy10ZW1wbGF0ZSAjbG9hZGluZz5cbiAgPGRpdiBjbGFzcz1cImN4LXNwaW5uZXJcIj5cbiAgICA8Y3gtc3Bpbm5lcj48L2N4LXNwaW5uZXI+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==