/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Sort an object using multiple sort criteria
 */
export function itemsWith(...fns) {
    return (a, b) => {
        for (const fn of fns) {
            const result = fn(a, b);
            if (result !== 0) {
                return result;
            }
        }
        return 0;
    };
}
/**
 * Allows you to compose multiple sort comparators
 */
export const byMultiple = itemsWith;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMtd2l0aC5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29yZS91dGlscy9zb3J0L2l0ZW1zLXdpdGguZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlIOztHQUVHO0FBQ0gsTUFBTSxVQUFVLFNBQVMsQ0FDdkIsR0FBRyxHQUF5QjtJQUU1QixPQUFPLENBQUMsQ0FBSSxFQUFFLENBQUksRUFBRSxFQUFFO1FBQ3BCLEtBQUssTUFBTSxFQUFFLElBQUksR0FBRyxFQUFFO1lBQ3BCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNoQixPQUFPLE1BQU0sQ0FBQzthQUNmO1NBQ0Y7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21wYXJhdG9yIH0gZnJvbSAnLi9zb3J0Lm1vZGVsJztcblxuLyoqXG4gKiBTb3J0IGFuIG9iamVjdCB1c2luZyBtdWx0aXBsZSBzb3J0IGNyaXRlcmlhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpdGVtc1dpdGg8VD4oXG4gIC4uLmZuczogQXJyYXk8Q29tcGFyYXRvcjxUPj5cbik6IChhOiBULCBiOiBUKSA9PiAtMSB8IDAgfCAxIHtcbiAgcmV0dXJuIChhOiBULCBiOiBUKSA9PiB7XG4gICAgZm9yIChjb25zdCBmbiBvZiBmbnMpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGZuKGEsIGIpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gMCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfTtcbn1cblxuLyoqXG4gKiBBbGxvd3MgeW91IHRvIGNvbXBvc2UgbXVsdGlwbGUgc29ydCBjb21wYXJhdG9yc1xuICovXG5leHBvcnQgY29uc3QgYnlNdWx0aXBsZSA9IGl0ZW1zV2l0aDtcbiJdfQ==