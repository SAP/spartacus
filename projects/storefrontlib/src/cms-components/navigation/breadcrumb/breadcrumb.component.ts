import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CmsBreadcrumbsComponent,
  PageMetaService,
  TranslationService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { PageTitleComponent } from '../page-header/page-title.component';

@Component({
  selector: 'cx-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent extends PageTitleComponent implements OnInit {
  crumbs$: Observable<any[]>;

  constructor(
    public component: CmsComponentData<CmsBreadcrumbsComponent>,
    protected pageMetaService: PageMetaService,
    private translation: TranslationService
  ) {
    super(component, pageMetaService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.setCrumbs();
  }

  private setCrumbs(): void {
    this.crumbs$ = combineLatest([
      this.pageMetaService.getMeta(),
      this.translation.translate('common.home'),
    ]).pipe(
      map(([meta, textHome]) =>
        meta?.breadcrumbs ? meta.breadcrumbs : [{ label: textHome, link: '/' }]
      )
    );
  }
}
