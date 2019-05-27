import { Component, OnInit } from '@angular/core';
import { Product } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CurrentProductService } from '../current-product.service';

const WAITING_CLASS = 'is-waiting';

@Component({
  selector: 'cx-product-images',
  templateUrl: './product-images.component.html',
})
export class ProductImagesComponent implements OnInit {
  imageContainer$ = new BehaviorSubject(null);

  waiting: HTMLElement;

  product$: Observable<Product>;

  constructor(private currentProductService: CurrentProductService) {}

  ngOnInit(): void {
    this.product$ = this.currentProductService.getProduct().pipe(
      filter(Boolean),
      tap(p => {
        if (!this.imageContainer$.value && p.images) {
          this.imageContainer$.next(p.images.PRIMARY);
        }
      })
    );
  }

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
