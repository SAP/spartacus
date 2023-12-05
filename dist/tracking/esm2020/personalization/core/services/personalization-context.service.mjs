/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, inject, isDevMode } from '@angular/core';
import { LoggerService, } from '@spartacus/core';
import { EMPTY } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/tracking/personalization/root";
import * as i2 from "@spartacus/core";
export class PersonalizationContextService {
    constructor(config, cmsService) {
        this.config = config;
        this.cmsService = cmsService;
        this.logger = inject(LoggerService);
    }
    getPersonalizationContext() {
        if (!this.config.personalization?.context) {
            if (isDevMode()) {
                this.logger.warn(`There is no context configured in Personalization.`);
            }
            return EMPTY;
        }
        else {
            const context = this.config.personalization.context;
            return this.cmsService.getCurrentPage().pipe(filter(Boolean), map((page) => page.slots?.[context.slotPosition]), filter(Boolean), map((slot) => {
                const scriptComponent = slot.components?.find((i) => i.uid === context.componentId);
                return this.buildPersonalizationContext(scriptComponent?.properties?.script?.data);
            }));
        }
    }
    buildPersonalizationContext(data) {
        if (data) {
            const context = JSON.parse(atob(data));
            context.actions.forEach((action) => {
                Object.keys(action).forEach((key) => {
                    action[key] = atob(action[key]);
                });
            });
            for (let i = 0; i < context.segments.length; i++) {
                context.segments[i] = atob(context.segments[i]);
            }
            return context;
        }
    }
}
PersonalizationContextService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationContextService, deps: [{ token: i1.PersonalizationConfig }, { token: i2.CmsService }], target: i0.ɵɵFactoryTarget.Injectable });
PersonalizationContextService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationContextService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationContextService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.PersonalizationConfig }, { type: i2.CmsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29uYWxpemF0aW9uLWNvbnRleHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy90cmFja2luZy9wZXJzb25hbGl6YXRpb24vY29yZS9zZXJ2aWNlcy9wZXJzb25hbGl6YXRpb24tY29udGV4dC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUdMLGFBQWEsR0FFZCxNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQU03QyxNQUFNLE9BQU8sNkJBQTZCO0lBR3hDLFlBQ1ksTUFBNkIsRUFDN0IsVUFBc0I7UUFEdEIsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7UUFDN0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUp4QixXQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBS3RDLENBQUM7SUFFSix5QkFBeUI7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLE9BQU8sRUFBRTtZQUN6QyxJQUFJLFNBQVMsRUFBRSxFQUFFO2dCQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9EQUFvRCxDQUFDLENBQUM7YUFDeEU7WUFDRCxPQUFPLEtBQUssQ0FBQztTQUNkO2FBQU07WUFDTCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7WUFDcEQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FDMUMsTUFBTSxDQUFPLE9BQU8sQ0FBQyxFQUNyQixHQUFHLENBQUMsQ0FBQyxJQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsRUFDdkQsTUFBTSxDQUFNLE9BQU8sQ0FBQyxFQUNwQixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDWCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FDM0MsQ0FBQyxDQUEyQixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLE9BQU8sQ0FBQyxXQUFXLENBQy9ELENBQUM7Z0JBQ0YsT0FBTyxJQUFJLENBQUMsMkJBQTJCLENBQ3JDLGVBQWUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FDMUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUNILENBQUM7U0FDSDtJQUNILENBQUM7SUFFTywyQkFBMkIsQ0FDakMsSUFBWTtRQUVaLElBQUksSUFBSSxFQUFFO1lBQ1IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2QyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFO2dCQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO29CQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0gsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNoRCxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakQ7WUFDRCxPQUFPLE9BQU8sQ0FBQztTQUNoQjtJQUNILENBQUM7OzBIQS9DVSw2QkFBNkI7OEhBQTdCLDZCQUE2QixjQUY1QixNQUFNOzJGQUVQLDZCQUE2QjtrQkFIekMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpbmplY3QsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ21zU2VydmljZSxcbiAgQ29udGVudFNsb3RDb21wb25lbnREYXRhLFxuICBMb2dnZXJTZXJ2aWNlLFxuICBQYWdlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUGVyc29uYWxpemF0aW9uQ29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy90cmFja2luZy9wZXJzb25hbGl6YXRpb24vcm9vdCc7XG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBQZXJzb25hbGl6YXRpb25Db250ZXh0IH0gZnJvbSAnLi4vbW9kZWwvcGVyc29uYWxpemF0aW9uLWNvbnRleHQubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUGVyc29uYWxpemF0aW9uQ29udGV4dFNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgbG9nZ2VyID0gaW5qZWN0KExvZ2dlclNlcnZpY2UpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb25maWc6IFBlcnNvbmFsaXphdGlvbkNvbmZpZyxcbiAgICBwcm90ZWN0ZWQgY21zU2VydmljZTogQ21zU2VydmljZVxuICApIHt9XG5cbiAgZ2V0UGVyc29uYWxpemF0aW9uQ29udGV4dCgpOiBPYnNlcnZhYmxlPFBlcnNvbmFsaXphdGlvbkNvbnRleHQgfCB1bmRlZmluZWQ+IHtcbiAgICBpZiAoIXRoaXMuY29uZmlnLnBlcnNvbmFsaXphdGlvbj8uY29udGV4dCkge1xuICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYFRoZXJlIGlzIG5vIGNvbnRleHQgY29uZmlndXJlZCBpbiBQZXJzb25hbGl6YXRpb24uYCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gRU1QVFk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbmZpZy5wZXJzb25hbGl6YXRpb24uY29udGV4dDtcbiAgICAgIHJldHVybiB0aGlzLmNtc1NlcnZpY2UuZ2V0Q3VycmVudFBhZ2UoKS5waXBlKFxuICAgICAgICBmaWx0ZXI8UGFnZT4oQm9vbGVhbiksXG4gICAgICAgIG1hcCgocGFnZTogUGFnZSkgPT4gcGFnZS5zbG90cz8uW2NvbnRleHQuc2xvdFBvc2l0aW9uXSksXG4gICAgICAgIGZpbHRlcjxhbnk+KEJvb2xlYW4pLFxuICAgICAgICBtYXAoKHNsb3QpID0+IHtcbiAgICAgICAgICBjb25zdCBzY3JpcHRDb21wb25lbnQgPSBzbG90LmNvbXBvbmVudHM/LmZpbmQoXG4gICAgICAgICAgICAoaTogQ29udGVudFNsb3RDb21wb25lbnREYXRhKSA9PiBpLnVpZCA9PT0gY29udGV4dC5jb21wb25lbnRJZFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRQZXJzb25hbGl6YXRpb25Db250ZXh0KFxuICAgICAgICAgICAgc2NyaXB0Q29tcG9uZW50Py5wcm9wZXJ0aWVzPy5zY3JpcHQ/LmRhdGFcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkUGVyc29uYWxpemF0aW9uQ29udGV4dChcbiAgICBkYXRhOiBzdHJpbmdcbiAgKTogUGVyc29uYWxpemF0aW9uQ29udGV4dCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSBKU09OLnBhcnNlKGF0b2IoZGF0YSkpO1xuICAgICAgY29udGV4dC5hY3Rpb25zLmZvckVhY2goKGFjdGlvbjogYW55KSA9PiB7XG4gICAgICAgIE9iamVjdC5rZXlzKGFjdGlvbikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgYWN0aW9uW2tleV0gPSBhdG9iKGFjdGlvbltrZXldKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGV4dC5zZWdtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb250ZXh0LnNlZ21lbnRzW2ldID0gYXRvYihjb250ZXh0LnNlZ21lbnRzW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cbiAgfVxufVxuIl19