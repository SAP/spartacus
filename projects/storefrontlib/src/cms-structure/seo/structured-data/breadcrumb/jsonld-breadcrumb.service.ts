import { Injectable } from '@angular/core';
import { PageMeta, PageMetaService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JsonldBreadcrumbService {
  constructor(protected pageMetaService: PageMetaService) {}

  getSchema(): Observable<any> {
    return this.pageMetaService.getMeta().pipe(
      first(Boolean),
      map((pageMeta: PageMeta) => this.build(pageMeta))
    );
  }

  protected build(pageMeta: PageMeta) {
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
    crumbs.push({
      '@type': 'ListItem',
      position: crumbs.length + 1,
      item: {
        '@id': pageMeta.title,
        name: pageMeta.title,
      },
    });

    return {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs,
    };
  }
}
