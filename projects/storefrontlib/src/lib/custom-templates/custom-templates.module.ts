import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateDirective } from './template.directive';
import { OverrideTemplateDirective } from './override-template.directive';
@NgModule({
  imports: [CommonModule],
  declarations: [TemplateDirective, OverrideTemplateDirective],
  exports: [TemplateDirective, OverrideTemplateDirective]
})
export class CustomTemplatesModule {}
