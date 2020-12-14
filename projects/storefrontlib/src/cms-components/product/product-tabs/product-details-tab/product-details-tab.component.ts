import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Product } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { CurrentProductService } from '../../current-product.service';

@Component({
  selector: 'cx-product-details-tab',
  templateUrl: './product-details-tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsTabComponent implements OnInit, OnDestroy {
  product$: Observable<Product>;
  subscription: Subscription;
  showMore = false;
  previewLimit = 400;
  description: string;
  currentDescription = '';

  constructor(protected currentProductService: CurrentProductService) {}

  ngOnInit() {
    this.product$ = this.currentProductService.getProduct();
    this.subscription = this.product$.subscribe((p) => {
      this.description = p.description;
      this.currentDescription = p.description.substr(0, this.previewLimit);
    });
  }

  toggle() {
    this.showMore = !this.showMore;
    this.getDescription();
  }

  getDescription() {
    if (!this.showMore) {
      this.currentDescription = this.description.substr(0, 400);
    } else {
      this.currentDescription = this.description;
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
