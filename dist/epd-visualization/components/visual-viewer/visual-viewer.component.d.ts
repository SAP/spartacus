import { Observable } from 'rxjs';
import { NavigationMode } from './models/navigation-mode';
import { SelectionMode } from './models/selection-mode';
import { VisualizationLoadInfo } from './models/visualization-load-info';
import { VisualViewerService } from './visual-viewer.service';
import * as i0 from "@angular/core";
export declare class VisualViewerComponent {
    protected visualViewerService: VisualViewerService;
    constructor(visualViewerService: VisualViewerService);
    /**
     * The top colour of the background gradient.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-background' with the quotes.
     */
    set backgroundTopColor(backgroundTopColor: string);
    get backgroundTopColor(): string;
    /**
     * The bottom colour of the background gradient.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-background' with the quotes.
     */
    set backgroundBottomColor(backgroundBottomColor: string);
    get backgroundBottomColor(): string;
    /**
     * The colour applied to selected 2D hotspots in 2D content.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
     */
    set hotspotSelectionColor(hotspotSelectionColor: string);
    get hotspotSelectionColor(): string;
    /**
     * When true, all hotspots in 2D content that are included in the includedProductCodes property are highlighted using the colour specified by the showAllHotspotsColor property.
     */
    set showAllHotspotsEnabled(showAllHotspotsEnabled: boolean);
    get showAllHotspotsEnabled(): boolean;
    /**
     * The colour used to highlight hotspots in 2D content when the showAllHotspotsEnabled property has a value of true.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
     */
    set showAllHotspotsColor(showAllHotspotsColor: string);
    get showAllHotspotsColor(): string;
    /**
     * The outline colour used to indicate selected objects in 3D content.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
     */
    set outlineColor(outlineColor: string);
    get outlineColor(): string;
    /**
     * The width of the outline (in pixels) used to indicate selected objects in 3D content.
     */
    set outlineWidth(outlineWidth: number);
    get outlineWidth(): number;
    /**
     * The selection mode.
     * None - Selection is disabled.
     * Exclusive - When selecting objects in the viewport, at most one object can be selected at a time. Clicking/tapping to select a new object will deselect any previously selected objects.
     * Sticky - A multiple selection mode in which clicking/tapping on an object that is not part of the current selection will toggle its selection state without modifying the selection state of the currently selected objects.
     */
    set selectionMode(selectionMode: SelectionMode);
    get selectionMode(): SelectionMode;
    /**
     * Gets/sets the selection in terms of product codes.
     * Gets the set of product codes applied to the selected scene nodes.
     * Sets the selection set based on the set of supplied product codes.
     */
    set selectedProductCodes(selectedProductCodes: string[]);
    get selectedProductCodes(): string[];
    selectedProductCodesChange: import("@angular/core").EventEmitter<string[]>;
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
    set includedProductCodes(includedProductCodes: string[]);
    get includedProductCodes(): string[];
    /**
     *  Gets/sets the opacity to apply to 3D objects that are not in the set specified by the includedProductCodes property
     */
    set excludedOpacity(excludedOpacity: number);
    get excludedOpacity(): number;
    /**
     * The current time position in seconds in the animation (if there is one).
     */
    set animationTime(animationTime: number);
    get animationTime(): number;
    animationTimeChange: import("@angular/core").EventEmitter<number>;
    /**
     * Gets the total duration of the animation (if there is one). A total duration of 0 indicates that there is no animation that can be played.
     */
    get animationTotalDuration(): number;
    /**
     *  The animation playback position as a fractional value between 0 (start) and 1 (end).
     */
    set animationPosition(animationPosition: number);
    get animationPosition(): number;
    animationPositionChange: import("@angular/core").EventEmitter<number>;
    /**
     * Gets/sets whether the animation (if there is one) is currently playing.
     */
    set animationPlaying(animationPlaying: boolean);
    get animationPlaying(): boolean;
    animationPlayingChange: import("@angular/core").EventEmitter<boolean>;
    /**
     * Controls the behaviour when a left mouse button drag is initiated in the viewport.
     * Turntable: A left mouse drag performs a turntable mode rotation.
     * Pan: A left mouse drag pans the camera in the viewport.
     * Zoom: A left mouse drag zooms the camera in the viewport in or out
     */
    set navigationMode(navigationMode: NavigationMode);
    get navigationMode(): NavigationMode;
    /**
     * Isolate mode allows a single object to be viewed in isolation.
     */
    set isolateModeEnabled(isolateModeEnabled: boolean);
    get isolateModeEnabled(): boolean;
    isolateModeEnabledChange: import("@angular/core").EventEmitter<boolean>;
    /**
     * Gets whether the viewport is displaying 2D content.
     */
    get is2D(): boolean;
    /**
     * Indicates that a scene has been loaded and the viewport is ready for interaction.
     */
    get viewportReady(): boolean;
    viewportReadyChange: import("@angular/core").EventEmitter<boolean>;
    /**
     * Returns the user to the initial camera position used when a scene was first loaded.
     */
    activateHomeView(): void;
    /**
     * Plays the animation (if one exists).
     */
    playAnimation(): void;
    /**
     * Pauses animation playback.
     */
    pauseAnimation(): void;
    /**
     * Loads the visualization specified by the product code.
     * @param productCode The product code of the visualization to load.
     * @returns An observable that returns a single VisualizationLoadInfo value.
     */
    loadVisualization(productCode: string): Observable<VisualizationLoadInfo>;
    SelectionMode: typeof SelectionMode;
    NavigationMode: typeof NavigationMode;
    static ɵfac: i0.ɵɵFactoryDeclaration<VisualViewerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VisualViewerComponent, "cx-epd-visualization-viewer", never, { "backgroundTopColor": "backgroundTopColor"; "backgroundBottomColor": "backgroundBottomColor"; "hotspotSelectionColor": "hotspotSelectionColor"; "showAllHotspotsEnabled": "showAllHotspotsEnabled"; "showAllHotspotsColor": "showAllHotspotsColor"; "outlineColor": "outlineColor"; "outlineWidth": "outlineWidth"; "selectionMode": "selectionMode"; "selectedProductCodes": "selectedProductCodes"; "includedProductCodes": "includedProductCodes"; "excludedOpacity": "excludedOpacity"; "animationTime": "animationTime"; "animationPosition": "animationPosition"; "animationPlaying": "animationPlaying"; "navigationMode": "navigationMode"; "isolateModeEnabled": "isolateModeEnabled"; }, { "selectedProductCodesChange": "selectedProductCodesChange"; "animationTimeChange": "animationTimeChange"; "animationPositionChange": "animationPositionChange"; "animationPlayingChange": "animationPlayingChange"; "isolateModeEnabledChange": "isolateModeEnabledChange"; "viewportReadyChange": "viewportReadyChange"; }, never, never, false, never>;
}
