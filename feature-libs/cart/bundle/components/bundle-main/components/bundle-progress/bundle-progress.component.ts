import { Component } from '@angular/core';
import { BundleProgressService } from './bundle-progress.service';

import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-bundle-progress',
  templateUrl: './bundle-progress.component.html',
})
export class BundleProgressComponent {
  iconTypes = ICON_TYPE;

  constructor(public bundleProgress: BundleProgressService) {}

  get steps() {
    return this.bundleProgress.steps;
  }

  get activeStep() {
    return this.bundleProgress.activeStep;
  }

  isActive(index: number): boolean {
    return index === this.activeStep.index;
  }

  isCompleted(index: number): boolean {
    return index < this.activeStep.index;
  }

  isFirst(): boolean {
    return this.activeStep.index === 0;
  }

  isLast(): boolean {
    return this.activeStep.index === this.steps.length - 1;
  }

  onNext() {
    this.bundleProgress.onNext();
  }

  onPrev() {
    this.bundleProgress.onPrev();
  }

  goToStep(key: number | string) {
    this.bundleProgress.goToStep(key);
  }
}
