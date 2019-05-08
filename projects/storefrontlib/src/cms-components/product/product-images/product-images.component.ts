import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CurrentProductService } from '../current-product.service';
import { ProductDetailOutlets } from '../product-outlets.model';

const WAITING_CLASS = 'waiting';

@Component({
  selector: 'cx-product-images',
  templateUrl: './product-images.component.html',
})
export class ProductImagesComponent {
  outlets = ProductDetailOutlets;

  imageContainer$ = new BehaviorSubject(null);

  waiting: HTMLElement;

  product$ = this.currentProductService.getProduct().pipe(
    filter(Boolean),
    tap(p => this.imageContainer$.next(p.images.PRIMARY))
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
          container.zoom && container.zoom.url === currentContainer.zoom.url
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
