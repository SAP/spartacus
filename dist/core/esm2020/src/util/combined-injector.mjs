/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const NOT_FOUND_SYMBOL = {};
/**
 * CombinedInjector is able to combine more than one injector together.
 *
 * Can be used to instantiate lazy loaded modules with dependency modules,
 * so lazy loaded module can use instances provided in all dependency modules.
 *
 * Injector tries to resolve token in all Injector, taking into account the order
 * in which they were provided in complementaryInjectors and fallbacks to the
 * mainInjector.
 */
export class CombinedInjector {
    /**
     * @param mainInjector Component hierarchical injector
     * @param complementaryInjectors Additional injector that will be taken into an account when resolving dependencies
     */
    constructor(mainInjector, complementaryInjectors) {
        this.mainInjector = mainInjector;
        this.complementaryInjectors = complementaryInjectors;
    }
    get(token, notFoundValue, optional) {
        // eslint-disable-next-line no-bitwise
        if (optional && optional.self) {
            if (notFoundValue !== undefined) {
                return notFoundValue;
            }
            throw new Error("CombinedInjector should be used as a parent injector / doesn't support self dependencies");
        }
        for (const injector of this.complementaryInjectors) {
            // First we are resolving providers provided at Self level
            // in all complementary injectors...
            const service = injector.get(token, NOT_FOUND_SYMBOL, { self: true });
            if (service !== NOT_FOUND_SYMBOL) {
                return service;
            }
        }
        for (const injector of this.complementaryInjectors) {
            // next we try to resolve tokens from all levels
            const service = injector.get(token, NOT_FOUND_SYMBOL);
            if (service !== NOT_FOUND_SYMBOL) {
                return service;
            }
        }
        // ...and then fallback to main injector
        return this.mainInjector.get(token, notFoundValue);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYmluZWQtaW5qZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy91dGlsL2NvbWJpbmVkLWluamVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFVSCxNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztBQUU1Qjs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCOzs7T0FHRztJQUNILFlBQ1UsWUFBc0IsRUFDdEIsc0JBQWtDO1FBRGxDLGlCQUFZLEdBQVosWUFBWSxDQUFVO1FBQ3RCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBWTtJQUN6QyxDQUFDO0lBUUosR0FBRyxDQUFDLEtBQVUsRUFBRSxhQUFtQixFQUFFLFFBQXdCO1FBQzNELHNDQUFzQztRQUN0QyxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQzdCLElBQUksYUFBYSxLQUFLLFNBQVMsRUFBRTtnQkFDL0IsT0FBTyxhQUFhLENBQUM7YUFDdEI7WUFDRCxNQUFNLElBQUksS0FBSyxDQUNiLDBGQUEwRixDQUMzRixDQUFDO1NBQ0g7UUFFRCxLQUFLLE1BQU0sUUFBUSxJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUNsRCwwREFBMEQ7WUFDMUQsb0NBQW9DO1lBQ3BDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDdEUsSUFBSSxPQUFPLEtBQUssZ0JBQWdCLEVBQUU7Z0JBQ2hDLE9BQU8sT0FBTyxDQUFDO2FBQ2hCO1NBQ0Y7UUFFRCxLQUFLLE1BQU0sUUFBUSxJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtZQUNsRCxnREFBZ0Q7WUFDaEQsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUN0RCxJQUFJLE9BQU8sS0FBSyxnQkFBZ0IsRUFBRTtnQkFDaEMsT0FBTyxPQUFPLENBQUM7YUFDaEI7U0FDRjtRQUNELHdDQUF3QztRQUN4QyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBBYnN0cmFjdFR5cGUsXG4gIEluamVjdGlvblRva2VuLFxuICBJbmplY3RPcHRpb25zLFxuICBJbmplY3RvcixcbiAgVHlwZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNvbnN0IE5PVF9GT1VORF9TWU1CT0wgPSB7fTtcblxuLyoqXG4gKiBDb21iaW5lZEluamVjdG9yIGlzIGFibGUgdG8gY29tYmluZSBtb3JlIHRoYW4gb25lIGluamVjdG9yIHRvZ2V0aGVyLlxuICpcbiAqIENhbiBiZSB1c2VkIHRvIGluc3RhbnRpYXRlIGxhenkgbG9hZGVkIG1vZHVsZXMgd2l0aCBkZXBlbmRlbmN5IG1vZHVsZXMsXG4gKiBzbyBsYXp5IGxvYWRlZCBtb2R1bGUgY2FuIHVzZSBpbnN0YW5jZXMgcHJvdmlkZWQgaW4gYWxsIGRlcGVuZGVuY3kgbW9kdWxlcy5cbiAqXG4gKiBJbmplY3RvciB0cmllcyB0byByZXNvbHZlIHRva2VuIGluIGFsbCBJbmplY3RvciwgdGFraW5nIGludG8gYWNjb3VudCB0aGUgb3JkZXJcbiAqIGluIHdoaWNoIHRoZXkgd2VyZSBwcm92aWRlZCBpbiBjb21wbGVtZW50YXJ5SW5qZWN0b3JzIGFuZCBmYWxsYmFja3MgdG8gdGhlXG4gKiBtYWluSW5qZWN0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21iaW5lZEluamVjdG9yIGltcGxlbWVudHMgSW5qZWN0b3Ige1xuICAvKipcbiAgICogQHBhcmFtIG1haW5JbmplY3RvciBDb21wb25lbnQgaGllcmFyY2hpY2FsIGluamVjdG9yXG4gICAqIEBwYXJhbSBjb21wbGVtZW50YXJ5SW5qZWN0b3JzIEFkZGl0aW9uYWwgaW5qZWN0b3IgdGhhdCB3aWxsIGJlIHRha2VuIGludG8gYW4gYWNjb3VudCB3aGVuIHJlc29sdmluZyBkZXBlbmRlbmNpZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbWFpbkluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIGNvbXBsZW1lbnRhcnlJbmplY3RvcnM6IEluamVjdG9yW11cbiAgKSB7fVxuXG4gIGdldDxUPihcbiAgICB0b2tlbjogVHlwZTxUPiB8IEluamVjdGlvblRva2VuPFQ+IHwgQWJzdHJhY3RUeXBlPFQ+LFxuICAgIG5vdEZvdW5kVmFsdWU/OiBULFxuICAgIG9wdGlvbmFsPzogSW5qZWN0T3B0aW9uc1xuICApOiBUO1xuICBnZXQodG9rZW46IGFueSwgbm90Rm91bmRWYWx1ZT86IGFueSk6IGFueTtcbiAgZ2V0KHRva2VuOiBhbnksIG5vdEZvdW5kVmFsdWU/OiBhbnksIG9wdGlvbmFsPzogSW5qZWN0T3B0aW9ucyk6IGFueSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgICBpZiAob3B0aW9uYWwgJiYgb3B0aW9uYWwuc2VsZikge1xuICAgICAgaWYgKG5vdEZvdW5kVmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbm90Rm91bmRWYWx1ZTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJDb21iaW5lZEluamVjdG9yIHNob3VsZCBiZSB1c2VkIGFzIGEgcGFyZW50IGluamVjdG9yIC8gZG9lc24ndCBzdXBwb3J0IHNlbGYgZGVwZW5kZW5jaWVzXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBpbmplY3RvciBvZiB0aGlzLmNvbXBsZW1lbnRhcnlJbmplY3RvcnMpIHtcbiAgICAgIC8vIEZpcnN0IHdlIGFyZSByZXNvbHZpbmcgcHJvdmlkZXJzIHByb3ZpZGVkIGF0IFNlbGYgbGV2ZWxcbiAgICAgIC8vIGluIGFsbCBjb21wbGVtZW50YXJ5IGluamVjdG9ycy4uLlxuICAgICAgY29uc3Qgc2VydmljZSA9IGluamVjdG9yLmdldCh0b2tlbiwgTk9UX0ZPVU5EX1NZTUJPTCwgeyBzZWxmOiB0cnVlIH0pO1xuICAgICAgaWYgKHNlcnZpY2UgIT09IE5PVF9GT1VORF9TWU1CT0wpIHtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBpbmplY3RvciBvZiB0aGlzLmNvbXBsZW1lbnRhcnlJbmplY3RvcnMpIHtcbiAgICAgIC8vIG5leHQgd2UgdHJ5IHRvIHJlc29sdmUgdG9rZW5zIGZyb20gYWxsIGxldmVsc1xuICAgICAgY29uc3Qgc2VydmljZSA9IGluamVjdG9yLmdldCh0b2tlbiwgTk9UX0ZPVU5EX1NZTUJPTCk7XG4gICAgICBpZiAoc2VydmljZSAhPT0gTk9UX0ZPVU5EX1NZTUJPTCkge1xuICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gLi4uYW5kIHRoZW4gZmFsbGJhY2sgdG8gbWFpbiBpbmplY3RvclxuICAgIHJldHVybiB0aGlzLm1haW5JbmplY3Rvci5nZXQodG9rZW4sIG5vdEZvdW5kVmFsdWUpO1xuICB9XG59XG4iXX0=