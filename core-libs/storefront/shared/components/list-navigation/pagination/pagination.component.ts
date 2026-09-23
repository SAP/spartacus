/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import {
  FeatureDirective,
  FeatureToggles,
  PaginationModel,
  TranslationService,
} from '@spartacus/core';
import { Observable, combineLatest, map, of } from 'rxjs';
import { FocusDirective } from '../../../../layout/a11y/keyboard-focus/focus.directive';
import { PaginationBuilder } from './pagination.builder';
import { PaginationItem, PaginationItemType } from './pagination.model';

/**
 * The `PaginationComponent` is a generic component that is used for
 * all lists in Spartacus that require pagination. The component supports
 * all common features, which can be configured or hidden by CSS.
 */
@Component({
  selector: 'cx-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, RouterLink, FocusDirective, AsyncPipe, FeatureDirective],
})
export class PaginationComponent {
  /** The (optional) pageRoute used for the anchor links created in the pagination   */
  @Input() pageRoute: string = '.';

  /** The (optional) query parameter which is added to the page route.  */
  @Input() queryParam: string;

  /**
   * Whenever there's a default page specified, the routing logic
   * will omit the page number in routeLink or parameters.
   */
  @Input() defaultPage: number | undefined;

  private _pagination: PaginationModel;
  get pagination(): PaginationModel {
    return this._pagination;
  }
  @Input() set pagination(value: PaginationModel | undefined) {
    if (value) {
      this._pagination = value;
      this.render(value);
    }
  }
  /**
   * If more than one pagination is present on a page, a unique id should be set for each instance.
   * This ensures the focus can be preserved after navigating to a different page.
   */
  @Input() paginationID: string = 'pagination';

  @Output() viewPageEvent: EventEmitter<number> = new EventEmitter<number>();

  pages: PaginationItem[] = [];

  translationService = inject(TranslationService);

  private featureToggles = inject(FeatureToggles);

  @ViewChildren('pageLink') pageLinks: QueryList<ElementRef<HTMLAnchorElement>>;

  constructor(
    private paginationBuilder: PaginationBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  protected render(pagination: PaginationModel): void {
    if (!pagination) {
      return;
    }
    this.pages = this.paginationBuilder.paginate(
      pagination.totalPages ?? 0,
      pagination.currentPage ?? 0
    );
  }

  /**
   * Format aria-label based on pagination item type.
   *
   * @param item PaginationItem
   * @returns Observable
   */
  getAriaLabel$(item: PaginationItem): Observable<string> {
    // Convert 'Start' to First, and 'End' to Last for a more natural screen read.
    let type = item.type;
    type = type === PaginationItemType.START ? PaginationItemType.FIRST : type;
    type = type === PaginationItemType.END ? PaginationItemType.LAST : type;
    const initialLabel =
      type === PaginationItemType.PAGE
        ? `${type} ${item.label}`
        : `${type} ${PaginationItemType.PAGE}`;

    if (!this.translationService) {
      return of(initialLabel);
    }
    return combineLatest([
      this.translationService?.translate('navigation.goTo', {
        location: initialLabel,
      }),
      this.translationService?.translate('common.selected'),
    ]).pipe(
      map(([goToTranslation, selectedTranslation]) => {
        return this.isCurrent(item)
          ? `${goToTranslation}, ${selectedTranslation}`
          : goToTranslation;
      })
    );
  }

  /**
   * Indicates whether the given item is the current item.
   *
   * @param item PaginationItem
   * @returns boolean
   */
  isCurrent(item: PaginationItem): boolean {
    return (
      item.type === PaginationItemType.PAGE &&
      item.number === this.pagination.currentPage
    );
  }

  /**
   * Indicates whether the pagination item is inactive. This is used
   * to disabled a link or set the tabindex to `-1`.
   *
   * Defaults to true
   *
   * @param item PaginationItem
   * @returns returns -1 in case of a disabled
   */
  isInactive(item: PaginationItem): boolean {
    return (
      !item.hasOwnProperty('number') ||
      item.number === this.pagination.currentPage
    );
  }

  getQueryParams(item: PaginationItem): Params {
    const queryParams = Object.assign(
      {},
      this.activatedRoute.snapshot.queryParams
    );
    if (
      this.queryParam &&
      item.number !== undefined &&
      this.pagination.totalPages !== undefined &&
      item.number < this.pagination.totalPages &&
      !this.isCurrent(item)
    ) {
      queryParams[this.queryParam] = item.number;
    }
    // omit the page number from the query parameters in case it's the default
    // to clean up the experience and avoid unnecessary polluting of the URL
    if (queryParams[this.queryParam] === this.defaultPage) {
      delete queryParams[this.queryParam];
    }
    return queryParams;
  }

  pageChange(page: PaginationItem): void {
    this.viewPageEvent.emit(page.number);
  }

  /**
   * Handles left/right arrow key navigation between pagination items.
   * Only active when `a11yPaginationKeyboardNavigation` feature toggle is enabled.
   */
  onKeydown(event: KeyboardEvent, index: number): void {
    if (!this.featureToggles.a11yPaginationKeyboardNavigation) {
      return;
    }
    const links = this.pageLinks.toArray();
    if (event.key === 'ArrowRight' && index < links.length - 1) {
      event.preventDefault();
      links[index + 1].nativeElement.focus();
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      links[index - 1].nativeElement.focus();
    }
  }
}
