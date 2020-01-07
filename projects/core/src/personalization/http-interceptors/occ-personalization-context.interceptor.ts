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


const PLACEHOLDER_CONTENT_SLOT_KEY = 'PlaceholderContentSlot';
const PERSONALIZATION_SCRIPT_COMPONENT_KEY = 'PersonalizationScriptComponent';

@Injectable({ providedIn: 'root' })
export class OccPersonalizationContextInterceptor implements HttpInterceptor {

  constructor(
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
            let contentSlot = ((event.body.contentSlots || {}).contentSlot || []).find(i => i.slotId === PLACEHOLDER_CONTENT_SLOT_KEY);
            if(!!contentSlot) {
              let component = ((contentSlot.components || {}).component || []).find(i => i.uid === PERSONALIZATION_SCRIPT_COMPONENT_KEY);
              if(!!component) {
                let context = JSON.parse(atob(component.properties.script.data));
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
