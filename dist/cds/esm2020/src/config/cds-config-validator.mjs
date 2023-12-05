/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export function cdsConfigValidator(config) {
    if (!config.cds) {
        return 'Please configure the config.cds object before using the CDS library';
    }
    if (config.cds.profileTag !== undefined) {
        if (config.cds.profileTag.configUrl === undefined ||
            config.cds.profileTag.configUrl.trim().length === 0) {
            return 'Please configure cds.profileTag.configUrl before using the CDS library';
        }
        if (config.cds.profileTag.javascriptUrl === undefined ||
            config.cds.profileTag.javascriptUrl.trim().length === 0) {
            return 'Please configure cds.profileTag.configUrl before using the CDS library';
        }
    }
    if (config.cds.tenant === undefined ||
        config.cds.tenant.trim().length === 0) {
        return 'Please configure cds.tenant before using CDS library';
    }
    if (config.cds.baseUrl === undefined) {
        return 'Please configure cds.baseUrl before using CDS library';
    }
    if (config.cds.endpoints === undefined ||
        config.cds.endpoints.strategyProducts === undefined) {
        return 'Please configure the cds.endpoints before using CDS library';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RzLWNvbmZpZy12YWxpZGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2Nkcy9zcmMvY29uZmlnL2Nkcy1jb25maWctdmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFJSCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsTUFBaUI7SUFDbEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDZixPQUFPLHFFQUFxRSxDQUFDO0tBQzlFO0lBQ0QsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7UUFDdkMsSUFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEtBQUssU0FBUztZQUM3QyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsRUFDbkQ7WUFDQSxPQUFPLHdFQUF3RSxDQUFDO1NBQ2pGO1FBQ0QsSUFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEtBQUssU0FBUztZQUNqRCxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsRUFDdkQ7WUFDQSxPQUFPLHdFQUF3RSxDQUFDO1NBQ2pGO0tBQ0Y7SUFDRCxJQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxLQUFLLFNBQVM7UUFDL0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsRUFDckM7UUFDQSxPQUFPLHNEQUFzRCxDQUFDO0tBQy9EO0lBRUQsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7UUFDcEMsT0FBTyx1REFBdUQsQ0FBQztLQUNoRTtJQUVELElBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEtBQUssU0FBUztRQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLEVBQ25EO1FBQ0EsT0FBTyw2REFBNkQsQ0FBQztLQUN0RTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDZHNDb25maWcgfSBmcm9tICcuL2Nkcy1jb25maWcnO1xuXG5leHBvcnQgZnVuY3Rpb24gY2RzQ29uZmlnVmFsaWRhdG9yKGNvbmZpZzogQ2RzQ29uZmlnKTogc3RyaW5nIHwgdm9pZCB7XG4gIGlmICghY29uZmlnLmNkcykge1xuICAgIHJldHVybiAnUGxlYXNlIGNvbmZpZ3VyZSB0aGUgY29uZmlnLmNkcyBvYmplY3QgYmVmb3JlIHVzaW5nIHRoZSBDRFMgbGlicmFyeSc7XG4gIH1cbiAgaWYgKGNvbmZpZy5jZHMucHJvZmlsZVRhZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKFxuICAgICAgY29uZmlnLmNkcy5wcm9maWxlVGFnLmNvbmZpZ1VybCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICBjb25maWcuY2RzLnByb2ZpbGVUYWcuY29uZmlnVXJsLnRyaW0oKS5sZW5ndGggPT09IDBcbiAgICApIHtcbiAgICAgIHJldHVybiAnUGxlYXNlIGNvbmZpZ3VyZSBjZHMucHJvZmlsZVRhZy5jb25maWdVcmwgYmVmb3JlIHVzaW5nIHRoZSBDRFMgbGlicmFyeSc7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNvbmZpZy5jZHMucHJvZmlsZVRhZy5qYXZhc2NyaXB0VXJsID09PSB1bmRlZmluZWQgfHxcbiAgICAgIGNvbmZpZy5jZHMucHJvZmlsZVRhZy5qYXZhc2NyaXB0VXJsLnRyaW0oKS5sZW5ndGggPT09IDBcbiAgICApIHtcbiAgICAgIHJldHVybiAnUGxlYXNlIGNvbmZpZ3VyZSBjZHMucHJvZmlsZVRhZy5jb25maWdVcmwgYmVmb3JlIHVzaW5nIHRoZSBDRFMgbGlicmFyeSc7XG4gICAgfVxuICB9XG4gIGlmIChcbiAgICBjb25maWcuY2RzLnRlbmFudCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgY29uZmlnLmNkcy50ZW5hbnQudHJpbSgpLmxlbmd0aCA9PT0gMFxuICApIHtcbiAgICByZXR1cm4gJ1BsZWFzZSBjb25maWd1cmUgY2RzLnRlbmFudCBiZWZvcmUgdXNpbmcgQ0RTIGxpYnJhcnknO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5jZHMuYmFzZVVybCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuICdQbGVhc2UgY29uZmlndXJlIGNkcy5iYXNlVXJsIGJlZm9yZSB1c2luZyBDRFMgbGlicmFyeSc7XG4gIH1cblxuICBpZiAoXG4gICAgY29uZmlnLmNkcy5lbmRwb2ludHMgPT09IHVuZGVmaW5lZCB8fFxuICAgIGNvbmZpZy5jZHMuZW5kcG9pbnRzLnN0cmF0ZWd5UHJvZHVjdHMgPT09IHVuZGVmaW5lZFxuICApIHtcbiAgICByZXR1cm4gJ1BsZWFzZSBjb25maWd1cmUgdGhlIGNkcy5lbmRwb2ludHMgYmVmb3JlIHVzaW5nIENEUyBsaWJyYXJ5JztcbiAgfVxufVxuIl19