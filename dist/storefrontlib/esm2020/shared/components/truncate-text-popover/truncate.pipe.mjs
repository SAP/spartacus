/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
const defaultLimit = 20;
export class TruncatePipe {
    /**
     * example usage {{ exampleString | cxTruncate: [1, ''] }}
     */
    transform(value, args) {
        if (!args) {
            return value;
        }
        let trail = '...';
        const limit = args.length > 0 && args[0] && Number.isInteger(+args[0])
            ? args[0]
            : defaultLimit;
        if (args.length > 1 && args[1] !== undefined) {
            trail = args[1];
        }
        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}
TruncatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TruncatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
TruncatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TruncatePipe, name: "cxTruncate" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TruncatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'cxTruncate',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1bmNhdGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL2NvbXBvbmVudHMvdHJ1bmNhdGUtdGV4dC1wb3BvdmVyL3RydW5jYXRlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUVwRCxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7QUFLeEIsTUFBTSxPQUFPLFlBQVk7SUFDdkI7O09BRUc7SUFDSCxTQUFTLENBQUMsS0FBYSxFQUFFLElBQXdCO1FBQy9DLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBRWxCLE1BQU0sS0FBSyxHQUNULElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxDQUFDLFlBQVksQ0FBQztRQUVuQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDNUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqQjtRQUVELE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzFFLENBQUM7O3lHQXJCVSxZQUFZO3VHQUFaLFlBQVk7MkZBQVosWUFBWTtrQkFIeEIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsWUFBWTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNvbnN0IGRlZmF1bHRMaW1pdCA9IDIwO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdjeFRydW5jYXRlJyxcbn0pXG5leHBvcnQgY2xhc3MgVHJ1bmNhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIC8qKlxuICAgKiBleGFtcGxlIHVzYWdlIHt7IGV4YW1wbGVTdHJpbmcgfCBjeFRydW5jYXRlOiBbMSwgJyddIH19XG4gICAqL1xuICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgYXJncz86IFtudW1iZXIsIHN0cmluZz9dKTogc3RyaW5nIHtcbiAgICBpZiAoIWFyZ3MpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBsZXQgdHJhaWwgPSAnLi4uJztcblxuICAgIGNvbnN0IGxpbWl0ID1cbiAgICAgIGFyZ3MubGVuZ3RoID4gMCAmJiBhcmdzWzBdICYmIE51bWJlci5pc0ludGVnZXIoK2FyZ3NbMF0pXG4gICAgICAgID8gYXJnc1swXVxuICAgICAgICA6IGRlZmF1bHRMaW1pdDtcblxuICAgIGlmIChhcmdzLmxlbmd0aCA+IDEgJiYgYXJnc1sxXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0cmFpbCA9IGFyZ3NbMV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+IGxpbWl0ID8gdmFsdWUuc3Vic3RyaW5nKDAsIGxpbWl0KSArIHRyYWlsIDogdmFsdWU7XG4gIH1cbn1cbiJdfQ==