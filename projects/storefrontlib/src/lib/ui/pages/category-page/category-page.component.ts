import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CmsService } from '@spartacus/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-category-page',
  templateUrl: './category-page.component.html'
})
export class CategoryPageComponent {
  constructor(
    protected activeRoute: ActivatedRoute,
    protected cmsService: CmsService
  ) {}

  get categoryCode$(): Observable<string> {
    return this.activeRoute.params.pipe(map(params => params['categoryCode']));
  }

  get brandCode$(): Observable<string> {
    return this.activeRoute.params.pipe(map(params => params['brandCode']));
  }

  get query$(): Observable<string> {
    return this.activeRoute.params.pipe(map(params => params['query']));
  }

  get template$(): Observable<string> {
    return this.cmsService.getCurrentPage().pipe(map(page => page.template));
  }

  get gridMode$(): Observable<string> {
    return this.template$.pipe(
      map(template =>
        template === 'ProductGridPageTemplate' ? 'grid' : 'list'
      )
    );
  }
}
