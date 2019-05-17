import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { addCmsRoute } from './add-cms-route';

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [Injector],
      useFactory: addCmsRoute,
    },
  ],
})
export class CmsRouteModule {}
