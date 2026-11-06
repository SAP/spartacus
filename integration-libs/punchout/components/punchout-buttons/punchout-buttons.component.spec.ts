import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import {
  PunchoutFacade,
  PunchoutUiRestrictionService,
} from '@spartacus/punchout/root';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { PunchoutButtonsComponent } from './punchout-buttons.component';

class MockPunchoutUiRestrictionService
  implements Partial<PunchoutUiRestrictionService>
{
  isPunchoutSessionActive = jasmine.createSpy().and.returnValue(of(true));
}

class MockPunchoutFacade implements Partial<PunchoutFacade> {
  submitRequisition = jasmine.createSpy();
}

describe('PunchoutButtonsComponent', () => {
  let component: PunchoutButtonsComponent;
  let fixture: ComponentFixture<PunchoutButtonsComponent>;
  let mockPunchoutUiRestrictionService: PunchoutUiRestrictionService;
  let punchoutFacade: PunchoutFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, CommonModule, PunchoutButtonsComponent],
      providers: [
        { provide: PunchoutFacade, useClass: MockPunchoutFacade },
        {
          provide: PunchoutUiRestrictionService,
          useClass: MockPunchoutUiRestrictionService,
        },
      ],
    });
    fixture = TestBed.createComponent(PunchoutButtonsComponent);
    component = fixture.componentInstance;
    punchoutFacade = TestBed.inject(PunchoutFacade);
    mockPunchoutUiRestrictionService = TestBed.inject(
      PunchoutUiRestrictionService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose isPunchoutSessionActive$ observable from service', () => {
    component.isPunchoutSessionActive$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(true);
    });

    expect(
      mockPunchoutUiRestrictionService.isPunchoutSessionActive
    ).toHaveBeenCalled();
  });

  it('should submitRequisition redirect user to Requisition page and update state with cancelRequisition false ', () => {
    component.submitRequisition(false);
    expect(punchoutFacade.submitRequisition).toHaveBeenCalledWith(false);
  });

  it('should submitRequisition redirect user to Requisition page and update state with cancelRequisition true ', () => {
    component.submitRequisition(true);
    expect(punchoutFacade.submitRequisition).toHaveBeenCalledWith(true);
  });

  it('should display the "Cancel" button when removeCancelButton is false', () => {
    component.removeCancelButton = false;
    fixture.detectChanges();

    const cancelButton = fixture.debugElement.query(
      By.css('button:nth-child(2)')
    );
    expect(cancelButton).toBeTruthy();
    expect(cancelButton.nativeElement.textContent.trim()).toContain(
      'punchout.cancel'
    );
  });

  it('should not display the "Cancel" button when removeCancelButton is true', () => {
    component.removeCancelButton = true;
    fixture.detectChanges();

    const cancelButton = fixture.debugElement.query(
      By.css('button:nth-child(2)')
    );
    expect(cancelButton).toBeNull();
  });
});
