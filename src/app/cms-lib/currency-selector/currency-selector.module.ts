import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencySelectorComponent } from './currency-selector.component';

import { DataModule } from '../../data/data.module';
import { MaterialModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        DataModule,
        MaterialModule.forRoot()
    ],
    declarations: [CurrencySelectorComponent],
    entryComponents: [CurrencySelectorComponent],
    exports: [CurrencySelectorComponent]
})
export class CurrencySelectorModule { }
