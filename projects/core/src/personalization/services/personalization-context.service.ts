import { Injectable, isDevMode } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CmsService } from '../../cms/facade/cms.service';
import { ContentSlotComponentData } from '../../cms/model/content-slot-component-data.model';
import { ContentSlotData } from '../../cms/model/content-slot-data.model';
import { Page } from '../../cms/model/page.model';
import { PersonalizationConfig } from '../config/personalization-config';
import { PersonalizationContext } from '../model/personalization-context.model';

/**
 * @deprecated since 3.2, use @spartacus/tracking/personalization instead
 */
@Injectable({
  providedIn: 'root',
})
export class PersonalizationContextService {
  constructor(
    protected config: PersonalizationConfig,
    protected cmsService: CmsService
  ) {}

  getPersonalizationContext(): Observable<PersonalizationContext> {
    if (!this.config.personalization?.context) {
      if (isDevMode()) {
        console.warn(`There is no context configured in Personalization`);
      }
      return EMPTY;
    }
    return this.cmsService.getCurrentPage().pipe(
      filter(Boolean),
      map(
        (page: Page) =>
          page.slots[this.config.personalization.context.slotPosition]
      ),
      filter(Boolean),
      map((slot: ContentSlotData) =>
        slot.components?.find(
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
