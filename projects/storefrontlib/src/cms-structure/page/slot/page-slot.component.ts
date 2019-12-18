import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  CmsConfig,
  CmsService,
  ContentSlotComponentData,
  ContentSlotData,
  DeferLoadingStrategy,
  DynamicAttributeService,
} from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { IntersectionOptions } from '../../../layout/intersection/intersection.model';

@Component({
  selector: 'cx-page-slot',
  templateUrl: './page-slot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSlotComponent implements OnInit {
  @HostBinding('class') slotPosition: string;
  @HostBinding('class.cx-pending') isPending: boolean;
  @HostBinding('class.page-fold') @Input() isPageFold = false;
  @HostBinding('class.has-components') hasComponents = false;

  private pendingComponentCount: number;

  @Input() set position(position: string) {
    this.slotPosition = position;
    this.position$.next(position);
  }

  readonly position$ = new BehaviorSubject<string>(undefined);

  /**
   * observable with `ContentSlotData` for the current position
   */
  readonly slot$: Observable<ContentSlotData> = this.position$.pipe(
    switchMap(position => this.cmsService.getContentSlot(position)),
    tap(slot => this.addSmartEditSlotClass(slot))
  );

  /**
   * observable with components (`ContentSlotComponentData[]`)
   * for the current slot
   */
  readonly components$: Observable<
    ContentSlotComponentData[]
  > = this.slot$.pipe(
    map(slot => (slot && slot.components ? slot.components : [])),
    distinctUntilChanged(
      (a, b) =>
        a.length === b.length && !a.find((el, index) => el.uid !== b[index].uid)
    ),
    tap(components => {
      this.hasComponents = components && components.length > 0;
      this.pendingComponentCount = components ? components.length : 0;
      this.isPending = this.pendingComponentCount > 0;
    })
  );

  constructor(
    cmsService: CmsService,
    dynamicAttributeService: DynamicAttributeService,
    renderer: Renderer2,
    hostElement: ElementRef,
    // tslint:disable-next-line:unified-signatures
    config?: CmsConfig
  );

  /**
   * @deprecated since version 1.4
   * Use constructor(cmsService: CmsService, dynamicAttributeService: DynamicAttributeService, renderer: Renderer2, hostElement: ElementRef, config?: CmsConfig) instead
   */
  constructor(
    cmsService: CmsService,
    dynamicAttributeService: DynamicAttributeService,
    renderer: Renderer2,
    hostElement: ElementRef
  );
  constructor(
    protected cmsService: CmsService,
    protected dynamicAttributeService: DynamicAttributeService,
    protected renderer: Renderer2,
    protected hostElement: ElementRef,
    protected config?: CmsConfig
  ) {}

  ngOnInit() {
    this.isPending = true;
  }

  /**
   * Is triggered when a component is added to the view.
   * We use this information to dropthe `is-pending` class from the page slot
   * when all nested components have been added.
   */
  isLoaded(loadState: boolean) {
    if (loadState) {
      this.pendingComponentCount--;
    }
    this.isPending = this.pendingComponentCount > 0;
  }

  getComponentDeferOptions(componentType: string): IntersectionOptions {
    const deferLoading = this.getDeferLoadingStrategy(componentType);
    return { deferLoading };
  }

  /**
   * The `DeferLoadingStrategy` indicates whether component rendering
   * should be deferred.
   */
  private getDeferLoadingStrategy(componentType: string): DeferLoadingStrategy {
    if (this.config) {
      return ((this.config as CmsConfig).cmsComponents[componentType] || {})
        .deferLoading;
    }
  }

  private addSmartEditSlotClass(slot): void {
    if (slot && this.cmsService.isLaunchInSmartEdit()) {
      this.addSmartEditContract(slot);
    }
  }

  private addSmartEditContract(slot: ContentSlotData): void {
    this.dynamicAttributeService.addDynamicAttributes(
      slot.properties,
      this.hostElement.nativeElement,
      this.renderer
    );
  }
}
