import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCarouselComponent } from './product-carousel.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [ProductCarouselComponent],
    entryComponents: [ProductCarouselComponent],
    exports: [ProductCarouselComponent]
})
export class ProductCarouselModule { }
