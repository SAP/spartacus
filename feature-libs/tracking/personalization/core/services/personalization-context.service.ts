import { Injectable, isDevMode } from '@angular/core';
import { CmsService, ContentSlotComponentData, Page } from '@spartacus/core';
import { PersonalizationConfig } from '@spartacus/tracking/personalization/root';
import { EMPTY, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PersonalizationContext } from '../model/personalization-context.model';

@Injectable({
  providedIn: 'root',
})
export class PersonalizationContextService {
  constructor(
    protected config: PersonalizationConfig,
    protected cmsService: CmsService
  ) {}

  getPersonalizationContext(): Observable<PersonalizationContext | undefined> {
    if (!this.config.personalization?.context) {
      if (isDevMode()) {
        console.warn(`There is no context configured in Personalization.`);
      }
      return EMPTY;
    } else {
      const context = this.config.personalization.context;
      return this.cmsService.getCurrentPage().pipe(
        filter<Page>(Boolean),
        map((page: Page) => page.slots?.[context.slotPosition]),
        filter<any>(Boolean),
        map((slot) => {
          const scriptComponent = slot.components?.find(
            (i: ContentSlotComponentData) => i.uid === context.componentId
          );
          return this.buildPersonalizationContext(
            scriptComponent?.properties?.script?.data
          );
        })
      );
    }
  }

  private buildPersonalizationContext(
    data: string
  ): PersonalizationContext | undefined {
    if (data) {
      const context = JSON.parse(atob(data));
      context.actions.forEach((action: any) => {
        Object.keys(action).forEach((key) => {
          action[key] = atob(action[key]);
        });
      });
      for (let i = 0; i < context.segments.length; i++) {
        context.segments[i] = atob(context.segments[i]);
      }
      return context;
    }
  }
}
