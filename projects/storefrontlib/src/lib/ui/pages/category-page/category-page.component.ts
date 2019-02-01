import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageLayoutService } from '../../../cms/page-layout/page-layout.service';

@Component({
  selector: 'cx-category-page',
  templateUrl: './category-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryPageComponent {
  constructor(
    protected activeRoute: ActivatedRoute,
    protected pageLayoutService: PageLayoutService
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

  private get template$(): Observable<string> {
    return this.pageLayoutService.templateName$;
  }

  get gridMode$(): Observable<string> {
    return this.template$.pipe(
      map(template =>
        template === 'ProductGridPageTemplate' ? 'grid' : 'list'
      )
    );
  }
}
