import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ProductReference, WindowRef } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { SharedCarouselService } from '../shared-carousel.service';
import { ProductReferencesService } from './product-references.component.service';

@Component({
  selector: 'cx-product-references',
  templateUrl: './product-references.component.html',
  styleUrls: ['./product-references.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductReferencesComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  private window: Window;

  references$: Observable<ProductReference[]>;

  constructor(
    winRef: WindowRef,
    private el: ElementRef,
    public productReferencesService: ProductReferencesService,
    public sharedCarouselService: SharedCarouselService
  ) {
    this.window = winRef.nativeWindow;
  }

  ngOnInit() {
    this.productReferencesService.setTitle();
    this.sharedCarouselService.setItemSize(this.window, this.el.nativeElement);
    this.productReferencesService.setReferenceList();
    this.sharedCarouselService.setItemAsActive(0);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
