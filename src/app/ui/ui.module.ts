import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LayoutModule } from './layout/layout.module';
import { TemplatesModule } from './templates/templates.module';

@NgModule({
    imports: [
        CommonModule,
        // MaterialModule.forRoot(),

        // FlexLayoutModule,

        LayoutModule,
        TemplatesModule
    ],
    exports: [
        LayoutModule
    ],
    declarations: []
})
export class UiModule { }
