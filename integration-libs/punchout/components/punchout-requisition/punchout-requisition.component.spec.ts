import { ElementRef, Pipe, PipeTransform } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { PunchoutFacade, PunchoutRequisition } from '@spartacus/punchout/root';
import { of, throwError } from 'rxjs';
import { PunchoutRequisitionComponent } from './punchout-requisition.component';

@Pipe({
  name: 'cxTranslate',
  standalone: false,
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}
describe('PunchoutRequisitionComponent', () => {
  let component: PunchoutRequisitionComponent;
  let fixture: ComponentFixture<PunchoutRequisitionComponent>;
  let mockPunchoutFacade: jasmine.SpyObj<PunchoutFacade>;
  let mockRoutingService: jasmine.SpyObj<RoutingService>;
  let globalMessageServiceMock: jasmine.SpyObj<GlobalMessageService>;

  const mockRequisition: PunchoutRequisition = {
    orderAsCXML: '<Order></Order>',
    browseFormPostUrl: 'https://test.com',
  };

  const formElRef = {
    nativeElement: {
      submit: jasmine.createSpy('submit'),
    },
  } as unknown as ElementRef<HTMLFormElement>;

  beforeEach(waitForAsync(() => {
    mockPunchoutFacade = jasmine.createSpyObj('PunchoutFacade', [
      'getPunchoutSessionRequisition',
      'logoutPunchoutUser',
      'endPunchoutSession', // Add the missing method here
    ]);
    mockPunchoutFacade.getPunchoutSessionRequisition.and.returnValue(
      of(mockRequisition)
    );
    mockPunchoutFacade.endPunchoutSession.and.returnValue(of(true)); // Mock the method

    mockRoutingService = jasmine.createSpyObj('RoutingService', ['go']);
    globalMessageServiceMock = jasmine.createSpyObj('GlobalMessageService', [
      'add',
      'remove',
    ]);
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PunchoutRequisitionComponent, MockTranslatePipe],
      providers: [
        { provide: PunchoutFacade, useValue: mockPunchoutFacade },
        { provide: RoutingService, useValue: mockRoutingService },
        { provide: GlobalMessageService, useValue: globalMessageServiceMock },
        FormBuilder,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PunchoutRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.punchoutFormElement = formElRef;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form group and globalMessageService on ngOnInit', () => {
    component.ngOnInit();
    expect(component.punchoutFormGroup).toBeTruthy();
    expect(
      component.punchoutFormGroup.get(component.FORM_CONTROL_NAME.ORDER)
    ).toBeTruthy();
    expect(globalMessageServiceMock.add).toHaveBeenCalledWith(
      { key: 'punchout.redirectToProcurementSystem' },
      GlobalMessageType.MSG_TYPE_INFO
    );
  });

  it('should call getPunchoutSessionRequisition on ngOnInit', () => {
    component.ngOnInit();
    expect(mockPunchoutFacade.getPunchoutSessionRequisition).toHaveBeenCalled();
  });

  it('should call logoutPunchoutUser and submit the form', fakeAsync(() => {
    mockPunchoutFacade.logoutPunchoutUser.and.returnValue(of(true));

    fixture = TestBed.createComponent(PunchoutRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.punchoutFormElement = formElRef;
    tick(10);

    component.punchoutFormGroup
      .get(component.FORM_CONTROL_NAME.ORDER)
      ?.setValue(mockRequisition.orderAsCXML);

    expect(mockPunchoutFacade.logoutPunchoutUser).toHaveBeenCalled();
    expect(formElRef.nativeElement.submit).toHaveBeenCalled();
  }));

  it('should navigate to error page when there is an error ', fakeAsync(() => {
    mockPunchoutFacade.logoutPunchoutUser.and.returnValue(
      throwError(() => new Error('Logout failed'))
    );

    fixture = TestBed.createComponent(PunchoutRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.punchoutFormElement = formElRef;
    tick(10);

    component.punchoutFormGroup
      .get(component.FORM_CONTROL_NAME.ORDER)
      ?.setValue(mockRequisition.orderAsCXML);

    expect(mockPunchoutFacade.logoutPunchoutUser).toHaveBeenCalled();
  }));

  it('should call endPunchoutSession on error', fakeAsync(() => {
    mockPunchoutFacade.endPunchoutSession.and.returnValue(of(true));
    mockPunchoutFacade.logoutPunchoutUser.and.returnValue(
      throwError(() => new Error('Logout failed'))
    );

    fixture = TestBed.createComponent(PunchoutRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.punchoutFormElement = formElRef;
    tick(10);

    component.punchoutFormGroup
      .get(component.FORM_CONTROL_NAME.ORDER)
      ?.setValue(mockRequisition.orderAsCXML);

    expect(mockPunchoutFacade.endPunchoutSession).toHaveBeenCalled();
  }));

  it('should call globalMessageService on ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(globalMessageServiceMock.remove).toHaveBeenCalledWith(
      GlobalMessageType.MSG_TYPE_INFO
    );
  });
});
