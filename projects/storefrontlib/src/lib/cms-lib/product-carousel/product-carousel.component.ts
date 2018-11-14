import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { Observable, Subscription, Subject, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import { CmsService } from '../../cms/facade/cms.service';
import { NgbSlideEvent } from '@ng-bootstrap/ng-bootstrap/carousel/carousel';
import { ProductService } from '@spartacus/core';

@Component({
  selector: 'cx-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCarouselComponent extends AbstractCmsComponent
  implements OnDestroy, OnInit {
  productGroups: any[];
  itemPerPage;

  products = {};
  private finishSubject = new Subject();

  resizeSubscription: Subscription;
  codesSubscription: Subscription;

  @ViewChild('carousel')
  carousel: any;
  @Input()
  productCodes: Array<String>;

  constructor(
    protected cmsService: CmsService,
    protected cd: ChangeDetectorRef,
    private productService: ProductService
  ) {
    super(cmsService, cd);
  }

  ngOnInit() {
    this.setItemsPerPage();
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(300))
      .subscribe(this.setItemsPerPage.bind(this));
  }

  prev() {
    this.carousel.prev();
  }

  next() {
    this.carousel.next();
  }

  slideTransitionCompleted(_event: NgbSlideEvent) {}

  protected fetchData() {
    const codes = this.getProductCodes();
    codes.forEach(code => {
      this.products[code] = this.productService.get(code);
      this.productService.isProductLoaded(code).subscribe();
    });
    this.group(codes);
    super.fetchData();
  }

  private group(products) {
    const groups = [];
    products.forEach(product => {
      const lastGroup = groups[groups.length - 1];
      if (lastGroup && lastGroup.length < this.itemPerPage) {
        lastGroup.push(product);
      } else {
        groups.push([product]);
      }
    });
    this.productGroups = groups;
  }

  private setItemsPerPage() {
    const smallScreenMaxWidth = 576;
    const tabletScreenMaxWidth = 768;
    const { innerWidth } = window;
    if (innerWidth < smallScreenMaxWidth) {
      this.itemPerPage = 1;
    } else if (
      innerWidth > smallScreenMaxWidth &&
      innerWidth < tabletScreenMaxWidth
    ) {
      this.itemPerPage = 2;
    } else {
      this.itemPerPage = 4;
    }
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

  ngOnDestroy() {
    if (this.codesSubscription) {
      this.codesSubscription.unsubscribe();
    }
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
    this.finishSubject.next();
    this.finishSubject.complete();

    super.ngOnDestroy();
  }
}
