/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const initialLoaderState = {
    loading: false,
    error: false,
    success: false,
    value: undefined,
};
/**
 * Higher order reducer that adds generic loading flag to chunk of the state
 *
 * Utilizes "loader" meta field of actions to set specific flags for specific
 * action (LOAD, SUCCESS, FAIL, RESET)
 */
export function loaderReducer(entityType, reducer) {
    return (state = initialLoaderState, action) => {
        if (action.meta &&
            action.meta.loader &&
            action.meta.entityType === entityType) {
            const entity = action.meta.loader;
            if (entity.load) {
                return {
                    ...state,
                    loading: true,
                    value: getReducerIfExists(state.value),
                };
            }
            else if (entity.error) {
                return {
                    ...state,
                    loading: false,
                    error: true,
                    success: false,
                    value: getReducerIfExists(undefined),
                };
            }
            else if (entity.success) {
                return {
                    ...state,
                    value: getReducerIfExists(action.payload),
                    loading: false,
                    error: false,
                    success: true,
                };
            }
            else {
                // reset state action
                return {
                    ...initialLoaderState,
                    value: reducer
                        ? reducer(initialLoaderState.value, action)
                        : initialLoaderState.value,
                };
            }
        }
        if (reducer) {
            const newValue = reducer(state.value, action);
            if (newValue !== state.value) {
                return { ...state, value: newValue };
            }
        }
        return state;
        function getReducerIfExists(fallbackValue) {
            return reducer ? reducer(state.value, action) : fallbackValue;
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyLnJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9zdGF0ZS91dGlscy9sb2FkZXIvbG9hZGVyLnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQU1ILE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFxQjtJQUNsRCxPQUFPLEVBQUUsS0FBSztJQUNkLEtBQUssRUFBRSxLQUFLO0lBQ1osT0FBTyxFQUFFLEtBQUs7SUFDZCxLQUFLLEVBQUUsU0FBUztDQUNqQixDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsYUFBYSxDQUMzQixVQUFrQixFQUNsQixPQUFxRTtJQUVyRSxPQUFPLENBQ0wsUUFBd0Isa0JBQWtCLEVBQzFDLE1BQW9CLEVBQ0osRUFBRTtRQUNsQixJQUNFLE1BQU0sQ0FBQyxJQUFJO1lBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFDckM7WUFDQSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUVsQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2YsT0FBTztvQkFDTCxHQUFHLEtBQUs7b0JBQ1IsT0FBTyxFQUFFLElBQUk7b0JBQ2IsS0FBSyxFQUFFLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7aUJBQ3ZDLENBQUM7YUFDSDtpQkFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ3ZCLE9BQU87b0JBQ0wsR0FBRyxLQUFLO29CQUNSLE9BQU8sRUFBRSxLQUFLO29CQUNkLEtBQUssRUFBRSxJQUFJO29CQUNYLE9BQU8sRUFBRSxLQUFLO29CQUNkLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7aUJBQ3JDLENBQUM7YUFDSDtpQkFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ3pCLE9BQU87b0JBQ0wsR0FBRyxLQUFLO29CQUNSLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO29CQUN6QyxPQUFPLEVBQUUsS0FBSztvQkFDZCxLQUFLLEVBQUUsS0FBSztvQkFDWixPQUFPLEVBQUUsSUFBSTtpQkFDZCxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wscUJBQXFCO2dCQUNyQixPQUFPO29CQUNMLEdBQUcsa0JBQWtCO29CQUNyQixLQUFLLEVBQUUsT0FBTzt3QkFDWixDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7d0JBQzNDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO2lCQUM3QixDQUFDO2FBQ0g7U0FDRjtRQUVELElBQUksT0FBTyxFQUFFO1lBQ1gsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDOUMsSUFBSSxRQUFRLEtBQUssS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDNUIsT0FBTyxFQUFFLEdBQUcsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQzthQUN0QztTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUM7UUFFYixTQUFTLGtCQUFrQixDQUFDLGFBQWtCO1lBQzVDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1FBQ2hFLENBQUM7SUFDSCxDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgTG9hZGVyU3RhdGUgfSBmcm9tICcuL2xvYWRlci1zdGF0ZSc7XG5pbXBvcnQgeyBMb2FkZXJBY3Rpb24gfSBmcm9tICcuL2xvYWRlci5hY3Rpb24nO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbExvYWRlclN0YXRlOiBMb2FkZXJTdGF0ZTxhbnk+ID0ge1xuICBsb2FkaW5nOiBmYWxzZSxcbiAgZXJyb3I6IGZhbHNlLFxuICBzdWNjZXNzOiBmYWxzZSxcbiAgdmFsdWU6IHVuZGVmaW5lZCxcbn07XG5cbi8qKlxuICogSGlnaGVyIG9yZGVyIHJlZHVjZXIgdGhhdCBhZGRzIGdlbmVyaWMgbG9hZGluZyBmbGFnIHRvIGNodW5rIG9mIHRoZSBzdGF0ZVxuICpcbiAqIFV0aWxpemVzIFwibG9hZGVyXCIgbWV0YSBmaWVsZCBvZiBhY3Rpb25zIHRvIHNldCBzcGVjaWZpYyBmbGFncyBmb3Igc3BlY2lmaWNcbiAqIGFjdGlvbiAoTE9BRCwgU1VDQ0VTUywgRkFJTCwgUkVTRVQpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkZXJSZWR1Y2VyPFQsIFYgZXh0ZW5kcyBBY3Rpb24gPSBBY3Rpb24+KFxuICBlbnRpdHlUeXBlOiBzdHJpbmcsXG4gIHJlZHVjZXI/OiAoc3RhdGU6IFQgfCB1bmRlZmluZWQsIGFjdGlvbjogQWN0aW9uIHwgVikgPT4gVCB8IHVuZGVmaW5lZFxuKTogKHN0YXRlOiBMb2FkZXJTdGF0ZTxUPiB8IHVuZGVmaW5lZCwgYWN0aW9uOiBMb2FkZXJBY3Rpb24pID0+IExvYWRlclN0YXRlPFQ+IHtcbiAgcmV0dXJuIChcbiAgICBzdGF0ZTogTG9hZGVyU3RhdGU8VD4gPSBpbml0aWFsTG9hZGVyU3RhdGUsXG4gICAgYWN0aW9uOiBMb2FkZXJBY3Rpb25cbiAgKTogTG9hZGVyU3RhdGU8VD4gPT4ge1xuICAgIGlmIChcbiAgICAgIGFjdGlvbi5tZXRhICYmXG4gICAgICBhY3Rpb24ubWV0YS5sb2FkZXIgJiZcbiAgICAgIGFjdGlvbi5tZXRhLmVudGl0eVR5cGUgPT09IGVudGl0eVR5cGVcbiAgICApIHtcbiAgICAgIGNvbnN0IGVudGl0eSA9IGFjdGlvbi5tZXRhLmxvYWRlcjtcblxuICAgICAgaWYgKGVudGl0eS5sb2FkKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgICAgICB2YWx1ZTogZ2V0UmVkdWNlcklmRXhpc3RzKHN0YXRlLnZhbHVlKSxcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoZW50aXR5LmVycm9yKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgZXJyb3I6IHRydWUsXG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgdmFsdWU6IGdldFJlZHVjZXJJZkV4aXN0cyh1bmRlZmluZWQpLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChlbnRpdHkuc3VjY2Vzcykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIHZhbHVlOiBnZXRSZWR1Y2VySWZFeGlzdHMoYWN0aW9uLnBheWxvYWQpLFxuICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIGVycm9yOiBmYWxzZSxcbiAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmVzZXQgc3RhdGUgYWN0aW9uXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uaW5pdGlhbExvYWRlclN0YXRlLFxuICAgICAgICAgIHZhbHVlOiByZWR1Y2VyXG4gICAgICAgICAgICA/IHJlZHVjZXIoaW5pdGlhbExvYWRlclN0YXRlLnZhbHVlLCBhY3Rpb24pXG4gICAgICAgICAgICA6IGluaXRpYWxMb2FkZXJTdGF0ZS52YWx1ZSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVkdWNlcikge1xuICAgICAgY29uc3QgbmV3VmFsdWUgPSByZWR1Y2VyKHN0YXRlLnZhbHVlLCBhY3Rpb24pO1xuICAgICAgaWYgKG5ld1ZhbHVlICE9PSBzdGF0ZS52YWx1ZSkge1xuICAgICAgICByZXR1cm4geyAuLi5zdGF0ZSwgdmFsdWU6IG5ld1ZhbHVlIH07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdGF0ZTtcblxuICAgIGZ1bmN0aW9uIGdldFJlZHVjZXJJZkV4aXN0cyhmYWxsYmFja1ZhbHVlOiBhbnkpIHtcbiAgICAgIHJldHVybiByZWR1Y2VyID8gcmVkdWNlcihzdGF0ZS52YWx1ZSwgYWN0aW9uKSA6IGZhbGxiYWNrVmFsdWU7XG4gICAgfVxuICB9O1xufVxuIl19