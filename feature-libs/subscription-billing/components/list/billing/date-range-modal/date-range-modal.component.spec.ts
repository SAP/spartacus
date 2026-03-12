import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeModalComponent } from './date-range-modal.component';
import { LAUNCH_CALLER, LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ElementRef } from '@angular/core';
import { LanguageService, TranslationService } from '@spartacus/core';

class MockLanguageService {
  isocode = new BehaviorSubject('');

  getActive(): Observable<string> {
    return this.isocode;
  }

  setActive(isocode: string) {
    this.isocode.next(isocode);
  }
}
class MockTranslationService {
  translate(text: string): Observable<string> {
    return of(text);
  }
}
class MockLaunchDialogService implements Partial<LaunchDialogService> {
  data$: Observable<any> = of({ minDate: null, maxDate: null });
  dialogClose = of({ minDate: null, maxDate: null });
  openDialogAndSubscribe(
    _: LAUNCH_CALLER | string,
    __?: ElementRef,
    ___?: any
  ): void {}
  closeDialog(_: any) {}
}

describe('DateRangeModalComponent', () => {
  let component: DateRangeModalComponent;
  let fixture: ComponentFixture<DateRangeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateRangeModalComponent],
      providers: [
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DateRangeModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set minDate and maxDate as per the date range filters', () => {
    component.billsDateFilterForm.controls.from.setValue('2026-01-31');
    component.billsDateFilterForm.controls.to.setValue('2026-12-31');
    component.onFilterDateChange();
    fixture.detectChanges();
    expect(component.minDate).toEqual('2026-01-31');
    expect(component.maxDate).toEqual('2026-12-31');

    component.onDateFilterSubmit();
    fixture.detectChanges();

    component.onResetFilterDate();
    fixture.detectChanges();
    expect(component.minDate).toBeNull();
    expect(component.maxDate).toBeNull();

    component.maxDate = '2026-12-31';
    component.onResetFilterDate();
    fixture.detectChanges();
    expect(component.minDate).toBeNull();
    expect(component.maxDate).toBeNull();
  });
});
