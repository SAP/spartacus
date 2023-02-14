import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdpMyAccountComponent } from "./CdpMyAccountComponent";
import { BreadcrumbModule } from "../../../../../projects/storefrontlib/cms-components/navigation/breadcrumb/breadcrumb.module";
import { PageSlotModule } from '@spartacus/storefront';




@NgModule({
    declarations: [
        CdpMyAccountComponent
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        PageSlotModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CdpMyAccountModule { }
