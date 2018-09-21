import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InnerTemplateDirective } from './template.directive';
import { OverrideTemplateDirective } from './override-template.directive';
@NgModule({
  imports: [CommonModule],
  declarations: [InnerTemplateDirective, OverrideTemplateDirective],
  exports: [InnerTemplateDirective, OverrideTemplateDirective]
})
export class CustomTemplatesModule {}
