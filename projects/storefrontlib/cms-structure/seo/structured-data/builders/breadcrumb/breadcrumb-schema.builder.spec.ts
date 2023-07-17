import { TestBed } from '@angular/core/testing';
import { PageMeta, PageMetaService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { BreadcrumbSchemaBuilder } from './breadcrumb-schema.builder';

const pageMetaHome: PageMeta = {
  title: 'name of the page',
  breadcrumbs: [
    {
      label: 'home',
      link: '/',
    },
  ],
};

const pageMetaChild: PageMeta = {
  title: 'test',
  breadcrumbs: [
    {
      label: 'home',
      link: '/',
    },
    {
      label: 'child',
      link: '/child',
    },
  ],
};

const pageMetaHomeWithoutTitle: PageMeta = {
  breadcrumbs: [
    {
      label: 'home',
      link: '/',
    },
  ],
};

const pageMetaWithoutBreadcrumb: PageMeta = {
  title: 'name of the page',
};

class MockPageMetaService {
  getMeta(): Observable<PageMeta> {
    return of();
  }
}

describe('JsonLdProductOfferBuilder', () => {
  let service: BreadcrumbSchemaBuilder;
  let pageMetaService: PageMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BreadcrumbSchemaBuilder,
        {
          provide: PageMetaService,
          useClass: MockPageMetaService,
        },
      ],
    });

    service = TestBed.inject(BreadcrumbSchemaBuilder);
    pageMetaService = TestBed.inject(PageMetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain a schema with 2 crumb', () => {
    spyOn(pageMetaService, 'getMeta').and.returnValue(of(pageMetaHome));
    service
      .build()
      .subscribe((schema) => {
        expect(schema.itemListElement.length).toEqual(2);
      })
      .unsubscribe();
  });

  it('should contain a schema with 3 crumbs', () => {
    spyOn(pageMetaService, 'getMeta').and.returnValue(of(pageMetaChild));
    service
      .build()
      .subscribe((schema) => {
        expect(schema.itemListElement.length).toEqual(3);
      })
      .unsubscribe();
  });

  it('should have crumb with positions', () => {
    spyOn(pageMetaService, 'getMeta').and.returnValue(of(pageMetaHome));
    service
      .build()
      .subscribe((schema) => {
        expect(schema.itemListElement[1].position).toEqual(2);
      })
      .unsubscribe();
  });

  it('should add the page meta title as last crumb', () => {
    spyOn(pageMetaService, 'getMeta').and.returnValue(of(pageMetaHome));
    service
      .build()
      .subscribe((schema) => {
        expect(schema.itemListElement[1].item.name).toEqual('name of the page');
      })
      .unsubscribe();
  });

  it('should not add page meta title if there is no title', () => {
    spyOn(pageMetaService, 'getMeta').and.returnValue(
      of(pageMetaHomeWithoutTitle)
    );
    service
      .build()
      .subscribe((schema) => {
        expect(schema.itemListElement.length).toEqual(1);
      })
      .unsubscribe();
  });

  it('should not create schema if there are no breadcrumbs', () => {
    spyOn(pageMetaService, 'getMeta').and.returnValue(
      of(pageMetaWithoutBreadcrumb)
    );
    let schema: string;
    service
      .build()
      .subscribe((data) => (schema = data))
      .unsubscribe();
    expect(schema).toBeUndefined();
  });
});
