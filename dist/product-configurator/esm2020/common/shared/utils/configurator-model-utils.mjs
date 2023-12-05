/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonConfigurator, } from '../../core/model/common-configurator.model';
const initialIndicator = 'INITIAL';
export class ConfiguratorModelUtils {
    /**
     * Compiles a unique key for a configuration owner from id and type
     * @param owner Specifies the owner of a product configuration
     * @returns Owner key
     */
    static getOwnerKey(ownerType, ownerId) {
        if (!ownerId || !ownerType) {
            throw new Error('We expect an owner ID and an owner type');
        }
        return ownerType + '/' + ownerId;
    }
    /**
     * Creates an initial owner object
     * @returns Initial owner
     */
    static createInitialOwner() {
        return {
            key: initialIndicator,
            configuratorType: initialIndicator,
            id: initialIndicator,
            type: CommonConfigurator.OwnerType.PRODUCT,
        };
    }
    /**
     * Checks if an owner is an initial one
     * @param owner Owner
     * @returns Is owner initial?
     */
    static isInitialOwner(owner) {
        return owner.configuratorType === initialIndicator;
    }
    /**
     * Creates a configuration owner object based on its essential attributes
     * @param ownerType Owner type (Does it refer to product, cart or order?)
     * @param ownerId Owner identifier
     * @param configuratorType Configurator type
     * @returns Owner
     */
    static createOwner(ownerType, ownerId, configuratorType = "CPQCONFIGURATOR" /* ConfiguratorType.VARIANT */) {
        return {
            type: ownerType,
            id: ownerId,
            configuratorType: configuratorType,
            key: ConfiguratorModelUtils.getOwnerKey(ownerType, ownerId),
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLW1vZGVsLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbi9zaGFyZWQvdXRpbHMvY29uZmlndXJhdG9yLW1vZGVsLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsa0JBQWtCLEdBRW5CLE1BQU0sNENBQTRDLENBQUM7QUFFcEQsTUFBTSxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7QUFDbkMsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQzs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FDaEIsU0FBd0MsRUFDeEMsT0FBZ0I7UUFFaEIsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxPQUFPLFNBQVMsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDO0lBQ25DLENBQUM7SUFFRDs7O09BR0c7SUFDSCxNQUFNLENBQUMsa0JBQWtCO1FBQ3ZCLE9BQU87WUFDTCxHQUFHLEVBQUUsZ0JBQWdCO1lBQ3JCLGdCQUFnQixFQUFFLGdCQUFnQjtZQUNsQyxFQUFFLEVBQUUsZ0JBQWdCO1lBQ3BCLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsT0FBTztTQUMzQyxDQUFDO0lBQ0osQ0FBQztJQUNEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQStCO1FBQ25ELE9BQU8sS0FBSyxDQUFDLGdCQUFnQixLQUFLLGdCQUFnQixDQUFDO0lBQ3JELENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxNQUFNLENBQUMsV0FBVyxDQUNoQixTQUF1QyxFQUN2QyxPQUFlLEVBQ2YsbUVBQW1EO1FBRW5ELE9BQU87WUFDTCxJQUFJLEVBQUUsU0FBUztZQUNmLEVBQUUsRUFBRSxPQUFPO1lBQ1gsZ0JBQWdCLEVBQUUsZ0JBQWdCO1lBQ2xDLEdBQUcsRUFBRSxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQztTQUM1RCxDQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tbW9uQ29uZmlndXJhdG9yLFxuICBDb25maWd1cmF0b3JUeXBlLFxufSBmcm9tICcuLi8uLi9jb3JlL21vZGVsL2NvbW1vbi1jb25maWd1cmF0b3IubW9kZWwnO1xuXG5jb25zdCBpbml0aWFsSW5kaWNhdG9yID0gJ0lOSVRJQUwnO1xuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvck1vZGVsVXRpbHMge1xuICAvKipcbiAgICogQ29tcGlsZXMgYSB1bmlxdWUga2V5IGZvciBhIGNvbmZpZ3VyYXRpb24gb3duZXIgZnJvbSBpZCBhbmQgdHlwZVxuICAgKiBAcGFyYW0gb3duZXIgU3BlY2lmaWVzIHRoZSBvd25lciBvZiBhIHByb2R1Y3QgY29uZmlndXJhdGlvblxuICAgKiBAcmV0dXJucyBPd25lciBrZXlcbiAgICovXG4gIHN0YXRpYyBnZXRPd25lcktleShcbiAgICBvd25lclR5cGU/OiBDb21tb25Db25maWd1cmF0b3IuT3duZXJUeXBlLFxuICAgIG93bmVySWQ/OiBzdHJpbmdcbiAgKTogc3RyaW5nIHtcbiAgICBpZiAoIW93bmVySWQgfHwgIW93bmVyVHlwZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZSBleHBlY3QgYW4gb3duZXIgSUQgYW5kIGFuIG93bmVyIHR5cGUnKTtcbiAgICB9XG4gICAgcmV0dXJuIG93bmVyVHlwZSArICcvJyArIG93bmVySWQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbml0aWFsIG93bmVyIG9iamVjdFxuICAgKiBAcmV0dXJucyBJbml0aWFsIG93bmVyXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlSW5pdGlhbE93bmVyKCk6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lciB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGtleTogaW5pdGlhbEluZGljYXRvcixcbiAgICAgIGNvbmZpZ3VyYXRvclR5cGU6IGluaXRpYWxJbmRpY2F0b3IsXG4gICAgICBpZDogaW5pdGlhbEluZGljYXRvcixcbiAgICAgIHR5cGU6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lclR5cGUuUFJPRFVDVCxcbiAgICB9O1xuICB9XG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYW4gb3duZXIgaXMgYW4gaW5pdGlhbCBvbmVcbiAgICogQHBhcmFtIG93bmVyIE93bmVyXG4gICAqIEByZXR1cm5zIElzIG93bmVyIGluaXRpYWw/XG4gICAqL1xuICBzdGF0aWMgaXNJbml0aWFsT3duZXIob3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBvd25lci5jb25maWd1cmF0b3JUeXBlID09PSBpbml0aWFsSW5kaWNhdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBjb25maWd1cmF0aW9uIG93bmVyIG9iamVjdCBiYXNlZCBvbiBpdHMgZXNzZW50aWFsIGF0dHJpYnV0ZXNcbiAgICogQHBhcmFtIG93bmVyVHlwZSBPd25lciB0eXBlIChEb2VzIGl0IHJlZmVyIHRvIHByb2R1Y3QsIGNhcnQgb3Igb3JkZXI/KVxuICAgKiBAcGFyYW0gb3duZXJJZCBPd25lciBpZGVudGlmaWVyXG4gICAqIEBwYXJhbSBjb25maWd1cmF0b3JUeXBlIENvbmZpZ3VyYXRvciB0eXBlXG4gICAqIEByZXR1cm5zIE93bmVyXG4gICAqL1xuICBzdGF0aWMgY3JlYXRlT3duZXIoXG4gICAgb3duZXJUeXBlOiBDb21tb25Db25maWd1cmF0b3IuT3duZXJUeXBlLFxuICAgIG93bmVySWQ6IHN0cmluZyxcbiAgICBjb25maWd1cmF0b3JUeXBlOiBzdHJpbmcgPSBDb25maWd1cmF0b3JUeXBlLlZBUklBTlRcbiAgKTogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogb3duZXJUeXBlLFxuICAgICAgaWQ6IG93bmVySWQsXG4gICAgICBjb25maWd1cmF0b3JUeXBlOiBjb25maWd1cmF0b3JUeXBlLFxuICAgICAga2V5OiBDb25maWd1cmF0b3JNb2RlbFV0aWxzLmdldE93bmVyS2V5KG93bmVyVHlwZSwgb3duZXJJZCksXG4gICAgfTtcbiAgfVxufVxuIl19