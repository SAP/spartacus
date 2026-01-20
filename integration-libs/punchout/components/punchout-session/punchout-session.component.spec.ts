import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import {
  PunchoutFacade,
  PunchOutLevel,
  PunchOutOperation,
  PunchoutSession,
} from '@spartacus/punchout/root';
import { of } from 'rxjs';
import { PunchoutSessionComponent } from './punchout-session.component';

class mockActivatedRoute implements Partial<ActivatedRoute> {
  queryParams = of({ sid: '123abc' });
}

describe('PunchoutSessionComponent', () => {
  let component: PunchoutSessionComponent;
  let fixture: ComponentFixture<PunchoutSessionComponent>;
  let punchoutFacadeMock: jasmine.SpyObj<PunchoutFacade>;
  let globalMessageServiceMock: jasmine.SpyObj<GlobalMessageService>;

  const mockPunchoutSession: PunchoutSession = {
    customerId: 'test@test.com',
    cartId: 'mockCart',
    punchOutLevel: PunchOutLevel.PRODUCT,
    punchOutOperation: PunchOutOperation.EDIT,
    selectedItem: 'mockItemId',
    token: {
      accessToken: 'mockToken',
      tokenType: 'Bearer',
    },
  };

  beforeEach(() => {
    punchoutFacadeMock = jasmine.createSpyObj('PunchoutFacade', [
      'initPunchoutSession',
    ]);
    globalMessageServiceMock = jasmine.createSpyObj('GlobalMessageService', [
      'add',
      'remove',
    ]);
    TestBed.configureTestingModule({
      imports: [PunchoutSessionComponent],
      providers: [
        { provide: ActivatedRoute, useClass: mockActivatedRoute },
        { provide: PunchoutFacade, useValue: punchoutFacadeMock },
        { provide: GlobalMessageService, useValue: globalMessageServiceMock },
      ],
    });
    fixture = TestBed.createComponent(PunchoutSessionComponent);
    component = fixture.componentInstance;
    punchoutFacadeMock.initPunchoutSession.and.returnValue(
      of(mockPunchoutSession)
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initPunchoutSession on ngOnInit', () => {
    component.ngOnInit();
    expect(punchoutFacadeMock.initPunchoutSession).toHaveBeenCalledWith({
      punchoutSessionId: '123abc',
    });
    expect(globalMessageServiceMock.add).toHaveBeenCalledWith(
      { key: 'punchout.initiatingUserSession' },
      GlobalMessageType.MSG_TYPE_INFO
    );
  });

  it('should remove confirmation messages on completion', () => {
    component.ngOnInit();
    expect(globalMessageServiceMock.remove).toHaveBeenCalledWith(
      GlobalMessageType.MSG_TYPE_INFO
    );
  });
});
