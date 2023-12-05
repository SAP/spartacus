/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { PickupOptionActions, PickupOptionSelectors, } from '../store/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
/**
 * A service for managing the page context and pickup option for a cart entry.
 */
export class PickupOptionService {
    constructor(store) {
        this.store = store;
        // Intentional empty constructor
    }
    setPageContext(pageContext) {
        this.store.dispatch(PickupOptionActions.SetPageContext({
            payload: { pageContext },
        }));
    }
    getPageContext() {
        return this.store.pipe(select(PickupOptionSelectors.getPageContext()));
    }
    setPickupOption(entryNumber, pickupOption) {
        this.store.dispatch(PickupOptionActions.SetPickupOption({
            payload: { entryNumber, pickupOption },
        }));
    }
    getPickupOption(entryNumber) {
        return this.store.pipe(select(PickupOptionSelectors.getPickupOption(entryNumber)));
    }
}
PickupOptionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionService, deps: [{ token: i1.Store }], target: i0.ɵɵFactoryTarget.Injectable });
PickupOptionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupOptionService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Store }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3VwLW9wdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3BpY2t1cC1pbi1zdG9yZS9jb3JlL2ZhY2FkZS9waWNrdXAtb3B0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBUyxNQUFNLGFBQWEsQ0FBQztBQU01QyxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLHFCQUFxQixHQUV0QixNQUFNLGdCQUFnQixDQUFDOzs7QUFFeEI7O0dBRUc7QUFFSCxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFlBQXNCLEtBQW1DO1FBQW5DLFVBQUssR0FBTCxLQUFLLENBQThCO1FBQ3ZELGdDQUFnQztJQUNsQyxDQUFDO0lBRUQsY0FBYyxDQUFDLFdBQW1CO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUNqQixtQkFBbUIsQ0FBQyxjQUFjLENBQUM7WUFDakMsT0FBTyxFQUFFLEVBQUUsV0FBVyxFQUFFO1NBQ3pCLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELGNBQWM7UUFDWixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELGVBQWUsQ0FBQyxXQUFtQixFQUFFLFlBQTBCO1FBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUNqQixtQkFBbUIsQ0FBQyxlQUFlLENBQUM7WUFDbEMsT0FBTyxFQUFFLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRTtTQUN2QyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRCxlQUFlLENBQUMsV0FBbUI7UUFDakMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDcEIsTUFBTSxDQUFDLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUMzRCxDQUFDO0lBQ0osQ0FBQzs7Z0hBN0JVLG1CQUFtQjtvSEFBbkIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBRC9CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzZWxlY3QsIFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHtcbiAgUGlja3VwT3B0aW9uLFxuICBQaWNrdXBPcHRpb25GYWNhZGUsXG59IGZyb20gJ0BzcGFydGFjdXMvcGlja3VwLWluLXN0b3JlL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgUGlja3VwT3B0aW9uQWN0aW9ucyxcbiAgUGlja3VwT3B0aW9uU2VsZWN0b3JzLFxuICBTdGF0ZVdpdGhQaWNrdXBPcHRpb24sXG59IGZyb20gJy4uL3N0b3JlL2luZGV4JztcblxuLyoqXG4gKiBBIHNlcnZpY2UgZm9yIG1hbmFnaW5nIHRoZSBwYWdlIGNvbnRleHQgYW5kIHBpY2t1cCBvcHRpb24gZm9yIGEgY2FydCBlbnRyeS5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBpY2t1cE9wdGlvblNlcnZpY2UgaW1wbGVtZW50cyBQaWNrdXBPcHRpb25GYWNhZGUge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aFBpY2t1cE9wdGlvbj4pIHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBjb25zdHJ1Y3RvclxuICB9XG5cbiAgc2V0UGFnZUNvbnRleHQocGFnZUNvbnRleHQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICBQaWNrdXBPcHRpb25BY3Rpb25zLlNldFBhZ2VDb250ZXh0KHtcbiAgICAgICAgcGF5bG9hZDogeyBwYWdlQ29udGV4dCB9LFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0UGFnZUNvbnRleHQoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5waXBlKHNlbGVjdChQaWNrdXBPcHRpb25TZWxlY3RvcnMuZ2V0UGFnZUNvbnRleHQoKSkpO1xuICB9XG5cbiAgc2V0UGlja3VwT3B0aW9uKGVudHJ5TnVtYmVyOiBudW1iZXIsIHBpY2t1cE9wdGlvbjogUGlja3VwT3B0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgIFBpY2t1cE9wdGlvbkFjdGlvbnMuU2V0UGlja3VwT3B0aW9uKHtcbiAgICAgICAgcGF5bG9hZDogeyBlbnRyeU51bWJlciwgcGlja3VwT3B0aW9uIH0sXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRQaWNrdXBPcHRpb24oZW50cnlOdW1iZXI6IG51bWJlcik6IE9ic2VydmFibGU8UGlja3VwT3B0aW9uIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChQaWNrdXBPcHRpb25TZWxlY3RvcnMuZ2V0UGlja3VwT3B0aW9uKGVudHJ5TnVtYmVyKSlcbiAgICApO1xuICB9XG59XG4iXX0=