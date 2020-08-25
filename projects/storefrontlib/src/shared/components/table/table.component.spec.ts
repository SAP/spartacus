import * as AngularCore from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OutletModule } from 'projects/storefrontlib/src/cms-structure';
import { TableRendererService } from './table-renderer.service';
import { TableComponent } from './table.component';
import { Table } from './table.model';
import createSpy = jasmine.createSpy;

const headers: string[] = ['key1', 'key2', 'key3'];

const data = [
  { key1: 'val1', key2: 'val2', key3: 'val3' },
  { key1: 'val4', key2: 'val5', key3: 'val6' },
  { key1: 'val7', key2: 'val8', key3: 'val9' },
];

const mockDataset: Table = {
  structure: {
    type: 'test-1',
    fields: headers,
  },
  data,
};

class MockTableRendererService {
  getHeaderOutletRef = createSpy('getHeaderOutletRef');
  getHeaderOutletContext = createSpy('getHeaderOutletRef');
  getDataOutletRef = createSpy('getDataOutletRef');
  getDataOutletContext = createSpy('getDataOutletRef');
  add() {}
}

describe('TableComponent', () => {
  let fixture: ComponentFixture<TableComponent>;
  let tableComponent: TableComponent;
  let tableRendererService: TableRendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OutletModule],
      declarations: [TableComponent],
      providers: [
        { provide: TableRendererService, useClass: MockTableRendererService },
      ],
    })
      .overrideComponent(TableComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    tableComponent = fixture.componentInstance;
    tableRendererService = TestBed.inject(TableRendererService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(tableComponent).toBeTruthy();
  });

  it('should not render a table if there is no dataset', () => {
    tableComponent.dataset = undefined;
    fixture.detectChanges();
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeNull();
  });

  it('should not render a table if there is no dataset.structure', () => {
    tableComponent.dataset = {} as Table;
    fixture.detectChanges();
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeNull();
  });

  it('should render table', () => {
    tableComponent.dataset = mockDataset;
    fixture.detectChanges();
    const table = fixture.debugElement.query(By.css('table'));
    expect(table.nativeElement).toBeTruthy();
  });

  it('should add the table type to __cx-table-type attribute in devMode', () => {
    spyOnProperty(AngularCore, 'isDevMode').and.returnValue(true);

    tableComponent.dataset = mockDataset;
    fixture.detectChanges();
    const attr = (fixture.debugElement
      .nativeElement as HTMLElement).getAttribute('__cx-table-type');
    expect(attr).toEqual('test-1');
  });

  it('should not add the table type to __cx-table-type attribute in production mode', () => {
    spyOnProperty(AngularCore, 'isDevMode').and.returnValue(false);

    tableComponent.dataset = mockDataset;
    fixture.detectChanges();

    const attr = (fixture.debugElement
      .nativeElement as HTMLElement).getAttribute('__cx-table-type');
    expect(attr).toBeFalsy();
  });

  describe('table header', () => {
    beforeEach(() => {
      tableComponent.dataset = mockDataset;
    });

    it('should delegate creation of table header outlet reference', () => {
      tableComponent.getHeaderOutletRef('key1');
      expect(tableRendererService.getHeaderOutletRef).toHaveBeenCalledWith(
        'test-1',
        'key1'
      );
    });

    it('should delegate creation of table header outlet context', () => {
      tableComponent.getHeaderOutletContext('key1');

      expect(tableRendererService.getHeaderOutletContext).toHaveBeenCalledWith(
        'test-1',
        mockDataset.structure.options,
        'key1'
      );
    });

    describe('UI', () => {
      it('should not add the thead when hideHeader = true', () => {
        tableComponent.dataset = {
          ...mockDataset,
          structure: {
            ...mockDataset.structure,
            options: { hideHeader: true },
          },
        };
        fixture.detectChanges();
        const table = fixture.debugElement.query(By.css('table > thead'));
        expect(table).toBeNull();
      });

      it('should add a th for each tableHeader ', () => {
        fixture.detectChanges();
        const table = fixture.debugElement.query(By.css('table > thead'));
        expect(table.nativeElement).toBeTruthy();
        const th = fixture.debugElement.queryAll(
          By.css('table > thead > tr > th')
        );
        expect(th.length).toBe(3);
        expect(th[0].nativeElement).toBeTruthy();
        expect(th[1].nativeElement).toBeTruthy();
        expect(th[2].nativeElement).toBeTruthy();
      });

      it('should add the col key as a css class to each <th>', () => {
        fixture.detectChanges();

        const th1: HTMLElement = fixture.debugElement.query(
          By.css('table th:nth-child(1)')
        ).nativeElement;

        expect(th1.classList).toContain('key1');
      });
    });
  });

  describe('table data', () => {
    beforeEach(() => {
      tableComponent.dataset = mockDataset;
    });

    it('should delegate creation of table data outlet reference', () => {
      tableComponent.getDataOutletRef('key1');
      expect(tableRendererService.getDataOutletRef).toHaveBeenCalledWith(
        'test-1',
        'key1'
      );
    });

    it('should delegate creation of table data outlet context', () => {
      tableComponent.getDataOutletContext('key1', {
        foo: 'bar',
      });

      expect(tableRendererService.getDataOutletContext).toHaveBeenCalledWith(
        'test-1',
        mockDataset.structure.options,
        'key1',
        {
          foo: 'bar',
        }
      );
    });

    describe('UI', () => {
      it('should generate a tr for each data row', () => {
        fixture.detectChanges();

        const tr = fixture.debugElement.queryAll(By.css('table > tr'));
        expect(tr.length).toBe(3);
      });

      it('should generate a td for each data row', () => {
        fixture.detectChanges();

        const td = fixture.debugElement.queryAll(By.css('table > tr > td'));
        expect(td.length).toBe(9);
      });

      it('should add the col key as a css class to each <td>', () => {
        fixture.detectChanges();

        const td1: HTMLElement = fixture.debugElement.query(
          By.css('table td:nth-child(1)')
        ).nativeElement;
        expect(td1.classList).toContain('key1');

        const td2: HTMLElement = fixture.debugElement.query(
          By.css('table td:nth-child(2)')
        ).nativeElement;
        expect(td2.classList).toContain('key2');

        const td3: HTMLElement = fixture.debugElement.query(
          By.css('table td:nth-child(3)')
        ).nativeElement;
        expect(td3.classList).toContain('key3');
      });
    });
  });
});
