import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaunchDialogService } from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';

import createSpy = jasmine.createSpy;
import { MyAccountV2DownloadInvoicesComponent } from './my-account-v2-download-invoices.component';
import { I18nModule, TranslationService } from '@spartacus/core';
import { ChangeDetectorRef } from '@angular/core';
import { By } from '@angular/platform-browser';
const invoicesEvent = {
  order: { code: 'order1' },
};
class MockTranslationService {
  translate(): Observable<string> {
    return EMPTY;
  }
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  data$ = of(invoicesEvent);
  closeDialog = createSpy();
}

describe('MyAccountV2DownloadInvoicesComponent', () => {
  let component: MyAccountV2DownloadInvoicesComponent;
  let fixture: ComponentFixture<MyAccountV2DownloadInvoicesComponent>;
  let launchService: LaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nModule],
      providers: [
        ChangeDetectorRef,
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
      declarations: [MyAccountV2DownloadInvoicesComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(MyAccountV2DownloadInvoicesComponent);
    launchService = TestBed.inject(LaunchDialogService);
    component = fixture.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show no-invoices message', () => {
    component.invoiceCount = 0;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('#noInvoice'));
    expect(el).not.toBeNull();
  });
  it('should not show no-invoices message', () => {
    component.invoiceCount = 10;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('#noInvoice'));
    expect(el).toBeNull();
  });
  it('should show spinner', () => {
    component.invoiceCount = undefined;
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('cx-spinner'));
    expect(el).not.toBeNull();
  });
  it('should close the dialog', () => {
    launchService.closeDialog = createSpy().and.stub();
    component.close();
    expect(launchService.closeDialog).toHaveBeenCalled();
  });
});
