import { Component, OnInit } from '@angular/core';
import { FeatureConfigService, WindowRef } from '@spartacus/core';

@Component({
  selector: 'cx-qualtrics',
  template: '',
})
export class QualtricsComponent implements OnInit {
  constructor(
    private winRef: WindowRef,
    private featureConfigService: FeatureConfigService
  ) {}

  ngOnInit() {
    if (this.featureConfigService.isEnabled('qualtrics')) {
      this.reloadQualtricsCreative();
    }
  }

  protected reloadQualtricsCreative() {
    if (this.winRef.nativeWindow['QSI']) {
      this.winRef.nativeWindow['QSI'].API.unload();
      this.winRef.nativeWindow['QSI'].API.load();
    }
  }
}
