import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOppsConfig } from './config';
import { OppsCouponCodesModule, OppsLoginRequiredModule } from './public_api';


@NgModule({
  imports:[OppsCouponCodesModule, OppsLoginRequiredModule],
  providers: [provideDefaultConfig(defaultOppsConfig)],
})
export class OppsRootModule {}
