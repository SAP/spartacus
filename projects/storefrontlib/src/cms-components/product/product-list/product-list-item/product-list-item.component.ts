import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { CurrentProductService } from '../../current-product.service';
import { LocalCurrentProductService } from '../../local-current-product.service';
import { ProductListOutlets } from '../../product-outlets.model';

@Component({
  selector: 'cx-product-list-item',
  templateUrl: './product-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: CurrentProductService, useClass: LocalCurrentProductService },
  ],
})
export class ProductListItemComponent implements OnChanges {
  readonly Outlets = ProductListOutlets;
  @Input() product: any;

  constructor(protected currentProductService: CurrentProductService) {}

  ngOnChanges(): void {
    const localCurrentProductService: LocalCurrentProductService = this
      .currentProductService as LocalCurrentProductService;
    localCurrentProductService.setCode(this.product.code);
  }
}
