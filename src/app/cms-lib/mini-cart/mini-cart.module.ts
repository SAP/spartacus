import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { MiniCartComponent } from './mini-cart.component';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule.forRoot(),
        FlexLayoutModule
    ],
    declarations: [MiniCartComponent, CartDialogComponent],
    entryComponents: [MiniCartComponent],
    exports: [MiniCartComponent],
    bootstrap: [CartDialogComponent],
})
export class MiniCartModule { }
