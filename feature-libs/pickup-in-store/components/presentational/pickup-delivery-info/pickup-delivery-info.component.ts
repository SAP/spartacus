import { Component, Input, OnInit } from '@angular/core';
import { PointOfService } from '@spartacus/core';

type OpeningTime = {
  weekDay?: string;
  openingHours?: string;
  closed?: boolean;
};
@Component({
  selector: 'cx-pickup-delivery-info',
  templateUrl: './pickup-delivery-info.component.html',
  styleUrls: ['./pickup-delivery-info.component.scss'],
})
export class PickupDeliveryInfoComponent implements OnInit {
  @Input() storeDetails: PointOfService;
  openingTimes: OpeningTime[] = [];
  address: string[];

  ngOnInit() {
    this.openingTimes =
      this.storeDetails?.openingHours?.weekDayOpeningList?.map(
        ({ weekDay, closed, openingTime, closingTime }) => {
          return {
            weekDay: weekDay ?? '',
            closed,
            openingHours: `${openingTime?.formattedHour ?? ''} - ${
              closingTime?.formattedHour ?? ''
            }`,
          };
        }
      ) ?? [];
    this.address =
      this.storeDetails?.address?.formattedAddress?.split(',') ?? [];
  }
}
