import {
  ComponentFactory,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { DeferLoadingStrategy } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { IntersectionOptions } from '../../layout/intersection/intersection.model';
import { IntersectionService } from '../../layout/intersection/intersection.service';
import { OutletPosition, USE_STACKED_OUTLETS } from './outlet.model';
import { OutletService } from './outlet.service';

const PENDING_SLOT_CLASS = 'cx-pending';

@Directive({
  selector: '[cxOutlet]',
})
export class OutletDirective implements OnInit, OnDestroy {
  /**
   * keeps track of the number of pending elements for a host element
   * this is required since only if the last slot component is rendered,
   * can safely drop the pending class.
   */
  private pendingElementCount = new Map<HTMLElement, number>();

  private subscription: Subscription = new Subscription();

  @Input() cxOutlet: string;

  private _context: any;
  @Input()
  set cxOutletContext(value: any) {
    this._context = value;
  }

  /**
   * Defers loading options for the the templates of this outlet.
   */
  @Input() cxOutletDefer: IntersectionOptions = {};

  constructor(
    vcr: ViewContainerRef,
    templateRef: TemplateRef<any>,
    outletService: OutletService<TemplateRef<any> | ComponentFactory<any>>,
    // tslint:disable-next-line: unified-signatures
    intersectionService: IntersectionService
  );
  /**
   * @deprecated since version 1.4
   * Use constructor(vcr: ViewContainerRef, templateRef: TemplateRef<any>, outletService: OutletService<TemplateRef<any> | ComponentFactory<any>>, intersectionService?: IntersectionService) instead
   */
  constructor(
    vcr: ViewContainerRef,
    templateRef: TemplateRef<any>,
    outletService: OutletService<TemplateRef<any> | ComponentFactory<any>>
  );
  constructor(
    private vcr: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private outletService: OutletService<
      TemplateRef<any> | ComponentFactory<any>
    >,
    private intersectionService?: IntersectionService
  ) {}

  ngOnInit(): void {
    this.renderInstantly() ? this.render() : this.deferRender();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private renderInstantly(): boolean {
    return (
      !this.intersectionService ||
      (this.cxOutletDefer.deferLoading &&
        this.cxOutletDefer.deferLoading === DeferLoadingStrategy.INSTANT)
    );
  }

  private deferRender() {
    const hostElement = this.getHostElement(this.vcr.element.nativeElement);
    this.addPendingStyle(hostElement);

    // we need to wait a tick to take advantage of the ghost layout
    setTimeout(() => {}, 0);
    this.subscription.add(
      this.intersectionService
        .isIntersected(hostElement, this.cxOutletDefer)
        .subscribe(() => {
          this.render();
          this.removePendingStyle(hostElement);
        })
    );
  }

  private render() {
    this.renderOutlet(OutletPosition.BEFORE);
    this.renderOutlet(OutletPosition.REPLACE);
    this.renderOutlet(OutletPosition.AFTER);
  }

  private renderOutlet(position: OutletPosition): void {
    let templates: any[] = <any[]>(
      this.outletService.get(this.cxOutlet, position, USE_STACKED_OUTLETS)
    );

    if (!templates && position === OutletPosition.REPLACE) {
      templates = [this.templateRef];
    }

    // Just in case someone extended the `OutletService` and
    // returns a singular object.
    if (!Array.isArray(templates)) {
      templates = [templates];
    }

    templates.forEach(obj => {
      this.create(obj);
    });
  }

  private create(tmplOrFactory: any): void {
    if (tmplOrFactory instanceof ComponentFactory) {
      this.vcr.createComponent(tmplOrFactory);
    } else if (tmplOrFactory instanceof TemplateRef) {
      const view = this.vcr.createEmbeddedView(
        <TemplateRef<any>>tmplOrFactory,
        {
          $implicit: this._context,
        }
      );

      // we do not know if content is created dynamically or not
      // so we apply change detection anyway
      view.markForCheck();
    }
  }

  /**
   * Returns the closest `HtmlElement`, by iterating over the
   * parent elements of the given element.
   *
   * @param element
   */
  private getHostElement(element: Element): HTMLElement {
    if (element instanceof HTMLElement) {
      return element;
    }
    return this.getHostElement(element.parentElement);
  }

  /**
   * Add a pending css class to the host element to ensure that
   * the inital size of the parent (slot) DOM node will take enough
   * vertical space to defer loading of components. If the slot node would
   * not have an initial height, all components would be in the inital viewport
   * which would destroy the concept of deferred loading.
   */
  private addPendingStyle(hostElement: HTMLElement): void {
    if (!this.pendingElementCount.get(hostElement)) {
      this.pendingElementCount.set(hostElement, 0);
    }

    this.pendingElementCount.set(
      hostElement,
      this.pendingElementCount.get(hostElement) + 1
    );
    hostElement.classList.add(PENDING_SLOT_CLASS);
  }

  /**
   * Removes the pending style class when there are no pending elements for the given
   * host element.
   */
  private removePendingStyle(hostElement: HTMLElement): void {
    this.pendingElementCount.set(
      hostElement,
      this.pendingElementCount.get(hostElement) - 1
    );

    if (this.pendingElementCount.get(hostElement) === 0) {
      hostElement.classList.remove(PENDING_SLOT_CLASS);
    }
  }
}
