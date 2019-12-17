import { Injectable, Optional, Inject } from '@angular/core';
import {
  CmsService,
  ContentSlotData,
  ContentSlotComponentData,
  Page,
} from '@spartacus/core';
import { PageSlotHandler, PAGE_SLOT_HANDLER } from './page-slot-handler';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Injectable()
export class PageSlotService {
  constructor(
    @Optional()
    @Inject(PAGE_SLOT_HANDLER)
    private pageSlotHandlers: PageSlotHandler[],
    private cmsService: CmsService
  ) {}

  getComponents(
    slot$: Observable<ContentSlotData>
  ): Observable<ContentSlotComponentData[]> {
    const page$: Observable<Page> = this.cmsService
      .getCurrentPage()
      .pipe(filter(page => !!page));

    let components$: Observable<ContentSlotComponentData[]> = slot$.pipe(
      map(slot => (slot && slot.components ? slot.components : []))
    );

    for (const handler of this.pageSlotHandlers) {
      components$ = handler.handle(page$, components$);
    }

    return components$;
  }
}
