import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { TableComponent } from './table.component';

const mockColumns: Array<{ key: string; value: string }> = [
  { key: 'column1', value: 'Column 1' },
  { key: 'column2', value: 'Column 2' },
  { key: 'column3', value: 'Column 3' },
];

const mockTableData: Array<any> = [
  { column1: 'cell 1', column2: 'cell 2', column3: 'cell3' },
  { column1: 'cell 4', column2: 'cell 5', column3: 'cell6' },
  { column1: 'cell 7', column2: 'cell 8', column3: 'cell9' },
];

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent, MockUrlPipe],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.columns = mockColumns;
    component.tableData = mockTableData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render component', () => {
    const header = fixture.debugElement.query(By.css('.cx-table thead'));
    const rows = fixture.debugElement.queryAll(By.css('.cx-table tbody tr'));
    expect(header.nativeElement.textContent).toEqual(
      ' Column 1  Column 2  Column 3 '
    );
    expect(rows[0].nativeElement.textContent).toEqual(
      ' Column 1 cell 1 Column 2 cell 2 Column 3 cell3'
    );
    expect(rows[1].nativeElement.textContent).toEqual(
      ' Column 1 cell 4 Column 2 cell 5 Column 3 cell6'
    );
    expect(rows[2].nativeElement.textContent).toEqual(
      ' Column 1 cell 7 Column 2 cell 8 Column 3 cell9'
    );
  });
});
