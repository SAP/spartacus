import {
  ChangeDetectorRef,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Injectable,
} from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import {
  EpdVisualizationConfig,
  Ui5Config,
  VisualizationApiConfig,
} from '../../config/epd-visualization-config';
import { SceneNodeToProductLookupService } from '../../services/scene-node-to-product-lookup/scene-node-to-product-lookup.service';
import { VisualizationLookupService } from '../../services/visualization-lookup/visualization-lookup.service';

// @ts-ignore
import * as ui5 from '@sapui5/ts-types-esm';

import type Core from 'sap/ui/core/Core';
import type { CSSColor } from 'sap/ui/core/library';

import type Scene from 'sap/ui/vk/Scene';
import type Viewport from 'sap/ui/vk/Viewport';
import type ContentConnector from 'sap/ui/vk/ContentConnector';
import type AnimationPlayer from 'sap/ui/vk/AnimationPlayer';
import type DrawerToolbar from 'sap/ui/vk/DrawerToolbar';
import type ViewStateManager from 'sap/ui/vk/ViewStateManager';
type ViewManager = any;
type NodeRef = any;
import type UIArea from 'sap/ui/core/UIArea';
import type ContentResource from 'sap/ui/vk/ContentResource';

import { NavigationMode } from './models/navigation-mode';
import { SelectionMode } from './models/selection-mode';
import { NodeContentType } from './models/node-content-type';
import { SceneLoadState } from './models/scene-load-state';
import { LoadedSceneInfo, SceneLoadInfo } from './models/scene-load-info';
import { ContentType } from './models/content-type';
import NodeHierarchy from 'sap/ui/vk/NodeHierarchy';
import { filter, mergeMap, shareReplay } from 'rxjs/operators';
import { VisualizationInfo } from '../../models/visualizations/visualization-info';
import {
  VisualizationLoadInfo,
  VisualizationLoadResult,
} from './models/visualization-load-info';
import { SelectionDisplayMode } from './models/selection-display-mode';
import { ZoomTo } from './models/zoom-to';

interface VisualContentLoadFinishedEvent {
  content: any;
  failureReason: any;
}

@Injectable({
  providedIn: 'any',
})
export class VisualViewerService {
  constructor(
    protected epdVisualizationConfig: EpdVisualizationConfig,
    protected _sceneNodeToProductLookupService: SceneNodeToProductLookupService,
    protected visualizationLookupService: VisualizationLookupService,
    protected elementRef: ElementRef,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    const ui5BootStrapped$: Observable<void> =
      this.bootstrapUi5('ui5bootstrap');
    const ui5Initialized$: Observable<void> = ui5BootStrapped$.pipe(
      mergeMap(this.initializeUi5.bind(this))
    );
    this.viewportAdded$ = ui5Initialized$.pipe(
      mergeMap(this.addViewport.bind(this)),
      shareReplay()
    );
    this.executeWhenSceneLoaded(this.setInitialPropertyValues.bind(this));
  }

  protected _ui5: ui5;

  private get sceneNodeToProductLookupService(): SceneNodeToProductLookupService {
    return this._sceneNodeToProductLookupService;
  }
  private set sceneNodeToProductLookupService(
    value: SceneNodeToProductLookupService
  ) {
    this._sceneNodeToProductLookupService = value;
  }

  private _scene: Scene;
  private get scene(): Scene {
    return this._scene;
  }
  private set scene(value: Scene) {
    this._scene = value;
  }

  private _nodeHierarchy: NodeHierarchy;
  private get nodeHierarchy(): NodeHierarchy {
    return this._nodeHierarchy;
  }
  private set nodeHierarchy(value: NodeHierarchy) {
    this._nodeHierarchy = value;
  }

  private _contentConnector: ContentConnector;
  private get contentConnector(): ContentConnector {
    return this._contentConnector;
  }
  private set contentConnector(value: ContentConnector) {
    this._contentConnector = value;
  }

  private _viewport: Viewport;
  private get viewport(): Viewport {
    return this._viewport;
  }
  private set viewport(value: Viewport) {
    this._viewport = value;
  }

  private _viewStateManager: ViewStateManager;
  private get viewStateManager(): ViewStateManager {
    return this._viewStateManager;
  }
  private set viewStateManager(value: ViewStateManager) {
    this._viewStateManager = value;
  }

  private _animationPlayer: AnimationPlayer;
  private get animationPlayer(): AnimationPlayer {
    return this._animationPlayer;
  }
  private set animationPlayer(value: AnimationPlayer) {
    this._animationPlayer = value;
  }

  private _viewManager: ViewManager;
  private get viewManager(): ViewManager {
    return this._viewManager;
  }
  private set viewManager(value: ViewManager) {
    this._viewManager = value;
  }

  private _drawerToolbar: DrawerToolbar;
  private get drawerToolbar(): DrawerToolbar {
    return this._drawerToolbar;
  }
  private set drawerToolbar(value: DrawerToolbar) {
    this._drawerToolbar = value;
  }

