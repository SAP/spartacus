import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
} from '@angular/core';
import {
  CmsConfig,
  CmsService,
  ContentSlotComponentData,
  ContentSlotData,
  DynamicAttributeService,
} from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import { IntersectionOptions } from '../../../layout/loading/intersection.model';

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
export class PageSlotComponent {
  /**
   * The position represents the unique key for a page slot on a single page, but can
   * be reused cross pages.
   *
   * The position is used to find the CMS components for the page slot. It is also
   * added as an additional CSS class so that layoutt can be applied.
   */
  @Input() set position(value: string) {
    this.position$.next(value);
  }

  /** Contains css classes introduced by the host. Additional classes are added by the component logic. */
  @Input() @HostBinding() class: string;

  /** Indicates that the page slot is the last page slot above the fold */
  @HostBinding('class.page-fold') @Input() isPageFold = false;

  /** Indicates that the page slot is indicated as the last page slot above the fold */
  @HostBinding('class.cx-pending') @Input() isPending = true;

  /** Indicates that the page slot is indicated as the last page slot above the fold */
  @HostBinding('class.has-components') @Input() hasComponents = true;

  position$ = new BehaviorSubject(undefined);

  /** Observes the components for the given page slot. */
  components$: Observable<ContentSlotComponentData[]> = this.position$.pipe(
    switchMap((position) => this.cmsService.getContentSlot(position)),
    distinctUntilChanged(this.isDistinct),
    tap((slot) => this.decorate(slot)),
    map((slot) => slot?.components ?? []),
    shareReplay()
  );

  /** Keeps track of the pending components that must be loaded for the page slot */
  private pendingComponentCount = 0;
  /** Tracks the last used position, in case the page slot is used dynamically */
  private lastPosition: string;

  constructor(
    protected cmsService: CmsService,
    protected dynamicAttributeService: DynamicAttributeService,
    protected renderer: Renderer2,
    protected elementRef: ElementRef,
    protected config: CmsConfig
  ) {}

  decorate(slot: ContentSlotData): void {
    // decorate css class
    if (!this.class) {
      this.class = '';
    }
    if (this.lastPosition && this.class.indexOf(this.lastPosition) > -1) {
      this.class = this.class.replace(this.lastPosition, '');
    }
    this.lastPosition = this.position$.value;
    this.class += ` ${this.position$.value}`;

    // host bindings
    this.pending = slot.components?.length || 0;
    this.hasComponents = slot.components?.length > 0;

    this.addSmartEditSlotClass(slot);
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

  /**
   * Toggles the css classes for the host element.
   *
   * @param cls the classname that should be added.
   * @param forceAdd indicates that the class should be added or not regardless of the current classlist.
   */
  protected toggleStyleClass(cls: string, forceAdd?: boolean): void {
    let classes = this.class || '';

    if (!classes.includes(cls) && forceAdd !== false) {
      classes += ` ${cls} `;
    } else if (!forceAdd) {
      classes = classes.replace(cls, '');
    }
    this.class = classes.replace(/\s\s/g, ' ').trim();
  }

  /*
   * Is triggered when a component is added to the view. This is used to
   * update the pending count
   */
  isLoaded(loadState: boolean) {
    if (loadState) {
      this.pending--;
    }
  }

  /**
   * The `DeferLoadingStrategy` indicates whether the component should be
   * rendered instantly or whether it should be deferred.
   */
  getComponentDeferOptions(componentType: string): IntersectionOptions {
    const deferLoading = (this.config.cmsComponents[componentType] || {})
      .deferLoading;
    return { deferLoading };
  }

  protected isDistinct(old: ContentSlotData, current: ContentSlotData) {
    return (
      old.components.length === current.components.length &&
      !old.components.find(
        (el, index) => el.uid !== current.components[index].uid
      )
    );
  }

  private addSmartEditSlotClass(slot): void {
    if (slot && this.cmsService.isLaunchInSmartEdit()) {
      this.dynamicAttributeService.addDynamicAttributes(
        slot.properties,
        this.elementRef.nativeElement,
        this.renderer
      );
    }
  }
}
