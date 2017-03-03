import { Component } from '@angular/core';
import { AbstractProductComponent } from '../abstract-product-component';

@Component({
    selector: 'y-product-images',
    templateUrl: './product-images.component.html',
    styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent extends AbstractProductComponent {
    images;

    // TODO: improve method name...
    ready() {
        this.model.subscribe((modelData) => {
            if (modelData) {
                console.log(modelData);
                this.images = modelData.images;
            }
        });
    }
}
