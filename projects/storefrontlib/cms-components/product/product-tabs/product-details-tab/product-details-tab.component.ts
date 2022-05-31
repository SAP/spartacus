import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product } from '@spartacus/core';
// import { CmsComponentData } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CurrentProductService } from '../../current-product.service';

@Component({
  selector: 'cx-product-details-tab',
  templateUrl: './product-details-tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsTabComponent implements OnInit {
  product$: Observable<Product | null>;

  constructor(
    protected currentProductService: CurrentProductService
  ) //  protected component: CmsComponentData<CmsComponentWithChildren>,
  //  protected cmsService: CmsService
  {}
  children$: Observable<any[]> = of([]);

  // this.component.data$.pipe(
  //   switchMap((data) =>
  //     combineLatest(
  //       (data?.children ?? '').split(' ').map((component) =>
  //         this.cmsService.getComponentData<any>(component).pipe(
  //           distinctUntilChanged(),
  //           map((child) => {
  //             if (!child) {
  //               return undefined;
  //             }
  //             if (!child.flexType) {
  //               child = {
  //                 ...child,
  //                 flexType: child.typeCode,
  //               };
  //             }

  //             return child;
  //           })
  //         )
  //       )
  //     )
  //   )
  // );

  ngOnInit() {
    this.product$ = this.currentProductService.getProduct();
  }
}
