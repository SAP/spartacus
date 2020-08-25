import { Component, ComponentFactoryResolver } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OutletService } from 'projects/storefrontlib/src/cms-structure';
import { Table, TableHeader, TableService } from '.';
import { TableRendererService } from './table-renderer.service';
import { TableStructure } from './table.model';
import createSpy = jasmine.createSpy;

class MockOutletService {
  add = createSpy('add');
}

@Component({ template: '' })
class MockDataComponent {}
@Component({ template: '' })
class MockHeaderComponent {}
@Component({ template: '' })
class MockCodeRendererComponent {}

const mockOptions = { fields: { key2: { label: { i18nKey: 'prop.key2' } } } };
const emptyTableStructure: Table = {
  structure: { type: 'mock' },
  data: [],
};
const mockTableWithHeaderComponent: Table = {
  structure: {
    type: 'mock',
    fields: ['name'],
    options: { headerComponent: MockHeaderComponent },
  } as TableStructure,
  data: [],
};
const mockTableWithHeaderAndDataComponent: Table = {
  structure: {
    type: 'mock',
    fields: ['name', 'code', 'unit'],
    options: {
      headerComponent: MockHeaderComponent,
      dataComponent: MockDataComponent,
      fields: {
        code: {
          dataComponent: MockCodeRendererComponent,
        },
      },
    },
  } as TableStructure,
  data: [{ name: 'my name', code: '123' }],
};

class MockComponentFactoryResolver {
  resolveComponentFactory = createSpy('resolveComponentFactory');
}

describe('TableRendererService', () => {
  let service: TableRendererService;
  let componentFactoryResolver: ComponentFactoryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockDataComponent,
        MockHeaderComponent,
        MockCodeRendererComponent,
      ],
      providers: [
        TableService,
        { provide: OutletService, useClass: MockOutletService },
        {
          provide: ComponentFactoryResolver,
          useClass: MockComponentFactoryResolver,
        },
      ],
    });
    service = TestBed.inject(TableRendererService);
    componentFactoryResolver = TestBed.inject(ComponentFactoryResolver);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  describe('add()', () => {
    it('should not add any components', () => {
      service.add(emptyTableStructure);
      expect(
        componentFactoryResolver.resolveComponentFactory
      ).not.toHaveBeenCalled();
    });

    it('should add MockComponent for header', () => {
      service.add(mockTableWithHeaderComponent);
      expect(
        componentFactoryResolver.resolveComponentFactory
      ).toHaveBeenCalledTimes(1);

      expect(
        componentFactoryResolver.resolveComponentFactory
      ).toHaveBeenCalledWith(MockHeaderComponent);
    });

    it('should add MockComponent for data', () => {
      service.add(mockTableWithHeaderAndDataComponent);
      expect(
        componentFactoryResolver.resolveComponentFactory
      ).toHaveBeenCalledWith(MockHeaderComponent);
      expect(
        componentFactoryResolver.resolveComponentFactory
      ).toHaveBeenCalledWith(MockDataComponent);
      expect(
        componentFactoryResolver.resolveComponentFactory
      ).toHaveBeenCalledWith(MockCodeRendererComponent);
    });

    it('should not add renderers multiple times', () => {
      service.add(mockTableWithHeaderComponent);
      service.add(mockTableWithHeaderComponent);
      expect(
        componentFactoryResolver.resolveComponentFactory
      ).toHaveBeenCalledWith(MockHeaderComponent);
      expect(
        componentFactoryResolver.resolveComponentFactory
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe('outlets', () => {
    it('should generate table header (th) outlet reference', () => {
      expect(service.getHeaderOutletRef('test-1', 'key1')).toEqual(
        'table.test-1.header.key1'
      );
    });

    it('should generate a table header (th) outlet context', () => {
      const context = service.getHeaderOutletContext(
        'test-1',
        mockOptions,
        'key2'
      );
      expect(context._field).toEqual('key2');
      expect(
        (context._options.fields['key2'].label as TableHeader).i18nKey
      ).toEqual('prop.key2');
    });

    it('should generate table data (td) outlet reference', () => {
      expect(service.getDataOutletRef('test-1', 'key1')).toEqual(
        'table.test-1.data.key1'
      );
    });

    it('should generate a table data (td) outlet context', () => {
      const context = service.getDataOutletContext('test-1', {}, 'key2', {
        foo: 'bar',
      });
      expect(context._field).toEqual('key2');
      expect(context['foo']).toEqual('bar');
    });
  });
});
