/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class MultiLinePipe {
    transform(value) {
        const lastIndex = value.lastIndexOf(' ');
        if (lastIndex === -1) {
            return value;
        }
        return (value.substring(0, lastIndex) +
            '<br />' +
            value.substring(lastIndex, value.length).trim());
    }
}
MultiLinePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiLinePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
MultiLinePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MultiLinePipe, name: "cxMultiLine" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiLinePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'cxMultiLine',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlsaW5lLXRpdGxlcy5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2Jhc2UvY29tcG9uZW50cy9jaGVja291dC1wcm9ncmVzcy9tdWx0aWxpbmUtdGl0bGVzLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8sYUFBYTtJQUN4QixTQUFTLENBQUMsS0FBYTtRQUNyQixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXpDLElBQUksU0FBUyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxPQUFPLENBQ0wsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDO1lBQzdCLFFBQVE7WUFDUixLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQ2hELENBQUM7SUFDSixDQUFDOzswR0FiVSxhQUFhO3dHQUFiLGFBQWE7MkZBQWIsYUFBYTtrQkFIekIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsYUFBYTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2N4TXVsdGlMaW5lJyxcbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlMaW5lUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgbGFzdEluZGV4ID0gdmFsdWUubGFzdEluZGV4T2YoJyAnKTtcblxuICAgIGlmIChsYXN0SW5kZXggPT09IC0xKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIHZhbHVlLnN1YnN0cmluZygwLCBsYXN0SW5kZXgpICtcbiAgICAgICc8YnIgLz4nICtcbiAgICAgIHZhbHVlLnN1YnN0cmluZyhsYXN0SW5kZXgsIHZhbHVlLmxlbmd0aCkudHJpbSgpXG4gICAgKTtcbiAgfVxufVxuIl19