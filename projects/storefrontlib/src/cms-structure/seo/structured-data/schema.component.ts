import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { JsonldBreadcrumbService } from './breadcrumb';
import { JsonldProductService } from './product';

@Component({
  selector: 'cx-schema',
  template: '<cx-json-ld [schema]="getSchemas() | async"></cx-json-ld>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchemaComponent {
  constructor(
    private productService: JsonldProductService,
    private breadcrumbService: JsonldBreadcrumbService
  ) {}

  getSchemas(): Observable<{}> {
    // TODO: only execute in SSR or dev mode, or decide to that lower level
    //  (but this code would still be executed)
    return combineLatest([
      this.productService.getSchema(),
      this.breadcrumbService.getSchema(),
    ]);
  }
}
