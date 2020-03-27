import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
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
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { IntersectionOptions } from '../../../layout/loading/intersection.model';

@Component({
  selector: 'cx-page-slot,[cx-page-slot]',
  templateUrl: './page-slot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSlotComponent implements OnInit, OnDestroy {
  /**
   * The position is used to find the CMS page slot (and optional outlet)
   * that is rendered in the PageSlotComponent. Furthermore, the position
   * is added as a CSS class name to the host element.
   */
  @Input()
  set position(position: string) {
    this.position$.next(position);
    this.renderer.addClass(this.hostElement.nativeElement, position);
  }
  get position(): string {
    return this.position$.value;
  }

  @HostBinding('class.cx-pending') isPending = true;
  @HostBinding('class.has-components') hasComponents = false;
  @HostBinding('class.page-fold') @Input() isPageFold = false;

  private pendingComponentCount: number;

  readonly position$ = new BehaviorSubject<string>(undefined);

  readonly components$: Observable<
    ContentSlotComponentData[]
  > = this.position$.pipe(
    switchMap(
      (position: string): Observable<ContentSlotData> =>
        this.cmsService.getContentSlot(position)
    ),
    tap((slot: ContentSlotData): void => this.addSmartEditSlotClass(slot)),
    map((slot: ContentSlotData): ContentSlotComponentData[] =>
      slot && slot.components ? slot.components : []
    ),
    distinctUntilChanged(
      (a: ContentSlotComponentData[], b: ContentSlotComponentData[]) =>
        a.length === b.length &&
        !a.find(
          (el: ContentSlotComponentData, index: number) =>
            el.uid !== b[index].uid
        )
    )
  );

  private subscription = new Subscription();

  constructor(
    protected cmsService: CmsService,
    protected dynamicAttributeService: DynamicAttributeService,
    protected renderer: Renderer2,
    protected hostElement: ElementRef,
    protected config: CmsConfig
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.components$.subscribe(components => {
        this.hasComponents = components && components.length > 0;
        this.pendingComponentCount = components ? components.length : 0;
        this.isPending = this.pendingComponentCount > 0;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
