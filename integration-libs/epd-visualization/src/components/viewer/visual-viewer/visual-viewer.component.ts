import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { EpdVisualizationConfig } from '../../../config/epd-visualization-config';
import { SceneNodeToProductLookupService } from '../../../services/scene-node-to-product-lookup/scene-node-to-product-lookup.service';
import { VisualizationLookupService } from '../../../services/visualization-lookup/visualization-lookup.service';
import { VisualContentLoadFinishedEvent } from './events/visual-content-load-finished.event';

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
import type MessageBox from 'sap/m/MessageBox';
import type UIArea from 'sap/ui/core/UIArea';
import type ContentResource from 'sap/ui/vk/ContentResource';

import { NavigationMode } from './models/navigation-mode';
import { SelectionDisplayMode } from './models/selection-display-mode';
import { SelectionMode } from './models/selection-mode';
import { ZoomTo } from './models/zoom-to';
import { NodeContentType } from './models/node-content-type';

@Component({
  selector: 'cx-visual-viewer',
  templateUrl: './visual-viewer.component.html',
})
export class VisualViewerComponent implements OnChanges {
  constructor(
    protected epdVisualizationConfig: EpdVisualizationConfig,
    protected nodeIdToProductCodeLookup: SceneNodeToProductLookupService,
    protected visualizationLookupService: VisualizationLookupService,
    protected elementRef: ElementRef,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    this.viewportSetup = this.bootstrapUi5('ui5bootstrap')
      .then(() => this.initializeUi5())
      .then(() => this.addViewport());

    this.animationTimeInput.valueChanges.subscribe((value) => {
      if (this.animationPlayer) {
        this.animationPlayerSetTime(value, false);
      }
    });
  }

  protected _ui5: ui5;
  protected scene: Scene;
  protected contentConnector: ContentConnector;
  protected viewport: Viewport;
  protected viewStateManager: ViewStateManager;
  protected animationPlayer: AnimationPlayer;
  protected viewManager: ViewManager;
  protected drawerToolbar: DrawerToolbar;
  protected sceneId: string;
  protected contentType: string;
  protected viewportSetup: Promise<Viewport>;

  protected selectedNodeIds$ = new Subject<string[]>();
  protected initialViewInfo: any;
  protected viewPriorToIsolateViewInfo: any;
  protected sceneLoaded: Promise<VisualContentLoadFinishedEvent>;
  protected canSetNavigationMode = false;
  protected flyToDurationInSeconds = 1;
  protected zoomToMargin = 0.2;
  protected isolateSelectedIsolateFirstNodeOnly = true;

  @Input() backgroundTopColor = '--cx-color-inverse';
  @Input() backgroundBottomColor = '--cx-color-inverse';
  @Input() selectionHighlightColor = '--cx-color-primary';
  @Input() showAllHotspotsColor = '--cx-primary-color-muted';
  @Input() outlineColor = '--cx-color-primary';
  @Input() outlineWidth = 5;
  @Input() selectionMode = 'Exclusive';

  selectionDisplayMode = SelectionDisplayMode.Outline;
  is2D: boolean;
  showAllHotspotsEnabled: boolean;

  @Output() contentLoadFinished =
    new EventEmitter<VisualContentLoadFinishedEvent>();

  @Input() selectedProductCodes!: string[];
  @Output() selectedProductCodesChange = new EventEmitter<string[]>();

  @Input() animationTime: number;
  @Output() animationTimeChange = new EventEmitter<number>();

  @Output() animationTotalDurationChange = new EventEmitter<number>();

  private _animationPosition: number;
  /** Gives the playback position as a value between 0 and 1 (animationCurrentTime/animationTotalDuration) */
  @Input()
  set animationPosition(position: number) {
    if (this._animationPosition !== position) {
      this._animationPosition = position;
      this.viewportSetup.then(() => {
        const time = position * this.animationPlayer.getTotalDuration();
        this.animationPlayerSetTime(time, false);
      });
    }
  }
  get animationPosition() {
    return this._animationPosition;
  }

  @Output() animationPositionChange = new EventEmitter<number>();

  @Input() animationPlaying = false;
  @Output() animationPlayingChange = new EventEmitter<boolean>();

  animationAtEndPosition = false;
  @Output() animationAtEndPositionChange = new EventEmitter<boolean>();

