import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CurrentProductService } from '../current-product.service';

const WAITING_CLASS = 'is-waiting';

@Component({
  selector: 'cx-product-images',
  templateUrl: './product-images.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductImagesComponent {
  waiting: HTMLElement;

  product$: Observable<Product> = this.currentProductService
    .getProduct()
    .pipe(filter(Boolean));

  private _imageContainer$ = new BehaviorSubject(null);

  imageContainer$ = combineLatest(this.product$, this._imageContainer$).pipe(
    map(([product, container]) =>
      container
        ? container
        : product.images && product.images.PRIMARY
        ? product.images.PRIMARY
        : {}
    )
  );

  constructor(private currentProductService: CurrentProductService) {}

  showImage(event: MouseEvent, imageContainer): void {
    this.startWaiting(<HTMLElement>event.target);
    this._imageContainer$.next(imageContainer);
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
