import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RootDomService {
  private rootReady$ = new ReplaySubject<HTMLElement>(1);

  setRootElement(el: HTMLElement): void {
    this.rootReady$.next(el);
  }

  getRootElement(): Observable<HTMLElement> {
    return this.rootReady$.asObservable();
  }
}
