import {
  ComponentFactory,
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  IntersectionOptions,
  IntersectionService,
} from '../../layout/intersection/index';
import { OutletPosition, USE_STACKED_OUTLETS } from './outlet.model';
import { OutletService } from './outlet.service';

@Directive({
  selector: '[cxOutlet]',
})
export class OutletDirective implements OnInit {
  @Input() cxOutlet: string;

  private _context: any;
  @Input()
  set cxOutletContext(value: any) {
    this._context = value;
  }
  /**
   * Defers loading of the templates for this outlet.
   */
  @Input() cxOutletDefer: IntersectionOptions = { deferLoading: false };

  constructor(
    private vcr: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private outletService: OutletService<
      TemplateRef<any> | ComponentFactory<any>
    >,
    // TODO: avoid breacking change
    private intersectionService: IntersectionService
  ) {}

  ngOnInit(): void {
    this.cxOutletDefer.deferLoading ? this.deferRender() : this.render();
  }

  private deferRender() {
    const hostElement = this.getHostElement(this.vcr.element.nativeElement);
    this.intersectionService
      .isIntersected(hostElement, this.cxOutletDefer)
      .subscribe(() => {
        this.render();
      });
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
      // if we've deferred loading of the outlet, we must
      // do change detection manually.
      if (this.cxOutletDefer.deferLoading) {
        view.markForCheck();
      }
    }
  }

  private getHostElement(element: Element): HTMLElement {
    if (element instanceof HTMLElement) {
      return element;
    }
    return this.getHostElement(element.parentElement);
  }
}
