import { TemplateRef } from '@angular/core';

export interface FeatureTemplate {
  feature: string;
  template: TemplateRef<HTMLElement>;
}
