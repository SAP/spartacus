import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { OccCmsModule } from './occ-cms/occ-cms.module';


@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        OccCmsModule
    ],
    exports: [
        // OccCmsModule
    ],
    declarations: []
})
export class OccModule { }
