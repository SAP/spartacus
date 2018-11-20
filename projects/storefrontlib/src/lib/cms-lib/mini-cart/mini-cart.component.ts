import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromCartStore from '../../cart/store';
import * as fromStore from '../../cms/store';
import { CartService } from '../../cart/facade/cart.service';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import { CmsService } from '../../cms/facade/cms.service';

@Component({
  selector: 'cx-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniCartComponent extends AbstractCmsComponent {
  cart$: Observable<any>;
  entries$: Observable<any>;

  showProductCount: number;
  banner: any;

  constructor(
    protected cmsService: CmsService,
    protected cd: ChangeDetectorRef,
    protected store: Store<fromStore.CmsState>,
    protected cartService: CartService
  ) {
    super(cmsService, cd);
  }

  protected fetchData() {
    this.showProductCount = +this.component.shownProductCount;
    this.banner = this.component.lightboxBannerComponent;

    this.cart$ = this.store.pipe(select(fromCartStore.getActiveCart));
    this.entries$ = this.store.pipe(select(fromCartStore.getEntries));

    super.fetchData();
  }
}
