import { Directive, Input, TemplateRef } from '@angular/core';
import { FeatureTemplate } from './custom-templates.model';
import { CustomTemplateService } from './custom-template.service';

@Directive({
  selector: '[yOverrideTemplate]'
})
export class OverrideTemplateDirective {
  @Input() yOverrideTemplate: string;

  constructor(
    private tpl: TemplateRef<any>,
    private templateService: CustomTemplateService
  ) {}

  ngOnInit() {
    const feature: FeatureTemplate = {
      feature: this.yOverrideTemplate,
      template: this.tpl
    };
    this.templateService.template = feature;
  }
}
