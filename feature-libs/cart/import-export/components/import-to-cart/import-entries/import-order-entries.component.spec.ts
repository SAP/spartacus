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
import { importOrderEntriesComponent } from './import-order-entries.component';
import createSpy = jasmine.createSpy;

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialogAndSubscribe(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _data?: any
  ) {}
}

class MockimportExportContext {
  addEntries = createSpy('addEntries');
}

const contextService = new MockimportExportContext();

class MockContextService implements Partial<ContextService> {
  get = createSpy().and.returnValue(of(contextService));
}

describe('importOrderEntriesComponent', () => {
  let component: importOrderEntriesComponent;
  let fixture: ComponentFixture<importOrderEntriesComponent>;
  let launchDialogService: LaunchDialogService;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, importOrderEntriesComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: ContextService,
          useClass: MockContextService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(importOrderEntriesComponent);
    component = fixture.componentInstance;

    launchDialogService = TestBed.inject(LaunchDialogService);

    spyOn(launchDialogService, 'openDialogAndSubscribe').and.stub();

    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger an open dialog to import CSV', () => {
    component.openDialog(contextService);
    expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalledWith(
      LAUNCH_CALLER.import_TO_CART,
      component.element,
      { orderEntriesContext: contextService }
    );
  });

  it('should show import button', () => {
    const button = el.queryAll(By.css('.btn.btn-tertiary.cx-import-btn'));
    expect(button.length).toEqual(1);
  });
});
