import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@angular/material';

import { LayoutModule } from './layout/layout.module';
import { TemplatesModule } from './templates/templates.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule.forRoot(),
        LayoutModule,
        TemplatesModule
    ],
    exports: [
        LayoutModule
    ],
    declarations: []
})
export class UiModule { }
