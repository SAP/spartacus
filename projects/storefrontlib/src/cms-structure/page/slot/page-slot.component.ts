import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  CmsService,
  ContentSlotComponentData,
  ContentSlotData,
  DynamicAttributeService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { IntersectionOptions } from '../../../layout/loading/intersection.model';
import { PageSlotService } from './page-slot.service';

/**
 * The `PageSlotComponent` is used to render the CMS page slot and it's components.
 *
 * The Page slot host element will be supplemented with css classes so that the layout
 * can be fully controlled by customers:
 * - The page slot _position_ is added as a css class by default.
 * - The `cx-pending` is added for as long as the slot hasn't start loading.
 * - The `page-fold` style class is added for the page slot which is configured as the page fold.
 */
@Component({
  selector: 'cx-page-slot,[cx-page-slot]',
  templateUrl: './page-slot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSlotComponent implements OnInit, OnDestroy {
  /**
   * The position represents the unique key for a page slot on a single page, but can
   * be reused cross pages.
   *
   * The position is used to find the CMS components for the page slot. It is also
   * added as an additional CSS class so that layout can be applied.
   */
  @HostBinding('attr.position')
  @Input()
  set position(value: string) {
    this.position$.next(value);
  }
  get position(): string {
    return this.position$.value;
  }

  /**
   * Maintains css classes introduced by the host and adds additional classes.
   */
  @Input() @HostBinding() class: string;

  /**
   * Indicates that the page slot is the last page slot above the fold.
   */
  @HostBinding('class.page-fold') @Input() isPageFold = false;

  /**
   * Indicates that the components of the page slot haven't been loaded as long
   * as the isPending state is true.
   */
  @HostBinding('class.cx-pending') isPending = true;

  /**
   * Indicates that the page slot doesn't contain any components. This is no
   * longer used in spartacus, but kept for backwards compatibility.
   */
  @HostBinding('class.has-components') @Input() hasComponents = false;

  protected position$: BehaviorSubject<string> = new BehaviorSubject(undefined);

  components: ContentSlotComponentData[];

  protected slot$: Observable<ContentSlotData> = this.position$.pipe(
    switchMap((position) => this.cmsService.getContentSlot(position)),
    distinctUntilChanged(this.isDistinct)
  );

  /** Observes the components for the given page slot. */
  components$: Observable<ContentSlotComponentData[]> = this.slot$.pipe(
    map((slot) => slot?.components ?? [])
  );

  protected subscription: Subscription = new Subscription();

  /** Keeps track of the pending components that must be loaded for the page slot */
  private pendingComponentCount = 0;

  /** Tracks the last used position, in case the page slot is used dynamically */
  private lastPosition: string;
  constructor(
    protected cmsService: CmsService,
    protected dynamicAttributeService: DynamicAttributeService,
    protected renderer: Renderer2,
    protected elementRef: ElementRef,
    protected cd: ChangeDetectorRef,
    protected pageSlotService: PageSlotService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.slot$.pipe(tap((slot) => this.decorate(slot))).subscribe((value) => {
        this.components = value?.components || [];
        this.cd.markForCheck();
      })
    );
  }

  protected decorate(slot: ContentSlotData): void {
    let cls = this.class || '';

    if (this.lastPosition && cls.indexOf(this.lastPosition) > -1) {
      cls = cls.replace(this.lastPosition, '');
    }
    if (this.position$.value) {
      cls += ` ${this.position$.value}`;
      this.lastPosition = this.position$.value;
    }

    // host bindings
    this.pending = slot?.components?.length || 0;
    this.hasComponents = slot?.components?.length > 0;
    if (cls && cls !== this.class) {
      this.class = cls;
    }

    if (slot) {
      this.dynamicAttributeService.addAttributesToSlot(
        this.elementRef.nativeElement,
        this.renderer,
        slot
      );
    }
  }

  /**
   * Sets the pending count for the page slot components. Once all pending components are
   * loaded, the `isPending` flag is updated, so that the associated class can be updated
   */
  protected set pending(count: number) {
    this.pendingComponentCount = count;
    this.isPending = this.pendingComponentCount > 0;
  }

  protected get pending(): number {
    return this.pendingComponentCount;
  }

  /*
   * Is triggered when a component is added to the view. This is used to
   * update the pending count
   */
  isLoaded(loadState: boolean) {
    if (loadState) {
      this.pending--;
      this.cd.markForCheck();
    }
  }

  /**
   * The `DeferLoadingStrategy` indicates whether the component should be
   * rendered instantly or whether it should be deferred.
   */
  getComponentDeferOptions(componentType: string): IntersectionOptions {
    return this.pageSlotService.getComponentDeferOptions(
      this.position,
      componentType
    );
  }

  protected isDistinct(old: ContentSlotData, current: ContentSlotData) {
    return (
      current.components &&
      old.components?.length === current.components.length &&
      !old.components.find(
        (el, index) => el.uid !== current.components[index].uid
      )
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
