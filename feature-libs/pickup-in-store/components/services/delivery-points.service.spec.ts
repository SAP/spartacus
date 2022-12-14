import { DeliveryPointOfServiceItems } from "feature-libs/pickup-in-store/root/model";
import { Observable, of } from "rxjs";



export class DeliveryPointsServiceMock {
    getDeliveryPointsOfService(): Observable<Array<DeliveryPointOfServiceItems>> {
        return of([])
    }
}
