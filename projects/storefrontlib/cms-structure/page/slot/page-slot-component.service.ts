import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PageSlotComponentService {
  shouldRenderSync(
    _position: string,
    _layoutName$: Observable<string>,
    _templateName$: Observable<string>,
    _section$: Observable<string>
  ): Observable<boolean> {
    return of(true);
  }
}
