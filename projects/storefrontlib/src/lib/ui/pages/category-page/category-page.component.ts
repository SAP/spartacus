import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromCmsStore from '../../../cms/store';

@Component({
  selector: 'y-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  categoryCode;
  brandCode;
  query;
  cmsPage$;

  constructor(
    protected activeRoute: ActivatedRoute,
    private store: Store<fromCmsStore.CmsState>
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

    this.cmsPage$ = this.store.pipe(select(fromCmsStore.getLatestPage));
  }
}
