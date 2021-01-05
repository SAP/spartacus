import { NgModule } from '@angular/core';
import { QualtricsComponentsModule } from '@spartacus/qualtrics/components';

@NgModule({
  imports: [QualtricsComponentsModule],
})
// TODO: remove QualtricsModules name for QualtricsModule when moving qualtics out of storefrontlib
export class QualtricsModules {}