  @Input() navigationMode: NavigationMode;

  NavigationMode = NavigationMode;

  @Input() isolateModeEnabled = false;
  @Output() isolateModeEnabledChange = new EventEmitter<boolean>();

  viewportReady = false;
  @Output() viewportReadyChange = new EventEmitter<boolean>();

  animationTimeInput = new FormControl(0);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedProductCodes) {
      const currentSelectedProductCodes =
        changes.selectedProductCodes.currentValue;
      this.nodeIdToProductCodeLookup
        .lookupNodeIds(currentSelectedProductCodes)
        .then((selectedNodeIds) => this.selectedNodeIds$.next(selectedNodeIds));
    }

    if (this.sceneLoaded) {
      this.sceneLoaded
        .then(() => this.applyProperties())
        .then(() => {
          if (changes.animationTime) {
            this.animationPlayerSetTime(
              changes.animationTime.currentValue,
              false
            );
          }

          if (changes.animationPosition) {
            const time =
              changes.animationPosition.currentValue *
              this.animationPlayer.getTotalDuration();
            this.animationPlayerSetTime(time, false);
          }

          if (changes.animationPlaying) {
            if (changes.animationPlaying.currentValue) {
              this.playAnimation();
            } else {
              this.stopAnimation();
            }
          }
        });
    }
  }

  private isolateNodes(nodeRefsToIsolate: object[]): void {
    if (this.isolateSelectedIsolateFirstNodeOnly) {
      nodeRefsToIsolate = nodeRefsToIsolate.length
        ? [nodeRefsToIsolate[0]]
        : [];
    }

    this.viewport.zoomTo(
      ZoomTo.Node,
      nodeRefsToIsolate,
      this.flyToDurationInSeconds,
      this.zoomToMargin
    );

    const currentVisibleSids: string[] =
      this.viewPriorToIsolateViewInfo.visibility.visible || [];
    const currentVisibleNodeRefs = currentVisibleSids.map((sid) =>
      this.persistentIdToNodeRef(sid)
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

  public toggleIsolateMode(): void {
    if (this.isolateModeEnabled) {
      this.viewport.setViewInfo(
        this.viewPriorToIsolateViewInfo,
        this.flyToDurationInSeconds
      );
    } else {
      this.viewPriorToIsolateViewInfo = this.viewport.getViewInfo({
        camera: true,
        visibility: true,
      });

      const selectedNodeRefs: any[] = [];
      if (this.selectionDisplayMode === SelectionDisplayMode.Highlight) {
        this.viewStateManager.enumerateSelection((nodeRef: any) =>
          selectedNodeRefs.push(nodeRef)
        );
      } else {
        this.viewStateManager.enumerateOutlinedNodes((nodeRef: any) =>
          selectedNodeRefs.push(nodeRef)
        );
      }

      this.isolateNodes(selectedNodeRefs);
    }

    this.isolateModeEnabled = !this.isolateModeEnabled;
    this.isolateModeEnabledChange.emit(this.isolateModeEnabled);
    this.changeDetectorRef.detectChanges();
  }

  public getAnimationTotalDuration(): number {
    if (this.animationPlayer) {
      return this.animationPlayer.getTotalDuration();
    }
    return 0;
  }

  private getAnimationPosition(): number {
    return this.getAnimationTotalDuration()
      ? this.animationTime / this.getAnimationTotalDuration()
      : 0;
  }

  public activateHomeView() {
    if (this.is2D) {
      this.viewport.zoomTo(ZoomTo.All, null, this.flyToDurationInSeconds, 0.3);
    } else if (this.initialViewInfo) {
      this.viewport.setViewInfo(
        this.initialViewInfo,
        this.flyToDurationInSeconds
      );
    }

    if (this.isolateModeEnabled) {
      this.isolateModeEnabled = false;
      this.isolateModeEnabledChange.emit(false);
      this.changeDetectorRef.detectChanges();
    }
  }

  public playAnimation(): void {
    if (this.animationPlayer) {
      if (this.animationAtEndPosition) {
        this.animationPlayerSetTime(0, false);
      }
      this.animationPlayer.play();
    }
  }

  private animationPlayerSetTime(time: number, blockEvents: boolean) {
    // bug workaround
    // the overload with no sequence number parameter blows up
    (this.animationPlayer as any).setTime(time, undefined, blockEvents);
  }

  public stopAnimation(): void {
    if (this.animationPlayer) {
      this.animationPlayer.stop();
    }
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

    const position = this.getAnimationPosition();
    if (this.animationPosition !== position) {
      this.animationPosition = position;
      this.animationPositionChange.emit(position);
      changes = true;
    }

    const endOfAnimation =
      this.getAnimationTotalDuration() > 0 && position === 1;
    if (
      endOfAnimation !== undefined &&
      this.animationAtEndPosition !== endOfAnimation
    ) {
      this.animationAtEndPosition = endOfAnimation;
      this.animationAtEndPositionChange.emit(endOfAnimation);
      changes = true;
    }

    if (changes) {
      this.changeDetectorRef.detectChanges();
    }
  }

  private onAnimationPlaybackStateChanged(oEvent: any): void {
    let changes = false;

    const playing: boolean = oEvent.getParameters().playing;
    if (playing !== undefined && this.animationPlaying !== playing) {
      this.animationPlaying = playing;
      this.animationPlayingChange.emit(playing);
      changes = true;
    }

    if (changes) {
      this.changeDetectorRef.detectChanges();
    }
  }

  public loadVisualization(productCode: string): Promise<void> {
    this.sceneLoaded = this.viewportSetup
      .then(() => this.resolveVisualization(productCode))
      .then(() => this.loadScene(this.sceneId, this.contentType));

    return this.sceneLoaded
      .then(() => this.applyProperties())
      .then(() => this.subscribeSelectedSceneNodeIds())
      .then(() =>
        this.nodeIdToProductCodeLookup.handleSceneLoaded(this.sceneId)
      );
  }

  private isUi5BootStrapped(): boolean {
    return !!window.sap;
  }

  private getCore(): any {
    return sap?.ui?.getCore();
  }

  private bootstrapUi5(scriptElementId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isUi5BootStrapped()) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.setAttribute('id', scriptElementId);
      document.getElementsByTagName('head')[0].appendChild(script);
      script.onload = () => resolve();
      script.onerror = (error: any) => reject(error);
      script.id = 'sap-ui-bootstrap';
      script.type = 'text/javascript';
      script.setAttribute('data-sap-ui-theme', 'sap-fiori-3');
      script.setAttribute('data-sap-ui-compatVersion', 'edge');
      script.src = this.epdVisualizationConfig?.ui5?.bootstrapUrl ?? '';
    });
  }

  private initializeUi5(): Promise<void> {
    return new Promise((resolve) => {
      const core: Core = this.getCore();
      core.attachInit(() => {
        const loadLibraryOptions = { async: true };
        Promise.all([
          core.loadLibrary('sap.m', loadLibraryOptions),
          core.loadLibrary('sap.ui.layout', loadLibraryOptions),
          core.loadLibrary('sap.ui.vk', loadLibraryOptions),
          core.loadLibrary('sap.ui.richtexteditor', loadLibraryOptions),
        ]).then(() => resolve());
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

  private showError(errorMessage: string): void {
    sap.ui.require(['sap/m/MessageBox'], (MessageBox: MessageBox) => {
      MessageBox.error(errorMessage);
    });
  }

  private onContentChangesStarted(): void {
    this.viewport.setBusy(true);
    if (this.getViewportImplementation()) {
      this.getViewportImplementation().detachNodesPicked(this.onNodesPicked);
    }
  }

  private onContentChangesFinished(event: any): void {
    this.viewport.setBusy(false);

    this.scene = event.getParameter('content');

    const failureReason = event.getParameter('failureReason');
    if (failureReason && failureReason.length > 0) {
      this.showError(failureReason[0].errorMessage);
    } else {
      this.canSetNavigationMode = true;
      this.setNavigationMode(this.navigationMode);

      this.getViewportImplementation().attachNodesPicked(
        this.onNodesPicked,
        this
      );
    }

    const loadFinishedEvent = new VisualContentLoadFinishedEvent(
      event.content,
      event.failureReason
    );

    this.contentLoadFinished.emit(loadFinishedEvent);
  }

  setNavigationMode(navigationMode: NavigationMode): void {
    if (navigationMode === undefined) {
      navigationMode = this.is2D
        ? NavigationMode.Pan
        : NavigationMode.Turntable;
    }

    if (this.drawerToolbar && this.viewport) {
      (this.drawerToolbar as any)._activateGesture(
        this.getViewportImplementation(),
        navigationMode
      );
    }

    this.navigationMode = navigationMode;
  }

  private onNodesPicked(event: any) {
    if (this.is2D) {
      this.onNodesPicked2D(event);
    } else {
      // need to implement 3D selection behaviour
    }
  }

  private onNodesPicked2D(event: any) {
    const pickedNodes = event.getParameter('picked');
    if (pickedNodes.length === 0) {
      return;
    }

    const pickedHotSpots = pickedNodes.filter(
      (node: any) =>
        node.nodeContentType && node.nodeContentType === NodeContentType.Hotspot
    );
    if (pickedHotSpots.length === 0) {
      return;
    }

    pickedNodes.splice(0);
    pickedHotSpots.forEach((pickedHotSpot: any) =>
      pickedNodes.push(pickedHotSpot)
    );
  }

  private addViewport(): Promise<Viewport> {
    return new Promise((resolve) => {
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
          this.animationPlayer.attachStateChanged(
            this.onAnimationPlaybackStateChanged,
            this
          );

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

          this.viewport.addContent(this.drawerToolbar);
          resolve(this.viewport);
        }
      );
    });
  }

  private toVkSelectionMode(selectionMode: string): SelectionMode {
    switch (selectionMode.toLowerCase()) {
      case `${SelectionMode.None}`:
        return SelectionMode.None;
      case `${SelectionMode.Sticky}`:
        return SelectionMode.Sticky;
      case `${SelectionMode.Exclusive}`:
        return SelectionMode.Exclusive;
      default:
        throw new Error(`Unknown selection mode: ${selectionMode}`);
    }
  }

  private getCSSPropertyValue(cssPropertyName: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(
      cssPropertyName
    );
  }

  private getCSSColor(color: string): CSSColor {
    return (this.getCSSPropertyValue(color) || color).trim() as CSSColor;
  }

  private applyProperties(): void {
    this.viewport.setBackgroundColorTop(
      this.backgroundTopColor
        ? this.getCSSColor(this.backgroundTopColor)
        : undefined
    );

    this.viewport.setBackgroundColorBottom(
      this.backgroundBottomColor
        ? this.getCSSColor(this.backgroundBottomColor)
        : undefined
    );

    this.viewStateManager.setHighlightColor(
      this.selectionHighlightColor
        ? this.getCSSColor(this.selectionHighlightColor)
        : undefined
    );

    this.viewStateManager.setOutlineColor(
      this.outlineColor ? this.getCSSColor(this.outlineColor) : undefined
    );

    this.viewStateManager.setOutlineWidth(this.outlineWidth);

    this.viewport.setSelectionMode(this.toVkSelectionMode(this.selectionMode));

    this.viewport.setHotspotColor(
      this.selectionHighlightColor
        ? this.getCSSColor(this.selectionHighlightColor)
        : undefined
    );

    this.getViewportImplementation().setShowAllHotspotsTintColour(
      this.showAllHotspotsColor
        ? this.getCSSColor(this.showAllHotspotsColor)
        : undefined
    );

    if (this.canSetNavigationMode) {
      this.setNavigationMode(this.navigationMode);
    }

    this.viewport.setSelectionDisplayMode(
      this.is2D ? SelectionDisplayMode.Highlight : this.selectionDisplayMode
    );
  }

  private resolveVisualization(productCode: string): Promise<null> {
    return new Promise((resolve, reject) =>
      this.visualizationLookupService
        .findMatchingVisualizations(productCode)
        .subscribe((visualizations) => {
          if (visualizations.length === 1) {
            this.sceneId = visualizations[0].sceneId;
            this.contentType = visualizations[0].contentType;
            resolve(null);
          } else {
            reject();
          }
        })
    );
  }

  private persistentIdToNodeRef(sids: string | string[]): any | any[] {
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

  private getViewportImplementation(): any {
    return (this.viewport as any).getImplementation();
  }

  private subscribeSelectedSceneNodeIds(): Promise<null> {
    this.selectedNodeIds$.subscribe((sids) => {
      const nodeRefs = this.persistentIdToNodeRef(sids);

      if (this.is2D) {
        const existingSelection: any[] = [];
        this.viewStateManager.enumerateSelection((nodeRef: any) =>
          existingSelection.push(nodeRef)
        );
        this.getViewStateManagerImplementation().setSelectionStates(
          [],
          existingSelection,
          false,
          true
        );
        this.getViewStateManagerImplementation().setSelectionStates(
          nodeRefs,
          [],
          false,
          true
        );
      } else {
        if (this.selectionDisplayMode === SelectionDisplayMode.Highlight) {
          const existingSelection: any[] = [];
          this.viewStateManager.enumerateSelection((nodeRef: any) =>
            existingSelection.push(nodeRef)
          );
          this.getViewStateManagerImplementation().setSelectionStates(
            [],
            existingSelection,
            false,
            true
          );
          this.getViewStateManagerImplementation().setSelectionStates(
            nodeRefs,
            [],
            false,
            true
          );
        } else if (this.selectionDisplayMode === SelectionDisplayMode.Outline) {
          const existingOutlinedNodeRefs: any[] = [];
          this.viewStateManager.enumerateOutlinedNodes((nodeRef: any) =>
            existingOutlinedNodeRefs.push(nodeRef)
          );
          this.getViewStateManagerImplementation().setOutliningStates(
            [],
            existingOutlinedNodeRefs,
            false,
            true
          );
          this.getViewStateManagerImplementation().setOutliningStates(
            nodeRefs,
            [],
            false,
            true
          );
        }
      }

      if (this.isolateModeEnabled && nodeRefs.length > 0) {
        this.isolateNodes(nodeRefs);
      }
    });
    return Promise.resolve(null);
  }

  setShowAllHotspots(showAllHotspots: boolean) {
    this.getViewportImplementation().setShowAllHotspots(showAllHotspots);
    this.showAllHotspotsEnabled = showAllHotspots;
    this.changeDetectorRef.detectChanges();
  }

  private isSupportedContentType(contentType: string): boolean {
    return contentType === '3DModel' || contentType === '2DDrawing';
  }

  private is2DContentType(contentType: string): boolean {
    return contentType === '2DDrawing' || contentType === '2DImage';
  }

  private loadScene(
    sceneId: string,
    contentType: string
  ): Promise<VisualContentLoadFinishedEvent> {
    if (this.viewportReady) {
      this.viewportReady = false;
      this.viewportReadyChange.emit(false);
    }

    this.is2D = this.is2DContentType(contentType);

    if (!this.isSupportedContentType(contentType)) {
      return Promise.reject(null);
    }
    return new Promise((resolve) => {
      sap.ui.require(['sap/ui/vk/ContentResource'], (ContentResource: any) => {
        const contentResource: ContentResource = new ContentResource({
          useSecureConnection: false,
          sourceType: this.is2D ? 'stream2d' : 'stream',
          source: `${this.epdVisualizationConfig.apis?.baseUrl}/vis/public/storage/v1`,
          veid: sceneId,
        });

        this.contentLoadFinished
          .pipe()
          .subscribe((visualContentLoadFinished) => {
            this.viewportReady = true;
            this.viewportReadyChange.emit(true);
            this.changeDetectorRef.detectChanges();
            resolve(visualContentLoadFinished);
          });

        this.contentConnector.addContentResource(contentResource);
      });
    });
  }

  private onSelectionChanged(): void {
    const nodeRefs: any[] = [];
    this.viewStateManager.enumerateSelection((nodeRef: any) =>
      nodeRefs.push(nodeRef)
    );

    const nodeIds = this.nodeRefToPersistentId(nodeRefs) as string[];
    this.nodeIdToProductCodeLookup
      .lookupProductCodes(nodeIds)
      .then((productCodes: string[]) =>
        this.selectedProductCodesChange.emit(productCodes)
      );
  }

  private onOutliningChanged(): void {
    const nodeRefs: any[] = [];
    this.viewStateManager.enumerateOutlinedNodes((nodeRef: any) =>
      nodeRefs.push(nodeRef)
    );

    const nodeIds = this.nodeRefToPersistentId(nodeRefs) as string[];
    this.nodeIdToProductCodeLookup
      .lookupProductCodes(nodeIds)
      .then((productCodes: string[]) =>
        this.selectedProductCodesChange.emit(productCodes)
      );
  }
}
