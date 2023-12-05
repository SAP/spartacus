/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CpqConfiguratorUtils } from '../../rest/cpq-configurator-utils';
import * as i0 from "@angular/core";
export class CpqConfiguratorValueSerializer {
    convert(source) {
        const attribute = CpqConfiguratorUtils.findFirstChangedAttribute(source);
        const updateValue = this.convertAttribute(attribute, source.configId);
        return updateValue;
    }
    convertAttribute(attribute, configurationId) {
        const updateInfo = CpqConfiguratorUtils.getUpdateInformation(attribute);
        const value = this.findFirstChangedValue(attribute);
        const updateAttribute = {
            configurationId: configurationId,
            standardAttributeCode: updateInfo.standardAttributeCode,
            attributeValueId: value.valueCode,
            quantity: value.quantity ?? 1,
            tabId: updateInfo.tabId,
        };
        return updateAttribute;
    }
    findFirstChangedValue(attribute) {
        if (attribute.values && attribute.values.length > 0) {
            return attribute.values[0];
        }
        else {
            throw new Error('No values present');
        }
    }
}
CpqConfiguratorValueSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorValueSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorValueSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorValueSerializer });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorValueSerializer, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci12YWx1ZS1zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jcHEvY29tbW9uL2NvbnZlcnRlcnMvY3BxLWNvbmZpZ3VyYXRvci12YWx1ZS1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOztBQUd6RSxNQUFNLE9BQU8sOEJBQThCO0lBR3pDLE9BQU8sQ0FBQyxNQUFrQztRQUN4QyxNQUFNLFNBQVMsR0FDYixvQkFBb0IsQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RCxNQUFNLFdBQVcsR0FBb0IsSUFBSSxDQUFDLGdCQUFnQixDQUN4RCxTQUFTLEVBQ1QsTUFBTSxDQUFDLFFBQVEsQ0FDaEIsQ0FBQztRQUNGLE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFUyxnQkFBZ0IsQ0FDeEIsU0FBaUMsRUFDakMsZUFBdUI7UUFFdkIsTUFBTSxVQUFVLEdBQUcsb0JBQW9CLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEUsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sZUFBZSxHQUFvQjtZQUN2QyxlQUFlLEVBQUUsZUFBZTtZQUNoQyxxQkFBcUIsRUFBRSxVQUFVLENBQUMscUJBQXFCO1lBQ3ZELGdCQUFnQixFQUFFLEtBQUssQ0FBQyxTQUFTO1lBQ2pDLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUM7WUFDN0IsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLO1NBQ3hCLENBQUM7UUFFRixPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDO0lBRVMscUJBQXFCLENBQzdCLFNBQWlDO1FBRWpDLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbkQsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVCO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDdEM7SUFDSCxDQUFDOzsySEF0Q1UsOEJBQThCOytIQUE5Qiw4QkFBOEI7MkZBQTlCLDhCQUE4QjtrQkFEMUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3IgfSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZCc7XG5pbXBvcnQgeyBDcHEgfSBmcm9tICcuLi9jcHEubW9kZWxzJztcbmltcG9ydCB7IENwcUNvbmZpZ3VyYXRvclV0aWxzIH0gZnJvbSAnLi4vLi4vcmVzdC9jcHEtY29uZmlndXJhdG9yLXV0aWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENwcUNvbmZpZ3VyYXRvclZhbHVlU2VyaWFsaXplclxuICBpbXBsZW1lbnRzIENvbnZlcnRlcjxDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbiwgQ3BxLlVwZGF0ZVZhbHVlPlxue1xuICBjb252ZXJ0KHNvdXJjZTogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24pOiBDcHEuVXBkYXRlVmFsdWUge1xuICAgIGNvbnN0IGF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZSA9XG4gICAgICBDcHFDb25maWd1cmF0b3JVdGlscy5maW5kRmlyc3RDaGFuZ2VkQXR0cmlidXRlKHNvdXJjZSk7XG4gICAgY29uc3QgdXBkYXRlVmFsdWU6IENwcS5VcGRhdGVWYWx1ZSA9IHRoaXMuY29udmVydEF0dHJpYnV0ZShcbiAgICAgIGF0dHJpYnV0ZSxcbiAgICAgIHNvdXJjZS5jb25maWdJZFxuICAgICk7XG4gICAgcmV0dXJuIHVwZGF0ZVZhbHVlO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNvbnZlcnRBdHRyaWJ1dGUoXG4gICAgYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlLFxuICAgIGNvbmZpZ3VyYXRpb25JZDogc3RyaW5nXG4gICk6IENwcS5VcGRhdGVWYWx1ZSB7XG4gICAgY29uc3QgdXBkYXRlSW5mbyA9IENwcUNvbmZpZ3VyYXRvclV0aWxzLmdldFVwZGF0ZUluZm9ybWF0aW9uKGF0dHJpYnV0ZSk7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmZpbmRGaXJzdENoYW5nZWRWYWx1ZShhdHRyaWJ1dGUpO1xuICAgIGNvbnN0IHVwZGF0ZUF0dHJpYnV0ZTogQ3BxLlVwZGF0ZVZhbHVlID0ge1xuICAgICAgY29uZmlndXJhdGlvbklkOiBjb25maWd1cmF0aW9uSWQsXG4gICAgICBzdGFuZGFyZEF0dHJpYnV0ZUNvZGU6IHVwZGF0ZUluZm8uc3RhbmRhcmRBdHRyaWJ1dGVDb2RlLFxuICAgICAgYXR0cmlidXRlVmFsdWVJZDogdmFsdWUudmFsdWVDb2RlLFxuICAgICAgcXVhbnRpdHk6IHZhbHVlLnF1YW50aXR5ID8/IDEsXG4gICAgICB0YWJJZDogdXBkYXRlSW5mby50YWJJZCxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHVwZGF0ZUF0dHJpYnV0ZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBmaW5kRmlyc3RDaGFuZ2VkVmFsdWUoXG4gICAgYXR0cmlidXRlOiBDb25maWd1cmF0b3IuQXR0cmlidXRlXG4gICk6IENvbmZpZ3VyYXRvci5WYWx1ZSB7XG4gICAgaWYgKGF0dHJpYnV0ZS52YWx1ZXMgJiYgYXR0cmlidXRlLnZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gYXR0cmlidXRlLnZhbHVlc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyB2YWx1ZXMgcHJlc2VudCcpO1xuICAgIH1cbiAgfVxufVxuIl19