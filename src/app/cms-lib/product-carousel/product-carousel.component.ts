import { Component, ViewChild } from '@angular/core';

import { AbstractProductComponent } from '../../cms/abstract-product-component';

@Component({
    selector: 'y-product-carousel',
    templateUrl: './product-carousel.component.html',
    styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent extends AbstractProductComponent {
    products = [];
    pause: boolean;
    
    @ViewChild('productPanel') productPanel: Element;

    protected fetchData() {
        const query = this.model.productCodes.map(o => o).join(' ');
        // TODO: limit data
        this.productLoader.searchProducts(query).subscribe((results) => {
            this.products = results.products;
            this.cd.markForCheck();
        });
    }

    loadNext() {
        console.log('load next');
        console.log(this.productPanel);
    }

    stop() {
        console.log('pause');
        this.pause = true;
    }
    continue() {
        console.log('continue');
        this.pause = false;
    }
}
