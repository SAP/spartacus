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
    private service: ProductCarouselService
  ) {
    this.window = winRef.nativeWindow;
  }

  ngOnInit() {
    this.setTitle();
    this.setItemSize();
    this.setItems();
  }

  protected setTitle(): void {
    this.title$ = this.service.getTitle();
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

  prev(activeItem: number, max: number) {
    this.activeItem$ = this.service.setPreviousItemAsActive(activeItem, max);
  }

  next(activeItem: number, max: number) {
    this.activeItem$ = this.service.setNextItemAsActive(activeItem, max);
  }

  setActiveItem(newActiveItem: number, max: number) {
    this.activeItem$ = this.service.setActiveItemWithDelay(newActiveItem, max);
  }
}
