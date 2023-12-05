import { OnInit } from '@angular/core';
import { CmsPickupItemDetails } from '@spartacus/core';
import { DeliveryPointOfService } from '@spartacus/pickup-in-store/root';
import { CmsComponentData, ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { DeliveryPointsService } from '../../services/delivery-points.service';
import * as i0 from "@angular/core";
export declare class PickUpItemsDetailsComponent implements OnInit {
    protected component: CmsComponentData<CmsPickupItemDetails>;
    protected deliveryPointsService: DeliveryPointsService;
    showEdit: boolean;
    itemsDetails: Observable<Array<DeliveryPointOfService>>;
    readonly ICON_TYPE: typeof ICON_TYPE;
    protected context: string;
    constructor(component: CmsComponentData<CmsPickupItemDetails>, deliveryPointsService: DeliveryPointsService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PickUpItemsDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PickUpItemsDetailsComponent, "cx-pick-up-in-store-items-details", never, { "showEdit": "showEdit"; "itemsDetails": "itemsDetails"; }, {}, never, never, false, never>;
}
