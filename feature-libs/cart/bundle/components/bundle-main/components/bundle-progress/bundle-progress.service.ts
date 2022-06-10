import { Injectable } from '@angular/core';
import { isNotUndefined } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';

export interface Step {
  key: string | number;
  label: string;
  index: number;
}

export const PREVIEW_STEP = {
  key: 'preview',
  label: 'Preview',
};

@Injectable()
export class BundleProgressService {
  steps: Step[];
  activeStep$ = new BehaviorSubject<Step | null>(null);
  activeStep: Step;
  isFirstStep = true;
  isLastStep = false;

  init(steps: Omit<Step, 'index'>[], startStepIndex?: number): void {
    this.steps = steps.map((step, index) => ({ ...step, index }));
    this.activeStep = this.steps[startStepIndex ?? 0];
    this.activeStep$.next(this.activeStep);
    this.checkStep();
  }

  onNext(): void {
    this.activeStep = this.steps[this.activeStep.index + 1];
    this.activeStep$.next(this.activeStep);
    this.checkStep();
  }

  onPrev(): void {
    this.activeStep = this.steps[this.activeStep.index - 1];
    this.activeStep$.next(this.activeStep);
    this.checkStep();
  }

  goToStep(key: string | number) {
    const index = this.steps.findIndex(
      (step) => step.key.toString() === key.toString()
    );
    if (isNotUndefined(index)) {
      this.activeStep = this.steps[index];
      this.activeStep$.next(this.activeStep);
      this.checkStep();
    }
  }

  checkStep(): void {
    switch (this.activeStep.index) {
      case 0:
        this.isFirstStep = true;
        this.isLastStep = false;
        break;
      case this.steps.length - 1:
        this.isFirstStep = false;
        this.isLastStep = true;
        break;
      default:
        this.isFirstStep = false;
        this.isLastStep = false;
        break;
    }
  }
}
