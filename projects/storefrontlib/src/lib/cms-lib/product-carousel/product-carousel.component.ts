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
  activeItem = 0;

  private window: Window;

  constructor(
    winRef: WindowRef,
    private el: ElementRef,
    private service: ProductCarouselService
  ) {
    this.window = winRef.nativeWindow;
  }

  ngOnInit() {
    this.setItemSize();
    this.setItems();
  }

  protected setItems(): void {
    this.items$ = this.service.getItems();
  }

  protected setItemSize(): void {
    this.itemSize$ = this.service.getItemSize(
      this.window,
      this.el.nativeElement
    );
  }

  prev(max) {
    this.activeItem$ = this.service.setPreviousItemAsActive(
      this.activeItem,
      max
    );
  }

  next(max) {
    this.activeItem$ = this.service.setNextItemAsActive(this.activeItem, max);
  }

  setActiveItem(newActive: number, max: number) {
    this.service.delay(max).subscribe(() => (this.activeItem = newActive));
  }
}
