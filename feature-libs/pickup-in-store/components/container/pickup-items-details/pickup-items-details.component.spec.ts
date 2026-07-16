import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  CmsPickupItemDetails,
  I18nModule,
  LanguageService,
  UrlModule,
} from '@spartacus/core';
import { provideMockFeatureToggles } from 'core-libs/core/src/features-config/feature-toggles/testing';
import {
  CardModule,
  CmsComponentData,
  IconModule,
  MediaModule,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';

class MockLanguageService implements Partial<LanguageService> {
  getActive(): Observable<string> {
    return of('en');
  }
}
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
      imports: [
        CommonModule,
        I18nModule,
        RouterModule,
        UrlModule,
        IconModule,
        StoreModule,
        CardModule,
        MediaModule,
        PickUpItemsDetailsComponent,
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
        { provide: LanguageService, useClass: MockLanguageService },
        provideMockFeatureToggles({}),
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
      imports: [
        CommonModule,
        I18nModule,
        RouterModule,
        UrlModule,
        IconModule,
        StoreModule,
        CardModule,
        MediaModule,
        PickUpItemsDetailsComponent,
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
        { provide: LanguageService, useClass: MockLanguageService },
        provideMockFeatureToggles({}),
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
