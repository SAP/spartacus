import { TestBed } from '@angular/core/testing';
import {
  createFrom,
  CxEvent,
  EventService,
  LoginEvent,
  WindowRef,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { TmsConfig } from '../config/tms-config';
import { TmsService } from './tms.service';

const winRefMock = {} as WindowRef;
const event = createFrom(LoginEvent, {});
class MockEventService {
  get(): Observable<LoginEvent> {
    return of(event);
  }
}

const tmsConfig: TmsConfig = {
  tms: {
    gtm: {
      dataLayerInit: (_winRef: WindowRef) => {},
      dataLayerPush: <T extends CxEvent>(_event: T, _winRef: WindowRef) => {},
      debug: false,
      events: [LoginEvent],
    },
    adobeLaunch: {
      dataLayerInit: (_winRef: WindowRef) => {},
      dataLayerPush: <T extends CxEvent>(_event: T, _winRef: WindowRef) => {},
      debug: false,
      events: [LoginEvent],
    },
  },
};

describe('TmsService', () => {
  let service: TmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TmsConfig, useValue: tmsConfig },
        { provide: EventService, useClass: MockEventService },
        { provide: WindowRef, useValue: winRefMock },
      ],
    });

    service = TestBed.inject(TmsService);

    spyOn(tmsConfig.tms.gtm, 'dataLayerInit').and.callThrough();
    spyOn(tmsConfig.tms.gtm, 'dataLayerPush').and.callThrough();
    spyOn(tmsConfig.tms.adobeLaunch, 'dataLayerInit').and.callThrough();
    spyOn(tmsConfig.tms.adobeLaunch, 'dataLayerPush').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should invoke the provided dataLayerInit() function', () => {
    service.collect();
    expect(tmsConfig.tms.gtm.dataLayerInit).toHaveBeenCalledWith(winRefMock);
    expect(tmsConfig.tms.adobeLaunch.dataLayerInit).toHaveBeenCalledWith(
      winRefMock
    );
  });
  it('should invoke the provided dataLayerPush() function', () => {
    service.collect();
    expect(tmsConfig.tms.gtm.dataLayerPush).toHaveBeenCalledWith(
      event,
      winRefMock
    );
    expect(tmsConfig.tms.adobeLaunch.dataLayerPush).toHaveBeenCalledWith(
      event,
      winRefMock
    );
  });
});
