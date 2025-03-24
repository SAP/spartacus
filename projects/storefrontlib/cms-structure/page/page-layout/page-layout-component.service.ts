import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PageLayoutComponentService {
  shouldRenderSync(
    _layoutName$: Observable<string>,
    _templateName$: Observable<string>,
    _section$: Observable<string | undefined>
  ): Observable<boolean> {
    return of(true);
  }
}
