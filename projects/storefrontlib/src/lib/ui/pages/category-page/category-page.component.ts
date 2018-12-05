import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { CmsService, Page } from '@spartacus/core';

@Component({
  selector: 'cx-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  categoryCode: string;
  brandCode: string;
  query: string;
  cmsPage$: Observable<Page>;

  constructor(
    protected activeRoute: ActivatedRoute,
    protected cmsService: CmsService
  ) {}

  ngOnInit() {
    this.activeRoute.params.forEach((params: Params) => {
      if (params['categoryCode']) {
        this.categoryCode = params['categoryCode'];
      }
      if (params['brandCode']) {
        this.brandCode = params['brandCode'];
      }
      if (params['query']) {
        this.query = params['query'];
      }
    });

    this.cmsPage$ = this.cmsService.currentPage$;
  }
}
