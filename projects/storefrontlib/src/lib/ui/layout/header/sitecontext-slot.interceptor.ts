import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CURRENCY_CONTEXT_ID, LANGUAGE_CONTEXT_ID } from '@spartacus/core';

@Injectable()
export class HardcodedSiteContext implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse && this.shouldBeIntercepted(event)) {
          event = event.clone({ body: this.resolveReferences(event.body) });
        }
        return event;
      })
    );
  }

  private shouldBeIntercepted(event: HttpResponse<any>): boolean {
    return event.url.indexOf('/cms/pages') > -1;
  }

  private resolveReferences(body: any) {
    if (body.contentSlots && body.contentSlots.contentSlot) {
      body.contentSlots.contentSlot.push({
        position: 'SiteContext',
        slotShared: false,
        components: {
          component: [
            {
              uid: 'LanguageComponent',
              typeCode: 'SiteContextSelectorComponent',
              context: LANGUAGE_CONTEXT_ID
            },
            {
              uid: 'CurrencyComponent',
              typeCode: 'SiteContextSelectorComponent',
              context: CURRENCY_CONTEXT_ID
            }
          ]
        }
      });
    }
    return body;
  }
}
