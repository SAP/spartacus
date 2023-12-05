/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/add-to-home-screen.service";
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class AddToHomeScreenComponent {
    constructor(addToHomeScreenService) {
        this.addToHomeScreenService = addToHomeScreenService;
    }
    ngOnInit() {
        this.canPrompt$ = this.addToHomeScreenService.canPrompt$;
    }
    prompt() {
        this.addToHomeScreenService.firePrompt();
    }
}
AddToHomeScreenComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToHomeScreenComponent, deps: [{ token: i1.AddToHomeScreenService }], target: i0.ɵɵFactoryTarget.Directive });
AddToHomeScreenComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: AddToHomeScreenComponent, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddToHomeScreenComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.AddToHomeScreenService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXRvLWhvbWUtc2NyZWVuLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9wd2EvY29tcG9uZW50cy9hZGQtdG8taG9tZS1zY3JlZW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQVUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFLbEQsa0VBQWtFO0FBQ2xFLE1BQU0sT0FBZ0Isd0JBQXdCO0lBRTVDLFlBQXNCLHNCQUE4QztRQUE5QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO0lBQUcsQ0FBQztJQUV4RSxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDO0lBQzNELENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzNDLENBQUM7O3FIQVZtQix3QkFBd0I7eUdBQXhCLHdCQUF3QjsyRkFBeEIsd0JBQXdCO2tCQUY3QyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgT25Jbml0LCBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFkZFRvSG9tZVNjcmVlblNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hZGQtdG8taG9tZS1zY3JlZW4uc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoKVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtY2xhc3Mtc3VmZml4XG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWRkVG9Ib21lU2NyZWVuQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY2FuUHJvbXB0JDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFkZFRvSG9tZVNjcmVlblNlcnZpY2U6IEFkZFRvSG9tZVNjcmVlblNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jYW5Qcm9tcHQkID0gdGhpcy5hZGRUb0hvbWVTY3JlZW5TZXJ2aWNlLmNhblByb21wdCQ7XG4gIH1cblxuICBwcm9tcHQoKTogdm9pZCB7XG4gICAgdGhpcy5hZGRUb0hvbWVTY3JlZW5TZXJ2aWNlLmZpcmVQcm9tcHQoKTtcbiAgfVxufVxuIl19