import { Component, OnInit } from '@angular/core';
import { QualtricsService } from './qualtrics.service';

@Component({
  selector: 'cx-qualtrics',
  template: '',
})
export class QualtricsComponent implements OnInit {
  constructor(private qualtricsService: QualtricsService) {}

  ngOnInit() {
    this.qualtricsService.trigger();
  }
}
