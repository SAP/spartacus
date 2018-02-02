import { Component, Input } from '@angular/core';
import { ProductLoaderService } from 'app/data/product-loader.service';

@Component({
  selector: 'y-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.scss']
})
export class ProductSummaryComponent {
  @Input() product: any;
}
