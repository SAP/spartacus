import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationMode } from './models/navigation-mode';
import { SelectionMode } from './models/selection-mode';
import { VisualizationLoadInfo } from './models/visualization-load-info';
import { VisualViewerService } from './visual-viewer.service';

@Component({
  selector: 'cx-epd-visualization-viewer',
  templateUrl: './visual-viewer.component.html',
  providers: [VisualViewerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualViewerComponent {
  constructor(protected visualViewerService: VisualViewerService) {}

  /**
   * The top colour of the background gradient.
   * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-background' with the quotes.
   */
  @Input()
  set backgroundTopColor(backgroundTopColor: string) {
    this.visualViewerService.backgroundTopColor = backgroundTopColor;
  }
  get backgroundTopColor(): string {
    return this.visualViewerService.backgroundTopColor;
  }

  /**
   * The bottom colour of the background gradient.
   * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-background' with the quotes.
   */
  @Input()
  set backgroundBottomColor(backgroundBottomColor: string) {
    this.visualViewerService.backgroundBottomColor = backgroundBottomColor;
  }
  get backgroundBottomColor(): string {
    return this.visualViewerService.backgroundBottomColor;
  }

  /**
   * The colour applied to selected 2D hotspots in 2D content.
   * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
   */
  @Input()
  set hotspotSelectionColor(hotspotSelectionColor: string) {
    this.visualViewerService.hotspotSelectionColor = hotspotSelectionColor;
  }
  get hotspotSelectionColor(): string {
    return this.visualViewerService.hotspotSelectionColor;
  }

  /**
   * When true, all hotspots in 2D content that are included in the includedProductCodes property are highlighted using the colour specified by the showAllHotspotsColor property.
   */
  @Input()
  set showAllHotspotsEnabled(showAllHotspotsEnabled: boolean) {
    this.visualViewerService.showAllHotspotsEnabled = showAllHotspotsEnabled;
  }
  get showAllHotspotsEnabled(): boolean {
    return this.visualViewerService.showAllHotspotsEnabled;
  }

  /**
   * The colour used to highlight hotspots in 2D content when the showAllHotspotsEnabled property has a value of true.
   * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
   */
  @Input()
  set showAllHotspotsColor(showAllHotspotsColor: string) {
    this.visualViewerService.showAllHotspotsColor = showAllHotspotsColor;
  }
  get showAllHotspotsColor(): string {
    return this.visualViewerService.showAllHotspotsColor;
  }

  /**
   * The outline colour used to indicate selected objects in 3D content.
   * Can be passed in the CSS color format or as a Spartacus theme color i.e. '--cx-color-primary' with the quotes.
   */
  @Input()
  set outlineColor(outlineColor: string) {
    this.visualViewerService.outlineColor = outlineColor;
  }
  get outlineColor(): string {
    return this.visualViewerService.outlineColor;
  }

  /**
   * The width of the outline (in pixels) used to indicate selected objects in 3D content.
   */
  @Input()
  set outlineWidth(outlineWidth: number) {
    this.visualViewerService.outlineWidth = outlineWidth;
  }
  get outlineWidth(): number {
    return this.visualViewerService.outlineWidth;
  }

  /**
   * The selection mode.
   * None - Selection is disabled.
   * Exclusive - When selecting objects in the viewport, at most one object can be selected at a time. Clicking/tapping to select a new object will deselect any previously selected objects.
   * Sticky - A multiple selection mode in which clicking/tapping on an object that is not part of the current selection will toggle its selection state without modifying the selection state of the currently selected objects.
   */
  @Input()
  set selectionMode(selectionMode: SelectionMode) {
    this.visualViewerService.selectionMode = selectionMode;
  }
  get selectionMode(): SelectionMode {
    return this.visualViewerService.selectionMode;
  }

  /**
   * Gets/sets the selection in terms of product codes.
   * Gets the set of product codes applied to the selected scene nodes.
   * Sets the selection set based on the set of supplied product codes.
   */
  @Input()
  set selectedProductCodes(selectedProductCodes: string[]) {
    this.visualViewerService.selectedProductCodes = selectedProductCodes;
  }
  get selectedProductCodes(): string[] {
    return this.visualViewerService.selectedProductCodes;
  }
  @Output()
  selectedProductCodesChange =
    this.visualViewerService.selectedProductCodesChange;

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
    this.visualViewerService.includedProductCodes = includedProductCodes;
  }
  get includedProductCodes(): string[] {
    return this.visualViewerService.includedProductCodes;
  }

  /**
   *  Gets/sets the opacity to apply to 3D objects that are not in the set specified by the includedProductCodes property
   */
  @Input()
  set excludedOpacity(excludedOpacity: number) {
    this.visualViewerService.excludedOpacity = excludedOpacity;
  }
  get excludedOpacity(): number {
    return this.visualViewerService.excludedOpacity;
  }

  /**
   * The current time position in seconds in the animation (if there is one).
   */
  @Input()
  set animationTime(animationTime: number) {
    this.visualViewerService.animationTime = animationTime;
  }
  get animationTime(): number {
    return this.visualViewerService.animationTime;
  }
  @Output()
  animationTimeChange = this.visualViewerService.animationTimeChange;

  /**
   * Gets the total duration of the animation (if there is one). A total duration of 0 indicates that there is no animation that can be played.
   */
  get animationTotalDuration(): number {
    return this.visualViewerService.animationTotalDuration;
  }

  /**
   *  The animation playback position as a fractional value between 0 (start) and 1 (end).
   */
  @Input()
  set animationPosition(animationPosition: number) {
    this.visualViewerService.animationPosition = animationPosition;
  }
  get animationPosition(): number {
    return this.visualViewerService.animationPosition;
  }
  @Output() animationPositionChange =
    this.visualViewerService.animationPositionChange;

  /**
   * Gets/sets whether the animation (if there is one) is currently playing.
   */
  @Input()
  set animationPlaying(animationPlaying: boolean) {
    this.visualViewerService.animationPlaying = animationPlaying;
  }
  get animationPlaying(): boolean {
    return this.visualViewerService.animationPlaying;
  }
  @Output()
  animationPlayingChange = this.visualViewerService.animationPlayingChange;

  /**
   * Controls the behaviour when a left mouse button drag is initiated in the viewport.
   * Turntable: A left mouse drag performs a turntable mode rotation.
   * Pan: A left mouse drag pans the camera in the viewport.
   * Zoom: A left mouse drag zooms the camera in the viewport in or out
   */
  @Input()
  set navigationMode(navigationMode: NavigationMode) {
    this.visualViewerService.navigationMode = navigationMode;
  }
  get navigationMode(): NavigationMode {
    return this.visualViewerService.navigationMode;
  }

  /**
   * Isolate mode allows a single object to be viewed in isolation.
   */
  @Input()
  set isolateModeEnabled(isolateModeEnabled: boolean) {
    this.visualViewerService.isolateModeEnabled = isolateModeEnabled;
  }
  get isolateModeEnabled(): boolean {
    return this.visualViewerService.isolateModeEnabled;
  }
  @Output()
  isolateModeEnabledChange = this.visualViewerService.isolateModeEnabledChange;

  /**
   * Gets whether the viewport is displaying 2D content.
   */
  get is2D(): boolean {
    return this.visualViewerService.is2D;
  }

  /**
   * Indicates that a scene has been loaded and the viewport is ready for interaction.
   */
  get viewportReady(): boolean {
    return this.visualViewerService.viewportReady;
  }
  @Output() viewportReadyChange = this.visualViewerService.viewportReadyChange;

  /**
   * Returns the user to the initial camera position used when a scene was first loaded.
   */
  public activateHomeView() {
    this.visualViewerService.activateHomeView();
  }

  /**
   * Plays the animation (if one exists).
   */
  public playAnimation(): void {
    this.visualViewerService.playAnimation();
  }

  /**
   * Pauses animation playback.
   */
  public pauseAnimation(): void {
    this.visualViewerService.pauseAnimation();
  }

  /**
   * Loads the visualization specified by the product code.
   * @param productCode The product code of the visualization to load.
   * @returns An observable that returns a single VisualizationLoadInfo value.
   */
  public loadVisualization(
    productCode: string
  ): Observable<VisualizationLoadInfo> {
    return this.visualViewerService.loadVisualization(productCode);
  }

  // Provide access to enum types in template code
  SelectionMode = SelectionMode;
  NavigationMode = NavigationMode;
}
