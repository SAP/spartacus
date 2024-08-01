import { NgModule } from "@angular/core";
import { ResetPasswordComponentService } from "@spartacus/user/profile/components";
import { CdcResetPasswordComponentService } from "./cdc-reset-password-component.service";
import { CmsConfig, GlobalMessageService, RoutingService, provideDefaultConfig } from "@spartacus/core";
import { UserPasswordFacade } from "@spartacus/user/profile/root";
import { OccUserProfileAdapter } from "@spartacus/user/profile/occ";
import { OccCdcUserProfileAdapter } from "./occ-cdc-user-profile.adapter";

@NgModule({
    providers:[
    provideDefaultConfig(<CmsConfig>{
        cmsComponents: {
          ResetPasswordComponent: {
            providers: [
              {
                provide: ResetPasswordComponentService,
                useClass: CdcResetPasswordComponentService,
                deps: [UserPasswordFacade, RoutingService, GlobalMessageService],
              },
            ],
          },
        },
      }),
      {
        provide: OccUserProfileAdapter,
        useClass: OccCdcUserProfileAdapter,
      },
]
})
export class CdcResetPasswordModule{}
