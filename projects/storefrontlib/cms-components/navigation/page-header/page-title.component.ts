/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit, inject } from '@angular/core';
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
  standalone: false,
})
export class PageTitleComponent implements OnInit, AfterViewInit {
  component = inject<CmsComponentData<CmsPageTitleComponent>>(CmsComponentData);
  protected pageMetaService = inject(PageMetaService);

  title$: Observable<string>;
  lastestTitle$: Observable<string>;

  ngOnInit(): void {
    this.setTitle();
  }

  ngAfterViewInit(): void {
    this.lastestTitle$ = this.title$;
  }

  private setTitle(): void {
    this.title$ = this.pageMetaService.getMeta().pipe(
      filter(isNotNullable),
      map((meta) => (meta.heading || meta.title) ?? '')
    );
  }
}
