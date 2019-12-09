import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
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
  getReturnRequest(): Observable<ReturnRequest> {
    return of(mockReturnRequest);
  }
}

describe('ReturnRequestOverviewComponent', () => {
  let component: ReturnRequestOverviewComponent;
  let fixture: ComponentFixture<ReturnRequestOverviewComponent>;
  let returnRequestService: MockReturnRequestService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ReturnRequestOverviewComponent],
      providers: [
        { provide: ReturnRequestService, useClass: MockReturnRequestService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnRequestOverviewComponent);
    component = fixture.componentInstance;

    returnRequestService = TestBed.get(ReturnRequestService as Type<
      ReturnRequestService
    >);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to cancel return', () => {
    component.cancelReturn('test');
    expect(component.cancelSubmit).toEqual(true);
    expect(returnRequestService.cancelReturnRequest).toHaveBeenCalledWith(
      'test'
    );
  });
});
