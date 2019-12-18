import {
  ComponentFactory,
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IntersectionOptions } from '../../layout/intersection/intersection.model';
import { IntersectionService } from '../../layout/intersection/intersection.service';
import { OutletPosition, USE_STACKED_OUTLETS } from './outlet.model';
import { OutletService } from './outlet.service';

@Directive({
  selector: '[cxOutlet]',
})
export class OutletDirective implements OnInit, OnDestroy {
  @Input() cxOutlet: string;

  @Input() cxOutletContext: any;

  /**
   * Defers loading options for the the templates of this outlet.
   */
  @Input() cxOutletDefer: IntersectionOptions;

  @Output() loaded: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  subscription = new Subscription();

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
    // private deferRenderService?: DeferRenderService,
    private intersectionService?: IntersectionService
  ) {}

  ngOnInit(): void {
    if (this.cxOutletDefer) {
      this.deferLoading();
    } else {
      this.render();
    }
  }

  private deferLoading() {
    this.loaded.emit(false);
    const hostElement = this.getHostElement(this.vcr.element.nativeElement);
    this.subscription.add(
      this.intersectionService
        .isIntersected(hostElement, this.cxOutletDefer)
        .subscribe(() => {
          this.render();
          this.loaded.emit(true);
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
          $implicit: this.cxOutletContext,
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
