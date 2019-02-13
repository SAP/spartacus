import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CmsBreadcrumbsComponent,
  CmsService,
  Page,
  PageType
} from '@spartacus/core';
import { CmsComponentData } from './../../cms/components/cms-component-data';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'cx-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent {
  constructor(
    public component: CmsComponentData<CmsBreadcrumbsComponent>,
    private cms: CmsService
  ) {}

  get crumbs$(): Observable<any[]> {
    // initial version for the breadcrumb
    // this must be done in a different way so that
    // other pages can contribute to the stream of crumbs
    return this.pageType$.pipe(
      map(type =>
        type === PageType.CONTENT_PAGE ? [{ label: 'Home', link: '/' }] : ['']
      )
    );
  }

  get title$(): Observable<string> {
    return this.page$.pipe(map((page: Page) => page.title));
  }

  protected get pageType$(): Observable<string> {
    return this.page$.pipe(
      filter(Boolean),
      map((p: Page) => p.type)
    );
  }

  protected get page$() {
    return this.cms.getCurrentPage().pipe(filter(Boolean));
  }
}
