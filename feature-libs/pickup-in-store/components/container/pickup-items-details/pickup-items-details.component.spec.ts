import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { CmsPickupItemDetails, FeatureConfigService, FeaturesConfigModule, I18nModule, I18nTestingModule, UrlModule } from '@spartacus/core';
import {
  CardModule,
  CmsComponentData,
  HierarchyComponentService,
  HierarchyModule,
  IconModule,
  MediaModule,
  OutletModule,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StoreModule } from '../../presentational/store';
import { DeliveryPointsService } from '../../services/delivery-points.service';
import { DeliveryPointsServiceMock, mockDeliveryPointOfService } from '../../services/delivery-points.service.spec';
import { PickUpItemsDetailsComponent } from './pickup-items-details.component';
import createSpy = jasmine.createSpy;
import { OrderEntry } from '@spartacus/cart/base/root';

const mockOrderEntries: Observable<OrderEntry[]> = of([{ orderCode: '123' }]);

class MockHierachyService implements Partial<HierarchyComponentService>{
  getEntriesFromGroups = createSpy().and.returnValue(mockOrderEntries);
}

describe('Order - PickUpItemsDetailsComponent', () => {
  let component: PickUpItemsDetailsComponent;
  let fixture: ComponentFixture<PickUpItemsDetailsComponent>;
  const config$ = new BehaviorSubject<CmsPickupItemDetails>({
    showEdit: false,
    context: 'order',
  });
  const data = <CmsComponentData<any>>{
    data$: config$.asObservable(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickUpItemsDetailsComponent],
      imports: [
        CommonModule,
        I18nModule,
        RouterModule,
        UrlModule,
        IconModule,
        StoreModule,
        CardModule,
        MediaModule,
      ],
      providers: [
        {
          provide: DeliveryPointsService,
          useClass: DeliveryPointsServiceMock,
        },
        {
          provide: CmsComponentData,
          useValue: data,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PickUpItemsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
describe('Delivery Mode - PickUpItemsDetailsComponent', () => {
  let component: PickUpItemsDetailsComponent;
  let fixture: ComponentFixture<PickUpItemsDetailsComponent>;
  const config$ = new BehaviorSubject<CmsPickupItemDetails>({
    showEdit: false,
    context: 'deliveryMode',
  });
  const data = <CmsComponentData<any>>{
    data$: config$.asObservable(),
  };
  const mockFeatureConfigService = jasmine.createSpyObj('FeatureConfigService', ['isEnabled']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickUpItemsDetailsComponent],
      imports: [
        CommonModule,
        I18nTestingModule,
        RouterModule,
        UrlModule,
        IconModule,
        StoreModule,
        CardModule,
        MediaModule,
        FeaturesConfigModule,
        HierarchyModule,
        OutletModule,
      ],
      providers: [
        {
          provide: DeliveryPointsService,
          useClass: DeliveryPointsServiceMock,
        },
        {
          provide: CmsComponentData,
          useValue: data,
        },
        { provide: FeatureConfigService,
          useValue: mockFeatureConfigService,
        },
        {
          provide: HierarchyComponentService,
          useClass: MockHierachyService,
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PickUpItemsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should set items details if isEntryGroupsEnabled feature is enabled', () => {
    mockFeatureConfigService.isEnabled.and.returnValue(true);
    component.ngOnInit();
    expect(component.itemsDetails).toEqual(mockDeliveryPointOfService);
  });

  it('should return correct entries from groups', () => {
    const mockEntryGroups = [{ entries: [{}] }];
    const result = component.getEntriesFromGroups(mockEntryGroups);
    expect(result).toEqual(mockOrderEntries);
  });

});