  private _sceneId: string;
  private get sceneId(): string {
    return this._sceneId;
  }
  private set sceneId(value: string) {
    this._sceneId = value;
  }

  private _contentType: ContentType;
  private get contentType(): ContentType {
    return this._contentType;
  }
  private set contentType(value: ContentType) {
    this._contentType = value;
  }

  private _initialViewInfo: any;
  private get initialViewInfo(): any {
    return this._initialViewInfo;
  }
  private set initialViewInfo(value: any) {
    this._initialViewInfo = value;
  }

  private _leafNodeRefs: NodeRef[];
  private get leafNodeRefs(): NodeRef[] {
    return this._leafNodeRefs;
  }
  private set leafNodeRefs(value: NodeRef[]) {
    this._leafNodeRefs = value;
  }

  private _viewPriorToIsolateViewInfo: any;
  private get viewPriorToIsolateViewInfo(): any {
    return this._viewPriorToIsolateViewInfo;
  }
  private set viewPriorToIsolateViewInfo(value: any) {
    this._viewPriorToIsolateViewInfo = value;
  }

  private _viewportAdded$: Observable<void>;
  private get viewportAdded$(): Observable<void> {
    return this._viewportAdded$;
  }
  private set viewportAdded$(value: Observable<void>) {
    this._viewportAdded$ = value;
  }

  private _selectedNodeIds$ = new Subject<string[]>();
  public get selectedNodeIds$() {
    return this._selectedNodeIds$;
  }
  public set selectedNodeIds$(value) {
    this._selectedNodeIds$ = value;
  }

  private sceneLoadInfo$ = new BehaviorSubject<SceneLoadInfo>({
    sceneLoadState: SceneLoadState.NotStarted,
  });

  protected readonly DEFAULT_BACKGROUND_TOP_COLOR = '--cx-color-inverse';
  protected readonly DEFAULT_BACKGROUND_BOTTOM_COLOR = '--cx-color-inverse';
  protected readonly DEFAULT_HOTSPOT_SELECTION_HIGHLIGHT_COLOR = 'red';
  protected readonly DEFAULT_SHOW_ALL_HOTSPOTS_COLOR = 'rgba(255, 255, 0, 0.3)';
  protected readonly DEFAULT_OUTLINE_COLOR = 'red';
  protected readonly DEFAULT_OUTLINE_WIDTH = 5;
  protected readonly DEFAULT_SELECTION_MODE = SelectionMode.Exclusive;
  protected readonly DEFAULT_SHOW_ALL_HOTSPOTS_ENABLED = false;
  protected readonly DEFAULT_EXCLUDED_OPACITY = 0.2;
  protected readonly DEFAULT_ZOOM_TO_MARGIN = 0.2;
  protected readonly DEFAULT_FLY_TO_DURATION = 1;

  protected flyToDurationInSeconds = this.DEFAULT_FLY_TO_DURATION;
  protected zoomToMargin = this.DEFAULT_ZOOM_TO_MARGIN;

