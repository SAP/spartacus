import { DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import {
  ContextService,
  LAUNCH_CALLER,
  LaunchDialogService,
} from '@spartacus/storefront';
import { of } from 'rxjs';
import { ImportOrderEntriesComponent } from './import-order-entries.component';

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialogAndSubscribe(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _data?: any
  ) {}
}

class MockImportExportContext {
  addEntries = vi.fn();
}

const contextService = new MockImportExportContext();

class MockContextService implements Partial<ContextService> {
  get = vi.fn().mockReturnValue(of(contextService));
}

describe('ImportOrderEntriesComponent', () => {
  let component: ImportOrderEntriesComponent;
  let fixture: ComponentFixture<ImportOrderEntriesComponent>;
  let launchDialogService: LaunchDialogService;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ImportOrderEntriesComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: ContextService,
          useClass: MockContextService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportOrderEntriesComponent);
    component = fixture.componentInstance;

    launchDialogService = TestBed.inject(LaunchDialogService);

    vi.spyOn(launchDialogService, 'openDialogAndSubscribe').mockImplementation(() => {});

    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger an open dialog to import CSV', () => {
    component.openDialog(contextService);
    expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalledWith(
      LAUNCH_CALLER.IMPORT_TO_CART,
      component.element,
      { orderEntriesContext: contextService }
    );
  });

  it('should show import button', () => {
    const button = el.queryAll(By.css('.btn.btn-tertiary.cx-import-btn'));
    expect(button.length).toEqual(1);
  });
});
