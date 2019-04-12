import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CmsPageGuard } from '../cms/guards/cms-page.guard';
import { PageLayoutComponent } from '../cms/page-layout/page-layout.component';
import { moveWildcardRouteToEnd } from './move-wildcard-route-to-end';

export function moveRouteToEnd(injector: Injector) {
  const result = () => {
    const router = injector.get(Router);
    moveWildcardRouteToEnd(router);
  };
  return result;
}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '**',
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [Injector],
      useFactory: moveRouteToEnd,
    },
  ],
})
export class CmsRouteModule {}
