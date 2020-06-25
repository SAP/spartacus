import * as AngularCore from '@angular/core';
import { ChangeDetectionStrategy, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { TableComponent } from './table.component';
import { Table, TableHeader } from './table.model';

@Directive({
  selector: '[cxOutlet]',
})
class MockAttributesDirective {
  @Input() cxOutlet: string;
  @Input() cxOutletContext: any;
}

const mockDataset: Table = {
  structure: {
    type: 'test-1',
    headers: [],
  },
  data$: of([]),
};

const headers: TableHeader[] = [
  { key: 'key1', sortCode: 'sort1' },
  { key: 'key2', sortCode: 'sort2' },
  { key: 'key3', label: 'label3' },
];

const data = [
  { key1: 'val1', key2: 'val2', key3: 'val3' },
  { key1: 'val4', key2: 'val5', key3: 'val6' },
  { key1: 'val7', key2: 'val8', key3: 'val9' },
];

fdescribe('TableComponent', () => {
  let fixture: ComponentFixture<TableComponent>;
  let tableComponent: TableComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [TableComponent, MockAttributesDirective],
    })
      .overrideComponent(TableComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    tableComponent = fixture.componentInstance;
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

  fit('should add the table type to cx-table-type attribute in devMode', () => {
    spyOnProperty(AngularCore, 'isDevMode').and.returnValue(true);

    tableComponent.dataset = mockDataset;
    fixture.detectChanges();
    const attr = (fixture.debugElement
      .nativeElement as HTMLElement).getAttribute('cx-table-type');
    expect(attr).toEqual('test-1');
  });

  fit('should not add the table type to cx-table-type attribute in production mode', () => {
    spyOnProperty(AngularCore, 'isDevMode').and.returnValue(false);

    tableComponent.dataset = mockDataset;
    fixture.detectChanges();

    const attr = (fixture.debugElement
      .nativeElement as HTMLElement).getAttribute('cx-table-type');
    expect(attr).toBeFalsy();
  });

  describe('table header', () => {
    it('should not add the thead when hideHeader = true', () => {
      tableComponent.dataset = {
        ...mockDataset,
        structure: { ...mockDataset.structure, hideHeader: true },
      };
      fixture.detectChanges();
      const table = fixture.debugElement.query(By.css('table > thead'));
      expect(table).toBeNull();
    });

    it('should add a th for each tableHeader ', () => {
      tableComponent.dataset = {
        ...mockDataset,
        structure: {
          ...mockDataset.structure,
          headers,
        },
      };
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

    it('should add the header.label in the th if available ', () => {
      // TODO
    });

    it('should leverage the translate pipe for the header key when there is no header label', () => {
      // TODO
    });

    it('should render custom outlet template in the th', () => {
      // TODO
    });
  });

  describe('table data', () => {
    it('should generate a tr for each data row', () => {
      tableComponent.dataset = {
        ...mockDataset,
        structure: {
          ...mockDataset.structure,
          headers,
        },
        data$: of(data),
      };
      fixture.detectChanges();

      const tr = fixture.debugElement.queryAll(By.css('table > tr'));
      expect(tr.length).toBe(3);
    });

    it('should generate a td for each data row', () => {
      tableComponent.dataset = {
        ...mockDataset,
        structure: {
          ...mockDataset.structure,
          headers,
        },
        data$: of(data),
      };
      fixture.detectChanges();

      const td = fixture.debugElement.queryAll(By.css('table > tr > td'));
      expect(td.length).toBe(9);
    });

    it('should render custom outlet template in the td', () => {
      // TODO
    });
  });
});
