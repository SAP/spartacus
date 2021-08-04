import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule, ReturnRequest } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ReturnRequestService } from '../return-request.service';
import { ReturnRequestOverviewComponent } from './return-request-overview.component';

const mockReturnRequest: ReturnRequest = {
  rma: 'test',
  returnEntries: [],
};

class MockReturnRequestService {
  cancelReturnRequest = jasmine.createSpy();
  cancelSuccess = jasmine.createSpy();
  backToList = jasmine.createSpy();
  getReturnRequest(): Observable<ReturnRequest> {
    return of(mockReturnRequest);
  }
  get isCancelSuccess$(): Observable<boolean> {
    return of(true);
  }
}

describe('ReturnRequestOverviewComponent', () => {
  let component: ReturnRequestOverviewComponent;
  let fixture: ComponentFixture<ReturnRequestOverviewComponent>;
  let returnRequestService: ReturnRequestService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [ReturnRequestOverviewComponent],
        providers: [
          { provide: ReturnRequestService, useClass: MockReturnRequestService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnRequestOverviewComponent);
    component = fixture.componentInstance;

    returnRequestService = TestBed.inject(ReturnRequestService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get cancel success', () => {
    component.returnRequest$.subscribe().unsubscribe();
    component.ngOnInit();
    expect(returnRequestService.cancelSuccess).toHaveBeenCalledWith('test');
  });

  it('should be able to cancel return', () => {
    component.cancelReturn('test');
    expect(returnRequestService.cancelReturnRequest).toHaveBeenCalledWith(
      'test'
    );
  });

  it('should be able to back to return request list page', () => {
    component.back();
    expect(returnRequestService.backToList).toHaveBeenCalled();
  });
});
