import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MaterialModule.forRoot()
    ],
    declarations: [],
    exports: [MaterialModule]
})
export class UiFrameworkModule { }
