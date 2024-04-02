/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { useFeatureStyles } from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PageLayoutService } from './page-layout.service';

@Component({
  selector: 'cx-page-layout',
  templateUrl: './page-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent {
  @Input() set section(value: string) {
    this.section$.next(value);
  }
  readonly section$ = new BehaviorSubject<string | undefined>(undefined);

  readonly templateName$: Observable<string> =
    this.pageLayoutService.templateName$;

  readonly layoutName$: Observable<string> = this.section$.pipe(
    switchMap((section) => (section ? of(section) : this.templateName$))
  );

  readonly slots$: Observable<string[]> = this.section$.pipe(
    switchMap((section) => this.pageLayoutService.getSlots(section))
  );

  readonly pageFoldSlot$: Observable<string | undefined> =
    this.templateName$.pipe(
      switchMap((templateName) =>
        this.pageLayoutService.getPageFoldSlot(templateName)
      ),
      distinctUntilChanged()
    );

  constructor(protected pageLayoutService: PageLayoutService) {
    useFeatureStyles('a11yOrganizationsBanner');
  }
}
