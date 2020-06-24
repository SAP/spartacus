import { Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { TableComponent } from './table.component';

@Directive({
  selector: '[cxOutlet]',
})
class MockAttributesDirective {
  @Input() cxOutlet: string;
  @Input() cxOutletContext: any;
}

// const mockDataset = {
//   structure: {
//     type: 'test-1',
//     headers: [],
//   },
//   data$: of([]),
// };

describe('TableComponent', () => {
  let fixture: ComponentFixture<TableComponent>;
  let tableComponent: TableComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [TableComponent, MockAttributesDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    tableComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(tableComponent).toBeTruthy();
  });

  it('should not render a table if there is no dataset', () => {
    // TODO
  });

  it('should not render a table if there is no dataset.structure', () => {
    // TODO
  });

  it('should add the dataset.structure.type to cx-table element in devMode', () => {
    // TODO
  });

  describe('table header', () => {
    it('should not add the thead when hideHeader = true', () => {
      // TODO
    });

    it('should add a th for each tableHeader ', () => {
      // TODO
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
      // TODO
    });

    it('should generate a tr for each data row', () => {
      // TODO
    });

    it('should render custom outlet template in the td', () => {
      // TODO
    });
  });
});
