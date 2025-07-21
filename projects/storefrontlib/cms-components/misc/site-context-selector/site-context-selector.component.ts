/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import {
  SiteContext,
  TranslationService,
  useFeatureStyles,
} from '@spartacus/core';
import { map, Observable } from 'rxjs';
import { ICON_TYPE } from '../icon/icon.model';
import { SiteContextComponentService } from './site-context-component.service';
import { SiteContextType } from './site-context.model';

@Component({
  selector: 'cx-site-context-selector',
  templateUrl: './site-context-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SiteContextSelectorComponent {
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

  constructor(private componentService: SiteContextComponentService) {
    useFeatureStyles('a11yShowDownArrowOnFocusedSelectMenu');
  }

  get items$(): Observable<any> {
    return this.componentService.getItems(this.context);
  }

  get activeItem$(): Observable<string> {
    return this.componentService.getActiveItem(this.context);
  }

  set active(value: string) {
    this.componentService.setActive(value, this.context);
  }

  get label$(): Observable<any> {
    return this.componentService.getLabel(this.context);
  }

  ariaLabel$(label: string, index: number, length: number): Observable<string> {
    return this.translationService.translate('common.of').pipe(
      map((translation) => {
        return `${label}, ${index + 1} ${translation} ${length}`;
      })
    );
  }
}
