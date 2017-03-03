import { Component, OnInit } from '@angular/core';
import { AbstractCmsComponent } from '../../cms/abstract-cms-component';
import { AbstractProductComponent } from '../../cms/abstract-product-component';

@Component({
    selector: 'y-product-carousel',
    templateUrl: './product-carousel.component.html',
    styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent extends AbstractProductComponent {
    products = [];

    protected fetchData() {
        const query = this.model.productCodes.map(o => o).join(' ');
        // TODO: limit data
        this.productLoader.searchProducts(query).subscribe((products) => {
            this.products = products;
            this.cd.markForCheck();
        });
    }
}
