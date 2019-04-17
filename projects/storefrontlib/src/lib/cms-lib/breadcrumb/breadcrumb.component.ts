import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CmsBreadcrumbsComponent,
  PageMeta,
  PageMetaService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

@Component({
  selector: 'cx-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  constructor(
    public component: CmsComponentData<CmsBreadcrumbsComponent>,
    protected pageMetaService: PageMetaService
  ) {}

  get title$(): Observable<string> {
    return this.pageMetaService.getMeta().pipe(
      filter(Boolean),
      map((meta: PageMeta) => meta.heading || meta.title)
    );
  }

  get crumbs$(): Observable<any[]> {
    // initial version for the breadcrumb
    // this must be done in such a way that
    // other pages can contribute to a stream of crumbs
    return of([{ label: 'Home', link: '/' }]);
  }
}
