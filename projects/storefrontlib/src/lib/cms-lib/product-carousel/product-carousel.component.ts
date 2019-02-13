import { ProductCarouselService } from './product-carousel.service';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ElementRef
} from '@angular/core';

import { Product, WindowRef } from '@spartacus/core';

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
  activeItem = 0;

  private window: Window;

  constructor(
    winRef: WindowRef,
    private el: ElementRef,
    private productCarouselService: ProductCarouselService
  ) {
    this.window = winRef.nativeWindow;
  }

  ngOnInit() {
    this.setItemSize();
    this.setItems();
  }

  protected setItems(): void {
    this.items$ = this.productCarouselService.getItems();
  }

  protected setItemSize(): void {
    this.itemSize$ = this.productCarouselService.getItemSize(
      this.window,
      this.el.nativeElement
    );
  }

  async prev(max) {
    this.activeItem = await this.productCarouselService.setPreviousItemAsActive(
      this.activeItem,
      max
    );
  }

  async next(max) {
    this.activeItem = await this.productCarouselService.setNextItemAsActive(
      this.activeItem,
      max
    );
  }

  async setActiveItem(newActive: number, max: number) {
    this.activeItem = -1;
    await this.productCarouselService.delay(max);
    this.activeItem = newActive;
  }
}
