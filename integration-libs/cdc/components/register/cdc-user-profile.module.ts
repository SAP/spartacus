import { NgModule } from '@angular/core';
import { UserProfileModule } from '@spartacus/user';
import { CDCRegisterModule } from './facade/cdc-register.module';

@NgModule({
  imports: [
    UserProfileModule,
    CDCRegisterModule,
  ],
})
export class CDCUserProfileModule {}
