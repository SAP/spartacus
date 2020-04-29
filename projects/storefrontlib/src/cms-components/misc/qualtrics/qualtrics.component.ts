import { Component, OnInit } from '@angular/core';
import { QualtricsLoaderService } from './qualtrics-loader.service';

@Component({
  selector: 'cx-qualtrics',
  template: ``,
})
export class QualtricsComponent implements OnInit {
  constructor(protected qualtricsLoader: QualtricsLoaderService) {}

  ngOnInit() {
    this.qualtricsLoader.addScript();
  }
}
