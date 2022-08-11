import { NgModule } from '@angular/core';
import { CdcComponentsModule } from '@spartacus/cdc/components';
import { CdcCoreModule } from '@spartacus/cdc/core';

@NgModule({
  imports: [CdcComponentsModule, CdcCoreModule],
})
export class CdcModule {}
