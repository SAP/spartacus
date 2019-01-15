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

@Injectable()
export class HardcodedSiteLinks implements HttpInterceptor {
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
        position: 'SiteLinks',
        slotShared: false,
        components: {
          component: [
            {
              uid: 'sale',
              typeCode: 'CMSLinkComponent',
              linkName: 'Sale',
              url: 'sale'
            },
            {
              uid: 'contact',
              typeCode: 'CMSLinkComponent',
              linkName: 'Contact us',
              url: '/contact'
            },
            {
              uid: 'help',
              typeCode: 'CMSLinkComponent',
              linkName: 'Help',
              url: '/help'
            }
          ]
        }
      });
    }
    return body;
  }
}
