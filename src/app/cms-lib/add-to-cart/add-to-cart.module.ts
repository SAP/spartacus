import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToCartComponent } from './add-to-cart.component';
import { MaterialModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule.forRoot(),
    ],
    declarations: [AddToCartComponent],
    entryComponents: [AddToCartComponent],
    exports: [AddToCartComponent]
})
export class AddToCartModule { }
