import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonalizationContext } from '../model/personalization-context.model';
import { filter, map } from 'rxjs/operators';
import { PersonalizationConfig } from '../config/personalization-config';
import { CmsService } from '../../cms/facade/cms.service';

@Injectable({
  providedIn: 'root',
})
export class PersonalizationContextService {
  constructor(
    private config: PersonalizationConfig,
    private cmsService: CmsService
  ) {}

  getPersonalizationContext(): Observable<PersonalizationContext> {
    return this.cmsService.getCurrentPage().pipe(
      filter(page => page !== undefined),
      map(page => page.slots[this.config.personalization.context.slotId]),
      filter(slot => slot !== undefined),
      map(slot =>
        slot.components.find(
          i => i.uid === this.config.personalization.context.componentId
        )
      ),
      filter(component => component !== undefined),
      map(component =>
        this.buildPersonalizationContext(component.properties.script.data)
      )
    );
  }

  private buildPersonalizationContext(data: string): PersonalizationContext {
    const context = JSON.parse(atob(data));
    context.actions.forEach(action => {
      Object.keys(action).forEach(key => {
        action[key] = atob(action[key]);
      });
    });
    for (let i = 0; i < context.segments.length; i++) {
      context.segments[i] = atob(context.segments[i]);
    }
    return context;
  }
}
