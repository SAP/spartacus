import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FeatureConfigService } from '../services/feature-config.service';

@Directive({
  selector: '[cxFeature]',
})
export class FeatureDirective {
  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected featureConfig: FeatureConfigService
  ) {}

  private hasView = false;

  @Input() set cxFeature(feature: string) {
    if (this.featureConfig.isEnabled(feature) && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!this.featureConfig.isEnabled(feature) && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
