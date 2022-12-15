import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { IconTestingModule } from '@spartacus/storefront';
import { DeliveryPointsService } from '../../services/delivery-points.service';
import { DeliveryPointsServiceMock } from '../../services/delivery-points.service.spec';
import { PickUpInStoreDetailsComponent } from './pickup-in-store-details.component';

describe('PickUpInStoreDetailsComponent', () => {
  let component: PickUpInStoreDetailsComponent;
  let fixture: ComponentFixture<PickUpInStoreDetailsComponent>;
  // let deliveryPointsService: DeliveryPointsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PickUpInStoreDetailsComponent],
      imports: [CommonModule, I18nTestingModule, IconTestingModule],
      providers: [
        {
          provide: DeliveryPointsService,
          useClass: DeliveryPointsServiceMock,
        },
      ],
    }).compileComponents();
    // deliveryPointsService = TestBed.inject(DeliveryPointsService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickUpInStoreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
    // expect(deliveryPointsService).toBeDefined();
  });
});
