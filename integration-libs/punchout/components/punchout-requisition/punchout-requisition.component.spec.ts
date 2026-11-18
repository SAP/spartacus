import { ElementRef, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PunchoutFacade, PunchoutRequisition } from '@spartacus/punchout/root';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';
import { PunchoutRequisitionComponent } from './punchout-requisition.component';

@Pipe({ name: 'cxTranslate' })
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

describe('PunchoutRequisitionComponent', () => {
  let component: PunchoutRequisitionComponent;
  let fixture: ComponentFixture<PunchoutRequisitionComponent>;
  let mockPunchoutFacade: any;

  const mockRequisition: PunchoutRequisition = {
    orderAsCXML: '<Order></Order>',
    browseFormPostUrl: 'https://test.com',
  };

  const formElRef = {
    nativeElement: {
      submit: vi.fn(),
    },
  } as unknown as ElementRef<HTMLFormElement>;

  beforeEach(async () => {
    mockPunchoutFacade = {
      getPunchoutSessionRequisition: vi.fn(),
      logoutPunchoutUser: vi.fn(),
      endPunchoutSession: vi.fn(),
    };
    mockPunchoutFacade.getPunchoutSessionRequisition.mockReturnValue(
      of(mockRequisition)
    );
    mockPunchoutFacade.endPunchoutSession.mockReturnValue(of(true));

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        PunchoutRequisitionComponent,
        MockTranslatePipe,
      ],
      providers: [
        { provide: PunchoutFacade, useValue: mockPunchoutFacade },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PunchoutRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.punchoutFormElement = formElRef;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form group on ngOnInit', () => {
    component.ngOnInit();
    expect(component.punchoutFormGroup).toBeTruthy();
    expect(
      component.punchoutFormGroup.get(component.FORM_CONTROL_NAME.ORDER)
    ).toBeTruthy();
  });

  it('should call getPunchoutSessionRequisition on ngOnInit', () => {
    component.ngOnInit();
    expect(mockPunchoutFacade.getPunchoutSessionRequisition).toHaveBeenCalled();
  });

  it('should call logoutPunchoutUser and submit the form', async () => {
    vi.useFakeTimers();
    mockPunchoutFacade.logoutPunchoutUser.mockReturnValue(of(true));

    fixture = TestBed.createComponent(PunchoutRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.punchoutFormElement = formElRef;
    await vi.advanceTimersByTimeAsync(10);

    component.punchoutFormGroup
      .get(component.FORM_CONTROL_NAME.ORDER)
      ?.setValue(mockRequisition.orderAsCXML);

    expect(mockPunchoutFacade.logoutPunchoutUser).toHaveBeenCalled();
    expect(formElRef.nativeElement.submit).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('should navigate to error page when there is an error ', async () => {
    vi.useFakeTimers();
    mockPunchoutFacade.logoutPunchoutUser.mockReturnValue(
      throwError(() => new Error('Logout failed'))
    );

    fixture = TestBed.createComponent(PunchoutRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.punchoutFormElement = formElRef;
    await vi.advanceTimersByTimeAsync(10);

    component.punchoutFormGroup
      .get(component.FORM_CONTROL_NAME.ORDER)
      ?.setValue(mockRequisition.orderAsCXML);

    expect(mockPunchoutFacade.logoutPunchoutUser).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('should call endPunchoutSession on error', async () => {
    vi.useFakeTimers();
    mockPunchoutFacade.endPunchoutSession.mockReturnValue(of(true));
    mockPunchoutFacade.logoutPunchoutUser.mockReturnValue(
      throwError(() => new Error('Logout failed'))
    );

    fixture = TestBed.createComponent(PunchoutRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.punchoutFormElement = formElRef;
    await vi.advanceTimersByTimeAsync(10);

    component.punchoutFormGroup
      .get(component.FORM_CONTROL_NAME.ORDER)
      ?.setValue(mockRequisition.orderAsCXML);

    expect(mockPunchoutFacade.endPunchoutSession).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('should call endPunchoutSession when form nativeElement does not exists', async () => {
    vi.useFakeTimers();
    mockPunchoutFacade.endPunchoutSession.mockReturnValue(of(true));
    mockPunchoutFacade.logoutPunchoutUser.mockReturnValue(of(true));

    fixture = TestBed.createComponent(PunchoutRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.punchoutFormElement = {} as ElementRef<HTMLFormElement>;
    await vi.advanceTimersByTimeAsync(10);

    component.punchoutFormGroup
      .get(component.FORM_CONTROL_NAME.ORDER)
      ?.setValue(mockRequisition.orderAsCXML);

    expect(mockPunchoutFacade.endPunchoutSession).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
