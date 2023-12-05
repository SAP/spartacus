/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, } from '@angular/forms';
import { CustomFormValidators } from '@spartacus/storefront';
import { FormService } from '../../shared/form/form.service';
import * as i0 from "@angular/core";
export class UnitFormService extends FormService {
    patchData(item) {
        this.toggleParentUnit(item);
        super.patchData(item);
    }
    build() {
        const form = new UntypedFormGroup({});
        form.setControl('uid', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.noSpecialCharacters,
        ]));
        form.setControl('name', new UntypedFormControl('', Validators.required));
        form.setControl('approvalProcess', new UntypedFormGroup({
            code: new UntypedFormControl(null),
        }));
        this.form = form;
        this.toggleParentUnit();
    }
    toggleParentUnit(item) {
        if (this.isRootUnit(item)) {
            this.form?.removeControl('parentOrgUnit');
        }
        else if (!this.form?.get('parentOrgUnit')) {
            this.form?.setControl('parentOrgUnit', new UntypedFormGroup({
                uid: new UntypedFormControl(null, Validators.required),
            }));
        }
    }
    isRootUnit(item) {
        // as we don't have full response after toggle item status,
        // we have situation where we have object like {uid, active},
        // so decided to check name as alternative required property
        return Boolean(item?.uid &&
            item?.name &&
            (!item?.parentOrgUnit || item?.uid === item?.parentOrgUnit));
    }
}
UnitFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitFormService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UnitFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitFormService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1mb3JtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9mb3JtL3VuaXQtZm9ybS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFDTCxrQkFBa0IsRUFDbEIsZ0JBQWdCLEVBQ2hCLFVBQVUsR0FDWCxNQUFNLGdCQUFnQixDQUFDO0FBRXhCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFLN0QsTUFBTSxPQUFPLGVBQWdCLFNBQVEsV0FBb0I7SUFDN0MsU0FBUyxDQUFDLElBQWM7UUFDaEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVTLEtBQUs7UUFDYixNQUFNLElBQUksR0FBRyxJQUFJLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQ2IsS0FBSyxFQUNMLElBQUksa0JBQWtCLENBQUMsRUFBRSxFQUFFO1lBQ3pCLFVBQVUsQ0FBQyxRQUFRO1lBQ25CLG9CQUFvQixDQUFDLG1CQUFtQjtTQUN6QyxDQUFDLENBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksa0JBQWtCLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRXpFLElBQUksQ0FBQyxVQUFVLENBQ2IsaUJBQWlCLEVBQ2pCLElBQUksZ0JBQWdCLENBQUM7WUFDbkIsSUFBSSxFQUFFLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDO1NBQ25DLENBQUMsQ0FDSCxDQUFDO1FBRUYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVTLGdCQUFnQixDQUFDLElBQWM7UUFDdkMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQzNDO2FBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUNuQixlQUFlLEVBQ2YsSUFBSSxnQkFBZ0IsQ0FBQztnQkFDbkIsR0FBRyxFQUFFLElBQUksa0JBQWtCLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7YUFDdkQsQ0FBQyxDQUNILENBQUM7U0FDSDtJQUNILENBQUM7SUFFUyxVQUFVLENBQUMsSUFBeUI7UUFDNUMsMkRBQTJEO1FBQzNELDZEQUE2RDtRQUM3RCw0REFBNEQ7UUFDNUQsT0FBTyxPQUFPLENBQ1osSUFBSSxFQUFFLEdBQUc7WUFDUCxJQUFJLEVBQUUsSUFBSTtZQUNWLENBQUMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxJQUFJLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUM5RCxDQUFDO0lBQ0osQ0FBQzs7NEdBbERVLGVBQWU7Z0hBQWYsZUFBZSxjQUZkLE1BQU07MkZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBVbnR5cGVkRm9ybUNvbnRyb2wsXG4gIFVudHlwZWRGb3JtR3JvdXAsXG4gIFZhbGlkYXRvcnMsXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEIyQlVuaXQgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ3VzdG9tRm9ybVZhbGlkYXRvcnMgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgRm9ybVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvZm9ybS9mb3JtLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVW5pdEZvcm1TZXJ2aWNlIGV4dGVuZHMgRm9ybVNlcnZpY2U8QjJCVW5pdD4ge1xuICBwcm90ZWN0ZWQgcGF0Y2hEYXRhKGl0ZW0/OiBCMkJVbml0KSB7XG4gICAgdGhpcy50b2dnbGVQYXJlbnRVbml0KGl0ZW0pO1xuICAgIHN1cGVyLnBhdGNoRGF0YShpdGVtKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBidWlsZCgpIHtcbiAgICBjb25zdCBmb3JtID0gbmV3IFVudHlwZWRGb3JtR3JvdXAoe30pO1xuICAgIGZvcm0uc2V0Q29udHJvbChcbiAgICAgICd1aWQnLFxuICAgICAgbmV3IFVudHlwZWRGb3JtQ29udHJvbCgnJywgW1xuICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICBDdXN0b21Gb3JtVmFsaWRhdG9ycy5ub1NwZWNpYWxDaGFyYWN0ZXJzLFxuICAgICAgXSlcbiAgICApO1xuICAgIGZvcm0uc2V0Q29udHJvbCgnbmFtZScsIG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woJycsIFZhbGlkYXRvcnMucmVxdWlyZWQpKTtcblxuICAgIGZvcm0uc2V0Q29udHJvbChcbiAgICAgICdhcHByb3ZhbFByb2Nlc3MnLFxuICAgICAgbmV3IFVudHlwZWRGb3JtR3JvdXAoe1xuICAgICAgICBjb2RlOiBuZXcgVW50eXBlZEZvcm1Db250cm9sKG51bGwpLFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgICB0aGlzLnRvZ2dsZVBhcmVudFVuaXQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCB0b2dnbGVQYXJlbnRVbml0KGl0ZW0/OiBCMkJVbml0KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNSb290VW5pdChpdGVtKSkge1xuICAgICAgdGhpcy5mb3JtPy5yZW1vdmVDb250cm9sKCdwYXJlbnRPcmdVbml0Jyk7XG4gICAgfSBlbHNlIGlmICghdGhpcy5mb3JtPy5nZXQoJ3BhcmVudE9yZ1VuaXQnKSkge1xuICAgICAgdGhpcy5mb3JtPy5zZXRDb250cm9sKFxuICAgICAgICAncGFyZW50T3JnVW5pdCcsXG4gICAgICAgIG5ldyBVbnR5cGVkRm9ybUdyb3VwKHtcbiAgICAgICAgICB1aWQ6IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2wobnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZCksXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBpc1Jvb3RVbml0KGl0ZW06IEIyQlVuaXQgfCB1bmRlZmluZWQpOiBib29sZWFuIHtcbiAgICAvLyBhcyB3ZSBkb24ndCBoYXZlIGZ1bGwgcmVzcG9uc2UgYWZ0ZXIgdG9nZ2xlIGl0ZW0gc3RhdHVzLFxuICAgIC8vIHdlIGhhdmUgc2l0dWF0aW9uIHdoZXJlIHdlIGhhdmUgb2JqZWN0IGxpa2Uge3VpZCwgYWN0aXZlfSxcbiAgICAvLyBzbyBkZWNpZGVkIHRvIGNoZWNrIG5hbWUgYXMgYWx0ZXJuYXRpdmUgcmVxdWlyZWQgcHJvcGVydHlcbiAgICByZXR1cm4gQm9vbGVhbihcbiAgICAgIGl0ZW0/LnVpZCAmJlxuICAgICAgICBpdGVtPy5uYW1lICYmXG4gICAgICAgICghaXRlbT8ucGFyZW50T3JnVW5pdCB8fCBpdGVtPy51aWQgPT09IGl0ZW0/LnBhcmVudE9yZ1VuaXQpXG4gICAgKTtcbiAgfVxufVxuIl19