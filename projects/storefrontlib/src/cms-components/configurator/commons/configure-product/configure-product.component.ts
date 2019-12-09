import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Configurator, Product } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CurrentProductService } from '../../../product/current-product.service';

@Component({
  selector: 'cx-configure-product',
  templateUrl: './configure-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureProductComponent implements OnInit, OnDestroy {
  @Input() productCode: string;
  @Input() configuratorType: string;

  product$: Observable<Product> = this.currentProductService.getProduct();
  subscription: Subscription;
  ownerTypeProduct: Configurator.OwnerType = Configurator.OwnerType.PRODUCT;

  constructor(
    private currentProductService: CurrentProductService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!this.productCode) {
      this.subscription = this.currentProductService
        .getProduct()
        .pipe(filter(Boolean))
        .subscribe((product: Product) => {
          this.productCode = product.code;
          this.configuratorType = product.configuratorType;
          this.changeDetector.markForCheck();
        });
    }
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
