import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { SharedCarouselService } from '../shared-carousel.service';
import { ProductCarouselService } from './product-carousel.component.service';

@Component({
  selector: 'cx-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCarouselComponent implements OnInit {
  private window: Window;

  constructor(
    winRef: WindowRef,
    private el: ElementRef,
    public productCarouselService: ProductCarouselService,
    public sharedCarouselService: SharedCarouselService
  ) {
    this.window = winRef.nativeWindow;
  }

  ngOnInit() {
    this.productCarouselService.setTitle();
    this.sharedCarouselService.setItemSize(this.window, this.el.nativeElement);
    this.productCarouselService.setItems();
    this.sharedCarouselService.setItemAsActive(0);
  }
}
