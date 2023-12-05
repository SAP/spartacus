/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAX_ENTRIES_FOR_ATTACHMENT, MAX_INPUT_CHARACTERS, MAX_INPUT_CHARACTERS_FOR_SUBJECT, MAX_SIZE_FOR_ATTACHMENT, } from '@spartacus/customer-ticketing/root';
import { ICON_TYPE, } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/customer-ticketing/root";
import * as i3 from "@spartacus/core";
export class CustomerTicketingDialogComponent {
    get messagesCharacterLeft() {
        return (this.inputCharactersLimit - (this.form.get('message')?.value?.length || 0));
    }
    get subjectCharacterLeft() {
        return (this.inputCharactersForSubject -
            (this.form.get('subject')?.value?.length || 0));
    }
    get allowedTypes() {
        return this.customerTicketingConfig.customerTicketing
            ?.attachmentRestrictions?.allowedTypes;
    }
    get getInputCharactersLimit() {
        return (this.customerTicketingConfig.customerTicketing?.inputCharactersLimit ??
            MAX_INPUT_CHARACTERS);
    }
    get getInputCharactersForSubject() {
        return (this.customerTicketingConfig.customerTicketing
            ?.inputCharactersLimitForSubject ?? MAX_INPUT_CHARACTERS_FOR_SUBJECT);
    }
    get maxSize() {
        return (this.customerTicketingConfig.customerTicketing?.attachmentRestrictions
            ?.maxSize ?? MAX_SIZE_FOR_ATTACHMENT);
    }
    handleClick(event) {
        if (event.target.tagName === this.el.nativeElement.tagName) {
            this.close('Click outside of the window');
        }
    }
    constructor(launchDialogService, el, customerTicketingConfig, filesFormValidators, customerTicketingFacade, routingService) {
        this.launchDialogService = launchDialogService;
        this.el = el;
        this.customerTicketingConfig = customerTicketingConfig;
        this.filesFormValidators = filesFormValidators;
        this.customerTicketingFacade = customerTicketingFacade;
        this.routingService = routingService;
        this.iconTypes = ICON_TYPE;
        this.inputCharactersLimit = this.getInputCharactersLimit;
        this.inputCharactersForSubject = this.getInputCharactersForSubject;
        this.isDataLoading$ = new BehaviorSubject(false);
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'button',
            focusOnEscape: true,
        };
    }
    buildForm() {
        const form = new FormGroup({});
        form.setControl('message', new FormControl('', [
            Validators.required,
            Validators.maxLength(this.inputCharactersLimit),
        ]));
        form.setControl('file', new FormControl('', [
            this.filesFormValidators.maxSize(this.maxSize),
            this.filesFormValidators.maxEntries(MAX_ENTRIES_FOR_ATTACHMENT),
            this.filesFormValidators.allowedTypes(this.allowedTypes),
        ]));
        this.form = form;
    }
    close(reason) {
        this.launchDialogService.closeDialog(reason);
    }
}
CustomerTicketingDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingDialogComponent, deps: [{ token: i1.LaunchDialogService }, { token: i0.ElementRef }, { token: i2.CustomerTicketingConfig }, { token: i1.FilesFormValidators }, { token: i2.CustomerTicketingFacade }, { token: i3.RoutingService }], target: i0.ɵɵFactoryTarget.Directive });
CustomerTicketingDialogComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: CustomerTicketingDialogComponent, host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingDialogComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: i0.ElementRef }, { type: i2.CustomerTicketingConfig }, { type: i1.FilesFormValidators }, { type: i2.CustomerTicketingFacade }, { type: i3.RoutingService }]; }, propDecorators: { handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdGlja2V0aW5nLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY3VzdG9tZXItdGlja2V0aW5nL2NvbXBvbmVudHMvc2hhcmVkL2N1c3RvbWVyLXRpY2tldGluZy1kaWFsb2cvY3VzdG9tZXItdGlja2V0aW5nLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQWMsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXBFLE9BQU8sRUFHTCwwQkFBMEIsRUFDMUIsb0JBQW9CLEVBQ3BCLGdDQUFnQyxFQUNoQyx1QkFBdUIsR0FDeEIsTUFBTSxvQ0FBb0MsQ0FBQztBQUM1QyxPQUFPLEVBR0wsU0FBUyxHQUVWLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFHdkMsTUFBTSxPQUFnQixnQ0FBZ0M7SUFnQnBELElBQUkscUJBQXFCO1FBQ3ZCLE9BQU8sQ0FDTCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUMzRSxDQUFDO0lBQ0osQ0FBQztJQUVELElBQUksb0JBQW9CO1FBQ3RCLE9BQU8sQ0FDTCxJQUFJLENBQUMseUJBQXlCO1lBQzlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FDL0MsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJLFlBQVk7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QUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0aW5nU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBDdXN0b21lclRpY2tldGluZ0NvbmZpZyxcbiAgQ3VzdG9tZXJUaWNrZXRpbmdGYWNhZGUsXG4gIE1BWF9FTlRSSUVTX0ZPUl9BVFRBQ0hNRU5ULFxuICBNQVhfSU5QVVRfQ0hBUkFDVEVSUyxcbiAgTUFYX0lOUFVUX0NIQVJBQ1RFUlNfRk9SX1NVQkpFQ1QsXG4gIE1BWF9TSVpFX0ZPUl9BVFRBQ0hNRU5ULFxufSBmcm9tICdAc3BhcnRhY3VzL2N1c3RvbWVyLXRpY2tldGluZy9yb290JztcbmltcG9ydCB7XG4gIEZpbGVzRm9ybVZhbGlkYXRvcnMsXG4gIEZvY3VzQ29uZmlnLFxuICBJQ09OX1RZUEUsXG4gIExhdW5jaERpYWxvZ1NlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ3VzdG9tZXJUaWNrZXRpbmdEaWFsb2dDb21wb25lbnQge1xuICBpY29uVHlwZXMgPSBJQ09OX1RZUEU7XG4gIGZvcm06IEZvcm1Hcm91cDtcbiAgaW5wdXRDaGFyYWN0ZXJzTGltaXQ6IG51bWJlciA9IHRoaXMuZ2V0SW5wdXRDaGFyYWN0ZXJzTGltaXQ7XG4gIGlucHV0Q2hhcmFjdGVyc0ZvclN1YmplY3Q6IG51bWJlciA9IHRoaXMuZ2V0SW5wdXRDaGFyYWN0ZXJzRm9yU3ViamVjdDtcbiAgaXNEYXRhTG9hZGluZyQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oXG4gICAgZmFsc2VcbiAgKTtcblxuICBmb2N1c0NvbmZpZzogRm9jdXNDb25maWcgPSB7XG4gICAgdHJhcDogdHJ1ZSxcbiAgICBibG9jazogdHJ1ZSxcbiAgICBhdXRvZm9jdXM6ICdidXR0b24nLFxuICAgIGZvY3VzT25Fc2NhcGU6IHRydWUsXG4gIH07XG5cbiAgZ2V0IG1lc3NhZ2VzQ2hhcmFjdGVyTGVmdCgpOiBudW1iZXIge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmlucHV0Q2hhcmFjdGVyc0xpbWl0IC0gKHRoaXMuZm9ybS5nZXQoJ21lc3NhZ2UnKT8udmFsdWU/Lmxlbmd0aCB8fCAwKVxuICAgICk7XG4gIH1cblxuICBnZXQgc3ViamVjdENoYXJhY3RlckxlZnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5pbnB1dENoYXJhY3RlcnNGb3JTdWJqZWN0IC1cbiAgICAgICh0aGlzLmZvcm0uZ2V0KCdzdWJqZWN0Jyk/LnZhbHVlPy5sZW5ndGggfHwgMClcbiAgICApO1xuICB9XG5cbiAgZ2V0IGFsbG93ZWRUeXBlcygpOiBzdHJpbmdbXSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuY3VzdG9tZXJUaWNrZXRpbmdDb25maWcuY3VzdG9tZXJUaWNrZXRpbmdcbiAgICAgID8uYXR0YWNobWVudFJlc3RyaWN0aW9ucz8uYWxsb3dlZFR5cGVzO1xuICB9XG5cbiAgZ2V0IGdldElucHV0Q2hhcmFjdGVyc0xpbWl0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuY3VzdG9tZXJUaWNrZXRpbmdDb25maWcuY3VzdG9tZXJUaWNrZXRpbmc/LmlucHV0Q2hhcmFjdGVyc0xpbWl0ID8/XG4gICAgICBNQVhfSU5QVVRfQ0hBUkFDVEVSU1xuICAgICk7XG4gIH1cblxuICBnZXQgZ2V0SW5wdXRDaGFyYWN0ZXJzRm9yU3ViamVjdCgpOiBudW1iZXIge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmN1c3RvbWVyVGlja2V0aW5nQ29uZmlnLmN1c3RvbWVyVGlja2V0aW5nXG4gICAgICAgID8uaW5wdXRDaGFyYWN0ZXJzTGltaXRGb3JTdWJqZWN0ID8/IE1BWF9JTlBVVF9DSEFSQUNURVJTX0ZPUl9TVUJKRUNUXG4gICAgKTtcbiAgfVxuXG4gIGdldCBtYXhTaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuY3VzdG9tZXJUaWNrZXRpbmdDb25maWcuY3VzdG9tZXJUaWNrZXRpbmc/LmF0dGFjaG1lbnRSZXN0cmljdGlvbnNcbiAgICAgICAgPy5tYXhTaXplID8/IE1BWF9TSVpFX0ZPUl9BVFRBQ0hNRU5UXG4gICAgKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgaGFuZGxlQ2xpY2soZXZlbnQ6IFVJRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoKGV2ZW50LnRhcmdldCBhcyBhbnkpLnRhZ05hbWUgPT09IHRoaXMuZWwubmF0aXZlRWxlbWVudC50YWdOYW1lKSB7XG4gICAgICB0aGlzLmNsb3NlKCdDbGljayBvdXRzaWRlIG9mIHRoZSB3aW5kb3cnKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgbGF1bmNoRGlhbG9nU2VydmljZTogTGF1bmNoRGlhbG9nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIGN1c3RvbWVyVGlja2V0aW5nQ29uZmlnOiBDdXN0b21lclRpY2tldGluZ0NvbmZpZyxcbiAgICBwcm90ZWN0ZWQgZmlsZXNGb3JtVmFsaWRhdG9yczogRmlsZXNGb3JtVmFsaWRhdG9ycyxcbiAgICBwcm90ZWN0ZWQgY3VzdG9tZXJUaWNrZXRpbmdGYWNhZGU6IEN1c3RvbWVyVGlja2V0aW5nRmFjYWRlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2VcbiAgKSB7fVxuXG4gIHByb3RlY3RlZCBidWlsZEZvcm0oKTogdm9pZCB7XG4gICAgY29uc3QgZm9ybSA9IG5ldyBGb3JtR3JvdXAoe30pO1xuICAgIGZvcm0uc2V0Q29udHJvbChcbiAgICAgICdtZXNzYWdlJyxcbiAgICAgIG5ldyBGb3JtQ29udHJvbCgnJywgW1xuICAgICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgICBWYWxpZGF0b3JzLm1heExlbmd0aCh0aGlzLmlucHV0Q2hhcmFjdGVyc0xpbWl0KSxcbiAgICAgIF0pXG4gICAgKTtcbiAgICBmb3JtLnNldENvbnRyb2woXG4gICAgICAnZmlsZScsXG4gICAgICBuZXcgRm9ybUNvbnRyb2woJycsIFtcbiAgICAgICAgdGhpcy5maWxlc0Zvcm1WYWxpZGF0b3JzLm1heFNpemUodGhpcy5tYXhTaXplKSxcbiAgICAgICAgdGhpcy5maWxlc0Zvcm1WYWxpZGF0b3JzLm1heEVudHJpZXMoTUFYX0VOVFJJRVNfRk9SX0FUVEFDSE1FTlQpLFxuICAgICAgICB0aGlzLmZpbGVzRm9ybVZhbGlkYXRvcnMuYWxsb3dlZFR5cGVzKHRoaXMuYWxsb3dlZFR5cGVzKSxcbiAgICAgIF0pXG4gICAgKTtcbiAgICB0aGlzLmZvcm0gPSBmb3JtO1xuICB9XG5cbiAgY2xvc2UocmVhc29uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmxhdW5jaERpYWxvZ1NlcnZpY2UuY2xvc2VEaWFsb2cocmVhc29uKTtcbiAgfVxufVxuIl19