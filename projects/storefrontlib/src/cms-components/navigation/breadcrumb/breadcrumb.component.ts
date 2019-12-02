import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CmsBreadcrumbsComponent,
  PageMeta,
  PageMetaService,
  TranslationService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

@Component({
  selector: 'cx-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnInit {
  title$: Observable<string>;
  crumbs$: Observable<any[]>;

  constructor(
    public component: CmsComponentData<CmsBreadcrumbsComponent>,
    protected pageMetaService: PageMetaService,
    private translation: TranslationService
  ) {}

  ngOnInit(): void {
    this.setTitle();
    this.setCrumbs();
  }

  private setTitle(): void {
    this.title$ = this.pageMetaService.getMeta().pipe(
      filter(Boolean),
      map((meta: PageMeta) => meta.heading || meta.title)
    );
  }

  private setCrumbs(): void {
    this.crumbs$ = combineLatest([
      this.pageMetaService.getMeta(),
      this.translation.translate('common.home'),
    ]).pipe(
      map(([meta, textHome]) =>
        meta && meta.breadcrumbs
          ? meta.breadcrumbs
          : [{ label: textHome, link: '/' }]
      )
    );
  }
  // loadAndGetBudgets() {
  //   this.budgetService
  //     .getList({})
  //     .pipe(take(5))
  //     .subscribe(console.log);
  // }
  //
  // loadAndGetBudget(code) {
  //   this.budgetService
  //     .get(code)
  //     .pipe(take(1))
  //     .subscribe(console.log);
  // }
  // createBudget() {
  //   const code = 'r' + Date.now() + Math.floor(Math.random() * 100);
  //   const budget: Budget = {
  //     active: false,
  //     budget: 40000.55,
  //     code: code,
  //     currency: {
  //       active: true,
  //       isocode: 'EUR',
  //       name: 'Euro',
  //       symbol: '€',
  //     },
  //     endDate: '2020-12-31T09:00:00+0000',
  //     name: code,
  //     orgUnit: {
  //       name: 'Rustic',
  //       uid: 'Rustic',
  //     },
  //     startDate: '2020-01-01T09:00:00+0000',
  //   };
  //   this.budgetService.create(budget);
  // }
  //
  // updateBudget() {
  //   const budget: Budget = {
  //     active: false,
  //     budget: 40033.55,
  //     code: 'r157115880455542',
  //     currency: {
  //       active: true,
  //       isocode: 'EUR',
  //       name: 'Euro',
  //       symbol: '€',
  //     },
  //     endDate: '2020-12-31T09:00:00+0000',
  //     name: 'Money money money',
  //     orgUnit: {
  //       name: 'Rustic',
  //       uid: 'Rustic',
  //     },
  //     startDate: '2020-01-01T09:00:00+0000',
  //   };
  //   this.budgetService.update(budget);
  // }
}
