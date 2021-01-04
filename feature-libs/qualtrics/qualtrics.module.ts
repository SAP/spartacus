import { NgModule } from '@angular/core';
import { QualtricsComponentsModule } from './components/qualtrics-components.module';

@NgModule({
  imports: [QualtricsComponentsModule],
})
export class QualtricsModulesss {
  constructor() {
    console.log('qualtrics module');
  }
}
