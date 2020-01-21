import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PaginationModel } from '@spartacus/core';
import { PaginationConfigService } from './config/pagination-config.service';
import { PaginationBuilder } from './pagination.builder';
import { PaginationItem } from './pagination.model';
/**
 * The pagination component is a generic component that takes care of the typcial
 * complexity of a full blown pagination UX. The default Spartacus UX is however not
 * using all the features, but customers might.
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
    private configService: PaginationConfigService,
    private activatedRoute: ActivatedRoute
  ) {}

  get config() {
    return this.configService;
  }

  private render(pagination: PaginationModel) {
    this.pages = this.paginationBuilder.paginate(
      pagination.totalPages,
      pagination.currentPage + 1
    );
  }

  private get current(): number {
    return this.pagination.currentPage;
  }

  get previous(): number {
    return this.current - 1;
  }

  get next(): number {
    return this.current + 1;
  }

  get last(): number {
    return this.pagination.totalPages - 1;
  }

  isCurrent(pageNumber): boolean {
    return pageNumber === this.current;
  }

  isDisabled(pageNumber): boolean {
    return (
      pageNumber === this.current || pageNumber > this.last || pageNumber < 0
    );
  }

  getQueryParams(pageNumber: number): Params {
    const queryParams = Object.assign(
      {},
      this.activatedRoute.snapshot.queryParams
    );
    if (
      this.queryParam &&
      pageNumber <= this.last &&
      pageNumber !== this.current
    ) {
      queryParams[this.queryParam] = pageNumber;
    }
    // omit the page number from the query parameters in case it's the default
    if (queryParams[this.queryParam] === this.defaultPage) {
      delete queryParams[this.queryParam];
    }
    return queryParams;
  }

  pageChange(page: number): void {
    this.viewPageEvent.emit(page);
  }
}
