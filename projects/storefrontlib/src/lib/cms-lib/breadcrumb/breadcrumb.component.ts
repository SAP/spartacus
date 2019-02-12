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

  get title$(): Observable<string> {
    return this.cms.getCurrentPage().pipe(
      filter(Boolean),
      map((page: Page) => page.title)
    );
  }
}
