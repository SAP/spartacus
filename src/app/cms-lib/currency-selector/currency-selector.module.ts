import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencySelectorComponent } from './currency-selector.component';

import { DataModule } from '../../data/data.module';
import { MaterialModule } from '../../material.module';

@NgModule({
    imports: [
        CommonModule,
        DataModule,
        MaterialModule
    ],
    declarations: [CurrencySelectorComponent],
    entryComponents: [CurrencySelectorComponent],
    exports: [CurrencySelectorComponent]
})
export class CurrencySelectorModule { }
