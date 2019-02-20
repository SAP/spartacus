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
import { CMSPage } from '@spartacus/core';

@Injectable()
export class HardcodedCheckoutComponent implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse && this.shouldBeIntercepted(event)) {
          event = event.clone({ body: this.addComponent(event.body) });
        }
        return event;
      })
    );
  }

  private shouldBeIntercepted(event: HttpResponse<any>): boolean {
    return event.url.indexOf('pageLabelOrId=multiStepCheckoutSummaryPage') > -1;
  }

  private addComponent(body: any) {
    if (body.contentSlots && body.contentSlots.contentSlot) {
      (<CMSPage>body).contentSlots.contentSlot.push({
        position: 'BodyContent',
        components: {
          component: [
            {
              uid: 'MultiStepCheckoutComponent',
              typeCode: 'JspIncludeComponent'
            }
          ]
        }
      });
    }

    return body;
  }
}
