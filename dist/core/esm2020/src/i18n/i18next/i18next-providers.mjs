/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { APP_INITIALIZER, inject } from '@angular/core';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { i18nextBackendProviders } from './i18next-backend/i18next-backend.providers';
import { I18nextInitializer } from './i18next-initializer';
export const i18nextProviders = [
    {
        provide: APP_INITIALIZER,
        useFactory: () => {
            const configInitializerService = inject(ConfigInitializerService);
            const i18nextInitializer = inject(I18nextInitializer);
            return () => configInitializerService
                .getStable('i18n')
                .toPromise()
                .then(() => i18nextInitializer.initialize());
        },
        multi: true,
    },
    ...i18nextBackendProviders,
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bmV4dC1wcm92aWRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9pMThuL2kxOG5leHQvaTE4bmV4dC1wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBQ3RHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTNELE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFlO0lBQzFDO1FBQ0UsT0FBTyxFQUFFLGVBQWU7UUFDeEIsVUFBVSxFQUFFLEdBQUcsRUFBRTtZQUNmLE1BQU0sd0JBQXdCLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDbEUsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN0RCxPQUFPLEdBQUcsRUFBRSxDQUNWLHdCQUF3QjtpQkFDckIsU0FBUyxDQUFDLE1BQU0sQ0FBQztpQkFDakIsU0FBUyxFQUFFO2lCQUNYLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFDRCxLQUFLLEVBQUUsSUFBSTtLQUNaO0lBRUQsR0FBRyx1QkFBdUI7Q0FDM0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEFQUF9JTklUSUFMSVpFUiwgaW5qZWN0LCBQcm92aWRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbmZpZy1pbml0aWFsaXplci9jb25maWctaW5pdGlhbGl6ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBpMThuZXh0QmFja2VuZFByb3ZpZGVycyB9IGZyb20gJy4vaTE4bmV4dC1iYWNrZW5kL2kxOG5leHQtYmFja2VuZC5wcm92aWRlcnMnO1xuaW1wb3J0IHsgSTE4bmV4dEluaXRpYWxpemVyIH0gZnJvbSAnLi9pMThuZXh0LWluaXRpYWxpemVyJztcblxuZXhwb3J0IGNvbnN0IGkxOG5leHRQcm92aWRlcnM6IFByb3ZpZGVyW10gPSBbXG4gIHtcbiAgICBwcm92aWRlOiBBUFBfSU5JVElBTElaRVIsXG4gICAgdXNlRmFjdG9yeTogKCkgPT4ge1xuICAgICAgY29uc3QgY29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlID0gaW5qZWN0KENvbmZpZ0luaXRpYWxpemVyU2VydmljZSk7XG4gICAgICBjb25zdCBpMThuZXh0SW5pdGlhbGl6ZXIgPSBpbmplY3QoSTE4bmV4dEluaXRpYWxpemVyKTtcbiAgICAgIHJldHVybiAoKSA9PlxuICAgICAgICBjb25maWdJbml0aWFsaXplclNlcnZpY2VcbiAgICAgICAgICAuZ2V0U3RhYmxlKCdpMThuJylcbiAgICAgICAgICAudG9Qcm9taXNlKClcbiAgICAgICAgICAudGhlbigoKSA9PiBpMThuZXh0SW5pdGlhbGl6ZXIuaW5pdGlhbGl6ZSgpKTtcbiAgICB9LFxuICAgIG11bHRpOiB0cnVlLFxuICB9LFxuXG4gIC4uLmkxOG5leHRCYWNrZW5kUHJvdmlkZXJzLFxuXTtcbiJdfQ==