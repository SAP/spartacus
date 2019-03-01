import { NgModule } from '@angular/core';

import { GuestLoginComponent } from './guest-login.component';
import { ConfigModule, CmsConfig } from '@spartacus/core';

@NgModule({
  imports: [
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        GuestCheckoutLoginComponent: {
          selector: 'cx-guest-login'
        }
      }
    })
  ],
  declarations: [GuestLoginComponent],
  exports: [GuestLoginComponent],
  entryComponents: [GuestLoginComponent]
})
export class GuestLoginModule {}
