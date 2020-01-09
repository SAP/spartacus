import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {iif, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { PersonalizationContextService } from '../services/personalization-context.service';
import { PersonalizationConfig } from '../config/personalization-config';

@Injectable({ providedIn: 'root' })
export class OccPersonalizationContextInterceptor implements HttpInterceptor {

  constructor(
    private config: PersonalizationConfig,
    private occEndpoints: OccEndpointsService,
    private personalizationContextService: PersonalizationContextService
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return iif(
      () => request.url.includes(this.occEndpoints.getBaseEndpoint()),
      next.handle(request).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            const contentSlot = ((event.body.contentSlots || {}).contentSlot || []).find(i => i.slotId === this.config.personalization.context.slotId);
            if(!!contentSlot) {
              const component = ((contentSlot.components || {}).component || []).find(i => i.uid === this.config.personalization.context.componentId);
              if(!!component) {
                const context = JSON.parse(atob(component.properties.script.data));
                context.actions.forEach(action => {
                  Object.keys(action).forEach(key => {
                    action[key] = atob(action[key]);
                  });
                })
                for (let i = 0; i < context.segments.length; i++) {
                  context.segments[i] = atob(context.segments[i]);
                }
                this.personalizationContextService.setPersonalizationContext(context);
              }
            }
          }
        })
      ),
      next.handle(request)
    );
  }

}
