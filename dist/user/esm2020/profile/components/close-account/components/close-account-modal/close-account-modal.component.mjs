/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostListener, } from '@angular/core';
import { GlobalMessageType, } from '@spartacus/core';
import { ICON_TYPE, } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/user/profile/root";
import * as i3 from "@spartacus/storefront";
import * as i4 from "@angular/common";
export class CloseAccountModalComponent {
    handleClick(event) {
        if (event.target.tagName === this.el.nativeElement.tagName) {
            this.dismissModal('Cross click');
        }
    }
    constructor(authService, globalMessageService, routingService, translationService, userProfile, launchDialogService, el) {
        this.authService = authService;
        this.globalMessageService = globalMessageService;
        this.routingService = routingService;
        this.translationService = translationService;
        this.userProfile = userProfile;
        this.launchDialogService = launchDialogService;
        this.el = el;
        this.iconTypes = ICON_TYPE;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'button',
            focusOnEscape: true,
        };
        this.loading$ = new BehaviorSubject(false);
    }
    get isLoading$() {
        return this.loading$.asObservable();
    }
    ngOnInit() {
        this.isLoggedIn$ = this.authService.isUserLoggedIn();
    }
    onSuccess() {
        this.dismissModal('Success');
        this.translationService
            .translate('closeAccount.accountClosedSuccessfully')
            .pipe(first())
            .subscribe((text) => {
            this.globalMessageService.add(text, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        });
        this.authService.coreLogout().then(() => {
            this.routingService.go({ cxRoute: 'home' });
        });
    }
    onError() {
        this.dismissModal('Error');
        this.translationService
            .translate('closeAccount.accountClosedFailure')
            .pipe(first())
            .subscribe((text) => {
            this.globalMessageService.add(text, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    dismissModal(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    closeAccount() {
        this.loading$.next(true);
        this.userProfile.close().subscribe({
            next: () => {
                this.onSuccess();
                this.loading$.next(false);
            },
            error: () => {
                this.onError();
                this.loading$.next(false);
            },
        });
    }
}
CloseAccountModalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CloseAccountModalComponent, deps: [{ token: i1.AuthService }, { token: i1.GlobalMessageService }, { token: i1.RoutingService }, { token: i1.TranslationService }, { token: i2.UserProfileFacade }, { token: i3.LaunchDialogService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
CloseAccountModalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CloseAccountModalComponent, selector: "cx-close-account-modal", host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0, template: "<ng-container *ngIf=\"isLoggedIn$ | async\">\n  <div\n    class=\"cx-close-account-modal\"\n    [cxFocus]=\"focusConfig\"\n    (esc)=\"dismissModal('Escape click')\"\n  >\n    <div class=\"cx-close-account-modal-container\">\n      <div class=\"cx-close-account-modal-header cx-modal-header\">\n        <h3 class=\"cx-close-account-modal-title\">\n          {{ 'closeAccount.confirmAccountClosure' | cxTranslate }}\n        </h3>\n        <button\n          type=\"button\"\n          class=\"close\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          (click)=\"dismissModal('Cross click')\"\n        >\n          <span aria-hidden=\"true\">\n            <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n          </span>\n        </button>\n      </div>\n\n      <div *ngIf=\"isLoading$ | async; else loaded\">\n        <div class=\"cx-spinner\">\n          <cx-spinner> </cx-spinner>\n        </div>\n      </div>\n\n      <ng-template #loaded>\n        <div class=\"cx-close-account-modal-body modal-body\">\n          <p class=\"cx-confirmation\">\n            {{ 'closeAccount.confirmAccountClosureMessage' | cxTranslate }}\n          </p>\n        </div>\n        <div class=\"cx-close-account-modal-footer cx-modal-footer\">\n          <button class=\"btn btn-primary\" (click)=\"closeAccount()\">\n            {{ 'closeAccount.closeMyAccount' | cxTranslate }}\n          </button>\n          <button\n            (click)=\"dismissModal('Cancel')\"\n            class=\"btn btn-block btn-secondary\"\n          >\n            {{ 'common.cancel' | cxTranslate }}\n          </button>\n        </div>\n      </ng-template>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i3.SpinnerComponent, selector: "cx-spinner" }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CloseAccountModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-close-account-modal', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"isLoggedIn$ | async\">\n  <div\n    class=\"cx-close-account-modal\"\n    [cxFocus]=\"focusConfig\"\n    (esc)=\"dismissModal('Escape click')\"\n  >\n    <div class=\"cx-close-account-modal-container\">\n      <div class=\"cx-close-account-modal-header cx-modal-header\">\n        <h3 class=\"cx-close-account-modal-title\">\n          {{ 'closeAccount.confirmAccountClosure' | cxTranslate }}\n        </h3>\n        <button\n          type=\"button\"\n          class=\"close\"\n          [attr.aria-label]=\"'common.close' | cxTranslate\"\n          (click)=\"dismissModal('Cross click')\"\n        >\n          <span aria-hidden=\"true\">\n            <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n          </span>\n        </button>\n      </div>\n\n      <div *ngIf=\"isLoading$ | async; else loaded\">\n        <div class=\"cx-spinner\">\n          <cx-spinner> </cx-spinner>\n        </div>\n      </div>\n\n      <ng-template #loaded>\n        <div class=\"cx-close-account-modal-body modal-body\">\n          <p class=\"cx-confirmation\">\n            {{ 'closeAccount.confirmAccountClosureMessage' | cxTranslate }}\n          </p>\n        </div>\n        <div class=\"cx-close-account-modal-footer cx-modal-footer\">\n          <button class=\"btn btn-primary\" (click)=\"closeAccount()\">\n            {{ 'closeAccount.closeMyAccount' | cxTranslate }}\n          </button>\n          <button\n            (click)=\"dismissModal('Cancel')\"\n            class=\"btn btn-block btn-secondary\"\n          >\n            {{ 'common.cancel' | cxTranslate }}\n          </button>\n        </div>\n      </ng-template>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i1.GlobalMessageService }, { type: i1.RoutingService }, { type: i1.TranslationService }, { type: i2.UserProfileFacade }, { type: i3.LaunchDialogService }, { type: i0.ElementRef }]; }, propDecorators: { handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2UtYWNjb3VudC1tb2RhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvdXNlci9wcm9maWxlL2NvbXBvbmVudHMvY2xvc2UtYWNjb3VudC9jb21wb25lbnRzL2Nsb3NlLWFjY291bnQtbW9kYWwvY2xvc2UtYWNjb3VudC1tb2RhbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvdXNlci9wcm9maWxlL2NvbXBvbmVudHMvY2xvc2UtYWNjb3VudC9jb21wb25lbnRzL2Nsb3NlLWFjY291bnQtbW9kYWwvY2xvc2UtYWNjb3VudC1tb2RhbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsWUFBWSxHQUViLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFHTCxpQkFBaUIsR0FHbEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBRUwsU0FBUyxHQUVWLE1BQU0sdUJBQXVCLENBQUM7QUFFL0IsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQU92QyxNQUFNLE9BQU8sMEJBQTBCO0lBYXJDLFdBQVcsQ0FBQyxLQUFjO1FBQ3hCLElBQUssS0FBSyxDQUFDLE1BQWMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQ25FLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBRUQsWUFDWSxXQUF3QixFQUN4QixvQkFBMEMsRUFDMUMsY0FBOEIsRUFDOUIsa0JBQXNDLEVBQ3RDLFdBQThCLEVBQzlCLG1C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Q0Usd0JBQXdCLG1CQUVqQix1QkFBdUIsQ0FBQyxNQUFNOzhSQWUvQyxXQUFXO3NCQURWLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQXV0aFNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgUm91dGluZ1NlcnZpY2UsXG4gIFRyYW5zbGF0aW9uU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEZvY3VzQ29uZmlnLFxuICBJQ09OX1RZUEUsXG4gIExhdW5jaERpYWxvZ1NlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBVc2VyUHJvZmlsZUZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvdXNlci9wcm9maWxlL3Jvb3QnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtY2xvc2UtYWNjb3VudC1tb2RhbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jbG9zZS1hY2NvdW50LW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENsb3NlQWNjb3VudE1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgaWNvblR5cGVzID0gSUNPTl9UWVBFO1xuICBmb2N1c0NvbmZpZzogRm9jdXNDb25maWcgPSB7XG4gICAgdHJhcDogdHJ1ZSxcbiAgICBibG9jazogdHJ1ZSxcbiAgICBhdXRvZm9jdXM6ICdidXR0b24nLFxuICAgIGZvY3VzT25Fc2NhcGU6IHRydWUsXG4gIH07XG5cbiAgaXNMb2dnZWRJbiQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHByb3RlY3RlZCBsb2FkaW5nJCA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgaGFuZGxlQ2xpY2soZXZlbnQ6IFVJRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoKGV2ZW50LnRhcmdldCBhcyBhbnkpLnRhZ05hbWUgPT09IHRoaXMuZWwubmF0aXZlRWxlbWVudC50YWdOYW1lKSB7XG4gICAgICB0aGlzLmRpc21pc3NNb2RhbCgnQ3Jvc3MgY2xpY2snKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRpb25TZXJ2aWNlOiBUcmFuc2xhdGlvblNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVzZXJQcm9maWxlOiBVc2VyUHJvZmlsZUZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgbGF1bmNoRGlhbG9nU2VydmljZTogTGF1bmNoRGlhbG9nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZWw6IEVsZW1lbnRSZWZcbiAgKSB7fVxuXG4gIGdldCBpc0xvYWRpbmckKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmxvYWRpbmckLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pc0xvZ2dlZEluJCA9IHRoaXMuYXV0aFNlcnZpY2UuaXNVc2VyTG9nZ2VkSW4oKTtcbiAgfVxuXG4gIG9uU3VjY2VzcygpOiB2b2lkIHtcbiAgICB0aGlzLmRpc21pc3NNb2RhbCgnU3VjY2VzcycpO1xuICAgIHRoaXMudHJhbnNsYXRpb25TZXJ2aWNlXG4gICAgICAudHJhbnNsYXRlKCdjbG9zZUFjY291bnQuYWNjb3VudENsb3NlZFN1Y2Nlc3NmdWxseScpXG4gICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgLnN1YnNjcmliZSgodGV4dCkgPT4ge1xuICAgICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgICB0ZXh0LFxuICAgICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0NPTkZJUk1BVElPTlxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLmF1dGhTZXJ2aWNlLmNvcmVMb2dvdXQoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ28oeyBjeFJvdXRlOiAnaG9tZScgfSk7XG4gICAgfSk7XG4gIH1cblxuICBvbkVycm9yKCk6IHZvaWQge1xuICAgIHRoaXMuZGlzbWlzc01vZGFsKCdFcnJvcicpO1xuICAgIHRoaXMudHJhbnNsYXRpb25TZXJ2aWNlXG4gICAgICAudHJhbnNsYXRlKCdjbG9zZUFjY291bnQuYWNjb3VudENsb3NlZEZhaWx1cmUnKVxuICAgICAgLnBpcGUoZmlyc3QoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHRleHQpID0+IHtcbiAgICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQodGV4dCwgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1IpO1xuICAgICAgfSk7XG4gIH1cblxuICBkaXNtaXNzTW9kYWwocmVhc29uPzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLmNsb3NlRGlhbG9nKHJlYXNvbik7XG4gIH1cblxuICBjbG9zZUFjY291bnQoKSB7XG4gICAgdGhpcy5sb2FkaW5nJC5uZXh0KHRydWUpO1xuXG4gICAgdGhpcy51c2VyUHJvZmlsZS5jbG9zZSgpLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiAoKSA9PiB7XG4gICAgICAgIHRoaXMub25TdWNjZXNzKCk7XG4gICAgICAgIHRoaXMubG9hZGluZyQubmV4dChmYWxzZSk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6ICgpID0+IHtcbiAgICAgICAgdGhpcy5vbkVycm9yKCk7XG4gICAgICAgIHRoaXMubG9hZGluZyQubmV4dChmYWxzZSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiaXNMb2dnZWRJbiQgfCBhc3luY1wiPlxuICA8ZGl2XG4gICAgY2xhc3M9XCJjeC1jbG9zZS1hY2NvdW50LW1vZGFsXCJcbiAgICBbY3hGb2N1c109XCJmb2N1c0NvbmZpZ1wiXG4gICAgKGVzYyk9XCJkaXNtaXNzTW9kYWwoJ0VzY2FwZSBjbGljaycpXCJcbiAgPlxuICAgIDxkaXYgY2xhc3M9XCJjeC1jbG9zZS1hY2NvdW50LW1vZGFsLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cImN4LWNsb3NlLWFjY291bnQtbW9kYWwtaGVhZGVyIGN4LW1vZGFsLWhlYWRlclwiPlxuICAgICAgICA8aDMgY2xhc3M9XCJjeC1jbG9zZS1hY2NvdW50LW1vZGFsLXRpdGxlXCI+XG4gICAgICAgICAge3sgJ2Nsb3NlQWNjb3VudC5jb25maXJtQWNjb3VudENsb3N1cmUnIHwgY3hUcmFuc2xhdGUgfX1cbiAgICAgICAgPC9oMz5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIGNsYXNzPVwiY2xvc2VcIlxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ2NvbW1vbi5jbG9zZScgfCBjeFRyYW5zbGF0ZVwiXG4gICAgICAgICAgKGNsaWNrKT1cImRpc21pc3NNb2RhbCgnQ3Jvc3MgY2xpY2snKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgIDxjeC1pY29uIFt0eXBlXT1cImljb25UeXBlcy5DTE9TRVwiPjwvY3gtaWNvbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgKm5nSWY9XCJpc0xvYWRpbmckIHwgYXN5bmM7IGVsc2UgbG9hZGVkXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjeC1zcGlubmVyXCI+XG4gICAgICAgICAgPGN4LXNwaW5uZXI+IDwvY3gtc3Bpbm5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPG5nLXRlbXBsYXRlICNsb2FkZWQ+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjeC1jbG9zZS1hY2NvdW50LW1vZGFsLWJvZHkgbW9kYWwtYm9keVwiPlxuICAgICAgICAgIDxwIGNsYXNzPVwiY3gtY29uZmlybWF0aW9uXCI+XG4gICAgICAgICAgICB7eyAnY2xvc2VBY2NvdW50LmNvbmZpcm1BY2NvdW50Q2xvc3VyZU1lc3NhZ2UnIHwgY3hUcmFuc2xhdGUgfX1cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3gtY2xvc2UtYWNjb3VudC1tb2RhbC1mb290ZXIgY3gtbW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIChjbGljayk9XCJjbG9zZUFjY291bnQoKVwiPlxuICAgICAgICAgICAge3sgJ2Nsb3NlQWNjb3VudC5jbG9zZU15QWNjb3VudCcgfCBjeFRyYW5zbGF0ZSB9fVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIChjbGljayk9XCJkaXNtaXNzTW9kYWwoJ0NhbmNlbCcpXCJcbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1ibG9jayBidG4tc2Vjb25kYXJ5XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eyAnY29tbW9uLmNhbmNlbCcgfCBjeFRyYW5zbGF0ZSB9fVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG4iXX0=