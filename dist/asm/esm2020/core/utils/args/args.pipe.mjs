/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Use this pipe when you want to apply a (preferably) pure function (i.e. a function that doesn't use "this")
 *
 * Doing so is more efficient than directly calling the function in the template file because
 * the pipe will re-execute during a detection cycle only when the arguments have changed.
 *
 * ex:
 *
 * my-component.component.ts:
 * ```
 *   unfilteredArray = ['a', 'b', 'c', 'd', 'e']
 *   targetStrings = ['a', 'b', 'c'];
 *
 *    filterArrayByString(array: Array<string>, targetString: string): Array<string> {
 *     return array.filter((element) => element === targetString);
 *   }
 * ```
 *
 * my-component.component.html:
 * ```
 *   <div *ngFor="let targetString of targetStrings">
 *     <app-some-component [filteredArray]="filterArrayByString | cxArgs: unfilteredArray : targetString">
 *  </div>
 * ```
 */
export class ArgsPipe {
    transform(projectionFunction, ...args) {
        return projectionFunction(...args);
    }
}
ArgsPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ArgsPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
ArgsPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ArgsPipe, name: "cxArgs" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ArgsPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'cxArgs' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJncy5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jb3JlL3V0aWxzL2FyZ3MvYXJncy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFDcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILE1BQU0sT0FBTyxRQUFRO0lBQ25CLFNBQVMsQ0FDUCxrQkFBd0MsRUFDeEMsR0FBRyxJQUFPO1FBRVYsT0FBTyxrQkFBa0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7O3FHQU5VLFFBQVE7bUdBQVIsUUFBUTsyRkFBUixRQUFRO2tCQURwQixJQUFJO21CQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8qKlxuICogVXNlIHRoaXMgcGlwZSB3aGVuIHlvdSB3YW50IHRvIGFwcGx5IGEgKHByZWZlcmFibHkpIHB1cmUgZnVuY3Rpb24gKGkuZS4gYSBmdW5jdGlvbiB0aGF0IGRvZXNuJ3QgdXNlIFwidGhpc1wiKVxuICpcbiAqIERvaW5nIHNvIGlzIG1vcmUgZWZmaWNpZW50IHRoYW4gZGlyZWN0bHkgY2FsbGluZyB0aGUgZnVuY3Rpb24gaW4gdGhlIHRlbXBsYXRlIGZpbGUgYmVjYXVzZVxuICogdGhlIHBpcGUgd2lsbCByZS1leGVjdXRlIGR1cmluZyBhIGRldGVjdGlvbiBjeWNsZSBvbmx5IHdoZW4gdGhlIGFyZ3VtZW50cyBoYXZlIGNoYW5nZWQuXG4gKlxuICogZXg6XG4gKlxuICogbXktY29tcG9uZW50LmNvbXBvbmVudC50czpcbiAqIGBgYFxuICogICB1bmZpbHRlcmVkQXJyYXkgPSBbJ2EnLCAnYicsICdjJywgJ2QnLCAnZSddXG4gKiAgIHRhcmdldFN0cmluZ3MgPSBbJ2EnLCAnYicsICdjJ107XG4gKlxuICogICAgZmlsdGVyQXJyYXlCeVN0cmluZyhhcnJheTogQXJyYXk8c3RyaW5nPiwgdGFyZ2V0U3RyaW5nOiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcbiAqICAgICByZXR1cm4gYXJyYXkuZmlsdGVyKChlbGVtZW50KSA9PiBlbGVtZW50ID09PSB0YXJnZXRTdHJpbmcpO1xuICogICB9XG4gKiBgYGBcbiAqXG4gKiBteS1jb21wb25lbnQuY29tcG9uZW50Lmh0bWw6XG4gKiBgYGBcbiAqICAgPGRpdiAqbmdGb3I9XCJsZXQgdGFyZ2V0U3RyaW5nIG9mIHRhcmdldFN0cmluZ3NcIj5cbiAqICAgICA8YXBwLXNvbWUtY29tcG9uZW50IFtmaWx0ZXJlZEFycmF5XT1cImZpbHRlckFycmF5QnlTdHJpbmcgfCBjeEFyZ3M6IHVuZmlsdGVyZWRBcnJheSA6IHRhcmdldFN0cmluZ1wiPlxuICogIDwvZGl2PlxuICogYGBgXG4gKi9cbkBQaXBlKHsgbmFtZTogJ2N4QXJncycgfSlcbmV4cG9ydCBjbGFzcyBBcmdzUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm08QSBleHRlbmRzIEFycmF5PGFueT4sIFI+KFxuICAgIHByb2plY3Rpb25GdW5jdGlvbjogKC4uLmFyZ2xpc3Q6IEEpID0+IFIsXG4gICAgLi4uYXJnczogQVxuICApOiBSIHtcbiAgICByZXR1cm4gcHJvamVjdGlvbkZ1bmN0aW9uKC4uLmFyZ3MpO1xuICB9XG59XG4iXX0=