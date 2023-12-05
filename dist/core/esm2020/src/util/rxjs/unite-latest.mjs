/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { asapScheduler, combineLatest, defer, Observable } from 'rxjs';
import { audit } from 'rxjs/operators';
/**
 * uniteLatest is an alternative to combineLatest. The first emission is
 * emitted synchronously (just like combineLatest) and all following emissions
 * are audited and emitted using asapScheduler.
 *
 * It effectively smooths out emissions when multiple sources will emit at the
 * same time: uniteLatest will have only one emission, where combine latest will
 * have more than one (one per source changed).
 *
 * @param sources
 */
export function uniteLatest(sources) {
    return defer(() => {
        let subNo = 0;
        const trigger = new Observable((subscriber) => {
            const action = () => {
                subscriber.next();
                subscriber.complete();
            };
            if (subNo) {
                asapScheduler.schedule(action);
            }
            else {
                action();
            }
            subNo++;
        });
        return combineLatest(sources).pipe(audit(() => trigger));
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdGUtbGF0ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvdXRpbC9yeGpzL3VuaXRlLWxhdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2RSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFPdkM7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sVUFBVSxXQUFXLENBQ3pCLE9BQVU7SUFFVixPQUFPLEtBQUssQ0FBQyxHQUFHLEVBQUU7UUFDaEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsTUFBTSxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUM1QyxNQUFNLE1BQU0sR0FBRyxHQUFHLEVBQUU7Z0JBQ2xCLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbEIsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hCLENBQUMsQ0FBQztZQUVGLElBQUksS0FBSyxFQUFFO2dCQUNULGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDaEM7aUJBQU07Z0JBQ0wsTUFBTSxFQUFFLENBQUM7YUFDVjtZQUNELEtBQUssRUFBRSxDQUFDO1FBQ1YsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQyxDQUFRLENBQUM7QUFDWixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgYXNhcFNjaGVkdWxlciwgY29tYmluZUxhdGVzdCwgZGVmZXIsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGF1ZGl0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG50eXBlIFJldHVyblR5cGVzPFQgZXh0ZW5kcyBPYnNlcnZhYmxlPGFueT5bXT4gPSB7XG4gIFtQIGluIGtleW9mIFRdOiBUW1BdIGV4dGVuZHMgT2JzZXJ2YWJsZTxpbmZlciBSPiA/IFIgOiBuZXZlcjtcbn07XG50eXBlIE9ic2VydmFibGVzID0gW09ic2VydmFibGU8YW55Pl0gfCBPYnNlcnZhYmxlPGFueT5bXTtcblxuLyoqXG4gKiB1bml0ZUxhdGVzdCBpcyBhbiBhbHRlcm5hdGl2ZSB0byBjb21iaW5lTGF0ZXN0LiBUaGUgZmlyc3QgZW1pc3Npb24gaXNcbiAqIGVtaXR0ZWQgc3luY2hyb25vdXNseSAoanVzdCBsaWtlIGNvbWJpbmVMYXRlc3QpIGFuZCBhbGwgZm9sbG93aW5nIGVtaXNzaW9uc1xuICogYXJlIGF1ZGl0ZWQgYW5kIGVtaXR0ZWQgdXNpbmcgYXNhcFNjaGVkdWxlci5cbiAqXG4gKiBJdCBlZmZlY3RpdmVseSBzbW9vdGhzIG91dCBlbWlzc2lvbnMgd2hlbiBtdWx0aXBsZSBzb3VyY2VzIHdpbGwgZW1pdCBhdCB0aGVcbiAqIHNhbWUgdGltZTogdW5pdGVMYXRlc3Qgd2lsbCBoYXZlIG9ubHkgb25lIGVtaXNzaW9uLCB3aGVyZSBjb21iaW5lIGxhdGVzdCB3aWxsXG4gKiBoYXZlIG1vcmUgdGhhbiBvbmUgKG9uZSBwZXIgc291cmNlIGNoYW5nZWQpLlxuICpcbiAqIEBwYXJhbSBzb3VyY2VzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bml0ZUxhdGVzdDxSIGV4dGVuZHMgT2JzZXJ2YWJsZXM+KFxuICBzb3VyY2VzOiBSXG4pOiBPYnNlcnZhYmxlPFJldHVyblR5cGVzPFI+PiB7XG4gIHJldHVybiBkZWZlcigoKSA9PiB7XG4gICAgbGV0IHN1Yk5vID0gMDtcbiAgICBjb25zdCB0cmlnZ2VyID0gbmV3IE9ic2VydmFibGUoKHN1YnNjcmliZXIpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9ICgpID0+IHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KCk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgIH07XG5cbiAgICAgIGlmIChzdWJObykge1xuICAgICAgICBhc2FwU2NoZWR1bGVyLnNjaGVkdWxlKGFjdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY3Rpb24oKTtcbiAgICAgIH1cbiAgICAgIHN1Yk5vKys7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChzb3VyY2VzKS5waXBlKGF1ZGl0KCgpID0+IHRyaWdnZXIpKTtcbiAgfSkgYXMgYW55O1xufVxuIl19