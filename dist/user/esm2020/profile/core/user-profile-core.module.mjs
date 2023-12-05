/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { UserProfileConnector } from './connectors/user-profile.connector';
import { facadeProviders } from './facade/facade-providers';
import * as i0 from "@angular/core";
export class UserProfileCoreModule {
}
UserProfileCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserProfileCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserProfileCoreModule });
UserProfileCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileCoreModule, providers: [UserProfileConnector, ...facadeProviders] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserProfileCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [UserProfileConnector, ...facadeProviders],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wcm9maWxlLWNvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvcHJvZmlsZS9jb3JlL3VzZXItcHJvZmlsZS1jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBSzVELE1BQU0sT0FBTyxxQkFBcUI7O2tIQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQjttSEFBckIscUJBQXFCLGFBRnJCLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxlQUFlLENBQUM7MkZBRTFDLHFCQUFxQjtrQkFIakMsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLGVBQWUsQ0FBQztpQkFDdEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXNlclByb2ZpbGVDb25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvdXNlci1wcm9maWxlLmNvbm5lY3Rvcic7XG5pbXBvcnQgeyBmYWNhZGVQcm92aWRlcnMgfSBmcm9tICcuL2ZhY2FkZS9mYWNhZGUtcHJvdmlkZXJzJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbVXNlclByb2ZpbGVDb25uZWN0b3IsIC4uLmZhY2FkZVByb3ZpZGVyc10sXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJQcm9maWxlQ29yZU1vZHVsZSB7fVxuIl19