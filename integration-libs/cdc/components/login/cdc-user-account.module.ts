import { NgModule } from '@angular/core';
import { UserAccountModule } from '@spartacus/user';
import { CDCLoginFormModule } from './facade/cdc-login-form.module';

@NgModule({
  imports: [
    UserAccountModule,
    CDCLoginFormModule
  ],
})
export class CDCUserAccountModule {}
