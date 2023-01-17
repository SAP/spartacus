import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { CardModule, IconModule, MediaModule } from '@spartacus/storefront';
import { DeliveryPointsServiceMock } from '../../services/delivery-points.service.spec';
import { DeliveryPointsService } from '../../services/order-delivery-points.service';
import { StoreModule } from '../store';
import { PickUpItemsDetailsComponent } from './pickup-items-details.component';

describe('PickUpItemsDetailsComponent', () => {
  let component: PickUpItemsDetailsComponent;
  let fixture: ComponentFixture<PickUpItemsDetailsComponent>;

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
