import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AbstractPage } from '../abstract-page.component';
import { Store } from '@ngrx/store';
import * as fromCmsStore from '../../../cms/store';

@Component({
  selector: 'y-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  categoryCode;
  brandCode;
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
    });

    this.cmsPage$ = this.store.select(fromCmsStore.getLatestPage);
  }
}
