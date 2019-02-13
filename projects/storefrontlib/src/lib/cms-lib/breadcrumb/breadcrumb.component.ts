import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { CmsBreadcrumbsComponent, CmsService, Page } from '@spartacus/core';
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
    return this.pageType$.pipe(
      map(t => (t === 'ContentPage' ? [{ label: 'home', link: '/' }] : ['']))
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
