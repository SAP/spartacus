import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
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
export class ProductListItemComponent implements OnInit {
  readonly Outlets = ProductListOutlets;
  @Input() product: any;

  constructor(protected currentProductService: CurrentProductService) {}

  ngOnInit(): void {
    const localCurrentProductService: LocalCurrentProductService = this
      .currentProductService as LocalCurrentProductService;
    localCurrentProductService.setCode(this.product.code);
  }
}
