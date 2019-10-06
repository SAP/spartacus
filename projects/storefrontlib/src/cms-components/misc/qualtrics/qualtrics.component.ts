import { Component, OnInit } from '@angular/core';
import { QualtricsConfigService } from '@spartacus/core';

@Component({
  selector: 'cx-qualtrics',
  template: '',
})
export class QualtricsComponent implements OnInit {
  constructor(private config: QualtricsConfigService) {}

  ngOnInit() {
    this.config.trigger();
  }
}
