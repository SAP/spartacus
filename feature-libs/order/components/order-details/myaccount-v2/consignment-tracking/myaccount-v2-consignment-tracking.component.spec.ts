import { ElementRef, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nModule, TranslationService } from '@spartacus/core';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  OutletContextData,
} from '@spartacus/storefront';
import { Observable, EMPTY, of } from 'rxjs';
import { MyAccountV2ConsignmentTrackingComponent } from './myaccount-v2-consignment-tracking.component';

class MockTranslationService {
  translate(): Observable<string> {
    return EMPTY;
  }
}
class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialog(
    _caller: LAUNCH_CALLER,
    _openElement?: ElementRef,
    _vcr?: ViewContainerRef
  ) {
    return EMPTY;
  }
}
class MockOutletContextData implements Partial<OutletContextData> {
  context$ = of({
    item: mockConsignment,
    order: { code: 'order1' },
  });
}
const mockConsignment = { code: 'cons1', status: 'SHIPPED', trackingID: 'xyz' };

describe('MyAccountV2ConsignmentTrackingComponent', () => {
  let component: MyAccountV2ConsignmentTrackingComponent;
  let fixture: ComponentFixture<MyAccountV2ConsignmentTrackingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nModule],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: OutletContextData, useClass: MockOutletContextData },
      ],
      declarations: [MyAccountV2ConsignmentTrackingComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(MyAccountV2ConsignmentTrackingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });

  it('should fill consignment and order', () => {
    component.ngOnInit();
    expect(component.consignment).toEqual(mockConsignment);
    expect(component.orderCode).toEqual('order1');
  });
  it('should open tracking dialog', () => {
    spyOn(component, 'openTrackingDialog');
    fixture.detectChanges();
    let tracking_button = fixture.debugElement.nativeElement.querySelector('a');
    tracking_button.click(mockConsignment);
    expect(component.openTrackingDialog).toHaveBeenCalledWith(mockConsignment);
  });
});
