import { Component } from '@angular/core';
import { QualtricsConfig, QualtricsLoaderService } from '@spartacus/storefront';

@Component({
  selector: 'cx-qualtrics-embedded-feedback',
  template: '',
})
export class QualtricsEmbeddedFeedbackComponent {
  constructor(
    protected qualtricsLoader: QualtricsLoaderService,
    protected config: QualtricsConfig
  ) {}
}
