import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccPunchoutConfig } from './config/default-occ-punchout-config';

@NgModule({
  imports: [],
  providers: [provideDefaultConfig(defaultOccPunchoutConfig)],
})
export class PunchoutOccModule {}
