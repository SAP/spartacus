/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import {
  FeatureDirective,
  SiteTheme,
  TranslatePipe,
  TranslationService,
  useFeatureStyles,
} from '@spartacus/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { NativeSelectSpaceDirective } from '../../../layout/a11y/native-select-space/native-select-space.directive';
import { NgSelectA11yDirective } from '../../../shared/components/ng-select-a11y/ng-select-a11y.directive';
import { IconComponent } from '../icon/icon.component';
import { ICON_TYPE } from '../icon/icon.model';
import { SiteThemeSwitcherComponentService } from './site-theme-switcher.component.service';

/**
 * Component for switching themes.
 */
@Component({
  selector: 'cx-site-theme-switcher',
  templateUrl: './site-theme-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    IconComponent,
    AsyncPipe,
    TranslatePipe,
    FeatureDirective,
    NativeSelectSpaceDirective,
    NgSelectComponent,
    NgSelectA11yDirective,
    FormsModule,
  ],
})
export class SiteThemeSwitcherComponent implements OnInit {
  readonly translationService = inject(TranslationService);
  iconTypes = ICON_TYPE;

  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  protected themeSwitcherComponentService = inject(
    SiteThemeSwitcherComponentService
  );

  selectedItem: string | undefined;

  constructor() {
    useFeatureStyles('a11ySiteContextCaretClick');
    useFeatureStyles('a11yNavigationSpaceKeyOnKeyUp');
  }

  ngOnInit(): void {
    this.items$ = this.themeSwitcherComponentService.getItems();
    this.activeItem$ = this.themeSwitcherComponentService.getActiveItem();
    this.translatedItems$ = this.items$.pipe(
      switchMap((themes) =>
        themes.length
          ? combineLatest(
              themes.map((theme) =>
                (theme.i18nNameKey
                  ? this.translationService.translate(theme.i18nNameKey)
                  : of(theme.className)
                ).pipe(map((label) => ({ ...theme, label })))
              )
            )
          : of([])
      )
    );
    this.activeItem$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.selectedItem = value;
        this.cdr.markForCheck();
      });
  }

  items$!: Observable<Array<SiteTheme>>;
  activeItem$!: Observable<string>;
  translatedItems$!: Observable<Array<SiteTheme & { label: string }>>;

  set activeItem(value: string) {
    this.themeSwitcherComponentService.setActive(value);
  }

  ariaLabel$(
    theme: SiteTheme,
    index: number,
    length: number
  ): Observable<string> {
    const themeTranslation$ = theme.i18nNameKey
      ? this.translationService.translate(theme.i18nNameKey)
      : of(theme.className);
    const ofTranslation$ = this.translationService.translate('common.of');
    return combineLatest([themeTranslation$, ofTranslation$]).pipe(
      take(1),
      map(([themeTranslation, ofTranslation]) => {
        return `${themeTranslation}, ${index + 1} ${ofTranslation} ${length}`;
      })
    );
  }
}
