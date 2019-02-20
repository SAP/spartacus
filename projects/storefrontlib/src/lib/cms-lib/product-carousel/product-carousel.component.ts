import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ElementRef
} from '@angular/core';

import { Product, WindowRef } from '@spartacus/core';
import { ProductCarouselService } from './product-carousel.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCarouselComponent implements OnInit {
  items$: Observable<Observable<Product>[]>;
  itemSize$: Observable<number>;
  activeItem$: Observable<number>;
  title$: Observable<string>;

  private window: Window;

  constructor(
    winRef: WindowRef,
    private el: ElementRef,
    public service: ProductCarouselService
  ) {
    this.window = winRef.nativeWindow;
  }

  ngOnInit() {
    this.setActiveItem(0, 1);
    this.setItemSize();
  }

  protected setItemSize(): void {
    this.itemSize$ = this.service.getItemSize(
      this.window,
      this.el.nativeElement
    );
  }

  setActiveItem(newActiveItem: number, max: number) {
    this.activeItem$ = this.service.getActiveItemWithDelay(newActiveItem, max);
  }
}
