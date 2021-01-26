import { Injectable } from '@angular/core';
import {
  CmsService,
  ContentSlotComponentData,
  ContentSlotData,
  Page,
} from '@spartacus/core';
import { PersonalizationConfig } from '@spartacus/personalization/root';
import { Observable } from 'rxjs';
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

  getPersonalizationContext(): Observable<PersonalizationContext> {
    return this.cmsService.getCurrentPage().pipe(
      filter(Boolean),
      map(
        (page: Page) =>
          page.slots[this.config.personalization.context.slotPosition]
      ),
      filter(Boolean),
      map((slot: ContentSlotData) =>
        slot.components.find(
          (i) => i.uid === this.config.personalization.context.componentId
        )
      ),
      filter(Boolean),
      map((component: ContentSlotComponentData) =>
        this.buildPersonalizationContext(component.properties.script.data)
      )
    );
  }

  private buildPersonalizationContext(data: string): PersonalizationContext {
    const context = JSON.parse(atob(data));
    context.actions.forEach((action) => {
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
