import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { PUNCHOUT_SESSION_PAGE_URL } from '../model';
import { PunchoutDetectionService } from './punchout-detection.service';
import { PunchoutStoreService } from './punchout-store.service';

const MOCK_URL = 'https://test';
const MOCK_URL_WITH_PUNCHOUT = `https://spartacus/${PUNCHOUT_SESSION_PAGE_URL}?sid=abc123`;

class MockLocation implements Partial<Location> {
  path() {
    return MOCK_URL;
  }
}
const mockSessionId = '123abc';
class MockPunchoutStoreService implements Partial<PunchoutStoreService> {
  getPunchoutSessionId = () => mockSessionId;
}

describe('PunchoutDetectionService', () => {
  let service: PunchoutDetectionService;
  let location: Location;
  let punchoutStoreService: PunchoutStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Location, useClass: MockLocation },
        { provide: PunchoutStoreService, useClass: MockPunchoutStoreService },
      ],
    });

    location = TestBed.inject(Location);
    service = TestBed.inject(PunchoutDetectionService);
    punchoutStoreService = TestBed.inject(PunchoutStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should isPunchoutSessionPage falsy when url is not punchout session', (done) => {
    spyOn(location, 'path').and.returnValue(MOCK_URL);

    const value = service.isPunchoutSessionPage();
    expect(value).toEqual(false);
    done();
  });

  it('should isPunchoutSessionPage truthy when url punchout session', (done) => {
    spyOn(location, 'path').and.returnValue(MOCK_URL_WITH_PUNCHOUT);

    const value = service.isPunchoutSessionPage();
    expect(value).toEqual(true);
    done();
  });

  it('should isPunchoutSessionActive truthy when user punchoutSessionId exists', (done) => {
    spyOn(punchoutStoreService, 'getPunchoutSessionId').and.returnValue(
      mockSessionId
    );

    const value = service.isPunchoutSession();
    expect(value).toEqual(true);
    done();
  });

  it('should isPunchoutSessionActive falsy when punchoutSessionId undefined', (done) => {
    spyOn(punchoutStoreService, 'getPunchoutSessionId').and.returnValue(
      undefined
    );

    const value = service.isPunchoutSession();
    expect(value).toEqual(false);
    done();
  });
});
