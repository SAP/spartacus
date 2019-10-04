import { Injectable } from '@angular/core';
import { WindowRef } from '../../window';
import { QualtricsConfig } from '../config/qualtrics-config';

@Injectable({
  providedIn: 'root',
})
export class QualtricsConfigService {
  qualtrics = this.winRef.nativeWindow['QSI'];

  constructor(private winRef: WindowRef, private config: QualtricsConfig) {
    if (this.qualtrics && !this.config.qualtrics.multi) {
      this.reloadCreative();
    }
  }

  trigger() {
    if (this.qualtrics && this.config.qualtrics.active) {
      if (this.config.qualtrics.multi) {
        this.qualtrics.API.unload();
        this.evaluateSurveyOnce();
      } else {
        this.evaluateSurveyOnce();
      }
    }
  }

  private reloadCreative() {
    this.qualtrics.API.unload();
  }

  private evaluateSurveyOnce() {
    this.qualtrics.API.load().done(this.qualtrics.API.run());
  }
}
