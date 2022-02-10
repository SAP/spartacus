import { Injectable } from '@angular/core';
import { PageMeta, PageMetaService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SchemaBuilder } from '../schema.interface';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbSchemaBuilder implements SchemaBuilder {
  constructor(protected pageMetaService: PageMetaService) {}

  build(): Observable<any> {
    return this.pageMetaService
      .getMeta()
      .pipe(map((pageMeta: PageMeta) => this.collect(pageMeta)));
  }

  protected collect(pageMeta: PageMeta): any {
    if (!pageMeta?.breadcrumbs) {
      return;
    }
    const crumbs = pageMeta.breadcrumbs.map((crumb, index) => {
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@id': crumb.link,
          name: crumb.label,
        },
      };
    });

    if (pageMeta.title) {
      crumbs.push({
        '@type': 'ListItem',
        position: crumbs.length + 1,
        item: {
          '@id': pageMeta.title,
          name: pageMeta.title,
        },
      });
    }

    return {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs,
    };
  }
}
