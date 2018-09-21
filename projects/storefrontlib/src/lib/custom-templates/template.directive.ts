import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { CustomTemplateService } from './custom-template.service';

@Directive({
  selector: '[yTemplate]'
})
export class TemplateDirective {
  @Input() yTemplate: string;

  constructor(
    private vcr: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private customTemplateService: CustomTemplateService
  ) {}

  ngOnInit() {
    const customTemplate = this.customTemplateService.getFeature(
      this.yTemplate
    );
    const ctx = (<any>this.vcr.injector).view.context;
    this.vcr.createEmbeddedView(customTemplate || this.templateRef, {
      $implicit: ctx
    });
  }
}
