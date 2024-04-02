import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { CmsPickupItemDetails, I18nModule, UrlModule } from '@spartacus/core';
import {
  CardModule,
  CmsComponentData,
  IconModule,
  MediaModule,
} from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { StoreModule } from '../../presentational/store';
import { DeliveryPointsService } from '../../services/delivery-points.service';
import { DeliveryPointsServiceMock } from '../../services/delivery-points.service.spec';
import { PickUpItemsDetailsComponent } from './pickup-items-details.component';

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