  /**
   * The top colour of the background gradient.
   * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-background' with the quotes.
   */
  @Input()
  set backgroundTopColor(backgroundTopColor: string) {
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
  private _backgroundTopColor: string;

  /**
   * The bottom colour of the background gradient.
   * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-background' with the quotes.
   */
  @Input()
  set backgroundBottomColor(backgroundBottomColor: string) {
    if (this._backgroundBottomColor === backgroundBottomColor) {
      return;
    }
    this._backgroundBottomColor = backgroundBottomColor;
    this.executeWhenSceneLoaded(() => {
      this.viewport.setBackgroundColorBottom(
        this.getCSSColor(backgroundBottomColor)
      );
    });
  }
  get backgroundBottomColor(): string {
    return this._backgroundBottomColor;
  }
  private _backgroundBottomColor: string;

  /**
   * The colour applied to selected 2D hotspots in 2D content.
   * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
   */
  @Input()
  set hotspotSelectionColor(hotspotSelectionColor: string) {
    if (this._hotspotSelectionColor === hotspotSelectionColor) {
      return;
    }
    this._hotspotSelectionColor = hotspotSelectionColor;
    this.executeWhenSceneLoaded(() => {
      this.viewStateManager.setHighlightColor(
        this.getCSSColor(hotspotSelectionColor)
      );
    });
  }
  get hotspotSelectionColor(): string {
    return this._hotspotSelectionColor;
  }
  private _hotspotSelectionColor: string;

  /**
   * Highlights all hotspots in 2D content that are included in the includedProductCodes property using the colour specified by the showAllHotspotsColor property.
   */
  @Input()
  set showAllHotspotsEnabled(showAllHotspotsEnabled: boolean) {
    if (this._showAllHotspotsEnabled === showAllHotspotsEnabled) {
      return;
    }
    this._showAllHotspotsEnabled = showAllHotspotsEnabled;
    this.executeWhenSceneLoaded(() => {
      this.applyInclusionStyle(this._includedProductCodes);
    });
  }
  get showAllHotspotsEnabled(): boolean {
    return this._showAllHotspotsEnabled;
  }
  private _showAllHotspotsEnabled: boolean;

  /**
   * The colour used to highlight hotspots in 2D content when the showAllHotspotsEnabled property has a value of true.
   * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
   */
  @Input()
  set showAllHotspotsColor(showAllHotspotsColor: string) {
    if (this._showAllHotspotsColor === showAllHotspotsColor) {
      return;
    }
    this._showAllHotspotsColor = showAllHotspotsColor;
    this.executeWhenSceneLoaded(() => {
      const cssColor = this.getCSSColor(showAllHotspotsColor);
      this.viewport.setShowAllHotspotsTintColor(cssColor);
    });
  }
  get showAllHotspotsColor(): string {
    return this._showAllHotspotsColor;
  }
  private _showAllHotspotsColor: string;

  /**
   * The outline colour used to indicate selected objects in 3D content.
   * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
   */
  @Input()
  set outlineColor(outlineColor: string) {
    if (this._outlineColor === outlineColor) {
      return;
    }
    this._outlineColor = outlineColor;
    this.executeWhenSceneLoaded(() => {
      this.viewStateManager.setOutlineColor(this.getCSSColor(outlineColor));
    });
  }
  get outlineColor(): string {
    return this._outlineColor;
  }
  private _outlineColor: string;

  /**
   * The width of the outline used to indicate selected objects in 3D content.
   */
  @Input()
  set outlineWidth(outlineWidth: number) {
    if (this._outlineWidth === outlineWidth) {
      return;
    }
    this._outlineWidth = outlineWidth;
    this.executeWhenSceneLoaded(() => {
      this.viewStateManager.setOutlineWidth(outlineWidth);
    });
  }
  get outlineWidth(): number {
    return this._outlineWidth;
  }
  private _outlineWidth: number;

  /**
   * The selection mode.
   * None - Selection is disabled.
   * Exclusive - When selecting objects in the viewport, at most one object can be selected at a time. Clicking/tapping to select a new object will deselect any previously selected objects.
   * Sticky - A multiple selection mode in which clicking/tapping on an object that is not part of the current selection will toggle its selection state without modifying the selection state of the currently selected objects.
   */
  @Input()
  set selectionMode(selectionMode: SelectionMode) {
    if (this._selectionMode === selectionMode) {
      return;
    }
    this._selectionMode = selectionMode;
    this.executeWhenSceneLoaded(() => {
      this.viewport.setSelectionMode(selectionMode);
    });
  }
  get selectionMode(): SelectionMode {
    return this._selectionMode;
  }
  private _selectionMode: SelectionMode;

  /**
   * Gets/sets the selection in terms of product codes.
   * Gets the set of product codes applied to the selected scene nodes.
   * Sets the selection set based on the set of supplied product codes.
   */
  @Input()
  set selectedProductCodes(selectedProductCodes: string[]) {
    this._selectedProductCodes = selectedProductCodes;
    this.sceneNodeToProductLookupService
      .lookupNodeIds(selectedProductCodes)
      .subscribe((selectedNodeIds) =>
        this.selectedNodeIds$.next(selectedNodeIds)
      );
  }
  get selectedProductCodes(): string[] {
    return this._selectedProductCodes;
  }
  private _selectedProductCodes: string[];
  @Output() selectedProductCodesChange = new EventEmitter<string[]>();

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
  @Input()
  set includedProductCodes(includedProductCodes: string[]) {
    this._includedProductCodes = includedProductCodes;
    this.executeWhenSceneLoaded(() => {
      this.applyInclusionStyle(includedProductCodes);
    });
  }
  get includedProductCodes(): string[] {
    return this._includedProductCodes;
  }
  private _includedProductCodes: string[];

  /**
   * Gets/sets the opacity to apply to 3D objects that are not in the set specified by the includedProductCodes property.
   */
  @Input()
  set excludedOpacity(excludedOpacity: number) {
    this._excludedOpacity = excludedOpacity;
  }
  get excludedOpacity(): number {
    return this._excludedOpacity;
  }
  _excludedOpacity: number = this.DEFAULT_EXCLUDED_OPACITY;

  /**
   * The current time position in seconds in the animation (if there is one).
   */
  @Input()
  set animationTime(animationTime: number) {
    this._animationTime = animationTime;
  }
  get animationTime(): number {
    return this._animationTime;
  }
  _animationTime: number;
  @Output() animationTimeChange = new EventEmitter<number>();

  /**
   * The total duration of the animation in seconds.
   * Returns 0 when there is no animation present (or when a scene has not been loaded).
   */
  get animationTotalDuration(): number {
    if (this.animationPlayer) {
      return this.animationPlayer.getTotalDuration();
    }
    return 0;
  }

  /**
   * The animation playback position as a fractional value between 0 (start) and 1 (end).
   */
  @Input()
  set animationPosition(position: number) {
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
  private _animationPosition: number = 0;
  @Output() animationPositionChange = new EventEmitter<number>();

  /**
   * Gets/sets whether the animation (if there is one) is currently playing.
   */
  @Input()
  set animationPlaying(animationPlaying: boolean) {
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
      } else {
        this.animationPlayer.stop();
      }
      this.animationPlayingChange.emit(animationPlaying);
    });
  }
  get animationPlaying(): boolean {
    return this._animationPlaying;
  }
  private _animationPlaying: boolean = false;
  @Output() animationPlayingChange = new EventEmitter<boolean>();

  /**
   * Controls the behaviour when a left mouse button drag is initiated in the viewport.
   * Turntable: A left mouse drag performs a turntable mode rotation.
   * Pan: A left mouse drag pans the camera in the viewport.
   * Zoom: A left mouse drag zooms the camera in the viewport in or out
   */
  @Input()
  set navigationMode(navigationMode: NavigationMode) {
    if (this._navigationMode === navigationMode) {
      return;
    }

    this._navigationMode = navigationMode;
    this.executeWhenSceneLoaded(() => {
      if (this.drawerToolbar && this.viewport) {
        (this.drawerToolbar as any)._activateGesture(
          (this.viewport as any).getImplementation(),
          navigationMode
        );
      }
    });
  }
  get navigationMode(): NavigationMode {
    return this._navigationMode;
  }
  private _navigationMode: NavigationMode;

  /**
   * Isolate mode allows a single object to be viewed in isolation.
   */
  @Input()
  set isolateModeEnabled(isolateModeEnabled: boolean) {
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

        const selectedNodeRefs: NodeRef[] = [];
        if (this.is2D) {
          this.viewStateManager.enumerateSelection((nodeRef: NodeRef) =>
            selectedNodeRefs.push(nodeRef)
          );
        } else {
          this.viewStateManager.enumerateOutlinedNodes((nodeRef: NodeRef) =>
            selectedNodeRefs.push(nodeRef)
          );
        }

        this.isolateNodes(selectedNodeRefs);
      } else {
        this.viewport.setViewInfo(
          this.viewPriorToIsolateViewInfo,
          this.flyToDurationInSeconds
        );
      }

      this.isolateModeEnabledChange.emit(this.isolateModeEnabled);
      this.changeDetectorRef.detectChanges();
    });
  }
  get isolateModeEnabled(): boolean {
    return this._isolateModeEnabled;
  }
  _isolateModeEnabled = false;
  @Output() isolateModeEnabledChange = new EventEmitter<boolean>();

  /**
   * Gets whether the viewport is displaying 2D content.
   */
  set is2D(is2D: boolean) {
    this._is2D = is2D;
  }
  get is2D(): boolean {
    return this._is2D;
  }
  _is2D: boolean;

  /**
   * Indicates that a scene has been loaded and the viewport is ready for interaction.
   */
  set viewportReady(viewportReady: boolean) {
    this._viewportReady = viewportReady;
  }
  get viewportReady(): boolean {
    return this._viewportReady;
  }
  _viewportReady = false;
  @Output() viewportReadyChange = new EventEmitter<boolean>();

  /**
   * Controls the way that selection is displayed (outlining or a color applied to the surface of the object)
   */
  private set selectionDisplayMode(selectionDisplayMode: SelectionDisplayMode) {
    if (this._selectionDisplayMode === selectionDisplayMode) {
      return;
    }
    this._selectionDisplayMode = selectionDisplayMode;
    this.executeWhenSceneLoaded(() => {
      this.viewport.setSelectionDisplayMode(selectionDisplayMode);
      this._selectionDisplayMode = selectionDisplayMode;
    });
  }
  private get selectionDisplayMode() {
    return this._selectionDisplayMode;
  }
  private _selectionDisplayMode: SelectionDisplayMode;

  /**
   * Returns the user to the initial camera position used when a scene was first loaded.
   */
  public activateHomeView() {
    if (this.is2D) {
      this.viewport.zoomTo(
        ZoomTo.All,
        null,
        this.flyToDurationInSeconds,
        this.zoomToMargin
      );
    } else if (this.initialViewInfo) {
      this.viewport.setViewInfo(
        this.initialViewInfo,
        this.flyToDurationInSeconds
      );
    }

    if (this.isolateModeEnabled) {
      this._isolateModeEnabled = false;
      this.isolateModeEnabledChange.emit(this.isolateModeEnabled);
      this.changeDetectorRef.detectChanges();
    }
  }

  /**
   * Plays the animation (if one exists).
   */
  public playAnimation(): void {
    this.animationPlaying = true;
  }

  /**
   * Pauses animation playback.
   */
  public pauseAnimation(): void {
    this.animationPlaying = false;
  }

  private contentLoadFinished =
    new EventEmitter<VisualContentLoadFinishedEvent>();

  private setInitialPropertyValues() {
    this.backgroundTopColor =
      this.backgroundTopColor ?? this.DEFAULT_BACKGROUND_TOP_COLOR;
    this.backgroundBottomColor =
      this.backgroundBottomColor ?? this.DEFAULT_BACKGROUND_BOTTOM_COLOR;
    this.hotspotSelectionColor =
      this.hotspotSelectionColor ??
      this.DEFAULT_HOTSPOT_SELECTION_HIGHLIGHT_COLOR;
    this.showAllHotspotsColor =
      this.showAllHotspotsColor ?? this.DEFAULT_SHOW_ALL_HOTSPOTS_COLOR;
    this.outlineColor = this.outlineColor ?? this.DEFAULT_OUTLINE_COLOR;
    this.outlineWidth = this.outlineWidth ?? this.DEFAULT_OUTLINE_WIDTH;
    this.selectionMode = this.selectionMode ?? this.DEFAULT_SELECTION_MODE;
    this.showAllHotspotsEnabled =
      this.showAllHotspotsEnabled ?? this.DEFAULT_SHOW_ALL_HOTSPOTS_ENABLED;

    this.navigationMode = this.is2D
      ? NavigationMode.Pan
      : this.navigationMode ?? NavigationMode.Turntable;

    this.selectionDisplayMode = this.is2D
      ? SelectionDisplayMode.Highlight
      : SelectionDisplayMode.Outline;

    this.selectedProductCodes = [];
  }

  protected executeWhenSceneLoaded(
    callback: (loadedSceneInfo: LoadedSceneInfo) => void
  ) {
    this.sceneLoadInfo$
      .pipe(
        filter(
          (sceneLoadInfo) =>
            sceneLoadInfo.sceneLoadState === SceneLoadState.Loaded
        )
      )
      .subscribe((sceneLoadInfo: SceneLoadInfo) => {
        callback(sceneLoadInfo.loadedSceneInfo as LoadedSceneInfo);
      });
  }

  private applyInclusionStyle(productCodes: string[]) {
    if (productCodes === undefined) {
      return;
    }

    this.sceneNodeToProductLookupService
      .lookupNodeIds(productCodes)
      .subscribe((sceneNodeIds: string[]) => {
        const nodeRefsToInclude = this.persistentIdToNodeRef(sceneNodeIds);
        if (this.is2D) {
          const hotspotNodeRefs: NodeRef[] =
            this.nodeHierarchy.getHotspotNodeIds();
          if (this._showAllHotspotsEnabled) {
            const nodeRefsToIncludeSet = new Set();
            nodeRefsToInclude.forEach((nodeRef: NodeRef) =>
              nodeRefsToIncludeSet.add(nodeRef)
            );
            const nodeRefsToExclude: NodeRef[] = hotspotNodeRefs.filter(
              (nodeRef: NodeRef) => !nodeRefsToIncludeSet.has(nodeRef)
            );
            this.viewport.showHotspots(nodeRefsToExclude, false, null);
            this.viewport.showHotspots(
              nodeRefsToInclude,
              true,
              this.getCSSColor(this._showAllHotspotsColor)
            );
          } else {
            this.viewport.showHotspots(hotspotNodeRefs, false, null);
          }
        } else {
          if (!this.leafNodeRefs) {
            this.leafNodeRefs = this.getAllLeafNodeRefs();
          }

          const leafNodeRefsToInclude = nodeRefsToInclude.flatMap(
            (nodeRef: NodeRef) => this.getLeafDescendants(nodeRef, [])
          );
          const leafNodeRefsToIncludeSet = new Set();
          leafNodeRefsToInclude.forEach((nodeRef: NodeRef) =>
            leafNodeRefsToIncludeSet.add(nodeRef)
          );

          const leafNodeRefsToExclude = this.leafNodeRefs.filter(
            (leafNodeRef: NodeRef) => !leafNodeRefsToIncludeSet.has(leafNodeRef)
          );

          this.viewStateManager.setOpacity(
            leafNodeRefsToExclude,
            this.excludedOpacity
          );
          leafNodeRefsToInclude.forEach((nodeRef: NodeRef) =>
            this.viewStateManager.restoreRestOpacity(nodeRef)
          );
        }
      });
  }

  private getLeafDescendants(
    nodeRef: NodeRef,
    leafNodeRefs: NodeRef[]
  ): NodeRef[] {
    const children = this.nodeHierarchy.getChildren(nodeRef, false);
    if (children.length === 0) {
      leafNodeRefs.push(nodeRef);
    } else {
      children.forEach((childNodeRef) =>
        this.getLeafDescendants(childNodeRef, leafNodeRefs)
      );
    }
    return leafNodeRefs;
  }

  private getAllLeafNodeRefs(): NodeRef[] {
    return this.nodeHierarchy
      .getChildren(undefined)
      .flatMap((nodeRef) => this.getLeafDescendants(nodeRef, []));
  }

  private isolateNodes(nodeRefsToIsolate: object[]): void {
    // isolate just the first selected node
    nodeRefsToIsolate = nodeRefsToIsolate.length ? [nodeRefsToIsolate[0]] : [];

    this.viewport.zoomTo(
      ZoomTo.Node,
      nodeRefsToIsolate,
      this.flyToDurationInSeconds,
      this.zoomToMargin
    );

    const currentVisibleSids: string[] =
      this.viewPriorToIsolateViewInfo.visibility.visible || [];
    const currentVisibleNodeRefs = currentVisibleSids.map(
      this.persistentIdToNodeRef.bind(this)
    );
    this.viewStateManager.setVisibilityState(
      currentVisibleNodeRefs,
      false,
      true,
      false
    );
    this.viewStateManager.setVisibilityState(
      nodeRefsToIsolate,
      true,
      true,
      true
    );
  }

  private animationPlayerSetTime(time: number, blockEvents: boolean) {
    // bug workaround
    // the overload with no sequence number parameter blows up
    (this.animationPlayer as any).setTime(time, undefined, blockEvents);
  }

  private onViewActivated(): void {
    this.initialViewInfo = this.viewport.getViewInfo({
      camera: true,
      visibility: true,
    });
  }

  private onTimeChanged(oEvent: any): void {
    let changes = false;

    const time: number = oEvent.getParameters().time;
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
      this.changeDetectorRef.detectChanges();
    }
  }

  public loadVisualization(
    productCode: string
  ): Observable<VisualizationLoadInfo> {
    return this.viewportAdded$.pipe(
      mergeMap(() =>
        this.resolveVisualization(productCode).pipe(
          mergeMap((visualizationLoadInfo: VisualizationLoadInfo) => {
            if (
              visualizationLoadInfo.result === VisualizationLoadResult.Success
            ) {
              this.sceneNodeToProductLookupService.handleSceneLoaded(
                this.sceneId
              );

              return this.loadScene(this.sceneId, this.contentType).pipe(
                mergeMap((sceneLoadInfo: SceneLoadInfo) => {
                  if (sceneLoadInfo.sceneLoadState === SceneLoadState.Failed) {
                    return of(<VisualizationLoadInfo>{
                      result: VisualizationLoadResult.UnexpectedError,
                      errorMessage: sceneLoadInfo.errorMessage,
                    });
                  } else {
                    this.subscribeSelectedSceneNodeIds();
                    return of(visualizationLoadInfo);
                  }
                })
              );
            } else {
              return of(visualizationLoadInfo);
            }
          })
        )
      )
    );
  }

  private isUi5BootStrapped(): boolean {
    return !!window.sap;
  }

  private getCore(): Core {
    return sap.ui.getCore();
  }

  private bootstrapUi5(scriptElementId: string): Observable<void> {
    return new Observable((subscriber) => {
      if (this.isUi5BootStrapped()) {
        subscriber.next();
        subscriber.complete();
        return;
      }

      const script = document.createElement('script');
      script.setAttribute('id', scriptElementId);
      document.getElementsByTagName('head')[0].appendChild(script);
      script.onload = () => {
        subscriber.next();
        subscriber.complete();
      };
      script.onerror = (error: any) => {
        subscriber.error(error);
        subscriber.complete();
      };
      script.id = 'sap-ui-bootstrap';
      script.type = 'text/javascript';
      script.setAttribute('data-sap-ui-theme', 'sap-fiori-3');
      script.setAttribute('data-sap-ui-compatVersion', 'edge');
      script.src = (this.epdVisualizationConfig.ui5 as Ui5Config).bootstrapUrl;
    });
  }

  private initializeUi5(): Observable<void> {
    return new Observable((subscriber) => {
      const core: Core = this.getCore();
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

  private destroyViewportAssociations(viewport: Viewport): void {
    const core = this.getCore();
    if (!core) {
      return;
    }

    const contentConnectorId = viewport.getContentConnector();
    if (contentConnectorId) {
      const contentConnector = core.byId(contentConnectorId);
      if (contentConnector) {
        contentConnector.destroy();
      }
    }

    const viewStateManagerId = viewport.getViewStateManager();

    if (viewStateManagerId && core.byId(viewStateManagerId)) {
      const viewStateManager = core.byId(
        viewStateManagerId
      ) as ViewStateManager;

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

  private onContentChangesStarted(): void {
    this.viewport.setBusy(true);
    this.viewport.detachNodesPicked(this.onNodesPicked);
  }

  private onContentChangesFinished(event: any): void {
    this.viewport.setBusy(false);

    const content = event.getParameter('content');
    const failureReason = event.getParameter('failureReason');
    if (!failureReason) {
      this.scene = content;
      this.nodeHierarchy = this.scene.getDefaultNodeHierarchy();

      this.viewport.attachNodesPicked(this.onNodesPicked, this);
    }

    this.contentLoadFinished.emit({
      content: content,
      failureReason: failureReason,
    });
  }

  private onNodesPicked(event: any) {
    if (this.is2D) {
      this.onNodesPicked2D(event);
    } else {
      this.onNodesPicked3D(event);
    }
  }

  private isNodeIncluded(nodeRef: NodeRef) {
    const sid = this.nodeRefToPersistentId(nodeRef);
    if (!sid) {
      return false;
    }
    const productCodes =
      this.sceneNodeToProductLookupService.syncLookupProductCodes([
        sid as string,
      ]);
    return (
      !!productCodes &&
      productCodes.some((productCode: string) =>
        this.includedProductCodes.includes(productCode)
      )
    );
  }

  private onNodesPicked2D(event: any) {
    const pickedNodes = event.getParameter('picked');
    if (pickedNodes.length === 0) {
      return;
    }

    const hotSpots = pickedNodes.filter(
      (node: any) =>
        node.nodeContentType && node.nodeContentType === NodeContentType.Hotspot
    );
    if (hotSpots.length === 0) {
      return;
    }

    const includedHotSpots: NodeRef[] = hotSpots.filter((nodeRef: NodeRef) =>
      this.isNodeIncluded(nodeRef)
    );

    pickedNodes.splice(0);
    includedHotSpots.forEach((includedHotSpot: any) =>
      pickedNodes.push(includedHotSpot)
    );
  }

  private onNodesPicked3D(event: any) {
    const picked: NodeRef[] = event.getParameter('picked');
    const src: NodeRef[] = picked.splice(0, picked.length);

    src.forEach((node: NodeRef) => {
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

  private addViewport(): Observable<void> {
    return new Observable((subscriber) => {
      sap.ui.require(
        [
          'sap/ui/vk/ViewManager',
          'sap/ui/vk/Viewport',
          'sap/ui/vk/ViewStateManager',
          'sap/ui/vk/AnimationPlayer',
          'sap/ui/vk/ContentConnector',
          'sap/ui/vk/DrawerToolbar',
        ],
        (
          ViewManager: ViewManager,
          Viewport: any,
          ViewStateManager: any,
          AnimationPlayer: any,
          ContentConnector: any,
          DrawerToolbar: any
        ) => {
          const core: Core = this.getCore();
          const uiArea: UIArea = core.getUIArea(this.elementRef.nativeElement);
          if (uiArea) {
            const oldViewport = uiArea.getContent()[0] as Viewport;
            this.destroyViewportAssociations(oldViewport);
            uiArea.destroyContent();
          }

          this.viewport = new Viewport();
          this.viewport.placeAt(this.elementRef.nativeElement);

          this.contentConnector = new ContentConnector();
          this.contentConnector.attachContentChangesStarted(
            this.onContentChangesStarted,
            this
          );
          this.contentConnector.attachContentChangesFinished(
            this.onContentChangesFinished,
            this
          );

          this.viewStateManager = new ViewStateManager({
            contentConnector: this.contentConnector,
          });

          this.viewport.setContentConnector(this.contentConnector);
          this.viewport.setViewStateManager(this.viewStateManager);

          this.animationPlayer = new AnimationPlayer();
          this.animationPlayer.setViewStateManager(this.viewStateManager);

          this.animationPlayer.attachViewActivated(this.onViewActivated, this);
          this.animationPlayer.attachTimeChanged(this.onTimeChanged, this);

          this.viewManager = new ViewManager({
            autoPlayAnimation: false,
            contentConnector: this.contentConnector,
            animationPlayer: this.animationPlayer,
          });

          this.viewStateManager.setViewManager(this.viewManager);
          this.viewStateManager.attachSelectionChanged(
            this.onSelectionChanged,
            this
          );
          this.viewStateManager.attachOutliningChanged(
            this.onOutliningChanged,
            this
          );

          this.drawerToolbar = new DrawerToolbar({
            viewport: this.viewport,
            visible: false,
          });

          this.viewport.addDependent(this.drawerToolbar);
          subscriber.next();
          subscriber.complete();
        }
      );
    });
  }

  private getCSSPropertyValue(cssPropertyName: string) {
    const storefrontElement = document.getElementsByTagName('cx-storefront')[0];
    return getComputedStyle(storefrontElement).getPropertyValue(
      cssPropertyName
    );
  }

  private getCSSColor(color: string): CSSColor {
    return (this.getCSSPropertyValue(color) || color).trim() as CSSColor;
  }

  private resolveVisualization(
    productCode: string
  ): Observable<VisualizationLoadInfo> {
    return this.visualizationLookupService
      .findMatchingVisualizations(productCode)
      .pipe(
        mergeMap((matches: VisualizationInfo[]) => {
          switch (matches.length) {
            case 0:
              return of(<VisualizationLoadInfo>{
                result: VisualizationLoadResult.NoMatchFound,
                matches: matches,
              });
            case 1:
              const matchingVisualization = matches[0];
              this.sceneId = matchingVisualization.sceneId;
              this.contentType = matchingVisualization.contentType;
              return of(<VisualizationLoadInfo>{
                result: VisualizationLoadResult.Success,
                matches: matches,
                visualization: matchingVisualization,
              });
            default:
              return of(<VisualizationLoadInfo>{
                result: VisualizationLoadResult.MultipleMatchesFound,
                matches: matches,
              });
          }
        })
      );
  }

  private persistentIdToNodeRef(sids: string | string[]): NodeRef | NodeRef[] {
    return (this.scene as any).persistentIdToNodeRef(sids);
  }

  private nodeRefToPersistentId(
    nodeRefs: object | object[]
  ): string | string[] {
    return (this.scene as any).nodeRefToPersistentId(nodeRefs);
  }

  private getViewStateManagerImplementation(): any {
    return (this.viewStateManager as any).getImplementation();
  }

  private subscribeSelectedSceneNodeIds() {
    this.selectedNodeIds$.subscribe(this.handleSelectedNodeIds.bind(this));
  }

  private handleSelectedNodeIds(nodeIds: string[]) {
    const nodeRefs = this.persistentIdToNodeRef(nodeIds);

    if (this.is2D) {
      this.handleSelectedNodes2D(nodeRefs);
    } else {
      this.handleSelectedNodes3D(nodeRefs);
    }

    if (this.isolateModeEnabled && nodeRefs.length > 0) {
      this.isolateNodes(nodeRefs);
    }
    this.setShouldRenderFrame();
  }

  private handleSelectedNodes2D(selectedNodes: NodeRef[]) {
    const existingSelection: NodeRef[] = [];
    this.viewStateManager.enumerateSelection((nodeRef: NodeRef) =>
      existingSelection.push(nodeRef)
    );
    this.viewStateManager.setSelectionStates(
      [],
      existingSelection,
      false,
      true
    );
    this.viewStateManager.setSelectionStates(selectedNodes, [], false, true);
  }

  private handleSelectedNodes3D(selectedNodes: NodeRef[]) {
    const existingOutlinedNodeRefs: NodeRef[] = [];
    this.viewStateManager.enumerateOutlinedNodes((nodeRef: NodeRef) =>
      existingOutlinedNodeRefs.push(nodeRef)
    );
    this.getViewStateManagerImplementation().setOutliningStates(
      [],
      existingOutlinedNodeRefs,
      false,
      true
    );
    this.getViewStateManagerImplementation().setOutliningStates(
      selectedNodes,
      [],
      false,
      true
    );
  }

  private setShouldRenderFrame() {
    (this.viewport as any).setShouldRenderFrame();
  }

  private is2DContentType(contentType: ContentType): boolean {
    return contentType === ContentType.Drawing2D;
  }

  private loadScene(
    sceneId: string,
    contentType: ContentType
  ): Observable<SceneLoadInfo> {
    if (this.viewportReady) {
      this.viewportReady = false;
      this.viewportReadyChange.emit(false);
    }

    this.is2D = this.is2DContentType(contentType);

    return new Observable((subscriber) => {
      sap.ui.require(['sap/ui/vk/ContentResource'], (ContentResource: any) => {
        this.sceneLoadInfo$.next({
          sceneLoadState: SceneLoadState.Loading,
        });

        const baseUrl: string = (
          this.epdVisualizationConfig.apis as VisualizationApiConfig
        ).baseUrl;

        const contentResource: ContentResource = new ContentResource({
          useSecureConnection: false,
          sourceType: this.is2D ? 'stream2d' : 'stream',
          source: `${baseUrl}/vis/public/storage/v1`,
          veid: sceneId,
        });

        this.contentLoadFinished.subscribe((visualContentLoadFinished) => {
          const succeeded = !!visualContentLoadFinished.content;
          let sceneLoadInfo: SceneLoadInfo;
          if (succeeded) {
            this.viewportReady = true;
            this.viewportReadyChange.emit(true);
            this.changeDetectorRef.detectChanges();

            sceneLoadInfo = <SceneLoadInfo>{
              sceneLoadState: SceneLoadState.Loaded,
              loadedSceneInfo: {
                sceneId: sceneId,
                contentType: contentType,
              },
            };
          } else {
            sceneLoadInfo = <SceneLoadInfo>{
              sceneLoadState: SceneLoadState.Failed,
              errorMessage: visualContentLoadFinished.failureReason,
            };
          }
          this.sceneLoadInfo$.next(sceneLoadInfo);
          subscriber.next(sceneLoadInfo);
          subscriber.complete();
        });

        this.contentConnector.addContentResource(contentResource);
      });
    });
  }

  private onSelectionChanged(): void {
    const nodeRefs: NodeRef[] = [];
    this.viewStateManager.enumerateSelection((nodeRef: NodeRef) =>
      nodeRefs.push(nodeRef)
    );

    const nodeIds = this.nodeRefToPersistentId(nodeRefs) as string[];
    this.sceneNodeToProductLookupService
      .lookupProductCodes(nodeIds)
      .subscribe((productCodes: string[]) =>
        this.selectedProductCodesChange.emit(productCodes)
      );
  }

  private onOutliningChanged(): void {
    const nodeRefs: NodeRef[] = [];
    this.viewStateManager.enumerateOutlinedNodes((nodeRef: NodeRef) =>
      nodeRefs.push(nodeRef)
    );

    const nodeIds = this.nodeRefToPersistentId(nodeRefs) as string[];
    this.sceneNodeToProductLookupService
      .lookupProductCodes(nodeIds)
      .subscribe((productCodes: string[]) =>
        this.selectedProductCodesChange.emit(productCodes)
      );
  }
}
