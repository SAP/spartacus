import {
  ComponentFactory,
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { OutletPosition } from './outlet.model';
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
    private outletService: OutletService
  ) {}

  ngOnInit(): void {
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
    }
  }
}
