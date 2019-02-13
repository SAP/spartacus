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
export class HardcodedBreadcrumb implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse && this.shouldBeIntercepted(event)) {
          event = event.clone({ body: this.moveBreadcrumb(event.body) });
        }
        return event;
      })
    );
  }

  private shouldBeIntercepted(event: HttpResponse<any>): boolean {
    return event.url.indexOf('/cms/pages') > -1;
  }

  private moveBreadcrumb(body: any) {
    if (body.contentSlots && body.contentSlots.contentSlot) {
      const NavigationBar = body.contentSlots.contentSlot.find(s => {
        return s && s.position === 'NavigationBar';
      });
      if (
        NavigationBar &&
        NavigationBar.components &&
        NavigationBar.components.component.length > 0
      ) {
        const breadcrumbComponentIndex = NavigationBar.components.component.findIndex(
          c => c.typeCode === 'BreadcrumbComponent'
        );

        if (breadcrumbComponentIndex) {
          const copy = JSON.parse(
            JSON.stringify(
              NavigationBar.components.component[breadcrumbComponentIndex]
            )
          );
          NavigationBar.components.component.splice(
            breadcrumbComponentIndex,
            1
          );
          const BottomHeaderSlot = body.contentSlots.contentSlot.find(s => {
            return s && s.position === 'BottomHeaderSlot';
          });

          if (BottomHeaderSlot) {
            if (!BottomHeaderSlot.components.component) {
              BottomHeaderSlot.components.component = [];
            }
            BottomHeaderSlot.components.component.push(copy);
          }
        }
      }
    }
    return body;
  }
}
