import { Component, OnInit } from '@angular/core';
import { QualtricsConfigService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-qualtrics',
  template: `
    <ng-container *ngIf="qualtricsEnabled$ | async"></ng-container>
  `,
})
export class QualtricsComponent implements OnInit {
  qualtricsEnabled$: Observable<boolean>;

  constructor(private config: QualtricsConfigService) {}

  ngOnInit() {
    this.qualtricsEnabled$ = this.config.trigger();
  }
}
