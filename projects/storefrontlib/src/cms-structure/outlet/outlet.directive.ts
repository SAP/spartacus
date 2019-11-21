import {
  ComponentFactory,
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
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

  constructor(
    private vcr: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private outletService: OutletService<
      TemplateRef<any> | ComponentFactory<any>
    >
  ) {}

  ngOnInit(): void {
<<<<<<< HEAD
    this.renderTemplate(OutletPosition.BEFORE);
    this.renderTemplate(OutletPosition.REPLACE, true);
    this.renderTemplate(OutletPosition.AFTER);
  }

  private renderTemplate(position: OutletPosition, replace = false): void {
    const template = this.outletService.get(this.cxOutlet, position);
    if (template && template instanceof ComponentFactory) {
      this.vcr.createComponent(template);
    } else if ((template && template instanceof TemplateRef) || replace) {
      this.vcr.createEmbeddedView(
        <TemplateRef<any>>template || this.templateRef,
        {
          $implicit: this._context,
        }
      );
=======
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
      this.vcr.createEmbeddedView(<TemplateRef<any>>tmplOrFactory, {
        $implicit: this._context,
      });
>>>>>>> b2e807aa4f4e18d7b83dc1883bee1d7745616fb2
    }
  }
}
