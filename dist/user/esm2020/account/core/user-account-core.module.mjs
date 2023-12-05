/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { UserAccountConnector } from './connectors/index';
import { facadeProviders } from './facade/facade-providers';
import * as i0 from "@angular/core";
export class UserAccountCoreModule {
}
UserAccountCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserAccountCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserAccountCoreModule });
UserAccountCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountCoreModule, providers: [UserAccountConnector, ...facadeProviders] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAccountCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [UserAccountConnector, ...facadeProviders],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1hY2NvdW50LWNvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvYWNjb3VudC9jb3JlL3VzZXItYWNjb3VudC1jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBSzVELE1BQU0sT0FBTyxxQkFBcUI7O2tIQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQjttSEFBckIscUJBQXFCLGFBRnJCLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxlQUFlLENBQUM7MkZBRTFDLHFCQUFxQjtrQkFIakMsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLGVBQWUsQ0FBQztpQkFDdEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXNlckFjY291bnRDb25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvaW5kZXgnO1xuaW1wb3J0IHsgZmFjYWRlUHJvdmlkZXJzIH0gZnJvbSAnLi9mYWNhZGUvZmFjYWRlLXByb3ZpZGVycyc7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1VzZXJBY2NvdW50Q29ubmVjdG9yLCAuLi5mYWNhZGVQcm92aWRlcnNdLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyQWNjb3VudENvcmVNb2R1bGUge31cbiJdfQ==