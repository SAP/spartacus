/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SectionItem, useFeatureStyles } from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { OutletDirective } from '../../outlet/outlet.directive';
import { PageSlotComponent } from '../slot/page-slot.component';
import { PageLayoutService } from './page-layout.service';
import { PageTemplateDirective } from './page-template.directive';

@Component({
  selector: 'cx-page-layout',
  templateUrl: './page-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgStyle,
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

  readonly customSections$ = this.section$.pipe(
    switchMap((section) =>
      section ? of(null) : this.pageLayoutService.customSections$
    )
  );

  constructor(protected pageLayoutService: PageLayoutService) {
    useFeatureStyles('a11yB2BRegisterComponent');
  }

  convertToStyle(item: SectionItem): { [key: string]: string | number } {
    if (!item || !this.isValidGridItem(item)) {
      return {};
    }
    return {
      'grid-row-start': item.rowStart,
      'grid-column-start': item.colStart,
      'grid-row-end': `span ${item.rowSpan}`,
      'grid-column-end': `span ${item.colSpan}`,
    };
  }

  private isValidGridItem(item: SectionItem): boolean {
    const hasValidNumbers =
      typeof item.rowStart === 'number' &&
      typeof item.colStart === 'number' &&
      typeof item.rowSpan === 'number' &&
      typeof item.colSpan === 'number';
    if (!hasValidNumbers) {
      return false;
    }
    return (
      item.rowSpan > 0 &&
      item.colSpan > 0 &&
      !Number.isNaN(item.rowStart) &&
      !Number.isNaN(item.colStart)
    );
  }
}
