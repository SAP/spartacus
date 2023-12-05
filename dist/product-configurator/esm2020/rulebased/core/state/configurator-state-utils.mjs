/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export class ConfiguratorStateUtils {
    static mergeGroupsWithSupplements(groups, attributeSupplements) {
        const mergedGroups = [];
        groups.forEach((group) => mergedGroups.push(this.mergeGroupWithSupplements(group, attributeSupplements)));
        return mergedGroups;
    }
    static mergeGroupWithSupplements(group, attributeSupplements) {
        if (this.isTargetGroup(group, attributeSupplements)) {
            return this.mergeTargetGroupWithSupplements(group, attributeSupplements);
        }
        else {
            return {
                ...group,
                subGroups: this.mergeGroupsWithSupplements(group.subGroups, attributeSupplements),
            };
        }
    }
    static mergeTargetGroupWithSupplements(group, attributeSupplements) {
        let mergedAttributes = group.attributes;
        attributeSupplements.forEach((attributeSupplement) => {
            const attributeName = ConfiguratorStateUtils.getAttributeName(attributeSupplement.attributeUiKey);
            mergedAttributes = this.updateArrayElement(mergedAttributes, (attribute) => attribute.name === attributeName, (attribute) => {
                return {
                    ...attribute,
                    values: this.mergeValuesWithSupplement(attribute.values, attributeSupplement),
                };
            });
        });
        return {
            ...group,
            attributes: mergedAttributes,
        };
    }
    static mergeValuesWithSupplement(attributeValues, attributeSupplement) {
        let mergedValues = attributeValues;
        attributeSupplement.valueSupplements.forEach((valueSupplement) => {
            mergedValues = this.updateArrayElement(mergedValues, (value) => value.valueCode === valueSupplement.attributeValueKey, (value) => {
                return {
                    ...value,
                    valuePrice: valueSupplement.priceValue,
                };
            });
        });
        return mergedValues;
    }
    static isTargetGroup(group, attributeSupplements) {
        const firstSupplement = attributeSupplements[0];
        if (firstSupplement) {
            const attributeName = ConfiguratorStateUtils.getAttributeName(firstSupplement.attributeUiKey);
            const attributeUiKey = ConfiguratorStateUtils.getKey(firstSupplement.attributeUiKey, attributeName);
            return group.id.indexOf(attributeUiKey) >= 0;
        }
        else {
            // that should never happen, as we merge existing groups
            // with supplements only if supplements are available
            throw new Error('We expect at least one attribute supplement');
        }
    }
    /**
     * It searches in the given `array` for the first element satisfying the `predicate` function.
     * Then it returns a fresh array, where this element is replaced with the result of the `projection` function.
     *
     * If no element of the `array` satisfied the `predicate`, it returns the original `array`.
     */
    static updateArrayElement(array, predicate, projection) {
        if (array) {
            const index = array.findIndex(predicate);
            if (index === -1) {
                return array;
            }
            const value = array[index];
            const newValue = projection(value, index);
            const newArray = [...array];
            newArray[index] = newValue;
            return newArray;
        }
    }
    static getAttributeName(attributeUiKey) {
        const lastIndexOf = attributeUiKey.lastIndexOf('@');
        return attributeUiKey.slice(lastIndexOf + 1);
    }
    static getKey(key, name) {
        return key.replace('@' + name, '');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXN0YXRlLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb3JlL3N0YXRlL2NvbmZpZ3VyYXRvci1zdGF0ZS11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBSUgsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxNQUFNLENBQUMsMEJBQTBCLENBQy9CLE1BQTRCLEVBQzVCLG9CQUF3RDtRQUV4RCxNQUFNLFlBQVksR0FBeUIsRUFBRSxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUN2QixZQUFZLENBQUMsSUFBSSxDQUNmLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLEVBQUUsb0JBQW9CLENBQUMsQ0FDNUQsQ0FDRixDQUFDO1FBQ0YsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVTLE1BQU0sQ0FBQyx5QkFBeUIsQ0FDeEMsS0FBeUIsRUFDekIsb0JBQXdEO1FBRXhELElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsb0JBQW9CLENBQUMsRUFBRTtZQUNuRCxPQUFPLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxLQUFLLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztTQUMxRTthQUFNO1lBQ0wsT0FBTztnQkFDTCxHQUFHLEtBQUs7Z0JBQ1IsU0FBUyxFQUFFLElBQUksQ0FBQywwQkFBMEIsQ0FDeEMsS0FBSyxDQUFDLFNBQVMsRUFDZixvQkFBb0IsQ0FDckI7YUFDRixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRVMsTUFBTSxDQUFDLCtCQUErQixDQUM5QyxLQUF5QixFQUN6QixvQkFBd0Q7UUFFeEQsSUFBSSxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBRXhDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxD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QUFDLENBQUM7UUFDcEQsT0FBTyxjQUFjLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRVMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFXLEVBQUUsSUFBWTtRQUMvQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb25maWd1cmF0b3IgfSBmcm9tICcuLi9tb2RlbC9jb25maWd1cmF0b3IubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yU3RhdGVVdGlscyB7XG4gIHN0YXRpYyBtZXJnZUdyb3Vwc1dpdGhTdXBwbGVtZW50cyhcbiAgICBncm91cHM6IENvbmZpZ3VyYXRvci5Hcm91cFtdLFxuICAgIGF0dHJpYnV0ZVN1cHBsZW1lbnRzOiBDb25maWd1cmF0b3IuQXR0cmlidXRlU3VwcGxlbWVudFtdXG4gICk6IENvbmZpZ3VyYXRvci5Hcm91cFtdIHtcbiAgICBjb25zdCBtZXJnZWRHcm91cHM6IENvbmZpZ3VyYXRvci5Hcm91cFtdID0gW107XG4gICAgZ3JvdXBzLmZvckVhY2goKGdyb3VwKSA9PlxuICAgICAgbWVyZ2VkR3JvdXBzLnB1c2goXG4gICAgICAgIHRoaXMubWVyZ2VHcm91cFdpdGhTdXBwbGVtZW50cyhncm91cCwgYXR0cmlidXRlU3VwcGxlbWVudHMpXG4gICAgICApXG4gICAgKTtcbiAgICByZXR1cm4gbWVyZ2VkR3JvdXBzO1xuICB9XG5cbiAgcHJvdGVjdGVkIHN0YXRpYyBtZXJnZUdyb3VwV2l0aFN1cHBsZW1lbnRzKFxuICAgIGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXAsXG4gICAgYXR0cmlidXRlU3VwcGxlbWVudHM6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGVTdXBwbGVtZW50W11cbiAgKTogQ29uZmlndXJhdG9yLkdyb3VwIHtcbiAgICBpZiAodGhpcy5pc1RhcmdldEdyb3VwKGdyb3VwLCBhdHRyaWJ1dGVTdXBwbGVtZW50cykpIHtcbiAgICAgIHJldHVybiB0aGlzLm1lcmdlVGFyZ2V0R3JvdXBXaXRoU3VwcGxlbWVudHMoZ3JvdXAsIGF0dHJpYnV0ZVN1cHBsZW1lbnRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZ3JvdXAsXG4gICAgICAgIHN1Ykdyb3VwczogdGhpcy5tZXJnZUdyb3Vwc1dpdGhTdXBwbGVtZW50cyhcbiAgICAgICAgICBncm91cC5zdWJHcm91cHMsXG4gICAgICAgICAgYXR0cmlidXRlU3VwcGxlbWVudHNcbiAgICAgICAgKSxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHN0YXRpYyBtZXJnZVRhcmdldEdyb3VwV2l0aFN1cHBsZW1lbnRzKFxuICAgIGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXAsXG4gICAgYXR0cmlidXRlU3VwcGxlbWVudHM6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGVTdXBwbGVtZW50W11cbiAgKTogQ29uZmlndXJhdG9yLkdyb3VwIHtcbiAgICBsZXQgbWVyZ2VkQXR0cmlidXRlcyA9IGdyb3VwLmF0dHJpYnV0ZXM7XG5cbiAgICBhdHRyaWJ1dGVTdXBwbGVtZW50cy5mb3JFYWNoKChhdHRyaWJ1dGVTdXBwbGVtZW50KSA9PiB7XG4gICAgICBjb25zdCBhdHRyaWJ1dGVOYW1lID0gQ29uZmlndXJhdG9yU3RhdGVVdGlscy5nZXRBdHRyaWJ1dGVOYW1lKFxuICAgICAgICBhdHRyaWJ1dGVTdXBwbGVtZW50LmF0dHJpYnV0ZVVpS2V5XG4gICAgICApO1xuICAgICAgbWVyZ2VkQXR0cmlidXRlcyA9IHRoaXMudXBkYXRlQXJyYXlFbGVtZW50KFxuICAgICAgICBtZXJnZWRBdHRyaWJ1dGVzLFxuICAgICAgICAoYXR0cmlidXRlKSA9PiBhdHRyaWJ1dGUubmFtZSA9PT0gYXR0cmlidXRlTmFtZSxcbiAgICAgICAgKGF0dHJpYnV0ZSkgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5hdHRyaWJ1dGUsXG4gICAgICAgICAgICB2YWx1ZXM6IHRoaXMubWVyZ2VWYWx1ZXNXaXRoU3VwcGxlbWVudChcbiAgICAgICAgICAgICAgYXR0cmlidXRlLnZhbHVlcyxcbiAgICAgICAgICAgICAgYXR0cmlidXRlU3VwcGxlbWVudFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmdyb3VwLFxuICAgICAgYXR0cmlidXRlczogbWVyZ2VkQXR0cmlidXRlcyxcbiAgICB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIHN0YXRpYyBtZXJnZVZhbHVlc1dpdGhTdXBwbGVtZW50KFxuICAgIGF0dHJpYnV0ZVZhbHVlczogQ29uZmlndXJhdG9yLlZhbHVlW10gfCB1bmRlZmluZWQsXG4gICAgYXR0cmlidXRlU3VwcGxlbWVudDogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZVN1cHBsZW1lbnRcbiAgKTogQ29uZmlndXJhdG9yLlZhbHVlW10gfCB1bmRlZmluZWQge1xuICAgIGxldCBtZXJnZWRWYWx1ZXMgPSBhdHRyaWJ1dGVWYWx1ZXM7XG5cbiAgICBhdHRyaWJ1dGVTdXBwbGVtZW50LnZhbHVlU3VwcGxlbWVudHMuZm9yRWFjaCgodmFsdWVTdXBwbGVtZW50KSA9PiB7XG4gICAgICBtZXJnZWRWYWx1ZXMgPSB0aGlzLnVwZGF0ZUFycmF5RWxlbWVudChcbiAgICAgICAgbWVyZ2VkVmFsdWVzLFxuICAgICAgICAodmFsdWUpID0+IHZhbHVlLnZhbHVlQ29kZSA9PT0gdmFsdWVTdXBwbGVtZW50LmF0dHJpYnV0ZVZhbHVlS2V5LFxuICAgICAgICAodmFsdWUpID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udmFsdWUsXG4gICAgICAgICAgICB2YWx1ZVByaWNlOiB2YWx1ZVN1cHBsZW1lbnQucHJpY2VWYWx1ZSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1lcmdlZFZhbHVlcztcbiAgfVxuXG4gIHByb3RlY3RlZCBzdGF0aWMgaXNUYXJnZXRHcm91cChcbiAgICBncm91cDogQ29uZmlndXJhdG9yLkdyb3VwLFxuICAgIGF0dHJpYnV0ZVN1cHBsZW1lbnRzOiBDb25maWd1cmF0b3IuQXR0cmlidXRlU3VwcGxlbWVudFtdXG4gICk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGZpcnN0U3VwcGxlbWVudCA9IGF0dHJpYnV0ZVN1cHBsZW1lbnRzWzBdO1xuICAgIGlmIChmaXJzdFN1cHBsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSBDb25maWd1cmF0b3JTdGF0ZVV0aWxzLmdldEF0dHJpYnV0ZU5hbWUoXG4gICAgICAgIGZpcnN0U3VwcGxlbWVudC5hdHRyaWJ1dGVVaUtleVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZVVpS2V5ID0gQ29uZmlndXJhdG9yU3RhdGVVdGlscy5nZXRLZXkoXG4gICAgICAgIGZpcnN0U3VwcGxlbWVudC5hdHRyaWJ1dGVVaUtleSxcbiAgICAgICAgYXR0cmlidXRlTmFtZVxuICAgICAgKTtcbiAgICAgIHJldHVybiBncm91cC5pZC5pbmRleE9mKGF0dHJpYnV0ZVVpS2V5KSA+PSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGF0IHNob3VsZCBuZXZlciBoYXBwZW4sIGFzIHdlIG1lcmdlIGV4aXN0aW5nIGdyb3Vwc1xuICAgICAgLy8gd2l0aCBzdXBwbGVtZW50cyBvbmx5IGlmIHN1cHBsZW1lbnRzIGFyZSBhdmFpbGFibGVcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2UgZXhwZWN0IGF0IGxlYXN0IG9uZSBhdHRyaWJ1dGUgc3VwcGxlbWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdCBzZWFyY2hlcyBpbiB0aGUgZ2l2ZW4gYGFycmF5YCBmb3IgdGhlIGZpcnN0IGVsZW1lbnQgc2F0aXNmeWluZyB0aGUgYHByZWRpY2F0ZWAgZnVuY3Rpb24uXG4gICAqIFRoZW4gaXQgcmV0dXJucyBhIGZyZXNoIGFycmF5LCB3aGVyZSB0aGlzIGVsZW1lbnQgaXMgcmVwbGFjZWQgd2l0aCB0aGUgcmVzdWx0IG9mIHRoZSBgcHJvamVjdGlvbmAgZnVuY3Rpb24uXG4gICAqXG4gICAqIElmIG5vIGVsZW1lbnQgb2YgdGhlIGBhcnJheWAgc2F0aXNmaWVkIHRoZSBgcHJlZGljYXRlYCwgaXQgcmV0dXJucyB0aGUgb3JpZ2luYWwgYGFycmF5YC5cbiAgICovXG4gIHByb3RlY3RlZCBzdGF0aWMgdXBkYXRlQXJyYXlFbGVtZW50PFQ+KFxuICAgIGFycmF5OiBUW10gfCB1bmRlZmluZWQsXG4gICAgcHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIG9iajogVFtdKSA9PiB1bmtub3duLFxuICAgIHByb2plY3Rpb246ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlcikgPT4gVFxuICApOiBUW10gfCB1bmRlZmluZWQge1xuICAgIGlmIChhcnJheSkge1xuICAgICAgY29uc3QgaW5kZXggPSBhcnJheS5maW5kSW5kZXgocHJlZGljYXRlKTtcbiAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgICAgfVxuICAgICAgY29uc3QgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IHByb2plY3Rpb24odmFsdWUsIGluZGV4KTtcbiAgICAgIGNvbnN0IG5ld0FycmF5ID0gWy4uLmFycmF5XTtcbiAgICAgIG5ld0FycmF5W2luZGV4XSA9IG5ld1ZhbHVlO1xuICAgICAgcmV0dXJuIG5ld0FycmF5O1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBzdGF0aWMgZ2V0QXR0cmlidXRlTmFtZShhdHRyaWJ1dGVVaUtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBsYXN0SW5kZXhPZiA9IGF0dHJpYnV0ZVVpS2V5Lmxhc3RJbmRleE9mKCdAJyk7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZVVpS2V5LnNsaWNlKGxhc3RJbmRleE9mICsgMSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3RhdGljIGdldEtleShrZXk6IHN0cmluZywgbmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4ga2V5LnJlcGxhY2UoJ0AnICsgbmFtZSwgJycpO1xuICB9XG59XG4iXX0=