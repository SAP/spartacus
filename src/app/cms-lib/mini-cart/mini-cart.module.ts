import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { MiniCartComponent } from './mini-cart.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule.forRoot()
    ],
    declarations: [MiniCartComponent],
    entryComponents: [MiniCartComponent],
    exports: [MiniCartComponent]
})
export class MiniCartModule { }
