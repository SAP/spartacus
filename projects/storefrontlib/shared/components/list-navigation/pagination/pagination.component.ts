import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PaginationModel } from '@spartacus/core';
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
})
export class PaginationComponent {
  /** The (optional) pageRoute used for the anchor links created in the pagination   */
  @Input() pageRoute: string;

  /** The (optional) query parameter which is added to the page route.  */
  @Input() queryParam: string;

  /**
   * Whenever there's a default page specified, the routing logic
   * will omit the page number in routeLink or parameters.
   */
  @Input() defaultPage;

  private _pagination: PaginationModel;
  get pagination(): PaginationModel {
    return this._pagination;
  }
  @Input() set pagination(value: PaginationModel) {
    this._pagination = value;
    this.render(value);
  }

  @Output() viewPageEvent: EventEmitter<number> = new EventEmitter<number>();

  pages: PaginationItem[] = [];

  constructor(
    private paginationBuilder: PaginationBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  protected render(pagination: PaginationModel): void {
    if (!pagination) {
      return;
    }
    this.pages = this.paginationBuilder.paginate(
      pagination.totalPages,
      pagination.currentPage
    );
  }

  /**
   * Format aria-label based on pagination item type.
   *
   * @param label string
   * @param type PaginationItemType
   * @returns string
   */
  getAriaLabel(label: string, type: PaginationItemType): string {
    // Convert 'Start' to First, and 'End' to Last for a more natural screen read.
    type = type === PaginationItemType.START ? PaginationItemType.FIRST : type;
    type = type === PaginationItemType.END ? PaginationItemType.LAST : type;
    return type === PaginationItemType.PAGE
      ? `${type} ${label}`
      : `${type} ${PaginationItemType.PAGE}`;
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
}
