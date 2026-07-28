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
  Input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import {
  FeatureDirective,
  I18nModule,
  SiteContext,
  TranslationService,
  useFeatureStyles,
} from '@spartacus/core';
import { map, Observable } from 'rxjs';
import { NativeSelectSpaceDirective } from '../../../layout/a11y/native-select-space/native-select-space.directive';
import { NgSelectA11yDirective } from '../../../shared/components/ng-select-a11y/ng-select-a11y.directive';
import { IconComponent } from '../icon/icon.component';
import { ICON_TYPE } from '../icon/icon.model';
import { SiteContextComponentService } from './site-context-component.service';
import { SiteContextType } from './site-context.model';

@Component({
  selector: 'cx-site-context-selector',
  templateUrl: './site-context-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    IconComponent,
    AsyncPipe,
    I18nModule,
    FeatureDirective,
    NativeSelectSpaceDirective,
    NgSelectComponent,
    NgSelectA11yDirective,
    FormsModule,
  ],
})
export class SiteContextSelectorComponent implements OnInit {
  /**
   * @deprecated since 2011.21 removed unused property
   */
  siteContextService: SiteContext<any>;
  iconTypes = ICON_TYPE;
  /**
   * the context type can be set as an input. If the context is
   * not given, the context will be loaded from the backend.
   */
  @Input() context: SiteContextType;

  protected translationService = inject(TranslationService);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  selectedItem: string | undefined;

  constructor(private componentService: SiteContextComponentService) {
    useFeatureStyles('a11ySiteContextCaretClick');
    useFeatureStyles('a11yNavigationSpaceKeyOnKeyUp');
  }

  ngOnInit(): void {
    this.items$ = this.componentService.getItems(this.context);
    this.activeItem$ = this.componentService.getActiveItem(this.context);
    this.label$ = this.componentService.getLabel(this.context);
    this.activeItem$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.selectedItem = value;
        this.cdr.markForCheck();
      });
  }

  items$!: Observable<any>;
  activeItem$!: Observable<string>;

  set active(value: string) {
    this.componentService.setActive(value, this.context);
  }

  label$!: Observable<any>;

  ariaLabel$(label: string, index: number, length: number): Observable<string> {
    return this.translationService.translate('common.of').pipe(
      map((translation) => {
        return `${label}, ${index + 1} ${translation} ${length}`;
      })
    );
  }
}
