import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, first, flatMap, map } from 'rxjs/operators';
import { IntersectionOptions } from './intersection.model';

const DEFER_CLASS = 'cx-defer';

/**
 * The IntersectionService uses the native IntersectionObserver (v2), which
 * can be used to implement pre-loading and deferred loading of DOM content.
 *
 */
@Injectable({
  providedIn: 'root',
})
export class IntersectionService {
  // keeps track of ghost elements, in case we like to remove them afterwards
  private ghostElements = new Map<HTMLElement, number>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Returns an Observable that emits only once a boolean value whenever
   * the given element has shown in the view port.
   */
  isIntersected(
    element: HTMLElement,
    options?: IntersectionOptions
  ): Observable<boolean> {
    if (isPlatformServer(this.platformId)) {
      return of(true);
    } else {
      this.addGhost(element);

      // we need to wait a tick to take advantage of the ghost layout
      setTimeout(() => {}, 0);
      return this.intersects(element, options).pipe(first(v => v === true));
    }
  }

  /**
   * Indicates whenever the element has intersected the view port.
   *
   * This is private for now, but could be exposed as a public API
   * to introduce additional (css) render effets to the UI.
   */
  private intersects(
    element: HTMLElement,
    options?: IntersectionOptions
  ): Observable<boolean> {
    const elementVisible$ = new Observable(observer => {
      const intersectOptions = options ? { rootMargin: options.margin } : {};
      const intersectionObserver = new IntersectionObserver(entries => {
        observer.next(entries);
      }, intersectOptions);
      intersectionObserver.observe(element);
      return () => {
        intersectionObserver.disconnect();
      };
    }).pipe(
      flatMap((entries: IntersectionObserverEntry[]) => entries),
      map((entry: IntersectionObserverEntry) => entry.isIntersecting),
      distinctUntilChanged()
    );

    return elementVisible$;
  }

  /**
   * we apply a "ghost" css class to the parent element, to ensure that
   * the inital size of the parent (slot) DOM node will take enought
   * vertical space to defer loading of components. If the slot node would
   * not have an initial height, all components would be in the inital viewport
   * which would destroy the concept of deferal loading.
   */
  private addGhost(element: HTMLElement): void {
    if (!this.ghostElements.get(element)) {
      this.ghostElements.set(element, 0);
    }

    this.ghostElements.set(element, this.ghostElements.get(element) + 1);
    element.classList.add(DEFER_CLASS);
  }

  // private removeGhost(element: HTMLElement): void {
  //   this.ghostElements.set(element, this.ghostElements.get(element) - 1);

  //   if (this.ghostElements.get(element) === 0) {
  //     setTimeout(() => {
  //       element.classList.remove(GHOST_CLASS);
  //     }, 2000);
  //   }
  // }
}
