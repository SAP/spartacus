import { ActivatedRouteSnapshot, Data, Route } from '@angular/router';
import { PageContext } from './page-context.model';

export interface CmsRouteData extends Data {
  cxCmsRouteContext?: PageContext;
  pageLabel?: string;
}

export interface CmsRoute extends Route {
  data?: CmsRouteData;
}

export interface CmsActivatedRouteSnapshot extends ActivatedRouteSnapshot {
  data: CmsRouteData;
}
