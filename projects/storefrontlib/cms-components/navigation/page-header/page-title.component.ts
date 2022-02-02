import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CmsPageTitleComponent,
  isNotNullable,
  PageMetaService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

@Component({
  selector: 'cx-page-title',
  templateUrl: './page-title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTitleComponent implements OnInit {
  title$: Observable<string>;

  constructor(
    public component: CmsComponentData<CmsPageTitleComponent>,
    protected pageMetaService: PageMetaService
  ) {}

  ngOnInit(): void {
    this.setTitle();
  }

  private setTitle(): void {
    this.title$ = this.pageMetaService.getMeta().pipe(
      filter(isNotNullable),
      map((meta) => (meta.heading || meta.title) ?? '')
    );
  }
}
