import { Component, Input } from '@angular/core';
import { AbstractProductComponent } from '../abstract-product-component';

@Component({
    selector: 'y-star-rating',
    templateUrl: './star-rating.component.html',
    styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent extends AbstractProductComponent {
    @Input() rating;


    getStar(index) {
        let icon;
        if (index <= this.rating) {
            icon = 'star';
        } else if (index < (this.rating + 0.5)) {
            icon = 'star_half';
        } else {
            icon = 'star_outline';
        }
        return icon;
    }
}
