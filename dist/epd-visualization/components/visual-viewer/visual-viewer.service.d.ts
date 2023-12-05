import { ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { SceneNodeToProductLookupService, VisualizationLookupService } from '@spartacus/epd-visualization/core';
import { EpdVisualizationConfig } from '@spartacus/epd-visualization/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationMode } from './models/navigation-mode';
import { SceneLoadInfo } from './models/scene-load-info';
import { SelectionMode } from './models/selection-mode';
import { VisualizationLoadInfo } from './models/visualization-load-info';
import * as i0 from "@angular/core";
export declare class VisualViewerService implements OnDestroy {
    protected epdVisualizationConfig: EpdVisualizationConfig;
    protected _sceneNodeToProductLookupService: SceneNodeToProductLookupService;
    protected visualizationLookupService: VisualizationLookupService;
    protected elementRef: ElementRef;
    protected changeDetectorRef: ChangeDetectorRef;
    protected windowRef: WindowRef;
    constructor(epdVisualizationConfig: EpdVisualizationConfig, _sceneNodeToProductLookupService: SceneNodeToProductLookupService, visualizationLookupService: VisualizationLookupService, elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, windowRef: WindowRef);
    ngOnDestroy(): void;
    private selectedNodeIdsSubscription?;
    private get sceneNodeToProductLookupService();
    private set sceneNodeToProductLookupService(value);
    private _scene;
    private get scene();
    private set scene(value);
    private _nodeHierarchy;
    private get nodeHierarchy();
    private set nodeHierarchy(value);
    private _contentConnector;
    private get contentConnector();
    private set contentConnector(value);
    private _viewport;
    private get viewport();
    private set viewport(value);
    private _viewStateManager;
    private get viewStateManager();
    private set viewStateManager(value);
    private _animationPlayer;
    private get animationPlayer();
    private set animationPlayer(value);
    private _viewManager;
    private get viewManager();
    private set viewManager(value);
    private _drawerToolbar;
    private get drawerToolbar();
    private set drawerToolbar(value);
    private _sceneId;
    private get sceneId();
    private set sceneId(value);
    private _contentType;
    private get contentType();
    private set contentType(value);
    private _initialViewInfo;
    private get initialViewInfo();
    private set initialViewInfo(value);
    private _leafNodeRefs;
    private get leafNodeRefs();
    private set leafNodeRefs(value);
    private _viewPriorToIsolateViewInfo;
    private get viewPriorToIsolateViewInfo();
    private set viewPriorToIsolateViewInfo(value);
    private _viewportAdded$;
    private get viewportAdded$();
    private set viewportAdded$(value);
    private _selectedNodeIds$;
    private get selectedNodeIds$();
    private set selectedNodeIds$(value);
    private _sceneLoadInfo$;
    get sceneLoadInfo$(): BehaviorSubject<SceneLoadInfo>;
    protected readonly DEFAULT_BACKGROUND_TOP_COLOR = "--cx-color-inverse";
    protected readonly DEFAULT_BACKGROUND_BOTTOM_COLOR = "--cx-color-inverse";
    protected readonly DEFAULT_HOTSPOT_SELECTION_HIGHLIGHT_COLOR = "rgba(255, 0, 0, 0.6)";
    protected readonly DEFAULT_SHOW_ALL_HOTSPOTS_COLOR = "rgba(255, 255, 0, 0.3)";
    protected readonly DEFAULT_OUTLINE_COLOR = "red";
    protected readonly DEFAULT_OUTLINE_WIDTH = 5;
    protected readonly DEFAULT_SELECTION_MODE = SelectionMode.Exclusive;
    protected readonly DEFAULT_SHOW_ALL_HOTSPOTS_ENABLED = false;
    protected readonly DEFAULT_EXCLUDED_OPACITY = 0.2;
    protected readonly DEFAULT_ZOOM_TO_MARGIN = 0.2;
    protected readonly DEFAULT_FLY_TO_DURATION = 1;
    private _flyToDurationInSeconds;
    private get flyToDurationInSeconds();
    private set flyToDurationInSeconds(value);
    private _zoomToMargin;
    private get zoomToMargin();
    private set zoomToMargin(value);
    /**
     * The top colour of the background gradient.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-background' with the quotes.
     */
    set backgroundTopColor(backgroundTopColor: string);
    get backgroundTopColor(): string;
    private _backgroundTopColor;
    /**
     * The bottom colour of the background gradient.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-background' with the quotes.
     */
    set backgroundBottomColor(backgroundBottomColor: string);
    get backgroundBottomColor(): string;
    private _backgroundBottomColor;
    /**
     * The colour applied to selected 2D hotspots in 2D content.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
     */
    set hotspotSelectionColor(hotspotSelectionColor: string);
    get hotspotSelectionColor(): string;
    private _hotspotSelectionColor;
    /**
     * Highlights all hotspots in 2D content that are included in the includedProductCodes property using the colour specified by the showAllHotspotsColor property.
     */
    set showAllHotspotsEnabled(showAllHotspotsEnabled: boolean);
    get showAllHotspotsEnabled(): boolean;
    private _showAllHotspotsEnabled;
    /**
     * The colour used to highlight hotspots in 2D content when the showAllHotspotsEnabled property has a value of true.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
     */
    set showAllHotspotsColor(showAllHotspotsColor: string);
    get showAllHotspotsColor(): string;
    private _showAllHotspotsColor;
    /**
     * The outline colour used to indicate selected objects in 3D content.
     * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
     */
    set outlineColor(outlineColor: string);
    get outlineColor(): string;
    private _outlineColor;
    /**
     * The width of the outline used to indicate selected objects in 3D content.
     */
    set outlineWidth(outlineWidth: number);
    get outlineWidth(): number;
    private _outlineWidth;
    /**
     * The selection mode.
     * None - Selection is disabled.
     * Exclusive - When selecting objects in the viewport, at most one object can be selected at a time. Clicking/tapping to select a new object will deselect any previously selected objects.
     * Sticky - A multiple selection mode in which clicking/tapping on an object that is not part of the current selection will toggle its selection state without modifying the selection state of the currently selected objects.
     */
    set selectionMode(selectionMode: SelectionMode);
    get selectionMode(): SelectionMode;
    private _selectionMode;
    /**
     * Gets/sets the selection in terms of product codes.
     * Gets the set of product codes applied to the selected scene nodes.
     * Sets the selection set based on the set of supplied product codes.
     */
    set selectedProductCodes(selectedProductCodes: string[]);
    get selectedProductCodes(): string[];
    private _selectedProductCodes;
    selectedProductCodesChange: EventEmitter<string[]>;
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
    private _includedProductCodes;
    /**
     * Gets/sets the opacity to apply to 3D objects that are not in the set specified by the includedProductCodes property.
     */
    set excludedOpacity(excludedOpacity: number);
    get excludedOpacity(): number;
    private _excludedOpacity;
    /**
     * The current time position in seconds in the animation (if there is one).
     */
    set animationTime(animationTime: number);
    get animationTime(): number;
    private _animationTime;
    animationTimeChange: EventEmitter<number>;
    /**
     * The total duration of the animation in seconds.
     * Returns 0 when there is no animation present (or when a scene has not been loaded).
     */
    get animationTotalDuration(): number;
    /**
     * The animation playback position as a fractional value between 0 (start) and 1 (end).
     */
    set animationPosition(position: number);
    get animationPosition(): number;
    private _animationPosition;
    animationPositionChange: EventEmitter<number>;
    /**
     * Gets/sets whether the animation (if there is one) is currently playing.
     */
    set animationPlaying(animationPlaying: boolean);
    get animationPlaying(): boolean;
    private _animationPlaying;
    animationPlayingChange: EventEmitter<boolean>;
    /**
     * Controls the behaviour when a left mouse button drag is initiated in the viewport.
     * Turntable: A left mouse drag performs a turntable mode rotation.
     * Pan: A left mouse drag pans the camera in the viewport.
     * Zoom: A left mouse drag zooms the camera in the viewport in or out
     */
    set navigationMode(navigationMode: NavigationMode);
    get navigationMode(): NavigationMode;
    private _navigationMode;
    /**
     * Isolate mode allows a single object to be viewed in isolation.
     */
    set isolateModeEnabled(isolateModeEnabled: boolean);
    get isolateModeEnabled(): boolean;
    private _isolateModeEnabled;
    isolateModeEnabledChange: EventEmitter<boolean>;
    /**
     * Gets whether the viewport is displaying 2D content.
     */
    get is2D(): boolean;
    private setIs2D;
    private _is2D;
    /**
     * Indicates that a scene has been loaded and the viewport is ready for interaction.
     */
    get viewportReady(): boolean;
    private setViewportReady;
    private _viewportReady;
    viewportReadyChange: EventEmitter<boolean>;
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
    private contentChangesFinished;
    private contentLoadFinished;
    private setInitialPropertyValues;
    private executeWhenSceneLoaded;
    private applyInclusionStyle;
    private applyInclusionStyle2D;
    private applyInclusionStyle3D;
    private isTopLevelHotspotNode;
    private isReferenceNode;
    private getLeafDescendants;
    private getAllLeafNodeRefs;
    private isolateNodes;
    private animationPlayerSetTime;
    private onViewActivated;
    private onTimeChanged;
    private setVisualizationLoadInfo;
    get visualizationLoadInfo(): VisualizationLoadInfo;
    private _visualizationLoadInfo;
    visualizationLoadInfoChange: EventEmitter<VisualizationLoadInfo>;
    loadVisualization(productCode: string): Observable<VisualizationLoadInfo>;
    private isUi5BootStrapped;
    private getCore;
    private bootstrapUi5;
    private initializeUi5;
    private destroyViewportAssociations;
    private destroyContentConnector;
    private destroyViewManagers;
    private onContentChangesStarted;
    private onContentChangesFinished;
    private onContentLoadingFinished;
    private onNodesPicked;
    private isNodeIncluded;
    private onNodesPicked2D;
    private onNodesPicked3D;
    private addViewport;
    private getCSSPropertyValue;
    private getCSSColor;
    private resolveVisualization;
    private persistentIdToNodeRef;
    private nodeRefToPersistentId;
    private getViewStateManagerImplementation;
    private handleSelectedNodeIds;
    private handleSelectedNodes2D;
    private handleSelectedNodes3D;
    private setShouldRenderFrame;
    private is2DContentType;
    private loadScene;
    private onSelectionChanged;
    private onOutliningChanged;
    static ɵfac: i0.ɵɵFactoryDeclaration<VisualViewerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<VisualViewerService>;
}
