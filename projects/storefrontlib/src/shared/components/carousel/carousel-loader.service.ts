import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CarouselLoaderService {
  constructor() {}

  // prefetchCount = 0;
  prefetchCount$ = new BehaviorSubject(0);

  readonly visible$ = new BehaviorSubject<number[]>([]);

  getNextItem(): number {
    return this.visible$.value[this.visible$.value.length - 1] + 1;
  }

  prefetch(factor = 1) {
    const value = this.visible$.value;
    const next = value[value.length - 1] + 1 + value.length * factor;
    if (next > this.prefetchCount$.value) {
      // this.prefetchCount = next;
      this.prefetchCount$.next(next);
    }
  }

  isVisible(itemNum: number): Observable<boolean> {
    return this.visible$.pipe(
      map((intersectMap) => intersectMap.includes(itemNum))
    );
  }

  /**
   * Maintains an subject with an array of visible item refs (index).
   *
   * The intersected elements are listed in the visible subject.
   * TODO: WHY?
   */
  setVisibility(elementRef: number, isVisible: boolean): void {
    const visible = [...this.visible$.value];
    if (isVisible && !visible.includes(elementRef)) {
      visible.push(elementRef);
    } else if (visible.indexOf(elementRef) > -1) {
      visible.splice(visible.indexOf(elementRef), 1);
    }
    visible.sort((a, b) => (a > b ? 1 : -1));
    if (visible.join() !== this.visible$.value.join()) {
      this.visible$.next(visible);
    }
  }
}
