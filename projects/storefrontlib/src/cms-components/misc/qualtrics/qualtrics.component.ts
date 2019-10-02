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
      console.log('this.winref.native', this.winRef.nativeWindow);

      console.log('QSI', this.winRef.nativeWindow['QSI']);

      console.log('API', this.winRef.nativeWindow['QSI'].API);
      this.winRef.nativeWindow['QSI'].API.unload();
      this.winRef.nativeWindow['QSI'].API.load().done(
        this.winRef.nativeWindow['QSI'].API.run()
      );
    }
  }
}
