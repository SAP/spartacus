import { Injectable, TemplateRef } from '@angular/core';
import { FeatureTemplate } from './custom-templates.model';

@Injectable({
  providedIn: 'root'
})
export class CustomTemplateService {
  // TODO: could be moved to ngrx store
  features = {};

  constructor() {}

  set template(feature: FeatureTemplate) {
    this.features[feature.feature] = feature.template;
  }

  getFeature(featureType: string): TemplateRef<HTMLElement> {
    return this.features[featureType] ? this.features[featureType] : null;
  }
}
