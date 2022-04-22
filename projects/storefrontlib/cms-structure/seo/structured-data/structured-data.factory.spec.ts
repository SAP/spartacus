import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { SCHEMA_BUILDER, SchemaBuilder } from './builders';
import { JsonLdScriptFactory } from './json-ld-script.factory';
import { StructuredDataFactory } from './structured-data.factory';

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

describe('StructuredDataFactory', () => {
  let service: StructuredDataFactory;
  let builders: SchemaBuilder[];
  let jsonLdScriptFactory: JsonLdScriptFactory;

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
        { provide: PLATFORM_ID, useValue: 'server' },
        StructuredDataFactory,
      ],
    });

    service = TestBed.inject(StructuredDataFactory);
    builders = TestBed.inject<SchemaBuilder[]>(SCHEMA_BUILDER);
    jsonLdScriptFactory = TestBed.inject(JsonLdScriptFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain 2 builders', () => {
    expect(builders.length).toEqual(2);
  });

  it('should call jsonLdScriptFactory with 2 schemas', () => {
    spyOn(jsonLdScriptFactory, 'build').and.stub();
    service.build();
    expect(jsonLdScriptFactory.build).toHaveBeenCalledWith([
      productSchema,
      breadcrumbSchema,
    ]);
  });
});
