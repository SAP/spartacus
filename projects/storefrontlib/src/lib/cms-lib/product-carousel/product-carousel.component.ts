import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import * as fromProductStore from '../../product/store';
import { Store } from '@ngrx/store';
import * as fromStore from '../../cms/store';
import { CmsService } from '../../cms/facade/cms.service';

@Component({
  selector: 'y-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCarouselComponent extends AbstractCmsComponent
  implements OnDestroy {
  products$: Observable<any[]>;
  pause: boolean;
  firstTime = true;
  private finishSubject = new Subject();

  codesSubscription: Subscription;

  @Input()
  productCodes: Array<String>;
  @Input()
  animate = true;

  constructor(
    protected cmsService: CmsService,
    protected cd: ChangeDetectorRef,
    protected store: Store<fromStore.CmsState>
  ) {
    super(cmsService, cd);
  }

  protected fetchData() {
    const codes = this.getProductCodes();

    if (
      this.contextParameters &&
      this.contextParameters.hasOwnProperty('animate')
    ) {
      this.animate = this.contextParameters.animate;
    }

    if (codes && codes.length > 0) {
      this.codesSubscription = this.store
        .select(fromProductStore.getAllProductCodes)
        .pipe(takeUntil(this.finishSubject))
        .subscribe(productCodes => {
          if (this.firstTime || productCodes.length === 0) {
            codes
              .filter(code => productCodes.indexOf(code) === -1)
              .forEach(code => {
                this.store.dispatch(new fromProductStore.LoadProduct(code));
              });
          }
        });

      this.firstTime = false;

      this.products$ = this.store.select(
        fromProductStore.getSelectedProductsFactory(codes)
      );
    }
    super.fetchData();
  }

  getProductCodes(): Array<string> {
    let codes;
    if (this.component && this.component.productCodes) {
      codes = this.component.productCodes.split(' ');
    } else {
      codes = this.productCodes;
    }
    return codes;
  }

  stop() {
    this.pause = true;
  }
  continue() {
    this.pause = false;
  }

  ngOnDestroy() {
    if (this.codesSubscription) {
      this.codesSubscription.unsubscribe();
    }
    this.finishSubject.next();
    this.finishSubject.complete();

    super.ngOnDestroy();
  }
}
