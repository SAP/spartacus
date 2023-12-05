/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export class CpqConfiguratorUtils {
    /**
     * Collects information that we need to fire a CPQ update
     *
     * @param {Configurator.Attribute} attribute Configurator attribute
     * @returns {CpqUpdateInformation} Update information
     */
    static getUpdateInformation(attribute) {
        //attribute code cannot be made mandatory because of VC,
        //but in the CPQ context it is mandatory. The same is true of the group id
        const attributeCode = attribute.attrCode;
        const groupId = attribute.groupId;
        if (attributeCode && groupId) {
            return {
                standardAttributeCode: attributeCode.toString(),
                tabId: groupId,
            };
        }
        else {
            throw new Error('Attribute code of group id not present: ' + JSON.stringify(attribute));
        }
    }
    /**
     * Finds first changed attribute
     * @param {Configurator.Configuration} source Configuration
     * @returns {Configurator.Attribute} First attribute of first group
     */
    static findFirstChangedAttribute(source) {
        const firstGroup = source.groups[0];
        if (firstGroup.attributes) {
            return firstGroup.attributes[0];
        }
        else {
            throw new Error('No changed attributes found');
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY3BxL3Jlc3QvY3BxLWNvbmZpZ3VyYXRvci11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBUUgsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQjs7Ozs7T0FLRztJQUNILE1BQU0sQ0FBQyxvQkFBb0IsQ0FDekIsU0FBaUM7UUFFakMsd0RBQXdEO1FBQ3hELDBFQUEwRTtRQUUxRSxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQ3pDLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFDbEMsSUFBSSxhQUFhLElBQUksT0FBTyxFQUFFO1lBQzVCLE9BQU87Z0JBQ0wscUJBQXFCLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRTtnQkFDL0MsS0FBSyxFQUFFLE9BQU87YUFDZixDQUFDO1NBQ0g7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQ2IsMENBQTBDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FDdkUsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUNEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMseUJBQXlCLENBQzlCLE1BQWtDO1FBRWxDLE1BQU0sVUFBVSxHQUF1QixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hELElBQUksVUFBVSxDQUFDLFVBQVUsRUFBRTtZQUN6QixPQUFPLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakM7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkJztcblxuaW50ZXJmYWNlIENwcVVwZGF0ZUluZm9ybWF0aW9uIHtcbiAgc3RhbmRhcmRBdHRyaWJ1dGVDb2RlOiBzdHJpbmc7XG4gIHRhYklkOiBzdHJpbmc7XG59XG5leHBvcnQgY2xhc3MgQ3BxQ29uZmlndXJhdG9yVXRpbHMge1xuICAvKipcbiAgICogQ29sbGVjdHMgaW5mb3JtYXRpb24gdGhhdCB3ZSBuZWVkIHRvIGZpcmUgYSBDUFEgdXBkYXRlXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkF0dHJpYnV0ZX0gYXR0cmlidXRlIENvbmZpZ3VyYXRvciBhdHRyaWJ1dGVcbiAgICogQHJldHVybnMge0NwcVVwZGF0ZUluZm9ybWF0aW9ufSBVcGRhdGUgaW5mb3JtYXRpb25cbiAgICovXG4gIHN0YXRpYyBnZXRVcGRhdGVJbmZvcm1hdGlvbihcbiAgICBhdHRyaWJ1dGU6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGVcbiAgKTogQ3BxVXBkYXRlSW5mb3JtYXRpb24ge1xuICAgIC8vYXR0cmlidXRlIGNvZGUgY2Fubm90IGJlIG1hZGUgbWFuZGF0b3J5IGJlY2F1c2Ugb2YgVkMsXG4gICAgLy9idXQgaW4gdGhlIENQUSBjb250ZXh0IGl0IGlzIG1hbmRhdG9yeS4gVGhlIHNhbWUgaXMgdHJ1ZSBvZiB0aGUgZ3JvdXAgaWRcblxuICAgIGNvbnN0IGF0dHJpYnV0ZUNvZGUgPSBhdHRyaWJ1dGUuYXR0ckNvZGU7XG4gICAgY29uc3QgZ3JvdXBJZCA9IGF0dHJpYnV0ZS5ncm91cElkO1xuICAgIGlmIChhdHRyaWJ1dGVDb2RlICYmIGdyb3VwSWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YW5kYXJkQXR0cmlidXRlQ29kZTogYXR0cmlidXRlQ29kZS50b1N0cmluZygpLFxuICAgICAgICB0YWJJZDogZ3JvdXBJZCxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0F0dHJpYnV0ZSBjb2RlIG9mIGdyb3VwIGlkIG5vdCBwcmVzZW50OiAnICsgSlNPTi5zdHJpbmdpZnkoYXR0cmlidXRlKVxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEZpbmRzIGZpcnN0IGNoYW5nZWQgYXR0cmlidXRlXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb259IHNvdXJjZSBDb25maWd1cmF0aW9uXG4gICAqIEByZXR1cm5zIHtDb25maWd1cmF0b3IuQXR0cmlidXRlfSBGaXJzdCBhdHRyaWJ1dGUgb2YgZmlyc3QgZ3JvdXBcbiAgICovXG4gIHN0YXRpYyBmaW5kRmlyc3RDaGFuZ2VkQXR0cmlidXRlKFxuICAgIHNvdXJjZTogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb25cbiAgKTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZSB7XG4gICAgY29uc3QgZmlyc3RHcm91cDogQ29uZmlndXJhdG9yLkdyb3VwID0gc291cmNlLmdyb3Vwc1swXTtcbiAgICBpZiAoZmlyc3RHcm91cC5hdHRyaWJ1dGVzKSB7XG4gICAgICByZXR1cm4gZmlyc3RHcm91cC5hdHRyaWJ1dGVzWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNoYW5nZWQgYXR0cmlidXRlcyBmb3VuZCcpO1xuICAgIH1cbiAgfVxufVxuIl19