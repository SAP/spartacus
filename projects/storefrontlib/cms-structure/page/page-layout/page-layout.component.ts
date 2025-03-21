/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { useFeatureStyles } from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { OutletContextData } from '../../outlet/outlet.model';
import { PageLayoutComponentService } from './page-layout-component.service';
import { PageLayoutService } from './page-layout.service';

@Component({
  selector: 'cx-page-layout',
  templateUrl: './page-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
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

  // SPIKE NEW - add trackby function
  trackByFn(_index: number, slot: string) {
    return slot;
  }

  readonly pageFoldSlot$: Observable<string | undefined> =
    this.templateName$.pipe(
      switchMap((templateName) =>
        this.pageLayoutService.getPageFoldSlot(templateName)
      ),
      distinctUntilChanged()
    );

  protected outletContextData = inject(OutletContextData, {
    optional: true,
  });
  protected pageLayoutComponentService = inject(PageLayoutComponentService);

  shouldRenderSync(): Observable<boolean> {
    return this.pageLayoutComponentService.shouldRenderSync(
      this.layoutName$,
      this.templateName$
    );
  }

  constructor(protected pageLayoutService: PageLayoutService) {
    useFeatureStyles('a11yOrganizationsBanner');
  }
}
