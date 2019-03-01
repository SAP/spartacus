import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CmsBreadcrumbsComponent } from '@spartacus/core';
import { CmsComponentData } from './../../cms/components/cms-component-data';

import { PageMetaService } from '@spartacus/core';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'cx-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent {
  constructor(
    public component: CmsComponentData<CmsBreadcrumbsComponent>,
    protected pageMetaService: PageMetaService
  ) {}

  get title$(): Observable<string> {
    return this.pageMetaService.getMeta().pipe(
      filter(Boolean),
      map(meta => meta.title)
    );
  }

  get crumbs$(): Observable<any[]> {
    // initial version for the breadcrumb
    // this must be done in such a way that
    // other pages can contribute to a stream of crumbs
    return of([{ label: 'Home', link: '/' }]);
  }
}
