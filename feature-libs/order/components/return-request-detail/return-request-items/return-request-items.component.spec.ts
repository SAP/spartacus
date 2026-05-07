import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OrderEntry, OrderEntryGroup } from '@spartacus/cart/base/root';
import {
  FeatureConfigService,
  FeaturesConfigModule,
  I18nTestingModule,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { ReturnRequest } from '@spartacus/order/root';
import {
  HierarchyComponentService,
  HierarchyNode,
  MediaComponent,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ReturnRequestService } from '../return-request.service';
import { ReturnRequestItemsComponent } from './return-request-items.component';

const mockReturnRequest: ReturnRequest = {
  rma: 'test',
  returnEntries: [],
};

class MockCheckoutService implements Partial<ReturnRequestService> {
  getReturnRequest(): Observable<ReturnRequest> {
    return of(mockReturnRequest);
  }
  getOrderEntryGroups(): Observable<OrderEntryGroup[]> {
    return of([{}]);
  }
  getRequestOrderEntryGroups(): Observable<OrderEntryGroup[]> {
    return of([{}]);
  }
}

class MockHierachyService {
  getEntriesFromGroups(): Observable<OrderEntry[]> {
    return of([{}]);
  }
  getBundlesFromGroups(): Observable<HierarchyNode[]> {
    return of([]);
  }
}

@Component({
  template: '',
  selector: 'cx-media',
})
class MockMediaComponent {
  @Input() container: any;
  @Input() format: any;
}

describe('ReturnRequestItemsComponent', () => {
  let component: ReturnRequestItemsComponent;
  let fixture: ComponentFixture<ReturnRequestItemsComponent>;
  const mockFeatureConfigService = jasmine.createSpyObj(
    'FeatureConfigService',
    ['isEnabled']
  );

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        ReturnRequestItemsComponent,
        FeaturesConfigModule,
      ],
      providers: [
        { provide: ReturnRequestService, useClass: MockCheckoutService },
        {
          provide: HierarchyComponentService,
          useClass: MockHierachyService,
        },
        { provide: FeatureConfigService, useValue: mockFeatureConfigService },
      ],
    })
      .overrideComponent(ReturnRequestItemsComponent, {
        remove: { imports: [TranslatePipe, MediaComponent] },
        add: { imports: [MockTranslatePipe, MockMediaComponent] },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnRequestItemsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set entries$ and bundles$ if enableBundles feature is enabled', () => {
    mockFeatureConfigService.isEnabled.and.returnValue(true);
    fixture.detectChanges();
    expect(component.entryGroups$).toBeDefined();
    expect(component.entries$).toBeDefined();
    expect(component.bundles$).toBeDefined();
  });
});