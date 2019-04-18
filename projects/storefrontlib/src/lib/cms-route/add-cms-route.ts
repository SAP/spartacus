import { Injector } from '@angular/core';
import { Router, Route } from '@angular/router';
import { CmsPageGuard } from '../cms/guards/cms-page.guard';
import { PageLayoutComponent } from '../cms/page-layout/page-layout.component';

const cmsRoute: Route = {
  path: '**',
  canActivate: [CmsPageGuard],
  component: PageLayoutComponent,
};

export function addCmsRoute(injector: Injector) {
  const result = () => {
    const router = injector.get(Router);
    router.config.push(cmsRoute);
  };
  return result;
}
