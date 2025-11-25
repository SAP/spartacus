import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductimportSummary } from '@spartacus/cart/base/root';
import { I18nTestingModule } from '@spartacus/core';
import { IconTestingModule } from '@spartacus/storefront';
import { importEntriesSummaryComponent } from './import-entries-summary.component';

const mockSummary: ProductimportSummary = {
  loading: true,
  cartName: 'mockCart',
  count: 0,
  total: 2,
  successesCount: 2,
  warningMessages: [],
  errorMessages: [],
};

describe('importEntriesFormComponent', () => {
  let component: importEntriesSummaryComponent;
  let fixture: ComponentFixture<importEntriesSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        IconTestingModule,
        importEntriesSummaryComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(importEntriesSummaryComponent);
    component = fixture.componentInstance;
    component.summary = mockSummary;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog on close method', () => {
    spyOn(component.closeEvent, 'emit');
    const mockCloseReason = 'Close import Products Dialog';
    component.close(mockCloseReason);

    expect(component.closeEvent.emit).toHaveBeenCalledWith(mockCloseReason);
  });

  it('should toggleWarningList', () => {
    component.warningDetailsOpened = false;
    component.toggleWarningList();
    expect(component.warningDetailsOpened).toBe(true);
    component.toggleWarningList();
    expect(component.warningDetailsOpened).toBe(false);
  });

  it('should toggleErrorList', () => {
    component.errorDetailsOpened = false;
    component.toggleErrorList();
    expect(component.errorDetailsOpened).toBe(true);
    component.toggleErrorList();
    expect(component.errorDetailsOpened).toBe(false);
  });
});
