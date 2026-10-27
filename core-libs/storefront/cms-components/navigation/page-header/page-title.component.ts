/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CmsPageTitleComponent, PageMetaService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { getPageTitle } from './page-title.utils';

@Component({
  selector: 'cx-page-title',
  templateUrl: './page-title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
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
    this.title$ = getPageTitle(this.pageMetaService);
  }
}
