import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  SimpleChanges
} from '@angular/core';
import { OutletService } from './outlet.service';

@Directive({
  selector: '[outlet]'
})
export class OutletDirective implements OnInit {
  @Input() outlet: string;

  constructor(
    private vcr: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private outletService: OutletService
  ) {}

  ngOnInit() {
    const customTemplate = this.outletService.get(this.outlet);
    if (customTemplate) {
      const ctx = (<any>this.vcr.injector).view.context;
      this.vcr.createEmbeddedView(customTemplate, { $implicit: ctx });
    } else {
      this.vcr.createEmbeddedView(this.templateRef);
    }
  }
}
