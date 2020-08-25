import { TestBed } from '@angular/core/testing';
import { OutletService } from 'projects/storefrontlib/src/cms-structure';
import { TableHeader, TableService } from '.';
import { TableRendererService } from './table-renderer.service';
class MockOutletService {}

const mockOptions = { fields: { key2: { label: { i18nKey: 'prop.key2' } } } };

describe('TableRendererService', () => {
  let service: TableRendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TableService,
        { provide: OutletService, useClass: MockOutletService },
      ],
    });
    service = TestBed.inject(TableRendererService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

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
