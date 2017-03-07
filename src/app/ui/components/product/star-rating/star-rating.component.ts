import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractProductComponent } from '../abstract-product-component';

@Component({
    selector: 'y-star-rating',
    templateUrl: './star-rating.component.html',
    styleUrls: ['./star-rating.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarRatingComponent extends AbstractProductComponent implements OnInit {
    
}
