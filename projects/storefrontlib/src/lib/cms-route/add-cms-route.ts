import { Injector } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PageLayoutComponent } from '../../cms-structure/page/index';
import { CmsPageGuard } from '../cms/guards/cms-page.guard';

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
