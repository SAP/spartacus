import * as AngularCore from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { OutletModule } from 'projects/storefrontlib/src/cms-structure';
import { LayoutConfig } from 'projects/storefrontlib/src/layout';
import { of } from 'rxjs';
import { TableComponent } from './table.component';
import { Table } from './table.model';

const fields: string[] = ['key1', 'key2', 'key3'];

const data = [
  { key1: 'val1', key2: 'val2', key3: 'val3' },
  { key1: 'val4', key2: 'val5', key3: 'val6' },
  { key1: 'val7', key2: 'val8', key3: 'val9' },
];

const mockDataset: Table = {
  structure: {
    type: 'test-1',
    fields: fields,
  },
  data$: of(data),
};

describe('TableComponent', () => {
  let fixture: ComponentFixture<TableComponent>;
  let tableComponent: TableComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, OutletModule],
      declarations: [TableComponent],
      providers: [{ provide: LayoutConfig, useValue: {} }],
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
      tableComponent.dataset = mockDataset;
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

    it('should leverage the translate pipe for the header key when there is no header label', () => {
      tableComponent.dataset = mockDataset;
      fixture.detectChanges();

      const th1: HTMLElement = fixture.debugElement.query(
        By.css('table th:nth-child(1)')
      ).nativeElement;

      expect(th1.innerText).toEqual('test-1.key1');
    });

    it('should add the col key as a css class to each <th>', () => {
      tableComponent.dataset = mockDataset;
      fixture.detectChanges();

      const th1: HTMLElement = fixture.debugElement.query(
        By.css('table th:nth-child(1)')
      ).nativeElement;

      expect(th1.classList).toContain('key1');
    });
  });

  describe('table data', () => {
    it('should generate a tr for each data row', () => {
      tableComponent.dataset = mockDataset;
      fixture.detectChanges();

      const tr = fixture.debugElement.queryAll(By.css('table > tr'));
      expect(tr.length).toBe(3);
    });

    it('should generate a td for each data row', () => {
      tableComponent.dataset = mockDataset;
      fixture.detectChanges();

      const td = fixture.debugElement.queryAll(By.css('table > tr > td'));
      expect(td.length).toBe(9);
    });

    it('should add the col key as a css class to each <td>', () => {
      tableComponent.dataset = mockDataset;
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
