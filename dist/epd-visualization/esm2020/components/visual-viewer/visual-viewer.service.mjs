/// <reference types="@sapui5/ts-types-esm" />
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// '@sapui5/ts-types-esm' package contains types for sap modules, e.g. 'sap/ui/core/Core'
/// <reference types="@sapui5/ts-types-esm" />
import { EventEmitter, Injectable, } from '@angular/core';
import { ContentType, } from '@spartacus/epd-visualization/root';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, first, mergeMap, shareReplay, } from 'rxjs/operators';
import { NavigationMode } from './models/navigation-mode';
import { NodeContentType } from './models/node-content-type';
import { SceneLoadState } from './models/scene-load-state';
import { SelectionMode } from './models/selection-mode';
import { VisualizationLoadStatus, VisualizationLookupResult, } from './models/visualization-load-info';
import { ZoomTo } from './models/zoom-to';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/epd-visualization/root";
import * as i2 from "@spartacus/epd-visualization/core";
import * as i3 from "@spartacus/core";
export class VisualViewerService {
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
VisualViewerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerService, deps: [{ token: i1.EpdVisualizationConfig }, { token: i2.SceneNodeToProductLookupService }, { token: i2.VisualizationLookupService }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i3.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
VisualViewerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EpdVisualizationConfig }, { type: i2.SceneNodeToProductLookupService }, { type: i2.VisualizationLookupService }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i3.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsLXZpZXdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9lcGQtdmlzdWFsaXphdGlvbi9jb21wb25lbnRzL3Zpc3VhbC12aWV3ZXIvdmlzdWFsLXZpZXdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLDhDQUE4QztBQVA5Qzs7OztHQUlHO0FBRUgseUZBQXlGO0FBQ3pGLDhDQUE4QztBQUM5QyxPQUFPLEVBR0wsWUFBWSxFQUNaLFVBQVUsR0FFWCxNQUFNLGVBQWUsQ0FBQztBQU12QixPQUFPLEVBQ0wsV0FBVyxHQU1aLE1BQU0sbUNBQW1DLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNyRSxPQUFPLEVBQ0wsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLFdBQVcsR0FDWixNQUFNLGdCQUFnQixDQUFDO0FBWXhCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLHlCQUF5QixHQUMxQixNQUFNLGtDQUFrQyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7QUFnQjFDLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsWUFDWSxzQkFBOEMsRUFDOUMsZ0NBQWlFLEVBQ2pFLDBCQUFzRCxFQUN0RCxVQUFzQixFQUN0QixpQkFBb0MsRUFDcEMsU0FBb0I7UUFMcEIsMkJBQXNCLEdBQXRCLHNCQUFzQixD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QUMzQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDYixTQUFTLENBQUMsQ0FBQyxZQUFzQixFQUFFLEVBQUU7WUFDcEMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O2dIQTdnRFUsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FGbEIsTUFBTTsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuLy8gJ0BzYXB1aTUvdHMtdHlwZXMtZXNtJyBwYWNrYWdlIGNvbnRhaW5zIHR5cGVzIGZvciBzYXAgbW9kdWxlcywgZS5nLiAnc2FwL3VpL2NvcmUvQ29yZSdcbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwiQHNhcHVpNS90cy10eXBlcy1lc21cIiAvPlxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0YWJsZSxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdpbmRvd1JlZiB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBTY2VuZU5vZGVUb1Byb2R1Y3RMb29rdXBTZXJ2aWNlLFxuICBWaXN1YWxpemF0aW9uTG9va3VwU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9lcGQtdmlzdWFsaXphdGlvbi9jb3JlJztcbmltcG9ydCB7XG4gIENvbnRlbnRUeXBlLFxuICBFcGRWaXN1YWxpemF0aW9uQ29uZmlnLFxuICBFcGRWaXN1YWxpemF0aW9uSW5uZXJDb25maWcsXG4gIFVpNUNvbmZpZyxcbiAgVmlzdWFsaXphdGlvbkFwaUNvbmZpZyxcbiAgVmlzdWFsaXphdGlvbkluZm8sXG59IGZyb20gJ0BzcGFydGFjdXMvZXBkLXZpc3VhbGl6YXRpb24vcm9vdCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGNhdGNoRXJyb3IsXG4gIGZpbHRlcixcbiAgZmlyc3QsXG4gIG1lcmdlTWFwLFxuICBzaGFyZVJlcGxheSxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHR5cGUgQ29yZSBmcm9tICdzYXAvdWkvY29yZS9Db3JlJztcbmltcG9ydCB0eXBlIHsgQ1NTQ29sb3IgfSBmcm9tICdzYXAvdWkvY29yZS9saWJyYXJ5JztcbmltcG9ydCB0eXBlIFVJQXJlYSBmcm9tICdzYXAvdWkvY29yZS9VSUFyZWEnO1xuaW1wb3J0IHR5cGUgQW5pbWF0aW9uUGxheWVyIGZyb20gJ3NhcC91aS92ay9BbmltYXRpb25QbGF5ZXInO1xuaW1wb3J0IHR5cGUgQ29udGVudENvbm5lY3RvciBmcm9tICdzYXAvdWkvdmsvQ29udGVudENvbm5lY3Rvcic7XG5pbXBvcnQgdHlwZSBDb250ZW50UmVzb3VyY2UgZnJvbSAnc2FwL3VpL3ZrL0NvbnRlbnRSZXNvdXJjZSc7XG5pbXBvcnQgdHlwZSBEcmF3ZXJUb29sYmFyIGZyb20gJ3NhcC91aS92ay9EcmF3ZXJUb29sYmFyJztcbmltcG9ydCBOb2RlSGllcmFyY2h5IGZyb20gJ3NhcC91aS92ay9Ob2RlSGllcmFyY2h5JztcbmltcG9ydCB0eXBlIFNjZW5lIGZyb20gJ3NhcC91aS92ay9TY2VuZSc7XG5pbXBvcnQgdHlwZSBWaWV3cG9ydCBmcm9tICdzYXAvdWkvdmsvVmlld3BvcnQnO1xuaW1wb3J0IHR5cGUgVmlld1N0YXRlTWFuYWdlciBmcm9tICdzYXAvdWkvdmsvVmlld1N0YXRlTWFuYWdlcic7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uTW9kZSB9IGZyb20gJy4vbW9kZWxzL25hdmlnYXRpb24tbW9kZSc7XG5pbXBvcnQgeyBOb2RlQ29udGVudFR5cGUgfSBmcm9tICcuL21vZGVscy9ub2RlLWNvbnRlbnQtdHlwZSc7XG5pbXBvcnQgeyBMb2FkZWRTY2VuZUluZm8sIFNjZW5lTG9hZEluZm8gfSBmcm9tICcuL21vZGVscy9zY2VuZS1sb2FkLWluZm8nO1xuaW1wb3J0IHsgU2NlbmVMb2FkU3RhdGUgfSBmcm9tICcuL21vZGVscy9zY2VuZS1sb2FkLXN0YXRlJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGUgfSBmcm9tICcuL21vZGVscy9zZWxlY3Rpb24tbW9kZSc7XG5pbXBvcnQge1xuICBWaXN1YWxpemF0aW9uTG9hZEluZm8sXG4gIFZpc3VhbGl6YXRpb25Mb2FkU3RhdHVzLFxuICBWaXN1YWxpemF0aW9uTG9va3VwUmVzdWx0LFxufSBmcm9tICcuL21vZGVscy92aXN1YWxpemF0aW9uLWxvYWQtaW5mbyc7XG5pbXBvcnQgeyBab29tVG8gfSBmcm9tICcuL21vZGVscy96b29tLXRvJztcblxudHlwZSBWaWV3TWFuYWdlciA9IGFueTtcbnR5cGUgTm9kZVJlZiA9IGFueTtcbnR5cGUgVmlld0luZm8gPSBhbnk7XG5cbmludGVyZmFjZSBWaXN1YWxDb250ZW50Q2hhbmdlc0ZpbmlzaGVkRXZlbnQge1xuICBjb250ZW50OiBhbnk7XG4gIGZhaWx1cmVSZWFzb246IGFueTtcbn1cblxuaW50ZXJmYWNlIFZpc3VhbENvbnRlbnRMb2FkRmluaXNoZWRFdmVudCB7fVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVmlzdWFsVmlld2VyU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBlcGRWaXN1YWxpemF0aW9uQ29uZmlnOiBFcGRWaXN1YWxpemF0aW9uQ29uZmlnLFxuICAgIHByb3RlY3RlZCBfc2NlbmVOb2RlVG9Qcm9kdWN0TG9va3VwU2VydmljZTogU2NlbmVOb2RlVG9Qcm9kdWN0TG9va3VwU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdmlzdWFsaXphdGlvbkxvb2t1cFNlcnZpY2U6IFZpc3VhbGl6YXRpb25Mb29rdXBTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIHdpbmRvd1JlZjogV2luZG93UmVmXG4gICkge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdWk1Qm9vdFN0cmFwcGVkJDogT2JzZXJ2YWJsZTx2b2lkPiA9XG4gICAgICB0aGlzLmJvb3RzdHJhcFVpNSgndWk1Ym9vdHN0cmFwJyk7XG4gICAgY29uc3QgdWk1SW5pdGlhbGl6ZWQkOiBPYnNlcnZhYmxlPHZvaWQ+ID0gdWk1Qm9vdFN0cmFwcGVkJC5waXBlKFxuICAgICAgbWVyZ2VNYXAodGhpcy5pbml0aWFsaXplVWk1LmJpbmQodGhpcykpXG4gICAgKTtcbiAgICB0aGlzLnZpZXdwb3J0QWRkZWQkID0gdWk1SW5pdGlhbGl6ZWQkLnBpcGUoXG4gICAgICBtZXJnZU1hcCh0aGlzLmFkZFZpZXdwb3J0LmJpbmQodGhpcykpLFxuICAgICAgc2hhcmVSZXBsYXkoKVxuICAgICk7XG4gICAgdGhpcy5leGVjdXRlV2hlblNjZW5lTG9hZGVkKHRoaXMuc2V0SW5pdGlhbFByb3BlcnR5VmFsdWVzLmJpbmQodGhpcykpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZE5vZGVJZHNTdWJzY3JpcHRpb24/LnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdGVkTm9kZUlkc1N1YnNjcmlwdGlvbj86IFN1YnNjcmlwdGlvbjtcblxuICBwcml2YXRlIGdldCBzY2VuZU5vZGVUb1Byb2R1Y3RMb29rdXBTZXJ2aWNlKCk6IFNjZW5lTm9kZVRvUHJvZHVjdExvb2t1cFNlcnZpY2Uge1xuICAgIHJldHVybiB0aGlzLl9zY2VuZU5vZGVUb1Byb2R1Y3RMb29rdXBTZXJ2aWNlO1xuICB9XG4gIHByaXZhdGUgc2V0IHNjZW5lTm9kZVRvUHJvZHVjdExvb2t1cFNlcnZpY2UoXG4gICAgdmFsdWU6IFNjZW5lTm9kZVRvUHJvZHVjdExvb2t1cFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5fc2NlbmVOb2RlVG9Qcm9kdWN0TG9va3VwU2VydmljZSA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2NlbmU6IFNjZW5lO1xuICBwcml2YXRlIGdldCBzY2VuZSgpOiBTY2VuZSB7XG4gICAgcmV0dXJuIHRoaXMuX3NjZW5lO1xuICB9XG4gIHByaXZhdGUgc2V0IHNjZW5lKHZhbHVlOiBTY2VuZSkge1xuICAgIHRoaXMuX3NjZW5lID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9ub2RlSGllcmFyY2h5OiBOb2RlSGllcmFyY2h5O1xuICBwcml2YXRlIGdldCBub2RlSGllcmFyY2h5KCk6IE5vZGVIaWVyYXJjaHkge1xuICAgIHJldHVybiB0aGlzLl9ub2RlSGllcmFyY2h5O1xuICB9XG4gIHByaXZhdGUgc2V0IG5vZGVIaWVyYXJjaHkodmFsdWU6IE5vZGVIaWVyYXJjaHkpIHtcbiAgICB0aGlzLl9ub2RlSGllcmFyY2h5ID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9jb250ZW50Q29ubmVjdG9yOiBDb250ZW50Q29ubmVjdG9yO1xuICBwcml2YXRlIGdldCBjb250ZW50Q29ubmVjdG9yKCk6IENvbnRlbnRDb25uZWN0b3Ige1xuICAgIHJldHVybiB0aGlzLl9jb250ZW50Q29ubmVjdG9yO1xuICB9XG4gIHByaXZhdGUgc2V0IGNvbnRlbnRDb25uZWN0b3IodmFsdWU6IENvbnRlbnRDb25uZWN0b3IpIHtcbiAgICB0aGlzLl9jb250ZW50Q29ubmVjdG9yID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF92aWV3cG9ydDogVmlld3BvcnQ7XG4gIHByaXZhdGUgZ2V0IHZpZXdwb3J0KCk6IFZpZXdwb3J0IHtcbiAgICByZXR1cm4gdGhpcy5fdmlld3BvcnQ7XG4gIH1cbiAgcHJpdmF0ZSBzZXQgdmlld3BvcnQodmFsdWU6IFZpZXdwb3J0KSB7XG4gICAgdGhpcy5fdmlld3BvcnQgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZpZXdTdGF0ZU1hbmFnZXI6IFZpZXdTdGF0ZU1hbmFnZXI7XG4gIHByaXZhdGUgZ2V0IHZpZXdTdGF0ZU1hbmFnZXIoKTogVmlld1N0YXRlTWFuYWdlciB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdTdGF0ZU1hbmFnZXI7XG4gIH1cbiAgcHJpdmF0ZSBzZXQgdmlld1N0YXRlTWFuYWdlcih2YWx1ZTogVmlld1N0YXRlTWFuYWdlcikge1xuICAgIHRoaXMuX3ZpZXdTdGF0ZU1hbmFnZXIgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FuaW1hdGlvblBsYXllcjogQW5pbWF0aW9uUGxheWVyO1xuICBwcml2YXRlIGdldCBhbmltYXRpb25QbGF5ZXIoKTogQW5pbWF0aW9uUGxheWVyIHtcbiAgICByZXR1cm4gdGhpcy5fYW5pbWF0aW9uUGxheWVyO1xuICB9XG4gIHByaXZhdGUgc2V0IGFuaW1hdGlvblBsYXllcih2YWx1ZTogQW5pbWF0aW9uUGxheWVyKSB7XG4gICAgdGhpcy5fYW5pbWF0aW9uUGxheWVyID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF92aWV3TWFuYWdlcjogVmlld01hbmFnZXI7XG4gIHByaXZhdGUgZ2V0IHZpZXdNYW5hZ2VyKCk6IFZpZXdNYW5hZ2VyIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld01hbmFnZXI7XG4gIH1cbiAgcHJpdmF0ZSBzZXQgdmlld01hbmFnZXIodmFsdWU6IFZpZXdNYW5hZ2VyKSB7XG4gICAgdGhpcy5fdmlld01hbmFnZXIgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2RyYXdlclRvb2xiYXI6IERyYXdlclRvb2xiYXI7XG4gIHByaXZhdGUgZ2V0IGRyYXdlclRvb2xiYXIoKTogRHJhd2VyVG9vbGJhciB7XG4gICAgcmV0dXJuIHRoaXMuX2RyYXdlclRvb2xiYXI7XG4gIH1cbiAgcHJpdmF0ZSBzZXQgZHJhd2VyVG9vbGJhcih2YWx1ZTogRHJhd2VyVG9vbGJhcikge1xuICAgIHRoaXMuX2RyYXdlclRvb2xiYXIgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3NjZW5lSWQ6IHN0cmluZztcbiAgcHJpdmF0ZSBnZXQgc2NlbmVJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zY2VuZUlkO1xuICB9XG4gIHByaXZhdGUgc2V0IHNjZW5lSWQodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3NjZW5lSWQgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRlbnRUeXBlOiBDb250ZW50VHlwZTtcbiAgcHJpdmF0ZSBnZXQgY29udGVudFR5cGUoKTogQ29udGVudFR5cGUge1xuICAgIHJldHVybiB0aGlzLl9jb250ZW50VHlwZTtcbiAgfVxuICBwcml2YXRlIHNldCBjb250ZW50VHlwZSh2YWx1ZTogQ29udGVudFR5cGUpIHtcbiAgICB0aGlzLl9jb250ZW50VHlwZSA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdGlhbFZpZXdJbmZvOiBWaWV3SW5mbztcbiAgcHJpdmF0ZSBnZXQgaW5pdGlhbFZpZXdJbmZvKCk6IFZpZXdJbmZvIHtcbiAgICByZXR1cm4gdGhpcy5faW5pdGlhbFZpZXdJbmZvO1xuICB9XG4gIHByaXZhdGUgc2V0IGluaXRpYWxWaWV3SW5mbyh2YWx1ZTogVmlld0luZm8pIHtcbiAgICB0aGlzLl9pbml0aWFsVmlld0luZm8gPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2xlYWZOb2RlUmVmczogTm9kZVJlZltdO1xuICBwcml2YXRlIGdldCBsZWFmTm9kZVJlZnMoKTogTm9kZVJlZltdIHtcbiAgICByZXR1cm4gdGhpcy5fbGVhZk5vZGVSZWZzO1xuICB9XG4gIHByaXZhdGUgc2V0IGxlYWZOb2RlUmVmcyh2YWx1ZTogTm9kZVJlZltdKSB7XG4gICAgdGhpcy5fbGVhZk5vZGVSZWZzID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF92aWV3UHJpb3JUb0lzb2xhdGVWaWV3SW5mbzogYW55O1xuICBwcml2YXRlIGdldCB2aWV3UHJpb3JUb0lzb2xhdGVWaWV3SW5mbygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl92aWV3UHJpb3JUb0lzb2xhdGVWaWV3SW5mbztcbiAgfVxuICBwcml2YXRlIHNldCB2aWV3UHJpb3JUb0lzb2xhdGVWaWV3SW5mbyh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fdmlld1ByaW9yVG9Jc29sYXRlVmlld0luZm8gPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZpZXdwb3J0QWRkZWQkOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICBwcml2YXRlIGdldCB2aWV3cG9ydEFkZGVkJCgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fdmlld3BvcnRBZGRlZCQ7XG4gIH1cbiAgcHJpdmF0ZSBzZXQgdmlld3BvcnRBZGRlZCQodmFsdWU6IE9ic2VydmFibGU8dm9pZD4pIHtcbiAgICB0aGlzLl92aWV3cG9ydEFkZGVkJCA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0ZWROb2RlSWRzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgcHJpdmF0ZSBnZXQgc2VsZWN0ZWROb2RlSWRzJCgpOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWROb2RlSWRzJDtcbiAgfVxuICBwcml2YXRlIHNldCBzZWxlY3RlZE5vZGVJZHMkKHZhbHVlOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KSB7XG4gICAgdGhpcy5fc2VsZWN0ZWROb2RlSWRzJCA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2NlbmVMb2FkSW5mbyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNjZW5lTG9hZEluZm8+KHtcbiAgICBzY2VuZUxvYWRTdGF0ZTogU2NlbmVMb2FkU3RhdGUuTm90U3RhcnRlZCxcbiAgfSk7XG4gIHB1YmxpYyBnZXQgc2NlbmVMb2FkSW5mbyQoKTogQmVoYXZpb3JTdWJqZWN0PFNjZW5lTG9hZEluZm8+IHtcbiAgICByZXR1cm4gdGhpcy5fc2NlbmVMb2FkSW5mbyQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgREVGQVVMVF9CQUNLR1JPVU5EX1RPUF9DT0xPUiA9ICctLWN4LWNvbG9yLWludmVyc2UnO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgREVGQVVMVF9CQUNLR1JPVU5EX0JPVFRPTV9DT0xPUiA9ICctLWN4LWNvbG9yLWludmVyc2UnO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgREVGQVVMVF9IT1RTUE9UX1NFTEVDVElPTl9ISUdITElHSFRfQ09MT1IgPVxuICAgICdyZ2JhKDI1NSwgMCwgMCwgMC42KSc7XG4gIHByb3RlY3RlZCByZWFkb25seSBERUZBVUxUX1NIT1dfQUxMX0hPVFNQT1RTX0NPTE9SID0gJ3JnYmEoMjU1LCAyNTUsIDAsIDAuMyknO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgREVGQVVMVF9PVVRMSU5FX0NPTE9SID0gJ3JlZCc7XG4gIHByb3RlY3RlZCByZWFkb25seSBERUZBVUxUX09VVExJTkVfV0lEVEggPSA1O1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgREVGQVVMVF9TRUxFQ1RJT05fTU9ERSA9IFNlbGVjdGlvbk1vZGUuRXhjbHVzaXZlO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgREVGQVVMVF9TSE9XX0FMTF9IT1RTUE9UU19FTkFCTEVEID0gZmFsc2U7XG4gIHByb3RlY3RlZCByZWFkb25seSBERUZBVUxUX0VYQ0xVREVEX09QQUNJVFkgPSAwLjI7XG4gIHByb3RlY3RlZCByZWFkb25seSBERUZBVUxUX1pPT01fVE9fTUFSR0lOID0gMC4yO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgREVGQVVMVF9GTFlfVE9fRFVSQVRJT04gPSAxO1xuXG4gIHByaXZhdGUgX2ZseVRvRHVyYXRpb25JblNlY29uZHMgPSB0aGlzLkRFRkFVTFRfRkxZX1RPX0RVUkFUSU9OO1xuICBwcml2YXRlIGdldCBmbHlUb0R1cmF0aW9uSW5TZWNvbmRzKCkge1xuICAgIHJldHVybiB0aGlzLl9mbHlUb0R1cmF0aW9uSW5TZWNvbmRzO1xuICB9XG4gIHByaXZhdGUgc2V0IGZseVRvRHVyYXRpb25JblNlY29uZHModmFsdWUpIHtcbiAgICB0aGlzLl9mbHlUb0R1cmF0aW9uSW5TZWNvbmRzID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfem9vbVRvTWFyZ2luID0gdGhpcy5ERUZBVUxUX1pPT01fVE9fTUFSR0lOO1xuICBwcml2YXRlIGdldCB6b29tVG9NYXJnaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3pvb21Ub01hcmdpbjtcbiAgfVxuICBwcml2YXRlIHNldCB6b29tVG9NYXJnaW4odmFsdWUpIHtcbiAgICB0aGlzLl96b29tVG9NYXJnaW4gPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgdG9wIGNvbG91ciBvZiB0aGUgYmFja2dyb3VuZCBncmFkaWVudC5cbiAgICogQ2FuIGJlIHBhc3NlZCBpbiB0aGUgQ1NTIGNvbG9yIGZvcm1hdCBvciBhcyBhIFNwYXJ0YWN1cyB0aGVtZSBjb2xvciBpLmUuICctLWN4LWNvbG9yLWJhY2tncm91bmQnIHdpdGggdGhlIHF1b3Rlcy5cbiAgICovXG4gIHB1YmxpYyBzZXQgYmFja2dyb3VuZFRvcENvbG9yKGJhY2tncm91bmRUb3BDb2xvcjogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fYmFja2dyb3VuZFRvcENvbG9yID09PSBiYWNrZ3JvdW5kVG9wQ29sb3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fYmFja2dyb3VuZFRvcENvbG9yID0gYmFja2dyb3VuZFRvcENvbG9yO1xuICAgIHRoaXMuZXhlY3V0ZVdoZW5TY2VuZUxvYWRlZCgoKSA9PiB7XG4gICAgICB0aGlzLnZpZXdwb3J0LnNldEJhY2tncm91bmRDb2xvclRvcCh0aGlzLmdldENTU0NvbG9yKGJhY2tncm91bmRUb3BDb2xvcikpO1xuICAgIH0pO1xuICB9XG4gIHB1YmxpYyBnZXQgYmFja2dyb3VuZFRvcENvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2JhY2tncm91bmRUb3BDb2xvcjtcbiAgfVxuICBwcml2YXRlIF9iYWNrZ3JvdW5kVG9wQ29sb3I6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGJvdHRvbSBjb2xvdXIgb2YgdGhlIGJhY2tncm91bmQgZ3JhZGllbnQuXG4gICAqIENhbiBiZSBwYXNzZWQgaW4gdGhlIENTUyBjb2xvciBmb3JtYXQgb3IgYXMgYSBTcGFydGFjdXMgdGhlbWUgY29sb3IgaS5lLiAnLS1jeC1jb2xvci1iYWNrZ3JvdW5kJyB3aXRoIHRoZSBxdW90ZXMuXG4gICAqL1xuICBwdWJsaWMgc2V0IGJhY2tncm91bmRCb3R0b21Db2xvcihiYWNrZ3JvdW5kQm90dG9tQ29sb3I6IHN0cmluZykge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2JhY2tncm91bmRCb3R0b21Db2xvciA9PT0gYmFja2dyb3VuZEJvdHRvbUNvbG9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2JhY2tncm91bmRCb3R0b21Db2xvciA9IGJhY2tncm91bmRCb3R0b21Db2xvcjtcbiAgICB0aGlzLmV4ZWN1dGVXaGVuU2NlbmVMb2FkZWQoKCkgPT4ge1xuICAgICAgdGhpcy52aWV3cG9ydC5zZXRCYWNrZ3JvdW5kQ29sb3JCb3R0b20oXG4gICAgICAgIHRoaXMuZ2V0Q1NTQ29sb3IoYmFja2dyb3VuZEJvdHRvbUNvbG9yKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuICBwdWJsaWMgZ2V0IGJhY2tncm91bmRCb3R0b21Db2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9iYWNrZ3JvdW5kQm90dG9tQ29sb3I7XG4gIH1cbiAgcHJpdmF0ZSBfYmFja2dyb3VuZEJvdHRvbUNvbG9yOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBjb2xvdXIgYXBwbGllZCB0byBzZWxlY3RlZCAyRCBob3RzcG90cyBpbiAyRCBjb250ZW50LlxuICAgKiBDYW4gYmUgcGFzc2VkIGluIHRoZSBDU1MgY29sb3IgZm9ybWF0IG9yIGFzIGEgU3BhcnRhY3VzIHRoZW1lIGNvbG9yIGkuZS4gJy0tY3gtY29sb3ItcHJpbWFyeScgd2l0aCB0aGUgcXVvdGVzLlxuICAgKi9cbiAgcHVibGljIHNldCBob3RzcG90U2VsZWN0aW9uQ29sb3IoaG90c3BvdFNlbGVjdGlvbkNvbG9yOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9ob3RzcG90U2VsZWN0aW9uQ29sb3IgPT09IGhvdHNwb3RTZWxlY3Rpb25Db2xvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9ob3RzcG90U2VsZWN0aW9uQ29sb3IgPSBob3RzcG90U2VsZWN0aW9uQ29sb3I7XG4gICAgdGhpcy5leGVjdXRlV2hlblNjZW5lTG9hZGVkKCgpID0+IHtcbiAgICAgIHRoaXMudmlld1N0YXRlTWFuYWdlci5zZXRIaWdobGlnaHRDb2xvcihcbiAgICAgICAgdGhpcy5nZXRDU1NDb2xvcihob3RzcG90U2VsZWN0aW9uQ29sb3IpXG4gICAgICApO1xuICAgIH0pO1xuICB9XG4gIHB1YmxpYyBnZXQgaG90c3BvdFNlbGVjdGlvbkNvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2hvdHNwb3RTZWxlY3Rpb25Db2xvcjtcbiAgfVxuICBwcml2YXRlIF9ob3RzcG90U2VsZWN0aW9uQ29sb3I6IHN0cmluZztcblxuICAvKipcbiAgICogSGlnaGxpZ2h0cyBhbGwgaG90c3BvdHMgaW4gMkQgY29udGVudCB0aGF0IGFyZSBpbmNsdWRlZCBpbiB0aGUgaW5jbHVkZWRQcm9kdWN0Q29kZXMgcHJvcGVydHkgdXNpbmcgdGhlIGNvbG91ciBzcGVjaWZpZWQgYnkgdGhlIHNob3dBbGxIb3RzcG90c0NvbG9yIHByb3BlcnR5LlxuICAgKi9cbiAgcHVibGljIHNldCBzaG93QWxsSG90c3BvdHNFbmFibGVkKHNob3dBbGxIb3RzcG90c0VuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9zaG93QWxsSG90c3BvdHNFbmFibGVkID09PSBzaG93QWxsSG90c3BvdHNFbmFibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3Nob3dBbGxIb3RzcG90c0VuYWJsZWQgPSBzaG93QWxsSG90c3BvdHNFbmFibGVkO1xuICAgIHRoaXMuZXhlY3V0ZVdoZW5TY2VuZUxvYWRlZCgoKSA9PiB7XG4gICAgICB0aGlzLmFwcGx5SW5jbHVzaW9uU3R5bGUodGhpcy5faW5jbHVkZWRQcm9kdWN0Q29kZXMpO1xuICAgIH0pO1xuICB9XG4gIHB1YmxpYyBnZXQgc2hvd0FsbEhvdHNwb3RzRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd0FsbEhvdHNwb3RzRW5hYmxlZDtcbiAgfVxuICBwcml2YXRlIF9zaG93QWxsSG90c3BvdHNFbmFibGVkOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgY29sb3VyIHVzZWQgdG8gaGlnaGxpZ2h0IGhvdHNwb3RzIGluIDJEIGNvbnRlbnQgd2hlbiB0aGUgc2hvd0FsbEhvdHNwb3RzRW5hYmxlZCBwcm9wZXJ0eSBoYXMgYSB2YWx1ZSBvZiB0cnVlLlxuICAgKiBDYW4gYmUgcGFzc2VkIGluIHRoZSBDU1MgY29sb3IgZm9ybWF0IG9yIGFzIGEgU3BhcnRhY3VzIHRoZW1lIGNvbG9yIGkuZS4gJy0tY3gtY29sb3ItcHJpbWFyeScgd2l0aCB0aGUgcXVvdGVzLlxuICAgKi9cbiAgcHVibGljIHNldCBzaG93QWxsSG90c3BvdHNDb2xvcihzaG93QWxsSG90c3BvdHNDb2xvcjogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc2hvd0FsbEhvdHNwb3RzQ29sb3IgPT09IHNob3dBbGxIb3RzcG90c0NvbG9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3Nob3dBbGxIb3RzcG90c0NvbG9yID0gc2hvd0FsbEhvdHNwb3RzQ29sb3I7XG4gICAgdGhpcy5leGVjdXRlV2hlblNjZW5lTG9hZGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGNzc0NvbG9yID0gdGhpcy5nZXRDU1NDb2xvcihzaG93QWxsSG90c3BvdHNDb2xvcik7XG4gICAgICB0aGlzLnZpZXdwb3J0LnNldFNob3dBbGxIb3RzcG90c1RpbnRDb2xvcihjc3NDb2xvcik7XG4gICAgfSk7XG4gIH1cbiAgcHVibGljIGdldCBzaG93QWxsSG90c3BvdHNDb2xvcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zaG93QWxsSG90c3BvdHNDb2xvcjtcbiAgfVxuICBwcml2YXRlIF9zaG93QWxsSG90c3BvdHNDb2xvcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgb3V0bGluZSBjb2xvdXIgdXNlZCB0byBpbmRpY2F0ZSBzZWxlY3RlZCBvYmplY3RzIGluIDNEIGNvbnRlbnQuXG4gICAqIENhbiBiZSBwYXNzZWQgaW4gdGhlIENTUyBjb2xvciBmb3JtYXQgb3IgYXMgYSBTcGFydGFjdXMgdGhlbWUgY29sb3IgaS5lLiAnLS1jeC1jb2xvci1wcmltYXJ5JyB3aXRoIHRoZSBxdW90ZXMuXG4gICAqL1xuICBwdWJsaWMgc2V0IG91dGxpbmVDb2xvcihvdXRsaW5lQ29sb3I6IHN0cmluZykge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX291dGxpbmVDb2xvciA9PT0gb3V0bGluZUNvbG9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX291dGxpbmVDb2xvciA9IG91dGxpbmVDb2xvcjtcbiAgICB0aGlzLmV4ZWN1dGVXaGVuU2NlbmVMb2FkZWQoKCkgPT4ge1xuICAgICAgdGhpcy52aWV3U3RhdGVNYW5hZ2VyLnNldE91dGxpbmVDb2xvcih0aGlzLmdldENTU0NvbG9yKG91dGxpbmVDb2xvcikpO1xuICAgIH0pO1xuICB9XG4gIHB1YmxpYyBnZXQgb3V0bGluZUNvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX291dGxpbmVDb2xvcjtcbiAgfVxuICBwcml2YXRlIF9vdXRsaW5lQ29sb3I6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHdpZHRoIG9mIHRoZSBvdXRsaW5lIHVzZWQgdG8gaW5kaWNhdGUgc2VsZWN0ZWQgb2JqZWN0cyBpbiAzRCBjb250ZW50LlxuICAgKi9cbiAgcHVibGljIHNldCBvdXRsaW5lV2lkdGgob3V0bGluZVdpZHRoOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9vdXRsaW5lV2lkdGggPT09IG91dGxpbmVXaWR0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9vdXRsaW5lV2lkdGggPSBvdXRsaW5lV2lkdGg7XG4gICAgdGhpcy5leGVjdXRlV2hlblNjZW5lTG9hZGVkKCgpID0+IHtcbiAgICAgIHRoaXMudmlld1N0YXRlTWFuYWdlci5zZXRPdXRsaW5lV2lkdGgob3V0bGluZVdpZHRoKTtcbiAgICB9KTtcbiAgfVxuICBwdWJsaWMgZ2V0IG91dGxpbmVXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9vdXRsaW5lV2lkdGg7XG4gIH1cbiAgcHJpdmF0ZSBfb3V0bGluZVdpZHRoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBzZWxlY3Rpb24gbW9kZS5cbiAgICogTm9uZSAtIFNlbGVjdGlvbiBpcyBkaXNhYmxlZC5cbiAgICogRXhjbHVzaXZlIC0gV2hlbiBzZWxlY3Rpbmcgb2JqZWN0cyBpbiB0aGUgdmlld3BvcnQsIGF0IG1vc3Qgb25lIG9iamVjdCBjYW4gYmUgc2VsZWN0ZWQgYXQgYSB0aW1lLiBDbGlja2luZy90YXBwaW5nIHRvIHNlbGVjdCBhIG5ldyBvYmplY3Qgd2lsbCBkZXNlbGVjdCBhbnkgcHJldmlvdXNseSBzZWxlY3RlZCBvYmplY3RzLlxuICAgKiBTdGlja3kgLSBBIG11bHRpcGxlIHNlbGVjdGlvbiBtb2RlIGluIHdoaWNoIGNsaWNraW5nL3RhcHBpbmcgb24gYW4gb2JqZWN0IHRoYXQgaXMgbm90IHBhcnQgb2YgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIHdpbGwgdG9nZ2xlIGl0cyBzZWxlY3Rpb24gc3RhdGUgd2l0aG91dCBtb2RpZnlpbmcgdGhlIHNlbGVjdGlvbiBzdGF0ZSBvZiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIG9iamVjdHMuXG4gICAqL1xuICBwdWJsaWMgc2V0IHNlbGVjdGlvbk1vZGUoc2VsZWN0aW9uTW9kZTogU2VsZWN0aW9uTW9kZSkge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGUgPT09IHNlbGVjdGlvbk1vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc2VsZWN0aW9uTW9kZSA9IHNlbGVjdGlvbk1vZGU7XG4gICAgdGhpcy5leGVjdXRlV2hlblNjZW5lTG9hZGVkKCgpID0+IHtcbiAgICAgIHRoaXMudmlld3BvcnQuc2V0U2VsZWN0aW9uTW9kZShzZWxlY3Rpb25Nb2RlKTtcbiAgICB9KTtcbiAgfVxuICBwdWJsaWMgZ2V0IHNlbGVjdGlvbk1vZGUoKTogU2VsZWN0aW9uTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbk1vZGU7XG4gIH1cbiAgcHJpdmF0ZSBfc2VsZWN0aW9uTW9kZTogU2VsZWN0aW9uTW9kZTtcblxuICAvKipcbiAgICogR2V0cy9zZXRzIHRoZSBzZWxlY3Rpb24gaW4gdGVybXMgb2YgcHJvZHVjdCBjb2Rlcy5cbiAgICogR2V0cyB0aGUgc2V0IG9mIHByb2R1Y3QgY29kZXMgYXBwbGllZCB0byB0aGUgc2VsZWN0ZWQgc2NlbmUgbm9kZXMuXG4gICAqIFNldHMgdGhlIHNlbGVjdGlvbiBzZXQgYmFzZWQgb24gdGhlIHNldCBvZiBzdXBwbGllZCBwcm9kdWN0IGNvZGVzLlxuICAgKi9cbiAgcHVibGljIHNldCBzZWxlY3RlZFByb2R1Y3RDb2RlcyhzZWxlY3RlZFByb2R1Y3RDb2Rlczogc3RyaW5nW10pIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3NlbGVjdGVkUHJvZHVjdENvZGVzID0gc2VsZWN0ZWRQcm9kdWN0Q29kZXM7XG4gICAgdGhpcy5zY2VuZU5vZGVUb1Byb2R1Y3RMb29rdXBTZXJ2aWNlXG4gICAgICAubG9va3VwTm9kZUlkcyhzZWxlY3RlZFByb2R1Y3RDb2RlcylcbiAgICAgIC5waXBlKGZpcnN0KCkpXG4gICAgICAuc3Vic2NyaWJlKChzZWxlY3RlZE5vZGVJZHM6IHN0cmluZ1tdKSA9PiB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlSWRzJC5uZXh0KHNlbGVjdGVkTm9kZUlkcyk7XG4gICAgICB9KTtcbiAgfVxuICBwdWJsaWMgZ2V0IHNlbGVjdGVkUHJvZHVjdENvZGVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRQcm9kdWN0Q29kZXM7XG4gIH1cbiAgcHJpdmF0ZSBfc2VsZWN0ZWRQcm9kdWN0Q29kZXM6IHN0cmluZ1tdO1xuICBzZWxlY3RlZFByb2R1Y3RDb2Rlc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nW10+KCk7XG5cbiAgLyoqXG4gICAqIEdldHMvc2V0cyB3aGljaCBvYmplY3RzIHNob3VsZCBiZSBzZWxlY3RhYmxlIChpbiB0ZXJtcyBvZiBwcm9kdWN0IGNvZGVzKS5cbiAgICogRm9yIDNEIGNvbnRlbnQ6XG4gICAqIC0gb2JqZWN0cyB0aGF0IGFyZSBpbmNsdWRlZCB3aWxsIGJlIHNlbGVjdGFibGUgYW5kIG9wYXF1ZVxuICAgKiAtIG9iamVjdHMgdGhhdCBhcmUgbm90IGluY2x1ZGVkIHdpbGwgbm90IGJlIHNlbGVjdGFibGUgYW5kIHdpbGwgaGF2ZSBhbiBvcGFjaXR5IHNwZWNpZmllZCBieSB0aGUgZXhjbHVkZWRPcGFjaXR5IHByb3BlcnR5LlxuICAgKlxuICAgKiBGb3IgMkQgY29udGVudDpcbiAgICogLSBob3RzcG90cyB0aGF0IGFyZSBpbmNsdWRlZCB3aWxsIGJlIHNlbGVjdGFibGUgYW5kIGNhbiBiZSBtYWRlIHZpc2libGVcbiAgICogLSBob3RzcG90cyB0aGF0IGFyZSBub3QgaW5jbHVkZWQgd2lsbCBub3QgYmUgc2VsZWN0YWJsZSBvciB2aXNpYmxlXG4gICAqL1xuICBwdWJsaWMgc2V0IGluY2x1ZGVkUHJvZHVjdENvZGVzKGluY2x1ZGVkUHJvZHVjdENvZGVzOiBzdHJpbmdbXSkge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5faW5jbHVkZWRQcm9kdWN0Q29kZXMgPSBpbmNsdWRlZFByb2R1Y3RDb2RlcztcbiAgICB0aGlzLmV4ZWN1dGVXaGVuU2NlbmVMb2FkZWQoKCkgPT4ge1xuICAgICAgdGhpcy5hcHBseUluY2x1c2lvblN0eWxlKGluY2x1ZGVkUHJvZHVjdENvZGVzKTtcbiAgICB9KTtcbiAgfVxuICBwdWJsaWMgZ2V0IGluY2x1ZGVkUHJvZHVjdENvZGVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5faW5jbHVkZWRQcm9kdWN0Q29kZXM7XG4gIH1cbiAgcHJpdmF0ZSBfaW5jbHVkZWRQcm9kdWN0Q29kZXM6IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBHZXRzL3NldHMgdGhlIG9wYWNpdHkgdG8gYXBwbHkgdG8gM0Qgb2JqZWN0cyB0aGF0IGFyZSBub3QgaW4gdGhlIHNldCBzcGVjaWZpZWQgYnkgdGhlIGluY2x1ZGVkUHJvZHVjdENvZGVzIHByb3BlcnR5LlxuICAgKi9cbiAgcHVibGljIHNldCBleGNsdWRlZE9wYWNpdHkoZXhjbHVkZWRPcGFjaXR5OiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2V4Y2x1ZGVkT3BhY2l0eSA9IGV4Y2x1ZGVkT3BhY2l0eTtcbiAgfVxuICBwdWJsaWMgZ2V0IGV4Y2x1ZGVkT3BhY2l0eSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9leGNsdWRlZE9wYWNpdHk7XG4gIH1cbiAgcHJpdmF0ZSBfZXhjbHVkZWRPcGFjaXR5OiBudW1iZXIgPSB0aGlzLkRFRkFVTFRfRVhDTFVERURfT1BBQ0lUWTtcblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdGltZSBwb3NpdGlvbiBpbiBzZWNvbmRzIGluIHRoZSBhbmltYXRpb24gKGlmIHRoZXJlIGlzIG9uZSkuXG4gICAqL1xuICBwdWJsaWMgc2V0IGFuaW1hdGlvblRpbWUoYW5pbWF0aW9uVGltZTogbnVtYmVyKSB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9hbmltYXRpb25UaW1lID0gYW5pbWF0aW9uVGltZTtcbiAgfVxuICBwdWJsaWMgZ2V0IGFuaW1hdGlvblRpbWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYW5pbWF0aW9uVGltZTtcbiAgfVxuICBwcml2YXRlIF9hbmltYXRpb25UaW1lOiBudW1iZXI7XG4gIGFuaW1hdGlvblRpbWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKipcbiAgICogVGhlIHRvdGFsIGR1cmF0aW9uIG9mIHRoZSBhbmltYXRpb24gaW4gc2Vjb25kcy5cbiAgICogUmV0dXJucyAwIHdoZW4gdGhlcmUgaXMgbm8gYW5pbWF0aW9uIHByZXNlbnQgKG9yIHdoZW4gYSBzY2VuZSBoYXMgbm90IGJlZW4gbG9hZGVkKS5cbiAgICovXG4gIHB1YmxpYyBnZXQgYW5pbWF0aW9uVG90YWxEdXJhdGlvbigpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmFuaW1hdGlvblBsYXllcikge1xuICAgICAgcmV0dXJuIHRoaXMuYW5pbWF0aW9uUGxheWVyLmdldFRvdGFsRHVyYXRpb24oKTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGFuaW1hdGlvbiBwbGF5YmFjayBwb3NpdGlvbiBhcyBhIGZyYWN0aW9uYWwgdmFsdWUgYmV0d2VlbiAwIChzdGFydCkgYW5kIDEgKGVuZCkuXG4gICAqL1xuICBwdWJsaWMgc2V0IGFuaW1hdGlvblBvc2l0aW9uKHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9hbmltYXRpb25Qb3NpdGlvbiA9PT0gcG9zaXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fYW5pbWF0aW9uUG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB0aGlzLmV4ZWN1dGVXaGVuU2NlbmVMb2FkZWQoKCkgPT4ge1xuICAgICAgY29uc3QgdGltZSA9IHBvc2l0aW9uICogdGhpcy5hbmltYXRpb25QbGF5ZXIuZ2V0VG90YWxEdXJhdGlvbigpO1xuICAgICAgdGhpcy5hbmltYXRpb25QbGF5ZXJTZXRUaW1lKHRpbWUsIGZhbHNlKTtcbiAgICB9KTtcbiAgfVxuICBwdWJsaWMgZ2V0IGFuaW1hdGlvblBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2FuaW1hdGlvblBvc2l0aW9uO1xuICB9XG4gIHByaXZhdGUgX2FuaW1hdGlvblBvc2l0aW9uOiBudW1iZXIgPSAwO1xuICBhbmltYXRpb25Qb3NpdGlvbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKlxuICAgKiBHZXRzL3NldHMgd2hldGhlciB0aGUgYW5pbWF0aW9uIChpZiB0aGVyZSBpcyBvbmUpIGlzIGN1cnJlbnRseSBwbGF5aW5nLlxuICAgKi9cbiAgcHVibGljIHNldCBhbmltYXRpb25QbGF5aW5nKGFuaW1hdGlvblBsYXlpbmc6IGJvb2xlYW4pIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9hbmltYXRpb25QbGF5aW5nID09PSBhbmltYXRpb25QbGF5aW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2FuaW1hdGlvblBsYXlpbmcgPSBhbmltYXRpb25QbGF5aW5nO1xuICAgIHRoaXMuZXhlY3V0ZVdoZW5TY2VuZUxvYWRlZCgoKSA9PiB7XG4gICAgICBpZiAoYW5pbWF0aW9uUGxheWluZykge1xuICAgICAgICBpZiAodGhpcy5hbmltYXRpb25Qb3NpdGlvbiA+PSAxKSB7XG4gICAgICAgICAgdGhpcy5hbmltYXRpb25QbGF5ZXJTZXRUaW1lKDAsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFuaW1hdGlvblBsYXllci5wbGF5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFuaW1hdGlvblBsYXllci5zdG9wKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmFuaW1hdGlvblBsYXlpbmdDaGFuZ2UuZW1pdChhbmltYXRpb25QbGF5aW5nKTtcbiAgICB9KTtcbiAgfVxuICBwdWJsaWMgZ2V0IGFuaW1hdGlvblBsYXlpbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2FuaW1hdGlvblBsYXlpbmc7XG4gIH1cbiAgcHJpdmF0ZSBfYW5pbWF0aW9uUGxheWluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBhbmltYXRpb25QbGF5aW5nQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8qKlxuICAgKiBDb250cm9scyB0aGUgYmVoYXZpb3VyIHdoZW4gYSBsZWZ0IG1vdXNlIGJ1dHRvbiBkcmFnIGlzIGluaXRpYXRlZCBpbiB0aGUgdmlld3BvcnQuXG4gICAqIFR1cm50YWJsZTogQSBsZWZ0IG1vdXNlIGRyYWcgcGVyZm9ybXMgYSB0dXJudGFibGUgbW9kZSByb3RhdGlvbi5cbiAgICogUGFuOiBBIGxlZnQgbW91c2UgZHJhZyBwYW5zIHRoZSBjYW1lcmEgaW4gdGhlIHZpZXdwb3J0LlxuICAgKiBab29tOiBBIGxlZnQgbW91c2UgZHJhZyB6b29tcyB0aGUgY2FtZXJhIGluIHRoZSB2aWV3cG9ydCBpbiBvciBvdXRcbiAgICovXG4gIHB1YmxpYyBzZXQgbmF2aWdhdGlvbk1vZGUobmF2aWdhdGlvbk1vZGU6IE5hdmlnYXRpb25Nb2RlKSB7XG4gICAgaWYgKCF0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fbmF2aWdhdGlvbk1vZGUgPT09IG5hdmlnYXRpb25Nb2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fbmF2aWdhdGlvbk1vZGUgPSBuYXZpZ2F0aW9uTW9kZTtcbiAgICB0aGlzLmV4ZWN1dGVXaGVuU2NlbmVMb2FkZWQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZHJhd2VyVG9vbGJhciAmJiB0aGlzLnZpZXdwb3J0KSB7XG4gICAgICAgIC8vIHNhcC51aS52ayBsaWJyYXJ5IHdpbGwgaGF2ZSBhIHB1YmxpYyBBUEkgdG8gc2V0IHRoZSBuYXZpZ2F0aW9uIG1vZGUgaW4gYSBmdXR1cmUgVUk1IHZlcnNpb25cbiAgICAgICAgKHRoaXMuZHJhd2VyVG9vbGJhciBhcyBhbnkpLl9hY3RpdmF0ZUdlc3R1cmUoXG4gICAgICAgICAgKHRoaXMudmlld3BvcnQgYXMgYW55KS5nZXRJbXBsZW1lbnRhdGlvbigpLFxuICAgICAgICAgIG5hdmlnYXRpb25Nb2RlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcHVibGljIGdldCBuYXZpZ2F0aW9uTW9kZSgpOiBOYXZpZ2F0aW9uTW9kZSB7XG4gICAgcmV0dXJuIHRoaXMuX25hdmlnYXRpb25Nb2RlO1xuICB9XG4gIHByaXZhdGUgX25hdmlnYXRpb25Nb2RlOiBOYXZpZ2F0aW9uTW9kZTtcblxuICAvKipcbiAgICogSXNvbGF0ZSBtb2RlIGFsbG93cyBhIHNpbmdsZSBvYmplY3QgdG8gYmUgdmlld2VkIGluIGlzb2xhdGlvbi5cbiAgICovXG4gIHB1YmxpYyBzZXQgaXNvbGF0ZU1vZGVFbmFibGVkKGlzb2xhdGVNb2RlRW5hYmxlZDogYm9vbGVhbikge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2lzb2xhdGVNb2RlRW5hYmxlZCA9PT0gaXNvbGF0ZU1vZGVFbmFibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5leGVjdXRlV2hlblNjZW5lTG9hZGVkKCgpID0+IHtcbiAgICAgIHRoaXMuX2lzb2xhdGVNb2RlRW5hYmxlZCA9IGlzb2xhdGVNb2RlRW5hYmxlZDtcbiAgICAgIGlmIChpc29sYXRlTW9kZUVuYWJsZWQpIHtcbiAgICAgICAgdGhpcy52aWV3UHJpb3JUb0lzb2xhdGVWaWV3SW5mbyA9IHRoaXMudmlld3BvcnQuZ2V0Vmlld0luZm8oe1xuICAgICAgICAgIGNhbWVyYTogdHJ1ZSxcbiAgICAgICAgICB2aXNpYmlsaXR5OiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBzZWxlY3RlZE5vZGVSZWZzOiBOb2RlUmVmW10gPSBbXTtcbiAgICAgICAgaWYgKHRoaXMuaXMyRCkge1xuICAgICAgICAgIHRoaXMudmlld1N0YXRlTWFuYWdlci5lbnVtZXJhdGVTZWxlY3Rpb24oKG5vZGVSZWY6IE5vZGVSZWYpID0+XG4gICAgICAgICAgICBzZWxlY3RlZE5vZGVSZWZzLnB1c2gobm9kZVJlZilcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudmlld1N0YXRlTWFuYWdlci5lbnVtZXJhdGVPdXRsaW5lZE5vZGVzKChub2RlUmVmOiBOb2RlUmVmKSA9PlxuICAgICAgICAgICAgc2VsZWN0ZWROb2RlUmVmcy5wdXNoKG5vZGVSZWYpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNvbGF0ZU5vZGVzKHNlbGVjdGVkTm9kZVJlZnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52aWV3cG9ydC5zZXRWaWV3SW5mbyhcbiAgICAgICAgICB0aGlzLnZpZXdQcmlvclRvSXNvbGF0ZVZpZXdJbmZvLFxuICAgICAgICAgIHRoaXMuZmx5VG9EdXJhdGlvbkluU2Vjb25kc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmlzb2xhdGVNb2RlRW5hYmxlZENoYW5nZS5lbWl0KHRoaXMuaXNvbGF0ZU1vZGVFbmFibGVkKTtcbiAgICB9KTtcbiAgfVxuICBwdWJsaWMgZ2V0IGlzb2xhdGVNb2RlRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNvbGF0ZU1vZGVFbmFibGVkO1xuICB9XG4gIHByaXZhdGUgX2lzb2xhdGVNb2RlRW5hYmxlZCA9IGZhbHNlO1xuICBpc29sYXRlTW9kZUVuYWJsZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLyoqXG4gICAqIEdldHMgd2hldGhlciB0aGUgdmlld3BvcnQgaXMgZGlzcGxheWluZyAyRCBjb250ZW50LlxuICAgKi9cbiAgcHVibGljIGdldCBpczJEKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pczJEO1xuICB9XG4gIHByaXZhdGUgc2V0SXMyRChpczJEOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXMyRCA9IGlzMkQ7XG4gIH1cbiAgcHJpdmF0ZSBfaXMyRDogYm9vbGVhbjtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHRoYXQgYSBzY2VuZSBoYXMgYmVlbiBsb2FkZWQgYW5kIHRoZSB2aWV3cG9ydCBpcyByZWFkeSBmb3IgaW50ZXJhY3Rpb24uXG4gICAqL1xuICBwdWJsaWMgZ2V0IHZpZXdwb3J0UmVhZHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdwb3J0UmVhZHk7XG4gIH1cbiAgcHJpdmF0ZSBzZXRWaWV3cG9ydFJlYWR5KHZpZXdwb3J0UmVhZHk6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5fdmlld3BvcnRSZWFkeSA9PT0gdmlld3BvcnRSZWFkeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl92aWV3cG9ydFJlYWR5ID0gdmlld3BvcnRSZWFkeTtcbiAgICB0aGlzLnZpZXdwb3J0UmVhZHlDaGFuZ2UuZW1pdCh2aWV3cG9ydFJlYWR5KTtcbiAgfVxuICBwcml2YXRlIF92aWV3cG9ydFJlYWR5ID0gZmFsc2U7XG4gIHZpZXdwb3J0UmVhZHlDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHVzZXIgdG8gdGhlIGluaXRpYWwgY2FtZXJhIHBvc2l0aW9uIHVzZWQgd2hlbiBhIHNjZW5lIHdhcyBmaXJzdCBsb2FkZWQuXG4gICAqL1xuICBwdWJsaWMgYWN0aXZhdGVIb21lVmlldygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmlzMkQpIHtcbiAgICAgIHRoaXMudmlld3BvcnQuem9vbVRvKFxuICAgICAgICBab29tVG8uQWxsLFxuICAgICAgICBudWxsLFxuICAgICAgICB0aGlzLmZseVRvRHVyYXRpb25JblNlY29uZHMsXG4gICAgICAgIHRoaXMuem9vbVRvTWFyZ2luXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZpZXdwb3J0LnNldFZpZXdJbmZvKFxuICAgICAgICB0aGlzLmluaXRpYWxWaWV3SW5mbyxcbiAgICAgICAgdGhpcy5mbHlUb0R1cmF0aW9uSW5TZWNvbmRzXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzb2xhdGVNb2RlRW5hYmxlZCkge1xuICAgICAgLy8gRXhpdCBvdXQgb2YgdGhlIGlzb2xhdGUgbW9kZSBidXQgZG9uJ3QgcmVzdG9yZSB0aGUgdmlldyB0aGF0IHdhc1xuICAgICAgLy8gc2F2ZWQgYmVmb3JlIGVudGVyaW5nIGlzb2xhdGUgbW9kZVxuICAgICAgdGhpcy5faXNvbGF0ZU1vZGVFbmFibGVkID0gZmFsc2U7XG4gICAgICB0aGlzLmlzb2xhdGVNb2RlRW5hYmxlZENoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGxheXMgdGhlIGFuaW1hdGlvbiAoaWYgb25lIGV4aXN0cykuXG4gICAqL1xuICBwdWJsaWMgcGxheUFuaW1hdGlvbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuYW5pbWF0aW9uUGxheWluZyA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogUGF1c2VzIGFuaW1hdGlvbiBwbGF5YmFjay5cbiAgICovXG4gIHB1YmxpYyBwYXVzZUFuaW1hdGlvbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMud2luZG93UmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuYW5pbWF0aW9uUGxheWluZyA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBjb250ZW50Q2hhbmdlc0ZpbmlzaGVkID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPFZpc3VhbENvbnRlbnRDaGFuZ2VzRmluaXNoZWRFdmVudD4oKTtcblxuICBwcml2YXRlIGNvbnRlbnRMb2FkRmluaXNoZWQgPVxuICAgIG5ldyBFdmVudEVtaXR0ZXI8VmlzdWFsQ29udGVudExvYWRGaW5pc2hlZEV2ZW50PigpO1xuXG4gIHByaXZhdGUgc2V0SW5pdGlhbFByb3BlcnR5VmFsdWVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmJhY2tncm91bmRUb3BDb2xvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmJhY2tncm91bmRUb3BDb2xvciA9IHRoaXMuREVGQVVMVF9CQUNLR1JPVU5EX1RPUF9DT0xPUjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5iYWNrZ3JvdW5kQm90dG9tQ29sb3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5iYWNrZ3JvdW5kQm90dG9tQ29sb3IgPSB0aGlzLkRFRkFVTFRfQkFDS0dST1VORF9CT1RUT01fQ09MT1I7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaG90c3BvdFNlbGVjdGlvbkNvbG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuaG90c3BvdFNlbGVjdGlvbkNvbG9yID1cbiAgICAgICAgdGhpcy5ERUZBVUxUX0hPVFNQT1RfU0VMRUNUSU9OX0hJR0hMSUdIVF9DT0xPUjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zaG93QWxsSG90c3BvdHNDb2xvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNob3dBbGxIb3RzcG90c0NvbG9yID0gdGhpcy5ERUZBVUxUX1NIT1dfQUxMX0hPVFNQT1RTX0NPTE9SO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm91dGxpbmVDb2xvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm91dGxpbmVDb2xvciA9IHRoaXMuREVGQVVMVF9PVVRMSU5FX0NPTE9SO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm91dGxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm91dGxpbmVXaWR0aCA9IHRoaXMuREVGQVVMVF9PVVRMSU5FX1dJRFRIO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlID0gdGhpcy5ERUZBVUxUX1NFTEVDVElPTl9NT0RFO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNob3dBbGxIb3RzcG90c0VuYWJsZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zaG93QWxsSG90c3BvdHNFbmFibGVkID0gdGhpcy5ERUZBVUxUX1NIT1dfQUxMX0hPVFNQT1RTX0VOQUJMRUQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXMyRCkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLm5hdmlnYXRpb25Nb2RlID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uTW9kZSA9PT0gTmF2aWdhdGlvbk1vZGUuVHVybnRhYmxlXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uTW9kZSA9IE5hdmlnYXRpb25Nb2RlLlBhbjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMubmF2aWdhdGlvbk1vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5uYXZpZ2F0aW9uTW9kZSA9IE5hdmlnYXRpb25Nb2RlLlR1cm50YWJsZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zZWxlY3RlZFByb2R1Y3RDb2RlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdENvZGVzID0gdGhpcy5zZWxlY3RlZE5vZGVJZHMkLmdldFZhbHVlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBleGVjdXRlV2hlblNjZW5lTG9hZGVkKFxuICAgIGNhbGxiYWNrOiAobG9hZGVkU2NlbmVJbmZvOiBMb2FkZWRTY2VuZUluZm8pID0+IHZvaWRcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5zY2VuZUxvYWRJbmZvJFxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihcbiAgICAgICAgICAoc2NlbmVMb2FkSW5mbzogeyBzY2VuZUxvYWRTdGF0ZTogU2NlbmVMb2FkU3RhdGUgfSkgPT5cbiAgICAgICAgICAgIHNjZW5lTG9hZEluZm8uc2NlbmVMb2FkU3RhdGUgPT09IFNjZW5lTG9hZFN0YXRlLkxvYWRlZCB8fFxuICAgICAgICAgICAgc2NlbmVMb2FkSW5mby5zY2VuZUxvYWRTdGF0ZSA9PT0gU2NlbmVMb2FkU3RhdGUuRmFpbGVkXG4gICAgICAgICksXG4gICAgICAgIGZpcnN0KClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKHNjZW5lTG9hZEluZm86IFNjZW5lTG9hZEluZm8pID0+IHtcbiAgICAgICAgaWYgKHNjZW5lTG9hZEluZm8uc2NlbmVMb2FkU3RhdGUgPT09IFNjZW5lTG9hZFN0YXRlLkxvYWRlZCkge1xuICAgICAgICAgIGNhbGxiYWNrKHNjZW5lTG9hZEluZm8ubG9hZGVkU2NlbmVJbmZvIGFzIExvYWRlZFNjZW5lSW5mbyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUluY2x1c2lvblN0eWxlKHByb2R1Y3RDb2Rlczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBpZiAocHJvZHVjdENvZGVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNjZW5lTm9kZVRvUHJvZHVjdExvb2t1cFNlcnZpY2VcbiAgICAgIC5sb29rdXBOb2RlSWRzKHByb2R1Y3RDb2RlcylcbiAgICAgIC5waXBlKGZpcnN0KCkpXG4gICAgICAuc3Vic2NyaWJlKChzY2VuZU5vZGVJZHM6IHN0cmluZ1tdKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlzMkQpIHtcbiAgICAgICAgICB0aGlzLmFwcGx5SW5jbHVzaW9uU3R5bGUyRChzY2VuZU5vZGVJZHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYXBwbHlJbmNsdXNpb25TdHlsZTNEKHNjZW5lTm9kZUlkcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUluY2x1c2lvblN0eWxlMkQoc2NlbmVOb2RlSWRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGNvbnN0IG5vZGVSZWZzVG9JbmNsdWRlOiBOb2RlUmVmW10gPSB0aGlzLnBlcnNpc3RlbnRJZFRvTm9kZVJlZihcbiAgICAgIHNjZW5lTm9kZUlkcyxcbiAgICAgIHRydWVcbiAgICApO1xuICAgIGNvbnN0IGhvdHNwb3ROb2RlUmVmczogTm9kZVJlZltdID0gdGhpcy5ub2RlSGllcmFyY2h5LmdldEhvdHNwb3ROb2RlSWRzKCk7XG4gICAgY29uc3QgaG90c3BvdE5vZGVSZWZzU2V0OiBTZXQ8Tm9kZVJlZj4gPSBuZXcgU2V0KGhvdHNwb3ROb2RlUmVmcyk7XG4gICAgLy8gSG90c3BvdCBub2RlcyBjYW4gaGF2ZSBkZXNjZW5kYW50cyB0aGF0IGFyZSBhbHNvIEhvdHNwb3Qgbm9kZXMuXG4gICAgLy8gSWdub3JlIHRoZSBkZXNjZW5kYW50IG5vZGVzIGFuZCBhcHBseSBtb2RpZmljYXRpb25zIGF0IHRoZSBoaWdoZXN0IGxldmVsIG9ubHkuXG4gICAgY29uc3QgdG9wTGV2ZWxIb3RzcG90Tm9kZVJlZnM6IE5vZGVSZWZbXSA9IGhvdHNwb3ROb2RlUmVmcy5maWx0ZXIoXG4gICAgICAoaG90c3BvdE5vZGVSZWY6IE5vZGVSZWYpID0+XG4gICAgICAgIHRoaXMuaXNUb3BMZXZlbEhvdHNwb3ROb2RlKGhvdHNwb3ROb2RlUmVmLCBob3RzcG90Tm9kZVJlZnNTZXQpXG4gICAgKTtcbiAgICBpZiAodGhpcy5fc2hvd0FsbEhvdHNwb3RzRW5hYmxlZCkge1xuICAgICAgY29uc3Qgbm9kZVJlZnNUb0luY2x1ZGVTZXQgPSBuZXcgU2V0KG5vZGVSZWZzVG9JbmNsdWRlKTtcbiAgICAgIGNvbnN0IG5vZGVSZWZzVG9FeGNsdWRlOiBOb2RlUmVmW10gPSB0b3BMZXZlbEhvdHNwb3ROb2RlUmVmcy5maWx0ZXIoXG4gICAgICAgIChub2RlUmVmOiBOb2RlUmVmKSA9PiAhbm9kZVJlZnNUb0luY2x1ZGVTZXQuaGFzKG5vZGVSZWYpXG4gICAgICApO1xuICAgICAgdGhpcy52aWV3cG9ydC5zaG93SG90c3BvdHMobm9kZVJlZnNUb0V4Y2x1ZGUsIGZhbHNlLCAwKTtcbiAgICAgIHRoaXMudmlld3BvcnQuc2hvd0hvdHNwb3RzKFxuICAgICAgICBub2RlUmVmc1RvSW5jbHVkZSxcbiAgICAgICAgdHJ1ZSxcbiAgICAgICAgdGhpcy5nZXRDU1NDb2xvcih0aGlzLl9zaG93QWxsSG90c3BvdHNDb2xvcilcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlld3BvcnQuc2hvd0hvdHNwb3RzKHRvcExldmVsSG90c3BvdE5vZGVSZWZzLCBmYWxzZSwgMCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUluY2x1c2lvblN0eWxlM0Qoc2NlbmVOb2RlSWRzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGNvbnN0IG5vZGVSZWZzVG9JbmNsdWRlOiBOb2RlUmVmW10gPSB0aGlzLnBlcnNpc3RlbnRJZFRvTm9kZVJlZihcbiAgICAgIHNjZW5lTm9kZUlkcyxcbiAgICAgIHRydWVcbiAgICApO1xuXG4gICAgaWYgKCF0aGlzLmxlYWZOb2RlUmVmcykge1xuICAgICAgdGhpcy5sZWFmTm9kZVJlZnMgPSB0aGlzLmdldEFsbExlYWZOb2RlUmVmcygpO1xuICAgIH1cblxuICAgIGNvbnN0IGxlYWZOb2RlUmVmc1RvSW5jbHVkZSA9IG5vZGVSZWZzVG9JbmNsdWRlLmZsYXRNYXAoXG4gICAgICAobm9kZVJlZjogTm9kZVJlZikgPT4gdGhpcy5nZXRMZWFmRGVzY2VuZGFudHMobm9kZVJlZiwgW10pXG4gICAgKTtcbiAgICBjb25zdCBsZWFmTm9kZVJlZnNUb0luY2x1ZGVTZXQgPSBuZXcgU2V0KGxlYWZOb2RlUmVmc1RvSW5jbHVkZSk7XG4gICAgY29uc3QgbGVhZk5vZGVSZWZzVG9FeGNsdWRlID0gdGhpcy5sZWFmTm9kZVJlZnMuZmlsdGVyKFxuICAgICAgKGxlYWZOb2RlUmVmOiBOb2RlUmVmKSA9PiAhbGVhZk5vZGVSZWZzVG9JbmNsdWRlU2V0LmhhcyhsZWFmTm9kZVJlZilcbiAgICApO1xuXG4gICAgdGhpcy52aWV3U3RhdGVNYW5hZ2VyLnNldE9wYWNpdHkoXG4gICAgICBsZWFmTm9kZVJlZnNUb0V4Y2x1ZGUsXG4gICAgICB0aGlzLmV4Y2x1ZGVkT3BhY2l0eVxuICAgICk7XG4gICAgbGVhZk5vZGVSZWZzVG9JbmNsdWRlLmZvckVhY2goKG5vZGVSZWY6IE5vZGVSZWYpID0+XG4gICAgICB0aGlzLnZpZXdTdGF0ZU1hbmFnZXIuc2V0T3BhY2l0eShcbiAgICAgICAgbm9kZVJlZixcbiAgICAgICAgdGhpcy52aWV3U3RhdGVNYW5hZ2VyLmdldFJlc3RPcGFjaXR5KG5vZGVSZWYpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNUb3BMZXZlbEhvdHNwb3ROb2RlKFxuICAgIGhvdHNwb3ROb2RlUmVmOiBOb2RlUmVmLFxuICAgIGhvdHNwb3ROb2RlUmVmczogU2V0PE5vZGVSZWY+XG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5ub2RlSGllcmFyY2h5XG4gICAgICAuZ2V0QW5jZXN0b3JzKGhvdHNwb3ROb2RlUmVmKVxuICAgICAgLnNvbWUoKGFuY2VzdG9yOiBOb2RlUmVmKSA9PiBob3RzcG90Tm9kZVJlZnMuaGFzKGFuY2VzdG9yKSk7XG4gIH1cblxuICBwcml2YXRlIGlzUmVmZXJlbmNlTm9kZShub2RlUmVmOiBOb2RlUmVmKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMubm9kZUhpZXJhcmNoeS5nZXROb2RlQ29udGVudFR5cGUobm9kZVJlZikgPT09XG4gICAgICBOb2RlQ29udGVudFR5cGUuUmVmZXJlbmNlXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TGVhZkRlc2NlbmRhbnRzKFxuICAgIG5vZGVSZWY6IE5vZGVSZWYsXG4gICAgbGVhZk5vZGVSZWZzOiBOb2RlUmVmW11cbiAgKTogTm9kZVJlZltdIHtcbiAgICBpZiAoIXRoaXMuaXNSZWZlcmVuY2VOb2RlKG5vZGVSZWYpKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMubm9kZUhpZXJhcmNoeVxuICAgICAgICAuZ2V0Q2hpbGRyZW4obm9kZVJlZiwgZmFsc2UpXG4gICAgICAgIC5maWx0ZXIoKGNoaWxkTm9kZVJlZjogTm9kZVJlZikgPT4gIXRoaXMuaXNSZWZlcmVuY2VOb2RlKGNoaWxkTm9kZVJlZikpO1xuXG4gICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGxlYWZOb2RlUmVmcy5wdXNoKG5vZGVSZWYpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGROb2RlUmVmOiBOb2RlUmVmKSA9PlxuICAgICAgICAgIHRoaXMuZ2V0TGVhZkRlc2NlbmRhbnRzKGNoaWxkTm9kZVJlZiwgbGVhZk5vZGVSZWZzKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbGVhZk5vZGVSZWZzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRBbGxMZWFmTm9kZVJlZnMoKTogTm9kZVJlZltdIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlSGllcmFyY2h5XG4gICAgICAuZ2V0Q2hpbGRyZW4odW5kZWZpbmVkKVxuICAgICAgLmZsYXRNYXAoKG5vZGVSZWY6IE5vZGVSZWYpID0+IHRoaXMuZ2V0TGVhZkRlc2NlbmRhbnRzKG5vZGVSZWYsIFtdKSk7XG4gIH1cblxuICBwcml2YXRlIGlzb2xhdGVOb2Rlcyhub2RlUmVmc1RvSXNvbGF0ZTogb2JqZWN0W10pOiB2b2lkIHtcbiAgICAvLyBpc29sYXRlIGp1c3QgdGhlIGZpcnN0IHNlbGVjdGVkIG5vZGVcbiAgICBub2RlUmVmc1RvSXNvbGF0ZSA9IG5vZGVSZWZzVG9Jc29sYXRlLnNsaWNlKDAsIDEpO1xuXG4gICAgdGhpcy52aWV3cG9ydC56b29tVG8oXG4gICAgICBab29tVG8uTm9kZSxcbiAgICAgIG5vZGVSZWZzVG9Jc29sYXRlLFxuICAgICAgdGhpcy5mbHlUb0R1cmF0aW9uSW5TZWNvbmRzLFxuICAgICAgdGhpcy56b29tVG9NYXJnaW5cbiAgICApO1xuXG4gICAgY29uc3QgY3VycmVudFZpc2libGVTaWRzOiBzdHJpbmdbXSA9XG4gICAgICB0aGlzLnZpZXdQcmlvclRvSXNvbGF0ZVZpZXdJbmZvLnZpc2liaWxpdHkudmlzaWJsZSB8fCBbXTtcbiAgICBjb25zdCBjdXJyZW50VmlzaWJsZU5vZGVSZWZzOiBOb2RlUmVmW10gPSB0aGlzLnBlcnNpc3RlbnRJZFRvTm9kZVJlZihcbiAgICAgIGN1cnJlbnRWaXNpYmxlU2lkcyxcbiAgICAgIHRydWVcbiAgICApO1xuICAgIHRoaXMudmlld1N0YXRlTWFuYWdlci5zZXRWaXNpYmlsaXR5U3RhdGUoXG4gICAgICBjdXJyZW50VmlzaWJsZU5vZGVSZWZzLFxuICAgICAgZmFsc2UsXG4gICAgICB0cnVlLFxuICAgICAgZmFsc2VcbiAgICApO1xuICAgIHRoaXMudmlld1N0YXRlTWFuYWdlci5zZXRWaXNpYmlsaXR5U3RhdGUoXG4gICAgICBub2RlUmVmc1RvSXNvbGF0ZSxcbiAgICAgIHRydWUsXG4gICAgICB0cnVlLFxuICAgICAgdHJ1ZVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGlvblBsYXllclNldFRpbWUodGltZTogbnVtYmVyLCBibG9ja0V2ZW50czogYm9vbGVhbik6IHZvaWQge1xuICAgIC8vIGJ1ZyB3b3JrYXJvdW5kXG4gICAgLy8gdGhlIG92ZXJsb2FkIHdpdGggbm8gc2VxdWVuY2UgbnVtYmVyIHBhcmFtZXRlciBibG93cyB1cFxuICAgICh0aGlzLmFuaW1hdGlvblBsYXllciBhcyBhbnkpLnNldFRpbWUodGltZSwgdW5kZWZpbmVkLCBibG9ja0V2ZW50cyk7XG4gIH1cblxuICBwcml2YXRlIG9uVmlld0FjdGl2YXRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXRpYWxWaWV3SW5mbyA9IHRoaXMudmlld3BvcnQuZ2V0Vmlld0luZm8oe1xuICAgICAgY2FtZXJhOiB0cnVlLFxuICAgICAgdmlzaWJpbGl0eTogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25UaW1lQ2hhbmdlZChvRXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGxldCBjaGFuZ2VzID0gZmFsc2U7XG5cbiAgICBjb25zdCB0aW1lOiBudW1iZXIgPSBvRXZlbnQuZ2V0UGFyYW1ldGVycygpLnRpbWU7XG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uVGltZSAhPT0gdGltZSkge1xuICAgICAgdGhpcy5hbmltYXRpb25UaW1lID0gdGltZTtcbiAgICAgIHRoaXMuYW5pbWF0aW9uVGltZUNoYW5nZS5lbWl0KHRpbWUpO1xuICAgICAgY2hhbmdlcyA9IHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmFuaW1hdGlvblRvdGFsRHVyYXRpb25cbiAgICAgID8gdGhpcy5hbmltYXRpb25UaW1lIC8gdGhpcy5hbmltYXRpb25Ub3RhbER1cmF0aW9uXG4gICAgICA6IDA7XG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uUG9zaXRpb24gIT09IHBvc2l0aW9uKSB7XG4gICAgICB0aGlzLmFuaW1hdGlvblBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICB0aGlzLmFuaW1hdGlvblBvc2l0aW9uQ2hhbmdlLmVtaXQocG9zaXRpb24pO1xuICAgICAgY2hhbmdlcyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uUGxheWluZykge1xuICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uUG9zaXRpb24gPj0gMSkge1xuICAgICAgICB0aGlzLl9hbmltYXRpb25QbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uUGxheWluZ0NoYW5nZS5lbWl0KHRoaXMuX2FuaW1hdGlvblBsYXlpbmcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICAvLyBUaGlzIGlzIG5lZWRlZCBmb3IgdGhlIGFuaW1hdGlvbiBzbGlkZXIgaGFuZGxlIHBvc2l0aW9uIHRvIGdldCB1cGRhdGVkXG4gICAgICAvLyB3aGlsZSBhbiBhbmltYXRpb24gaXMgcGxheWluZy5cbiAgICAgIC8vIE90aGVyd2lzZSBpdCB0eXBpY2FsbHkgb25seSBtb3ZlcyBvbmNlIHRoZSBhbmltYXRpb24gcGxheWJhY2sgaGFzIHBhdXNlZC5cbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0VmlzdWFsaXphdGlvbkxvYWRJbmZvKFxuICAgIHZpc3VhbGl6YXRpb25Mb2FkSW5mbzogVmlzdWFsaXphdGlvbkxvYWRJbmZvXG4gICkge1xuICAgIHRoaXMuX3Zpc3VhbGl6YXRpb25Mb2FkSW5mbyA9IHZpc3VhbGl6YXRpb25Mb2FkSW5mbztcbiAgICB0aGlzLnZpc3VhbGl6YXRpb25Mb2FkSW5mb0NoYW5nZS5lbWl0KHZpc3VhbGl6YXRpb25Mb2FkSW5mbyk7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbiAgcHVibGljIGdldCB2aXN1YWxpemF0aW9uTG9hZEluZm8oKTogVmlzdWFsaXphdGlvbkxvYWRJbmZvIHtcbiAgICByZXR1cm4gdGhpcy5fdmlzdWFsaXphdGlvbkxvYWRJbmZvO1xuICB9XG4gIHByaXZhdGUgX3Zpc3VhbGl6YXRpb25Mb2FkSW5mbzogVmlzdWFsaXphdGlvbkxvYWRJbmZvO1xuICBwdWJsaWMgdmlzdWFsaXphdGlvbkxvYWRJbmZvQ2hhbmdlID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPFZpc3VhbGl6YXRpb25Mb2FkSW5mbz4oKTtcblxuICBwdWJsaWMgbG9hZFZpc3VhbGl6YXRpb24oXG4gICAgcHJvZHVjdENvZGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPFZpc3VhbGl6YXRpb25Mb2FkSW5mbz4ge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybiBvZih7XG4gICAgICAgIGxvb2t1cFJlc3VsdDogVmlzdWFsaXphdGlvbkxvb2t1cFJlc3VsdC5VbmV4cGVjdGVkRXJyb3IsXG4gICAgICAgIGxvYWRTdGF0dXM6IFZpc3VhbGl6YXRpb25Mb2FkU3RhdHVzLlVuZXhwZWN0ZWRFcnJvcixcbiAgICAgICAgZXJyb3JNZXNzYWdlOiAnU2hvdWxkIG5vdCBjYWxsIGxvYWRWaXN1YWxpemF0aW9uIGluIHNlcnZlciBzaWRlIGNvZGUnLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWROb2RlSWRzU3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xuXG4gICAgcmV0dXJuIHRoaXMudmlld3BvcnRBZGRlZCQucGlwZShcbiAgICAgIG1lcmdlTWFwKCgpID0+XG4gICAgICAgIHRoaXMucmVzb2x2ZVZpc3VhbGl6YXRpb24ocHJvZHVjdENvZGUpLnBpcGUoXG4gICAgICAgICAgbWVyZ2VNYXAoKHZpc3VhbGl6YXRpb25Mb2FkSW5mbzogVmlzdWFsaXphdGlvbkxvYWRJbmZvKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHZpc3VhbGl6YXRpb25Mb2FkSW5mby5sb29rdXBSZXN1bHQgPT09XG4gICAgICAgICAgICAgIFZpc3VhbGl6YXRpb25Mb29rdXBSZXN1bHQuVW5pcXVlTWF0Y2hGb3VuZFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHRoaXMuc2NlbmVOb2RlVG9Qcm9kdWN0TG9va3VwU2VydmljZS5wb3B1bGF0ZU1hcHNGb3JTY2VuZShcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lSWRcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICBsZXQgbWVyZ2VkVmlzdWFsaXphdGlvbkxvYWRJbmZvOiBWaXN1YWxpemF0aW9uTG9hZEluZm8gPSB7XG4gICAgICAgICAgICAgICAgLi4udmlzdWFsaXphdGlvbkxvYWRJbmZvLFxuICAgICAgICAgICAgICAgIGxvYWRTdGF0dXM6IFZpc3VhbGl6YXRpb25Mb2FkU3RhdHVzLkxvYWRpbmcsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHRoaXMuc2V0VmlzdWFsaXphdGlvbkxvYWRJbmZvKG1lcmdlZFZpc3VhbGl6YXRpb25Mb2FkSW5mbyk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZFNjZW5lKHRoaXMuc2NlbmVJZCwgdGhpcy5jb250ZW50VHlwZSkucGlwZShcbiAgICAgICAgICAgICAgICBtZXJnZU1hcCgoc2NlbmVMb2FkSW5mbzogU2NlbmVMb2FkSW5mbykgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHNjZW5lTG9hZEluZm8uc2NlbmVMb2FkU3RhdGUgPT09IFNjZW5lTG9hZFN0YXRlLkZhaWxlZCkge1xuICAgICAgICAgICAgICAgICAgICBtZXJnZWRWaXN1YWxpemF0aW9uTG9hZEluZm8gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgLi4udmlzdWFsaXphdGlvbkxvYWRJbmZvLFxuICAgICAgICAgICAgICAgICAgICAgIGxvYWRTdGF0dXM6IFZpc3VhbGl6YXRpb25Mb2FkU3RhdHVzLlVuZXhwZWN0ZWRFcnJvcixcbiAgICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHNjZW5lTG9hZEluZm8uZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGVJZHNTdWJzY3JpcHRpb24gPVxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlSWRzJC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdGVkTm9kZUlkcy5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICBtZXJnZWRWaXN1YWxpemF0aW9uTG9hZEluZm8gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgLi4udmlzdWFsaXphdGlvbkxvYWRJbmZvLFxuICAgICAgICAgICAgICAgICAgICAgIGxvYWRTdGF0dXM6IFZpc3VhbGl6YXRpb25Mb2FkU3RhdHVzLkxvYWRlZCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmlzdWFsaXphdGlvbkxvYWRJbmZvKG1lcmdlZFZpc3VhbGl6YXRpb25Mb2FkSW5mbyk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb2YobWVyZ2VkVmlzdWFsaXphdGlvbkxvYWRJbmZvKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9mKHZpc3VhbGl6YXRpb25Mb2FkSW5mbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGlzVWk1Qm9vdFN0cmFwcGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICAhIXRoaXMud2luZG93UmVmLm5hdGl2ZVdpbmRvdyAmJlxuICAgICAgISEodGhpcy53aW5kb3dSZWYubmF0aXZlV2luZG93IGFzIGFueSkuc2FwXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29yZSgpOiBDb3JlIHtcbiAgICByZXR1cm4gc2FwLnVpLmdldENvcmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgYm9vdHN0cmFwVWk1KHNjcmlwdEVsZW1lbnRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgY29uc3QgZXBkVmlzdWFsaXphdGlvbiA9IHRoaXMuZXBkVmlzdWFsaXphdGlvbkNvbmZpZ1xuICAgICAgLmVwZFZpc3VhbGl6YXRpb24gYXMgRXBkVmlzdWFsaXphdGlvbklubmVyQ29uZmlnO1xuICAgIGNvbnN0IHVpNUNvbmZpZyA9IGVwZFZpc3VhbGl6YXRpb24udWk1IGFzIFVpNUNvbmZpZztcblxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgoc3Vic2NyaWJlcikgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNVaTVCb290U3RyYXBwZWQoKSkge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNjcmlwdCA9IHRoaXMud2luZG93UmVmLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnaWQnLCBzY3JpcHRFbGVtZW50SWQpO1xuICAgICAgdGhpcy53aW5kb3dSZWYuZG9jdW1lbnRcbiAgICAgICAgLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF1cbiAgICAgICAgLmFwcGVuZENoaWxkKHNjcmlwdCk7XG5cbiAgICAgICh0aGlzLndpbmRvd1JlZi5kb2N1bWVudCBhcyBhbnkpLm9uVWk1Qm9vdHN0cmFwcGVkID0gKCkgPT4ge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgfTtcblxuICAgICAgc2NyaXB0Lm9uZXJyb3IgPSAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycm9yKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgfTtcblxuICAgICAgc2NyaXB0LmlkID0gJ3NhcC11aS1ib290c3RyYXAnO1xuICAgICAgc2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2FwLXVpLWNvbXBhdFZlcnNpb24nLCAnZWRnZScpO1xuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS1zYXAtdWktYXN5bmMnLCAndHJ1ZScpO1xuICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS1zYXAtdWktb25Jbml0JywgJ2RvY3VtZW50Lm9uVWk1Qm9vdHN0cmFwcGVkKCknKTtcbiAgICAgIHNjcmlwdC5zcmMgPSB1aTVDb25maWcuYm9vdHN0cmFwVXJsO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplVWk1KCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgoc3Vic2NyaWJlcikgPT4ge1xuICAgICAgY29uc3QgY29yZTogQ29yZSA9IHRoaXMuZ2V0Q29yZSgpO1xuICAgICAgY29yZS5hdHRhY2hJbml0KCgpID0+IHtcbiAgICAgICAgY29uc3QgbG9hZExpYnJhcnlPcHRpb25zID0geyBhc3luYzogdHJ1ZSB9O1xuICAgICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgICAgY29yZS5sb2FkTGlicmFyeSgnc2FwLm0nLCBsb2FkTGlicmFyeU9wdGlvbnMpLFxuICAgICAgICAgIGNvcmUubG9hZExpYnJhcnkoJ3NhcC51aS5sYXlvdXQnLCBsb2FkTGlicmFyeU9wdGlvbnMpLFxuICAgICAgICAgIGNvcmUubG9hZExpYnJhcnkoJ3NhcC51aS52aycsIGxvYWRMaWJyYXJ5T3B0aW9ucyksXG4gICAgICAgICAgY29yZS5sb2FkTGlicmFyeSgnc2FwLnVpLnJpY2h0ZXh0ZWRpdG9yJywgbG9hZExpYnJhcnlPcHRpb25zKSxcbiAgICAgICAgXSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgc3Vic2NyaWJlci5uZXh0KCk7XG4gICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95Vmlld3BvcnRBc3NvY2lhdGlvbnModmlld3BvcnQ6IFZpZXdwb3J0KTogdm9pZCB7XG4gICAgY29uc3QgY29yZSA9IHRoaXMuZ2V0Q29yZSgpO1xuICAgIGlmICghY29yZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZGVzdHJveUNvbnRlbnRDb25uZWN0b3IoY29yZSwgdmlld3BvcnQpO1xuICAgIHRoaXMuZGVzdHJveVZpZXdNYW5hZ2Vycyhjb3JlLCB2aWV3cG9ydCk7XG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3lDb250ZW50Q29ubmVjdG9yKGNvcmU6IENvcmUsIHZpZXdwb3J0OiBWaWV3cG9ydCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRlbnRDb25uZWN0b3JJZCA9IHZpZXdwb3J0LmdldENvbnRlbnRDb25uZWN0b3IoKTtcbiAgICBpZiAoY29udGVudENvbm5lY3RvcklkKSB7XG4gICAgICBjb25zdCBjb250ZW50Q29ubmVjdG9yID0gY29yZS5ieUlkKGNvbnRlbnRDb25uZWN0b3JJZCk7XG4gICAgICBpZiAoY29udGVudENvbm5lY3Rvcikge1xuICAgICAgICBjb250ZW50Q29ubmVjdG9yLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlc3Ryb3lWaWV3TWFuYWdlcnMoY29yZTogQ29yZSwgdmlld3BvcnQ6IFZpZXdwb3J0KTogdm9pZCB7XG4gICAgY29uc3Qgdmlld1N0YXRlTWFuYWdlcklkID0gdmlld3BvcnQuZ2V0Vmlld1N0YXRlTWFuYWdlcigpO1xuXG4gICAgaWYgKHZpZXdTdGF0ZU1hbmFnZXJJZCAmJiBjb3JlLmJ5SWQodmlld1N0YXRlTWFuYWdlcklkKSkge1xuICAgICAgY29uc3Qgdmlld1N0YXRlTWFuYWdlciA9IGNvcmUuYnlJZChcbiAgICAgICAgdmlld1N0YXRlTWFuYWdlcklkXG4gICAgICApIGFzIFZpZXdTdGF0ZU1hbmFnZXI7XG5cbiAgICAgIGlmICh2aWV3U3RhdGVNYW5hZ2VyKSB7XG4gICAgICAgIGNvbnN0IGFuaW1hdGlvblBsYXllciA9IHZpZXdTdGF0ZU1hbmFnZXIuZ2V0QW5pbWF0aW9uUGxheWVyKCk7XG4gICAgICAgIGlmIChhbmltYXRpb25QbGF5ZXIpIHtcbiAgICAgICAgICBhbmltYXRpb25QbGF5ZXIuZGVzdHJveSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgdmlld01hbmFnZXJJZCA9IHZpZXdTdGF0ZU1hbmFnZXIuZ2V0Vmlld01hbmFnZXIoKTtcbiAgICAgICAgaWYgKHZpZXdNYW5hZ2VySWQpIHtcbiAgICAgICAgICBjb25zdCB2aWV3TWFuYWdlciA9IGNvcmUuYnlJZCh2aWV3TWFuYWdlcklkKTtcbiAgICAgICAgICBpZiAodmlld01hbmFnZXIpIHtcbiAgICAgICAgICAgIHZpZXdNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmlld1N0YXRlTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvbkNvbnRlbnRDaGFuZ2VzU3RhcnRlZCgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdwb3J0LmRldGFjaE5vZGVzUGlja2VkKHRoaXMub25Ob2Rlc1BpY2tlZCk7XG4gIH1cblxuICBwcml2YXRlIG9uQ29udGVudENoYW5nZXNGaW5pc2hlZChldmVudDogYW55KTogdm9pZCB7XG4gICAgY29uc3QgY29udGVudCA9IGV2ZW50LmdldFBhcmFtZXRlcignY29udGVudCcpO1xuICAgIGNvbnN0IGZhaWx1cmVSZWFzb24gPSBldmVudC5nZXRQYXJhbWV0ZXIoJ2ZhaWx1cmVSZWFzb24nKTtcbiAgICBpZiAoISFjb250ZW50ICYmICFmYWlsdXJlUmVhc29uKSB7XG4gICAgICB0aGlzLnNjZW5lID0gY29udGVudDtcbiAgICAgIHRoaXMubm9kZUhpZXJhcmNoeSA9IHRoaXMuc2NlbmUuZ2V0RGVmYXVsdE5vZGVIaWVyYXJjaHkoKTtcblxuICAgICAgdGhpcy52aWV3cG9ydC5hdHRhY2hOb2Rlc1BpY2tlZCh0aGlzLm9uTm9kZXNQaWNrZWQsIHRoaXMpO1xuXG4gICAgICBpZiAoY29udGVudC5sb2FkZXJzKSB7XG4gICAgICAgIGNvbnRlbnQubG9hZGVycy5mb3JFYWNoKChjb250ZW50TG9hZGVyOiBhbnkpID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjb250ZW50TG9hZGVyICYmXG4gICAgICAgICAgICBjb250ZW50TG9hZGVyLmF0dGFjaExvYWRpbmdGaW5pc2hlZCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb250ZW50TG9hZGVyLmF0dGFjaExvYWRpbmdGaW5pc2hlZChcbiAgICAgICAgICAgICAgdGhpcy5vbkNvbnRlbnRMb2FkaW5nRmluaXNoZWQsXG4gICAgICAgICAgICAgIHRoaXNcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jb250ZW50Q2hhbmdlc0ZpbmlzaGVkLmVtaXQoe1xuICAgICAgY29udGVudCxcbiAgICAgIGZhaWx1cmVSZWFzb24sXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG9uQ29udGVudExvYWRpbmdGaW5pc2hlZChfZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuY29udGVudExvYWRGaW5pc2hlZC5lbWl0KHt9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25Ob2Rlc1BpY2tlZChldmVudDogYW55KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXMyRCkge1xuICAgICAgdGhpcy5vbk5vZGVzUGlja2VkMkQoZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uTm9kZXNQaWNrZWQzRChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc05vZGVJbmNsdWRlZChub2RlUmVmOiBOb2RlUmVmKTogYm9vbGVhbiB7XG4gICAgY29uc3Qgc2lkczogc3RyaW5nW10gPSB0aGlzLm5vZGVSZWZUb1BlcnNpc3RlbnRJZChbbm9kZVJlZl0sIHRydWUpO1xuICAgIGNvbnN0IHByb2R1Y3RDb2RlcyA9XG4gICAgICB0aGlzLnNjZW5lTm9kZVRvUHJvZHVjdExvb2t1cFNlcnZpY2Uuc3luY0xvb2t1cFByb2R1Y3RDb2RlcyhzaWRzKTtcbiAgICByZXR1cm4gKFxuICAgICAgISFwcm9kdWN0Q29kZXMgJiZcbiAgICAgIHByb2R1Y3RDb2Rlcy5zb21lKChwcm9kdWN0Q29kZTogc3RyaW5nKSA9PlxuICAgICAgICB0aGlzLmluY2x1ZGVkUHJvZHVjdENvZGVzLmluY2x1ZGVzKHByb2R1Y3RDb2RlKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIG9uTm9kZXNQaWNrZWQyRChldmVudDogYW55KTogdm9pZCB7XG4gICAgY29uc3QgcGlja2VkTm9kZXMgPSBldmVudC5nZXRQYXJhbWV0ZXIoJ3BpY2tlZCcpO1xuICAgIGlmIChwaWNrZWROb2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBob3RTcG90cyA9IHBpY2tlZE5vZGVzLmZpbHRlcihcbiAgICAgIChub2RlOiBhbnkpID0+XG4gICAgICAgIG5vZGUubm9kZUNvbnRlbnRUeXBlICYmIG5vZGUubm9kZUNvbnRlbnRUeXBlID09PSBOb2RlQ29udGVudFR5cGUuSG90c3BvdFxuICAgICk7XG4gICAgaWYgKGhvdFNwb3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGluY2x1ZGVkSG90U3BvdHM6IE5vZGVSZWZbXSA9IGhvdFNwb3RzLmZpbHRlcigobm9kZVJlZjogTm9kZVJlZikgPT5cbiAgICAgIHRoaXMuaXNOb2RlSW5jbHVkZWQobm9kZVJlZilcbiAgICApO1xuXG4gICAgcGlja2VkTm9kZXMuc3BsaWNlKDApO1xuICAgIGluY2x1ZGVkSG90U3BvdHMuZm9yRWFjaCgoaW5jbHVkZWRIb3RTcG90OiBhbnkpID0+XG4gICAgICBwaWNrZWROb2Rlcy5wdXNoKGluY2x1ZGVkSG90U3BvdClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBvbk5vZGVzUGlja2VkM0QoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHBpY2tlZDogTm9kZVJlZltdID0gZXZlbnQuZ2V0UGFyYW1ldGVyKCdwaWNrZWQnKTtcbiAgICBjb25zdCBzcmM6IE5vZGVSZWZbXSA9IHBpY2tlZC5zcGxpY2UoMCwgcGlja2VkLmxlbmd0aCk7XG5cbiAgICBzcmMuZm9yRWFjaCgobm9kZTogTm9kZVJlZikgPT4ge1xuICAgICAgd2hpbGUgKCF0aGlzLmlzTm9kZUluY2x1ZGVkKG5vZGUpKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudDtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChub2RlKSB7XG4gICAgICAgIHBpY2tlZC5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRWaWV3cG9ydCgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKHN1YnNjcmliZXIpID0+IHtcbiAgICAgIHNhcC51aS5yZXF1aXJlKFxuICAgICAgICBbXG4gICAgICAgICAgJ3NhcC91aS92ay9WaWV3TWFuYWdlcicsXG4gICAgICAgICAgJ3NhcC91aS92ay9WaWV3cG9ydCcsXG4gICAgICAgICAgJ3NhcC91aS92ay9WaWV3U3RhdGVNYW5hZ2VyJyxcbiAgICAgICAgICAnc2FwL3VpL3ZrL0FuaW1hdGlvblBsYXllcicsXG4gICAgICAgICAgJ3NhcC91aS92ay9Db250ZW50Q29ubmVjdG9yJyxcbiAgICAgICAgICAnc2FwL3VpL3ZrL0RyYXdlclRvb2xiYXInLFxuICAgICAgICBdLFxuICAgICAgICAoXG4gICAgICAgICAgc2FwX3VpX3ZrX1ZpZXdNYW5hZ2VyOiBhbnksXG4gICAgICAgICAgc2FwX3VpX3ZrX1ZpZXdwb3J0OiBhbnksXG4gICAgICAgICAgc2FwX3VpX3ZrX1ZpZXdTdGF0ZU1hbmFnZXI6IGFueSxcbiAgICAgICAgICBzYXBfdWlfdmtfQW5pbWF0aW9uUGxheWVyOiBhbnksXG4gICAgICAgICAgc2FwX3VpX3ZrX0NvbnRlbnRDb25uZWN0b3I6IGFueSxcbiAgICAgICAgICBzYXBfdWlfdmtfRHJhd2VyVG9vbGJhcjogYW55XG4gICAgICAgICkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvcmU6IENvcmUgPSB0aGlzLmdldENvcmUoKTtcbiAgICAgICAgICBjb25zdCB1aUFyZWE6IFVJQXJlYSB8IG51bGwgfCB1bmRlZmluZWQgPSBjb3JlLmdldFVJQXJlYShcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50XG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAodWlBcmVhKSB7XG4gICAgICAgICAgICBjb25zdCBvbGRWaWV3cG9ydCA9IHVpQXJlYS5nZXRDb250ZW50KClbMF0gYXMgVmlld3BvcnQ7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lWaWV3cG9ydEFzc29jaWF0aW9ucyhvbGRWaWV3cG9ydCk7XG4gICAgICAgICAgICB1aUFyZWEuZGVzdHJveUNvbnRlbnQoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLnZpZXdwb3J0ID0gbmV3IHNhcF91aV92a19WaWV3cG9ydCh7IHZpc2libGU6IGZhbHNlIH0pO1xuICAgICAgICAgIHRoaXMudmlld3BvcnQucGxhY2VBdCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgICB0aGlzLmNvbnRlbnRDb25uZWN0b3IgPSBuZXcgc2FwX3VpX3ZrX0NvbnRlbnRDb25uZWN0b3IoKTtcbiAgICAgICAgICB0aGlzLmNvbnRlbnRDb25uZWN0b3IuYXR0YWNoQ29udGVudENoYW5nZXNTdGFydGVkKFxuICAgICAgICAgICAgdGhpcy5vbkNvbnRlbnRDaGFuZ2VzU3RhcnRlZCxcbiAgICAgICAgICAgIHRoaXNcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuY29udGVudENvbm5lY3Rvci5hdHRhY2hDb250ZW50Q2hhbmdlc0ZpbmlzaGVkKFxuICAgICAgICAgICAgdGhpcy5vbkNvbnRlbnRDaGFuZ2VzRmluaXNoZWQsXG4gICAgICAgICAgICB0aGlzXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLmNvbnRlbnRDb25uZWN0b3IuYXR0YWNoQ29udGVudExvYWRpbmdGaW5pc2hlZChcbiAgICAgICAgICAgIHRoaXMub25Db250ZW50TG9hZGluZ0ZpbmlzaGVkLFxuICAgICAgICAgICAgdGhpc1xuICAgICAgICAgICk7XG5cbiAgICAgICAgICB0aGlzLnZpZXdTdGF0ZU1hbmFnZXIgPSBuZXcgc2FwX3VpX3ZrX1ZpZXdTdGF0ZU1hbmFnZXIoe1xuICAgICAgICAgICAgY29udGVudENvbm5lY3RvcjogdGhpcy5jb250ZW50Q29ubmVjdG9yLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy52aWV3cG9ydC5zZXRDb250ZW50Q29ubmVjdG9yKHRoaXMuY29udGVudENvbm5lY3Rvcik7XG4gICAgICAgICAgdGhpcy52aWV3cG9ydC5zZXRWaWV3U3RhdGVNYW5hZ2VyKHRoaXMudmlld1N0YXRlTWFuYWdlcik7XG5cbiAgICAgICAgICB0aGlzLmFuaW1hdGlvblBsYXllciA9IG5ldyBzYXBfdWlfdmtfQW5pbWF0aW9uUGxheWVyKCk7XG4gICAgICAgICAgdGhpcy5hbmltYXRpb25QbGF5ZXIuc2V0Vmlld1N0YXRlTWFuYWdlcih0aGlzLnZpZXdTdGF0ZU1hbmFnZXIpO1xuXG4gICAgICAgICAgdGhpcy5hbmltYXRpb25QbGF5ZXIuYXR0YWNoVmlld0FjdGl2YXRlZCh0aGlzLm9uVmlld0FjdGl2YXRlZCwgdGhpcyk7XG4gICAgICAgICAgdGhpcy5hbmltYXRpb25QbGF5ZXIuYXR0YWNoVGltZUNoYW5nZWQodGhpcy5vblRpbWVDaGFuZ2VkLCB0aGlzKTtcblxuICAgICAgICAgIHRoaXMudmlld01hbmFnZXIgPSBuZXcgc2FwX3VpX3ZrX1ZpZXdNYW5hZ2VyKHtcbiAgICAgICAgICAgIGNvbnRlbnRDb25uZWN0b3I6IHRoaXMuY29udGVudENvbm5lY3RvcixcbiAgICAgICAgICAgIGFuaW1hdGlvblBsYXllcjogdGhpcy5hbmltYXRpb25QbGF5ZXIsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLnZpZXdTdGF0ZU1hbmFnZXIuc2V0Vmlld01hbmFnZXIodGhpcy52aWV3TWFuYWdlcik7XG4gICAgICAgICAgdGhpcy52aWV3U3RhdGVNYW5hZ2VyLmF0dGFjaFNlbGVjdGlvbkNoYW5nZWQoXG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlZCxcbiAgICAgICAgICAgIHRoaXNcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMudmlld1N0YXRlTWFuYWdlci5hdHRhY2hPdXRsaW5pbmdDaGFuZ2VkKFxuICAgICAgICAgICAgdGhpcy5vbk91dGxpbmluZ0NoYW5nZWQsXG4gICAgICAgICAgICB0aGlzXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHRoaXMuZHJhd2VyVG9vbGJhciA9IG5ldyBzYXBfdWlfdmtfRHJhd2VyVG9vbGJhcih7XG4gICAgICAgICAgICB2aWV3cG9ydDogdGhpcy52aWV3cG9ydCxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy52aWV3cG9ydC5hZGREZXBlbmRlbnQodGhpcy5kcmF3ZXJUb29sYmFyKTtcbiAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoKTtcbiAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldENTU1Byb3BlcnR5VmFsdWUoY3NzUHJvcGVydHlOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHN0b3JlZnJvbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2N4LXN0b3JlZnJvbnQnKVswXTtcbiAgICByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZShzdG9yZWZyb250RWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZShcbiAgICAgIGNzc1Byb3BlcnR5TmFtZVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGdldENTU0NvbG9yKGNvbG9yOiBzdHJpbmcpOiBDU1NDb2xvciB7XG4gICAgcmV0dXJuICh0aGlzLmdldENTU1Byb3BlcnR5VmFsdWUoY29sb3IpIHx8IGNvbG9yKS50cmltKCkgYXMgQ1NTQ29sb3I7XG4gIH1cblxuICBwcml2YXRlIHJlc29sdmVWaXN1YWxpemF0aW9uKFxuICAgIHByb2R1Y3RDb2RlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxWaXN1YWxpemF0aW9uTG9hZEluZm8+IHtcbiAgICByZXR1cm4gdGhpcy52aXN1YWxpemF0aW9uTG9va3VwU2VydmljZVxuICAgICAgLmZpbmRNYXRjaGluZ1Zpc3VhbGl6YXRpb25zKHByb2R1Y3RDb2RlKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1lcmdlTWFwKChtYXRjaGVzOiBWaXN1YWxpemF0aW9uSW5mb1tdKSA9PiB7XG4gICAgICAgICAgbGV0IHZpc3VhbGl6YXRpb25Mb2FkSW5mbzogVmlzdWFsaXphdGlvbkxvYWRJbmZvO1xuICAgICAgICAgIHN3aXRjaCAobWF0Y2hlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgdmlzdWFsaXphdGlvbkxvYWRJbmZvID0ge1xuICAgICAgICAgICAgICAgIGxvb2t1cFJlc3VsdDogVmlzdWFsaXphdGlvbkxvb2t1cFJlc3VsdC5Ob01hdGNoRm91bmQsXG4gICAgICAgICAgICAgICAgbG9hZFN0YXR1czogVmlzdWFsaXphdGlvbkxvYWRTdGF0dXMuTm90U3RhcnRlZCxcbiAgICAgICAgICAgICAgICBtYXRjaGVzLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgY29uc3QgbWF0Y2hpbmdWaXN1YWxpemF0aW9uID0gbWF0Y2hlc1swXTtcbiAgICAgICAgICAgICAgdGhpcy5zY2VuZUlkID0gbWF0Y2hpbmdWaXN1YWxpemF0aW9uLnNjZW5lSWQ7XG4gICAgICAgICAgICAgIHRoaXMuY29udGVudFR5cGUgPSBtYXRjaGluZ1Zpc3VhbGl6YXRpb24uY29udGVudFR5cGU7XG4gICAgICAgICAgICAgIHZpc3VhbGl6YXRpb25Mb2FkSW5mbyA9IHtcbiAgICAgICAgICAgICAgICBsb29rdXBSZXN1bHQ6IFZpc3VhbGl6YXRpb25Mb29rdXBSZXN1bHQuVW5pcXVlTWF0Y2hGb3VuZCxcbiAgICAgICAgICAgICAgICBsb2FkU3RhdHVzOiBWaXN1YWxpemF0aW9uTG9hZFN0YXR1cy5Ob3RTdGFydGVkLFxuICAgICAgICAgICAgICAgIG1hdGNoZXMsXG4gICAgICAgICAgICAgICAgdmlzdWFsaXphdGlvbjogbWF0Y2hpbmdWaXN1YWxpemF0aW9uLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHZpc3VhbGl6YXRpb25Mb2FkSW5mbyA9IHtcbiAgICAgICAgICAgICAgICBsb29rdXBSZXN1bHQ6IFZpc3VhbGl6YXRpb25Mb29rdXBSZXN1bHQuTXVsdGlwbGVNYXRjaGVzRm91bmQsXG4gICAgICAgICAgICAgICAgbG9hZFN0YXR1czogVmlzdWFsaXphdGlvbkxvYWRTdGF0dXMuTm90U3RhcnRlZCxcbiAgICAgICAgICAgICAgICBtYXRjaGVzLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5zZXRWaXN1YWxpemF0aW9uTG9hZEluZm8odmlzdWFsaXphdGlvbkxvYWRJbmZvKTtcbiAgICAgICAgICByZXR1cm4gb2YodmlzdWFsaXphdGlvbkxvYWRJbmZvKTtcbiAgICAgICAgfSksXG4gICAgICAgIGNhdGNoRXJyb3IoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZpc3VhbGl6YXRpb25Mb2FkSW5mbyA9IHtcbiAgICAgICAgICAgIGxvb2t1cFJlc3VsdDogVmlzdWFsaXphdGlvbkxvb2t1cFJlc3VsdC5VbmV4cGVjdGVkRXJyb3IsXG4gICAgICAgICAgICBsb2FkU3RhdHVzOiBWaXN1YWxpemF0aW9uTG9hZFN0YXR1cy5Ob3RTdGFydGVkLFxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5zZXRWaXN1YWxpemF0aW9uTG9hZEluZm8odmlzdWFsaXphdGlvbkxvYWRJbmZvKTtcbiAgICAgICAgICByZXR1cm4gb2YodmlzdWFsaXphdGlvbkxvYWRJbmZvKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBwcml2YXRlIHBlcnNpc3RlbnRJZFRvTm9kZVJlZihcbiAgICBub2RlSWRzOiBzdHJpbmdbXSxcbiAgICBmaWx0ZXJVbnJlc29sdmVkVmFsdWVzOiBib29sZWFuXG4gICk6IE5vZGVSZWZbXSB7XG4gICAgY29uc3Qgbm9kZVJlZnM6IE5vZGVSZWZbXSA9ICh0aGlzLnNjZW5lIGFzIGFueSkucGVyc2lzdGVudElkVG9Ob2RlUmVmKFxuICAgICAgbm9kZUlkc1xuICAgICk7XG4gICAgcmV0dXJuIGZpbHRlclVucmVzb2x2ZWRWYWx1ZXNcbiAgICAgID8gbm9kZVJlZnMuZmlsdGVyKChub2RlUmVmKSA9PiAhIW5vZGVSZWYpXG4gICAgICA6IG5vZGVSZWZzO1xuICB9XG5cbiAgcHJpdmF0ZSBub2RlUmVmVG9QZXJzaXN0ZW50SWQoXG4gICAgbm9kZVJlZnM6IG9iamVjdFtdLFxuICAgIGZpbHRlclVucmVzb2x2ZWRWYWx1ZXM6IGJvb2xlYW5cbiAgKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHNpZHM6IHN0cmluZ1tdID0gKHRoaXMuc2NlbmUgYXMgYW55KS5ub2RlUmVmVG9QZXJzaXN0ZW50SWQobm9kZVJlZnMpO1xuICAgIHJldHVybiBmaWx0ZXJVbnJlc29sdmVkVmFsdWVzID8gc2lkcy5maWx0ZXIoKHNpZCkgPT4gISFzaWQpIDogc2lkcztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Vmlld1N0YXRlTWFuYWdlckltcGxlbWVudGF0aW9uKCk6IGFueSB7XG4gICAgcmV0dXJuICh0aGlzLnZpZXdTdGF0ZU1hbmFnZXIgYXMgYW55KS5nZXRJbXBsZW1lbnRhdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVTZWxlY3RlZE5vZGVJZHMobm9kZUlkczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBjb25zdCBub2RlUmVmcyA9IHRoaXMucGVyc2lzdGVudElkVG9Ob2RlUmVmKG5vZGVJZHMsIHRydWUpO1xuXG4gICAgaWYgKHRoaXMuaXMyRCkge1xuICAgICAgdGhpcy5oYW5kbGVTZWxlY3RlZE5vZGVzMkQobm9kZVJlZnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhhbmRsZVNlbGVjdGVkTm9kZXMzRChub2RlUmVmcyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNvbGF0ZU1vZGVFbmFibGVkICYmIG5vZGVSZWZzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuaXNvbGF0ZU5vZGVzKG5vZGVSZWZzKTtcbiAgICB9XG4gICAgLy8gTmVlZCB0byBlbnN1cmUgYSBmcmFtZSByZW5kZXIgb2NjdXJzIHNpbmNlIHdlIGFyZSBibG9ja2luZyBldmVudHNcbiAgICAvLyB3aGVuIGNoYW5naW5nIHNlbGVjdGlvbi9vdXRsaW5pbmdcbiAgICB0aGlzLnNldFNob3VsZFJlbmRlckZyYW1lKCk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVNlbGVjdGVkTm9kZXMyRChzZWxlY3RlZE5vZGVzOiBOb2RlUmVmW10pOiB2b2lkIHtcbiAgICBjb25zdCBleGlzdGluZ1NlbGVjdGlvbjogTm9kZVJlZltdID0gW107XG4gICAgdGhpcy52aWV3U3RhdGVNYW5hZ2VyLmVudW1lcmF0ZVNlbGVjdGlvbigobm9kZVJlZjogTm9kZVJlZikgPT5cbiAgICAgIGV4aXN0aW5nU2VsZWN0aW9uLnB1c2gobm9kZVJlZilcbiAgICApO1xuICAgIHRoaXMudmlld1N0YXRlTWFuYWdlci5zZXRTZWxlY3Rpb25TdGF0ZXMoXG4gICAgICBbXSxcbiAgICAgIGV4aXN0aW5nU2VsZWN0aW9uLFxuICAgICAgZmFsc2UsXG4gICAgICB0cnVlXG4gICAgKTtcbiAgICB0aGlzLnZpZXdTdGF0ZU1hbmFnZXIuc2V0U2VsZWN0aW9uU3RhdGVzKHNlbGVjdGVkTm9kZXMsIFtdLCBmYWxzZSwgdHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVNlbGVjdGVkTm9kZXMzRChzZWxlY3RlZE5vZGVzOiBOb2RlUmVmW10pOiB2b2lkIHtcbiAgICBjb25zdCBleGlzdGluZ091dGxpbmVkTm9kZVJlZnM6IE5vZGVSZWZbXSA9IFtdO1xuICAgIHRoaXMudmlld1N0YXRlTWFuYWdlci5lbnVtZXJhdGVPdXRsaW5lZE5vZGVzKChub2RlUmVmOiBOb2RlUmVmKSA9PlxuICAgICAgZXhpc3RpbmdPdXRsaW5lZE5vZGVSZWZzLnB1c2gobm9kZVJlZilcbiAgICApO1xuICAgIHRoaXMuZ2V0Vmlld1N0YXRlTWFuYWdlckltcGxlbWVudGF0aW9uKCkuc2V0T3V0bGluaW5nU3RhdGVzKFxuICAgICAgW10sXG4gICAgICBleGlzdGluZ091dGxpbmVkTm9kZVJlZnMsXG4gICAgICBmYWxzZSxcbiAgICAgIHRydWVcbiAgICApO1xuICAgIHRoaXMuZ2V0Vmlld1N0YXRlTWFuYWdlckltcGxlbWVudGF0aW9uKCkuc2V0T3V0bGluaW5nU3RhdGVzKFxuICAgICAgc2VsZWN0ZWROb2RlcyxcbiAgICAgIFtdLFxuICAgICAgZmFsc2UsXG4gICAgICB0cnVlXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0U2hvdWxkUmVuZGVyRnJhbWUoKTogdm9pZCB7XG4gICAgKHRoaXMudmlld3BvcnQgYXMgYW55KS5zZXRTaG91bGRSZW5kZXJGcmFtZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpczJEQ29udGVudFR5cGUoY29udGVudFR5cGU6IENvbnRlbnRUeXBlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNvbnRlbnRUeXBlID09PSBDb250ZW50VHlwZS5EcmF3aW5nMkQ7XG4gIH1cblxuICBwcml2YXRlIGxvYWRTY2VuZShcbiAgICBzY2VuZUlkOiBzdHJpbmcsXG4gICAgY29udGVudFR5cGU6IENvbnRlbnRUeXBlXG4gICk6IE9ic2VydmFibGU8U2NlbmVMb2FkSW5mbz4ge1xuICAgIGNvbnN0IGVwZFZpc3VhbGl6YXRpb24gPSB0aGlzLmVwZFZpc3VhbGl6YXRpb25Db25maWdcbiAgICAgIC5lcGRWaXN1YWxpemF0aW9uIGFzIEVwZFZpc3VhbGl6YXRpb25Jbm5lckNvbmZpZztcbiAgICBjb25zdCB2aXN1YWxpemF0aW9uQXBpQ29uZmlnID1cbiAgICAgIGVwZFZpc3VhbGl6YXRpb24uYXBpcyBhcyBWaXN1YWxpemF0aW9uQXBpQ29uZmlnO1xuXG4gICAgaWYgKHRoaXMudmlld3BvcnRSZWFkeSkge1xuICAgICAgdGhpcy5zZXRWaWV3cG9ydFJlYWR5KGZhbHNlKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldElzMkQodGhpcy5pczJEQ29udGVudFR5cGUoY29udGVudFR5cGUpKTtcblxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgoc3Vic2NyaWJlcikgPT4ge1xuICAgICAgc2FwLnVpLnJlcXVpcmUoWydzYXAvdWkvdmsvQ29udGVudFJlc291cmNlJ10sIChDb250ZW50UmVzb3VyY2U6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLnNjZW5lTG9hZEluZm8kLm5leHQoe1xuICAgICAgICAgIHNjZW5lTG9hZFN0YXRlOiBTY2VuZUxvYWRTdGF0ZS5Mb2FkaW5nLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnZpZXdwb3J0LnNldFNlbGVjdGlvbkRpc3BsYXlNb2RlKFxuICAgICAgICAgIHRoaXMuaXMyRCA/ICdIaWdobGlnaHQnIDogJ091dGxpbmUnXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgYmFzZVVybDogc3RyaW5nID0gdmlzdWFsaXphdGlvbkFwaUNvbmZpZy5iYXNlVXJsO1xuXG4gICAgICAgIGNvbnN0IGNvbnRlbnRSZXNvdXJjZTogQ29udGVudFJlc291cmNlID0gbmV3IENvbnRlbnRSZXNvdXJjZSh7XG4gICAgICAgICAgdXNlU2VjdXJlQ29ubmVjdGlvbjogZmFsc2UsXG4gICAgICAgICAgc291cmNlVHlwZTogdGhpcy5pczJEID8gJ3N0cmVhbTJkJyA6ICdzdHJlYW0nLFxuICAgICAgICAgIHNvdXJjZTogYCR7YmFzZVVybH0vdmlzL3B1YmxpYy9zdG9yYWdlL3YxYCxcbiAgICAgICAgICB2ZWlkOiBzY2VuZUlkLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvbnRlbnRDaGFuZ2VzRmluaXNoZWRcbiAgICAgICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAodmlzdWFsQ29udGVudExvYWRGaW5pc2hlZDoge1xuICAgICAgICAgICAgICBjb250ZW50OiBhbnk7XG4gICAgICAgICAgICAgIGZhaWx1cmVSZWFzb246IGFueTtcbiAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3VjY2VlZGVkID0gISF2aXN1YWxDb250ZW50TG9hZEZpbmlzaGVkLmNvbnRlbnQ7XG4gICAgICAgICAgICAgIGNvbnN0IHNjZW5lTG9hZEluZm86IFNjZW5lTG9hZEluZm8gPSBzdWNjZWVkZWRcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVMb2FkU3RhdGU6IFNjZW5lTG9hZFN0YXRlLkxvYWRlZCxcbiAgICAgICAgICAgICAgICAgICAgbG9hZGVkU2NlbmVJbmZvOiB7XG4gICAgICAgICAgICAgICAgICAgICAgc2NlbmVJZCxcbiAgICAgICAgICAgICAgICAgICAgICBjb250ZW50VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVMb2FkU3RhdGU6IFNjZW5lTG9hZFN0YXRlLkZhaWxlZCxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB2aXN1YWxDb250ZW50TG9hZEZpbmlzaGVkLmZhaWx1cmVSZWFzb24sXG4gICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIHRoaXMuc2NlbmVMb2FkSW5mbyQubmV4dChzY2VuZUxvYWRJbmZvKTtcbiAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHNjZW5lTG9hZEluZm8pO1xuICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmNvbnRlbnRMb2FkRmluaXNoZWQucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNjZW5lTG9hZEluZm8gPSB0aGlzLnNjZW5lTG9hZEluZm8kLnZhbHVlO1xuICAgICAgICAgIGlmIChzY2VuZUxvYWRJbmZvLnNjZW5lTG9hZFN0YXRlID09PSBTY2VuZUxvYWRTdGF0ZS5Mb2FkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlld3BvcnRSZWFkeSh0cnVlKTtcbiAgICAgICAgICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBzcGlubmVyIGlzIGhpZGRlbiBiZWZvcmUgdGhlIHZpZXdwb3J0IGJlY29tZXMgdmlzaWJsZS5cbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSB0aGUgcG9zaXRpb24gb2YgdGhlIHNwaW5uZXIgY2hhbmdlc1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICB0aGlzLnZpZXdwb3J0LnNldFZpc2libGUodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvbnRlbnRDb25uZWN0b3IuYWRkQ29udGVudFJlc291cmNlKGNvbnRlbnRSZXNvdXJjZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25TZWxlY3Rpb25DaGFuZ2VkKCk6IHZvaWQge1xuICAgIGNvbnN0IG5vZGVSZWZzOiBOb2RlUmVmW10gPSBbXTtcbiAgICB0aGlzLnZpZXdTdGF0ZU1hbmFnZXIuZW51bWVyYXRlU2VsZWN0aW9uKChub2RlUmVmOiBOb2RlUmVmKSA9PlxuICAgICAgbm9kZVJlZnMucHVzaChub2RlUmVmKVxuICAgICk7XG5cbiAgICBjb25zdCBub2RlSWRzOiBzdHJpbmdbXSA9IHRoaXMubm9kZVJlZlRvUGVyc2lzdGVudElkKG5vZGVSZWZzLCB0cnVlKTtcbiAgICB0aGlzLnNjZW5lTm9kZVRvUHJvZHVjdExvb2t1cFNlcnZpY2VcbiAgICAgIC5sb29rdXBQcm9kdWN0Q29kZXMobm9kZUlkcylcbiAgICAgIC5waXBlKGZpcnN0KCkpXG4gICAgICAuc3Vic2NyaWJlKChwcm9kdWN0Q29kZXM6IHN0cmluZ1tdKSA9PiB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0Q29kZXNDaGFuZ2UuZW1pdChwcm9kdWN0Q29kZXMpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG9uT3V0bGluaW5nQ2hhbmdlZCgpOiB2b2lkIHtcbiAgICBjb25zdCBub2RlUmVmczogTm9kZVJlZltdID0gW107XG4gICAgdGhpcy52aWV3U3RhdGVNYW5hZ2VyLmVudW1lcmF0ZU91dGxpbmVkTm9kZXMoKG5vZGVSZWY6IE5vZGVSZWYpID0+XG4gICAgICBub2RlUmVmcy5wdXNoKG5vZGVSZWYpXG4gICAgKTtcblxuICAgIGNvbnN0IG5vZGVJZHM6IHN0cmluZ1tdID0gdGhpcy5ub2RlUmVmVG9QZXJzaXN0ZW50SWQobm9kZVJlZnMsIHRydWUpO1xuICAgIHRoaXMuc2NlbmVOb2RlVG9Qcm9kdWN0TG9va3VwU2VydmljZVxuICAgICAgLmxvb2t1cFByb2R1Y3RDb2Rlcyhub2RlSWRzKVxuICAgICAgLnBpcGUoZmlyc3QoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHByb2R1Y3RDb2Rlczogc3RyaW5nW10pID0+IHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3RDb2Rlc0NoYW5nZS5lbWl0KHByb2R1Y3RDb2Rlcyk7XG4gICAgICB9KTtcbiAgfVxufVxuIl19