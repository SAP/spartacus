import { DebugElement, ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import {
  CmsComponentData,
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { of } from 'rxjs';
import { ImportEntriesComponent } from './import-entries-component';

const mockCmsComponentData = {
  fileValidity: {
    maxSize: 1,
    allowedExtensions: [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
      '.csv',
    ],
  },
};
const MockCmsImportEntriesComponent = <CmsComponentData<any>>{
  data$: of(mockCmsComponentData),
};

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef,
    _data?: any
  ) {
    return of();
  }
}

describe('ImportEntriesComponent', () => {
  let component: ImportEntriesComponent;
  let fixture: ComponentFixture<ImportEntriesComponent>;
  let launchDialogService: LaunchDialogService;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ImportEntriesComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: CmsComponentData, useValue: MockCmsImportEntriesComponent },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportEntriesComponent);
    component = fixture.componentInstance;

    launchDialogService = TestBed.inject(LaunchDialogService);

    spyOn(launchDialogService, 'openDialog').and.stub();

    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger an open dialog to import CSV', () => {
    component.openDialog(mockCmsComponentData);
    expect(launchDialogService.openDialog).toHaveBeenCalledWith(
      LAUNCH_CALLER.IMPORT_TO_CART,
      component.element,
      component['vcr'],
      mockCmsComponentData
    );
  });

  it('should show import button', () => {
    const button = el.queryAll(By.css('.link.cx-action-link'));
    expect(button.length).toEqual(1);
  });
});
