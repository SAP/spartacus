import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { SchemaBuilder, SCHEMA_BUILDER } from './builders';
import { SchemaService } from './schema.service';

const productSchema = {
  '@context': 'http://schema.org',
  '@type': 'Product',
};

const breadcrumbSchema = {
  '@context': 'http://schema.org',
  '@type': 'Breadcrumb',
};
class MockProductSchemaBuilder implements SchemaBuilder {
  build(): Observable<{}> {
    return of(productSchema);
  }
}
class MockBreadcrumbSchemaBuilder implements SchemaBuilder {
  build(): Observable<{}> {
    return of(breadcrumbSchema);
  }
}

describe('SchemaService', () => {
  let service: SchemaService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SCHEMA_BUILDER,
          useClass: MockProductSchemaBuilder,
          multi: true,
        },
        {
          provide: SCHEMA_BUILDER,
          useClass: MockBreadcrumbSchemaBuilder,
          multi: true,
        },
        { provide: PLATFORM_ID, useValue: 'browser' },
        SchemaService,
      ],
    });

    service = TestBed.get(SchemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain 2 schemas', () => {
    service
      .load()
      .subscribe(schemas => {
        expect(schemas.length).toEqual(2);
      })
      .unsubscribe();
  });

  it('should contain product schema', () => {
    service
      .load()
      .subscribe(schemas => {
        expect(schemas[0]).toEqual(productSchema);
      })
      .unsubscribe();
  });

  it('should contain product and breadcrumb schema', () => {
    service
      .load()
      .subscribe(schemas => {
        expect(schemas).toEqual([productSchema, breadcrumbSchema]);
      })
      .unsubscribe();
  });
});
