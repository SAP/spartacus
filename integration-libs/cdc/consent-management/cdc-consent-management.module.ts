import { NgModule } from "@angular/core";
import { ConsentManagementService } from "@spartacus/storefront";
import { CdcConsentManagementService } from "./cdc-consent-management.service";

@NgModule({
    providers: [    {
        provide: ConsentManagementService,
        useClass: CdcConsentManagementService,
      },]
})
export class CdcConsentManagementModule {}
