import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { QualtricsLoaderService } from './qualtrics-loader.service';

@Component({
  selector: 'cx-qualtrics',
  template: `
    <ng-container *ngIf="qualtricsEnabled$ | async"></ng-container>
  `,
})
export class QualtricsComponent {
  qualtricsEnabled$: Observable<boolean> = this.config.load();
  // TODO: rename config to `loader`
  constructor(private config: QualtricsLoaderService) {}
}
