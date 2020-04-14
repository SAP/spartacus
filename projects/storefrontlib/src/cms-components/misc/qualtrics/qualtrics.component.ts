import { Component } from '@angular/core';
import { QualtricsLoaderService } from './qualtrics-loader.service';

@Component({
  selector: 'cx-qualtrics',
  template: ` <ng-container *ngIf="qualtricsEnabled$ | async"></ng-container> `,
})
export class QualtricsComponent {
  qualtricsEnabled$ = this.qualtricsLoader.load();

  constructor(private qualtricsLoader: QualtricsLoaderService) {}
}
