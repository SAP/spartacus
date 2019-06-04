import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const PAGE_LAYOUT_HANDLER = new InjectionToken<PageLayoutHandler[]>(
  'PageLayoutHandler'
);

export interface PageLayoutHandler {
  handle(
    slots: Observable<string[]>,
    pageTemplate?: string,
    section?: string,
    breakpoint?: string
  ): Observable<string[]>;
}
