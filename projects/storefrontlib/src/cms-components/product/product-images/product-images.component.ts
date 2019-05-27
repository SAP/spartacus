import { Component } from '@angular/core';
import { Product } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CurrentProductService } from '../current-product.service';

const WAITING_CLASS = 'is-waiting';

@Component({
  selector: 'cx-product-images',
  templateUrl: './product-images.component.html',
})
export class ProductImagesComponent {
  imageContainer$ = new BehaviorSubject(null);

  waiting: HTMLElement;

  product$: Observable<Product> = this.currentProductService
    .getProduct()
    .pipe(
      tap(p =>
        this.imageContainer$.next(p && p.images ? p.images.PRIMARY : null)
      )
    );

  constructor(private currentProductService: CurrentProductService) {}

  showImage(event: MouseEvent, imageContainer): void {
    if (this.imageContainer$.value === imageContainer) {
      return;
    }
    this.startWaiting(<HTMLElement>event.target);
    this.imageContainer$.next(imageContainer);
  }

  isMainImageContainer(currentContainer): Observable<boolean> {
    return this.imageContainer$.pipe(
      map(
        (container: any) =>
          container &&
          container.zoom &&
          currentContainer.zoom &&
          container.zoom.url === currentContainer.zoom.url
      )
    );
  }

  loadHandler(): void {
    this.clearWaitList();
  }

  private startWaiting(el: HTMLElement): void {
    this.clearWaitList();
    el.classList.add(WAITING_CLASS);
    this.waiting = el;
  }

  private clearWaitList(): void {
    if (this.waiting) {
      this.waiting.classList.remove(WAITING_CLASS);
      delete this.waiting;
    }
  }
}
