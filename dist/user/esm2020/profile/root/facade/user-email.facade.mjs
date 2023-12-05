/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { USER_PROFILE_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class UserEmailFacade {
}
UserEmailFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserEmailFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UserEmailFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserEmailFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: UserEmailFacade,
        feature: USER_PROFILE_CORE_FEATURE,
        methods: ['update'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserEmailFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: UserEmailFacade,
                        feature: USER_PROFILE_CORE_FEATURE,
                        methods: ['update'],
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1lbWFpbC5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvdXNlci9wcm9maWxlL3Jvb3QvZmFjYWRlL3VzZXItZW1haWwuZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFXNUQsTUFBTSxPQUFnQixlQUFlOzs0R0FBZixlQUFlO2dIQUFmLGVBQWUsY0FSdkIsTUFBTSxjQUNOLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQztRQUNaLE1BQU0sRUFBRSxlQUFlO1FBQ3ZCLE9BQU8sRUFBRSx5QkFBeUI7UUFDbEMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO0tBQ3BCLENBQUM7MkZBRWdCLGVBQWU7a0JBVHBDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07b0JBQ2xCLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FDZixhQUFhLENBQUM7d0JBQ1osTUFBTSxpQkFBaUI7d0JBQ3ZCLE9BQU8sRUFBRSx5QkFBeUI7d0JBQ2xDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztxQkFDcEIsQ0FBQztpQkFDTCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZhY2FkZUZhY3RvcnkgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVVNFUl9QUk9GSUxFX0NPUkVfRkVBVFVSRSB9IGZyb20gJy4uL2ZlYXR1cmUtbmFtZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VGYWN0b3J5OiAoKSA9PlxuICAgIGZhY2FkZUZhY3Rvcnkoe1xuICAgICAgZmFjYWRlOiBVc2VyRW1haWxGYWNhZGUsXG4gICAgICBmZWF0dXJlOiBVU0VSX1BST0ZJTEVfQ09SRV9GRUFUVVJFLFxuICAgICAgbWV0aG9kczogWyd1cGRhdGUnXSxcbiAgICB9KSxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVXNlckVtYWlsRmFjYWRlIHtcbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIHVzZXIncyBlbWFpbC5cbiAgICpcbiAgICogQHBhcmFtIHBhc3N3b3JkIHRvIHVzZXJzIHBhc3N3b3JkIHRvIGNvbmZpcm0gdGhlIHVzZXJzXG4gICAqIEBwYXJhbSBuZXdVaWQgdGhlIG5ldyBwcm9wb3NlZCBlbWFpbCBhZGRyZXNzLlxuICAgKi9cbiAgYWJzdHJhY3QgdXBkYXRlKHBhc3N3b3JkOiBzdHJpbmcsIG5ld1VpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTx1bmtub3duPjtcbn1cbiJdfQ==