/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// given that we're likely going to refactor the directives, we're
// NOT exposing all it to the public API.
export * from './focus.directive';
export { TrapFocus } from './keyboard-focus.model';
export * from './keyboard-focus.module';
export * from './focus-testing.module';
export * from './services/index';
// export * from './autofocus/index';
// export * from './base/index';
// export * from './block/index';
// export * from './escape/index';
// export * from './lock/index';
// export * from './on-navigate/index';
// export * from './persist/index';
// export * from './tab/index';
// export * from './trap/index';
// export * from './visible/index';
// export * from './keyboard-focus.model';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2xheW91dC9hMTF5L2tleWJvYXJkLWZvY3VzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxrRUFBa0U7QUFDbEUseUNBQXlDO0FBQ3pDLGNBQWMsbUJBQW1CLENBQUM7QUFDbEMsT0FBTyxFQUFlLFNBQVMsRUFBaUIsTUFBTSx3QkFBd0IsQ0FBQztBQUMvRSxjQUFjLHlCQUF5QixDQUFDO0FBQ3hDLGNBQWMsd0JBQXdCLENBQUM7QUFDdkMsY0FBYyxrQkFBa0IsQ0FBQztBQUVqQyxxQ0FBcUM7QUFDckMsZ0NBQWdDO0FBQ2hDLGlDQUFpQztBQUNqQyxrQ0FBa0M7QUFDbEMsZ0NBQWdDO0FBQ2hDLHVDQUF1QztBQUN2QyxtQ0FBbUM7QUFDbkMsK0JBQStCO0FBQy9CLGdDQUFnQztBQUNoQyxtQ0FBbUM7QUFDbkMsMENBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuLy8gZ2l2ZW4gdGhhdCB3ZSdyZSBsaWtlbHkgZ29pbmcgdG8gcmVmYWN0b3IgdGhlIGRpcmVjdGl2ZXMsIHdlJ3JlXG4vLyBOT1QgZXhwb3NpbmcgYWxsIGl0IHRvIHRoZSBwdWJsaWMgQVBJLlxuZXhwb3J0ICogZnJvbSAnLi9mb2N1cy5kaXJlY3RpdmUnO1xuZXhwb3J0IHsgRm9jdXNDb25maWcsIFRyYXBGb2N1cywgVHJhcEZvY3VzVHlwZSB9IGZyb20gJy4va2V5Ym9hcmQtZm9jdXMubW9kZWwnO1xuZXhwb3J0ICogZnJvbSAnLi9rZXlib2FyZC1mb2N1cy5tb2R1bGUnO1xuZXhwb3J0ICogZnJvbSAnLi9mb2N1cy10ZXN0aW5nLm1vZHVsZSc7XG5leHBvcnQgKiBmcm9tICcuL3NlcnZpY2VzL2luZGV4JztcblxuLy8gZXhwb3J0ICogZnJvbSAnLi9hdXRvZm9jdXMvaW5kZXgnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9iYXNlL2luZGV4Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vYmxvY2svaW5kZXgnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9lc2NhcGUvaW5kZXgnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9sb2NrL2luZGV4Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vb24tbmF2aWdhdGUvaW5kZXgnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9wZXJzaXN0L2luZGV4Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vdGFiL2luZGV4Jztcbi8vIGV4cG9ydCAqIGZyb20gJy4vdHJhcC9pbmRleCc7XG4vLyBleHBvcnQgKiBmcm9tICcuL3Zpc2libGUvaW5kZXgnO1xuLy8gZXhwb3J0ICogZnJvbSAnLi9rZXlib2FyZC1mb2N1cy5tb2RlbCc7XG4iXX0=