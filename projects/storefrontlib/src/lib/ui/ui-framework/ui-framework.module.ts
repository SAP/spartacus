import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule
    ],
    declarations: [],
    exports: [MaterialModule]
})
export class UiFrameworkModule { }
