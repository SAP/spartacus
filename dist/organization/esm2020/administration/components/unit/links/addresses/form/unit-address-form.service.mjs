/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, } from '@angular/forms';
import { of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { FormService } from '../../../../shared/form/form.service';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/user/profile/root";
export class UnitAddressFormService extends FormService {
    constructor(userAddressService, userProfileFacade) {
        super();
        this.userAddressService = userAddressService;
        this.userProfileFacade = userProfileFacade;
    }
    build() {
        const form = new UntypedFormGroup({});
        form.setControl('id', new UntypedFormControl(''));
        form.setControl('titleCode', new UntypedFormControl(''));
        form.setControl('firstName', new UntypedFormControl('', Validators.required));
        form.setControl('lastName', new UntypedFormControl('', Validators.required));
        form.setControl('line1', new UntypedFormControl('', Validators.required));
        form.setControl('line2', new UntypedFormControl(''));
        form.setControl('town', new UntypedFormControl('', Validators.required));
        form.setControl('country', new UntypedFormGroup({
            isocode: new UntypedFormControl(null, Validators.required),
        }));
        form.setControl('region', new UntypedFormGroup({
            isocode: new UntypedFormControl(null, Validators.required),
        }));
        form.setControl('postalCode', new UntypedFormControl('', Validators.required));
        form.setControl('phone', new UntypedFormControl(''));
        form.setControl('cellphone', new UntypedFormControl(''));
        this.form = form;
    }
    getCountries() {
        return this.userAddressService.getDeliveryCountries().pipe(tap((countries) => {
            if (Object.keys(countries).length === 0) {
                this.userAddressService.loadDeliveryCountries();
            }
        }));
    }
    getTitles() {
        return this.userProfileFacade.getTitles();
    }
    getRegions() {
        let selectedCountryCode = this.form?.get('country.isocode')?.value;
        let newCountryCode;
        return (this.getForm()
            ?.get('country.isocode')
            ?.valueChanges.pipe(filter((countryIsoCode) => Boolean(countryIsoCode)), switchMap((countryIsoCode) => {
            newCountryCode = countryIsoCode;
            return this.userAddressService.getRegions(countryIsoCode);
        }), tap((regions) => {
            const regionControl = this.form?.get('region.isocode');
            if (!regions || regions.length === 0) {
                regionControl?.disable();
            }
            else {
                regionControl?.enable();
            }
            if (selectedCountryCode && newCountryCode !== selectedCountryCode) {
                regionControl?.reset();
            }
            selectedCountryCode = newCountryCode;
        })) ?? of([]));
    }
}
UnitAddressFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressFormService, deps: [{ token: i1.UserAddressService }, { token: i2.UserProfileFacade }], target: i0.ɵɵFactoryTarget.Injectable });
UnitAddressFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressFormService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.UserAddressService }, { type: i2.UserProfileFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1hZGRyZXNzLWZvcm0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpbmtzL2FkZHJlc3Nlcy9mb3JtL3VuaXQtYWRkcmVzcy1mb3JtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsVUFBVSxHQUNYLE1BQU0sZ0JBQWdCLENBQUM7QUFTeEIsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7QUFLbkUsTUFBTSxPQUFPLHNCQUF1QixTQUFRLFdBQW9CO0lBQzlELFlBQ1ksa0JBQXNDLEVBQ3RDLGlCQUFvQztRQUU5QyxLQUFLLEVBQUUsQ0FBQztRQUhFLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUdoRCxDQUFDO0lBRVMsS0FBSztRQUNiLE1BQU0sSUFBSSxHQUFHLElBQUksZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsVUFBVSxDQUNiLFdBQVcsRUFDWCxJQUFJLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQ2hELENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxDQUNiLFVBQVUsRUFDVixJQUFJLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQ2hELENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFVBQVUsQ0FDYixTQUFTLEVBQ1QsSUFBSSxnQkFBZ0IsQ0FBQztZQUNuQixPQUFPLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztTQUMzRCxDQUFDLENBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLENBQ2IsUUFBUSxFQUNSLElBQUksZ0JBQWdCLENBQUM7WUFDbkIsT0FBTyxFQUFFLElBQUksa0JBQWtCLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7U0FDM0QsQ0FBQyxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxDQUNiLFlBQVksRUFDWixJQUFJLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQ2hELENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXpELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFRCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLENBQ3hELEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ2hCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUN2QyxJQUFJLENBQUMsa0JBQWtCLENBQUMscUJBQXFCLEVBQUUsQ0FBQzthQUNqRDtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEtBQUssQ0FBQztRQUNuRSxJQUFJLGNBQXNCLENBQUM7UUFFM0IsT0FBTyxDQUNMLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztZQUN4QixFQUFFLFlBQVksQ0FBQyxJQUFJLENBQ2pCLE1BQU0sQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQ25ELFNBQVMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFO1lBQzNCLGNBQWMsR0FBRyxjQUFjLENBQUM7WUFDaEMsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVELENBQUMsQ0FBQyxFQUNGLEdBQUcsQ0FBQyxDQUFDLE9BQWlCLEVBQUUsRUFBRTtZQUN4QixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3BDLGFBQWEsRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUMxQjtpQkFBTTtnQkFDTCxhQUFhLEVBQUUsTUFBTSxFQUFFLENBQUM7YUFDekI7WUFDRCxJQUFJLG1CQUFtQixJQUFJLGNBQWMsS0FBSyxtQkFBbUIsRUFBRTtnQkFDakUsYUFBYSxFQUFFLEtBQUssRUFBRSxDQUFDO2FBQ3hCO1lBQ0QsbUJBQW1CLEdBQUcsY0FBYyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUNILElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUNkLENBQUM7SUFDSixDQUFDOzttSEF0RlUsc0JBQXNCO3VIQUF0QixzQkFBc0IsY0FGckIsTUFBTTsyRkFFUCxzQkFBc0I7a0JBSGxDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgVW50eXBlZEZvcm1Db250cm9sLFxuICBVbnR5cGVkRm9ybUdyb3VwLFxuICBWYWxpZGF0b3JzLFxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBBZGRyZXNzLFxuICBDb3VudHJ5LFxuICBSZWdpb24sXG4gIFRpdGxlLFxuICBVc2VyQWRkcmVzc1NlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVc2VyUHJvZmlsZUZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBGb3JtU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9mb3JtL2Zvcm0uc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVbml0QWRkcmVzc0Zvcm1TZXJ2aWNlIGV4dGVuZHMgRm9ybVNlcnZpY2U8QWRkcmVzcz4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdXNlckFkZHJlc3NTZXJ2aWNlOiBVc2VyQWRkcmVzc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVzZXJQcm9maWxlRmFjYWRlOiBVc2VyUHJvZmlsZUZhY2FkZVxuICApIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGJ1aWxkKCkge1xuICAgIGNvbnN0IGZvcm0gPSBuZXcgVW50eXBlZEZvcm1Hcm91cCh7fSk7XG4gICAgZm9ybS5zZXRDb250cm9sKCdpZCcsIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycpKTtcbiAgICBmb3JtLnNldENvbnRyb2woJ3RpdGxlQ29kZScsIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycpKTtcbiAgICBmb3JtLnNldENvbnRyb2woXG4gICAgICAnZmlyc3ROYW1lJyxcbiAgICAgIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpXG4gICAgKTtcbiAgICBmb3JtLnNldENvbnRyb2woXG4gICAgICAnbGFzdE5hbWUnLFxuICAgICAgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJywgVmFsaWRhdG9ycy5yZXF1aXJlZClcbiAgICApO1xuICAgIGZvcm0uc2V0Q29udHJvbCgnbGluZTEnLCBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSk7XG4gICAgZm9ybS5zZXRDb250cm9sKCdsaW5lMicsIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycpKTtcbiAgICBmb3JtLnNldENvbnRyb2woJ3Rvd24nLCBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnLCBWYWxpZGF0b3JzLnJlcXVpcmVkKSk7XG4gICAgZm9ybS5zZXRDb250cm9sKFxuICAgICAgJ2NvdW50cnknLFxuICAgICAgbmV3IFVudHlwZWRGb3JtR3JvdXAoe1xuICAgICAgICBpc29jb2RlOiBuZXcgVW50eXBlZEZvcm1Db250cm9sKG51bGwsIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxuICAgICAgfSlcbiAgICApO1xuICAgIGZvcm0uc2V0Q29udHJvbChcbiAgICAgICdyZWdpb24nLFxuICAgICAgbmV3IFVudHlwZWRGb3JtR3JvdXAoe1xuICAgICAgICBpc29jb2RlOiBuZXcgVW50eXBlZEZvcm1Db250cm9sKG51bGwsIFZhbGlkYXRvcnMucmVxdWlyZWQpLFxuICAgICAgfSlcbiAgICApO1xuICAgIGZvcm0uc2V0Q29udHJvbChcbiAgICAgICdwb3N0YWxDb2RlJyxcbiAgICAgIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpXG4gICAgKTtcbiAgICBmb3JtLnNldENvbnRyb2woJ3Bob25lJywgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJykpO1xuICAgIGZvcm0uc2V0Q29udHJvbCgnY2VsbHBob25lJywgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJykpO1xuXG4gICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgfVxuXG4gIGdldENvdW50cmllcygpOiBPYnNlcnZhYmxlPENvdW50cnlbXT4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJBZGRyZXNzU2VydmljZS5nZXREZWxpdmVyeUNvdW50cmllcygpLnBpcGUoXG4gICAgICB0YXAoKGNvdW50cmllcykgPT4ge1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMoY291bnRyaWVzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLnVzZXJBZGRyZXNzU2VydmljZS5sb2FkRGVsaXZlcnlDb3VudHJpZXMoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0VGl0bGVzKCk6IE9ic2VydmFibGU8VGl0bGVbXT4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJQcm9maWxlRmFjYWRlLmdldFRpdGxlcygpO1xuICB9XG5cbiAgZ2V0UmVnaW9ucygpOiBPYnNlcnZhYmxlPFJlZ2lvbltdPiB7XG4gICAgbGV0IHNlbGVjdGVkQ291bnRyeUNvZGUgPSB0aGlzLmZvcm0/LmdldCgnY291bnRyeS5pc29jb2RlJyk/LnZhbHVlO1xuICAgIGxldCBuZXdDb3VudHJ5Q29kZTogc3RyaW5nO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZ2V0Rm9ybSgpXG4gICAgICAgID8uZ2V0KCdjb3VudHJ5Lmlzb2NvZGUnKVxuICAgICAgICA/LnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICAgIGZpbHRlcigoY291bnRyeUlzb0NvZGUpID0+IEJvb2xlYW4oY291bnRyeUlzb0NvZGUpKSxcbiAgICAgICAgICBzd2l0Y2hNYXAoKGNvdW50cnlJc29Db2RlKSA9PiB7XG4gICAgICAgICAgICBuZXdDb3VudHJ5Q29kZSA9IGNvdW50cnlJc29Db2RlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXNlckFkZHJlc3NTZXJ2aWNlLmdldFJlZ2lvbnMoY291bnRyeUlzb0NvZGUpO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIHRhcCgocmVnaW9uczogUmVnaW9uW10pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlZ2lvbkNvbnRyb2wgPSB0aGlzLmZvcm0/LmdldCgncmVnaW9uLmlzb2NvZGUnKTtcbiAgICAgICAgICAgIGlmICghcmVnaW9ucyB8fCByZWdpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICByZWdpb25Db250cm9sPy5kaXNhYmxlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWdpb25Db250cm9sPy5lbmFibGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZENvdW50cnlDb2RlICYmIG5ld0NvdW50cnlDb2RlICE9PSBzZWxlY3RlZENvdW50cnlDb2RlKSB7XG4gICAgICAgICAgICAgIHJlZ2lvbkNvbnRyb2w/LnJlc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxlY3RlZENvdW50cnlDb2RlID0gbmV3Q291bnRyeUNvZGU7XG4gICAgICAgICAgfSlcbiAgICAgICAgKSA/PyBvZihbXSlcbiAgICApO1xuICB9XG59XG4iXX0=