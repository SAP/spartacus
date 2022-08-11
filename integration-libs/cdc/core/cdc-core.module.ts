import { NgModule } from '@angular/core';
import { CdcAuthModule } from './auth/cdc-auth.module';
import { facadeProviders } from './auth/facade/facade-providers';

@NgModule({
  imports: [CdcAuthModule],
  providers: [...facadeProviders],
})
export class CdcCoreModule {}
