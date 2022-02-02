import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CmsPageTitleComponent,
  isNotNullable,
  PageMetaService,
  TranslationService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
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
    protected translation: TranslationService,
    public component: CmsComponentData<CmsPageTitleComponent>,
    protected pageMetaService: PageMetaService
  ) {}

  ngOnInit(): void {
    this.setTitle();
  }

  private setTitle(): void {
    this.title$ = combineLatest([
      this.translation.translate('pageMetaResolver.checkout.title'),
      this.pageMetaService.getMeta().pipe(
        filter(isNotNullable),
        map((meta) => (meta.heading || meta.title) ?? '')
      ),
    ]).pipe(
      map(([checkout, title]) => (title.includes(checkout) ? checkout : title))
    );
  }
}
