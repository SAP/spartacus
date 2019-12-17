import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentSlotComponentData, Page } from '@spartacus/core';

export const PAGE_SLOT_HANDLER = new InjectionToken<PageSlotHandler[]>(
  'PageSlotHandler'
);

export interface PageSlotHandler {
  handle(
    page$: Observable<Page>,
    components: Observable<ContentSlotComponentData[]>
  ): Observable<ContentSlotComponentData[]>;
}
