/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FeatureConfigService, provideDefaultConfig } from '@spartacus/core';
import { defaultDirectionConfig } from './config/default-direction.config';
import { DirectionService } from './direction.service';
import * as i0 from "@angular/core";
export function initHtmlDirAttribute(directionService, featureConfigService) {
    const result = () => {
        if (featureConfigService.isLevel('2.1')) {
            return directionService.initialize();
        }
    };
    return result;
}
/**
 * Provides a configuration and APP_INITIALIZER to add the correct (language drive) html direction.
 */
export class DirectionModule {
}
DirectionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DirectionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DirectionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: DirectionModule });
DirectionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DirectionModule, providers: [
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: initHtmlDirAttribute,
            deps: [DirectionService, FeatureConfigService],
        },
        provideDefaultConfig(defaultDirectionConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DirectionModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        {
                            provide: APP_INITIALIZER,
                            multi: true,
                            useFactory: initHtmlDirAttribute,
                            deps: [DirectionService, FeatureConfigService],
                        },
                        provideDefaultConfig(defaultDirectionConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvbGF5b3V0L2RpcmVjdGlvbi9kaXJlY3Rpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFFdkQsTUFBTSxVQUFVLG9CQUFvQixDQUNsQyxnQkFBa0MsRUFDbEMsb0JBQTBDO0lBRTFDLE1BQU0sTUFBTSxHQUFHLEdBQUcsRUFBRTtRQUNsQixJQUFJLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN2QyxPQUFPLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQyxDQUFDO0lBQ0YsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVEOztHQUVHO0FBWUgsTUFBTSxPQUFPLGVBQWU7OzRHQUFmLGVBQWU7NkdBQWYsZUFBZTs2R0FBZixlQUFlLGFBVmY7UUFDVDtZQUNFLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLEtBQUssRUFBRSxJQUFJO1lBQ1gsVUFBVSxFQUFFLG9CQUFvQjtZQUNoQyxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQztTQUMvQztRQUNELG9CQUFvQixDQUFDLHNCQUFzQixDQUFDO0tBQzdDOzJGQUVVLGVBQWU7a0JBWDNCLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxlQUFlOzRCQUN4QixLQUFLLEVBQUUsSUFBSTs0QkFDWCxVQUFVLEVBQUUsb0JBQW9COzRCQUNoQyxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQzt5QkFDL0M7d0JBQ0Qsb0JBQW9CLENBQUMsc0JBQXNCLENBQUM7cUJBQzdDO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQVBQX0lOSVRJQUxJWkVSLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmVhdHVyZUNvbmZpZ1NlcnZpY2UsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGRlZmF1bHREaXJlY3Rpb25Db25maWcgfSBmcm9tICcuL2NvbmZpZy9kZWZhdWx0LWRpcmVjdGlvbi5jb25maWcnO1xuaW1wb3J0IHsgRGlyZWN0aW9uU2VydmljZSB9IGZyb20gJy4vZGlyZWN0aW9uLnNlcnZpY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdEh0bWxEaXJBdHRyaWJ1dGUoXG4gIGRpcmVjdGlvblNlcnZpY2U6IERpcmVjdGlvblNlcnZpY2UsXG4gIGZlYXR1cmVDb25maWdTZXJ2aWNlOiBGZWF0dXJlQ29uZmlnU2VydmljZVxuKTogKCkgPT4gdm9pZCB7XG4gIGNvbnN0IHJlc3VsdCA9ICgpID0+IHtcbiAgICBpZiAoZmVhdHVyZUNvbmZpZ1NlcnZpY2UuaXNMZXZlbCgnMi4xJykpIHtcbiAgICAgIHJldHVybiBkaXJlY3Rpb25TZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogUHJvdmlkZXMgYSBjb25maWd1cmF0aW9uIGFuZCBBUFBfSU5JVElBTElaRVIgdG8gYWRkIHRoZSBjb3JyZWN0IChsYW5ndWFnZSBkcml2ZSkgaHRtbCBkaXJlY3Rpb24uXG4gKi9cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgdXNlRmFjdG9yeTogaW5pdEh0bWxEaXJBdHRyaWJ1dGUsXG4gICAgICBkZXBzOiBbRGlyZWN0aW9uU2VydmljZSwgRmVhdHVyZUNvbmZpZ1NlcnZpY2VdLFxuICAgIH0sXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdERpcmVjdGlvbkNvbmZpZyksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIERpcmVjdGlvbk1vZHVsZSB7fVxuIl19