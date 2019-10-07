import { Component } from '@angular/core';
import { QualtricsLoaderService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-qualtrics',
  template: `
    <ng-container *ngIf="qualtricsEnabled$ | async"></ng-container>
  `,
})
export class QualtricsComponent {
  qualtricsEnabled$: Observable<boolean> = this.config.load();

  constructor(private config: QualtricsLoaderService) {}
}
