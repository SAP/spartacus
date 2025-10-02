/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PageLayoutService } from './page-layout.service';
import { useFeatureStyles } from '@spartacus/core';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { PageTemplateDirective } from './page-template.directive';
import { OutletDirective } from '../../outlet/outlet.directive';
import { PageSlotComponent } from '../slot/page-slot.component';

@Component({
  selector: 'cx-page-layout',
  templateUrl: './page-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    PageTemplateDirective,
    OutletDirective,
    NgFor,
    PageSlotComponent,
    AsyncPipe,
  ],
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
    useFeatureStyles('disableCxPageSlotMarginAnimation');
  }
}
