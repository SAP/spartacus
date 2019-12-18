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
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { IntersectionOptions } from '../../../layout/loading/intersection.model';

@Component({
  selector: 'cx-page-slot',
  templateUrl: './page-slot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSlotComponent implements OnInit, OnDestroy {
  @HostBinding('class') @Input() position: string;
  @HostBinding('class.cx-pending') isPending = true;
  @HostBinding('class.has-components') hasComponents = false;
  @HostBinding('class.page-fold') @Input() isPageFold = false;

  private pendingComponentCount: number;

  // observable with components (`ContentSlotComponentData[]`) for the current slot
  components$ = new BehaviorSubject<ContentSlotComponentData[]>([]);

  private subscription = new Subscription();

  constructor(
    cmsService: CmsService,
    dynamicAttributeService: DynamicAttributeService,
    renderer: Renderer2,
    hostElement: ElementRef,
    // tslint:disable-next-line:unified-signatures
    config: CmsConfig
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
    // We need to explicitly subscribe in the controller, as otherwise
    // there's a potential `ExpressionChangedAfterItHasBeenCheckedError`.
    // This does not only happen in tests, but could also happen when the page-slot
    // is rendered without any delay.
    this.subscription.add(
      this.cmsService
        .getContentSlot(this.position)
        .pipe(
          tap(slot => this.addSmartEditSlotClass(slot)),
          map(slot => (slot && slot.components ? slot.components : [])),
          distinctUntilChanged(
            (a, b) =>
              a.length === b.length &&
              !a.find((el, index) => el.uid !== b[index].uid)
          ),
          tap(components => {
            this.hasComponents = components && components.length > 0;
            this.pendingComponentCount = components ? components.length : 0;
            this.isPending = this.pendingComponentCount > 0;
          })
        )
        .subscribe(c => this.components$.next(c))
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
