/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isDevMode } from '@angular/core';
import { initialLoaderState, loaderReducer } from '../loader/loader.reducer';
export const initialProcessesState = {
    processesCount: 0,
};
/**
 * Higher order reducer that adds processes count
 */
export function processesLoaderReducer(entityType, reducer) {
    return (state = {
        ...initialProcessesState,
        ...initialLoaderState,
    }, action) => {
        const loaderState = loaderReducer(entityType, reducer)(state, action);
        if (action.meta && action.meta.entityType === entityType) {
            const processesCountDiff = action.meta.processesCountDiff;
            if (isDevMode() &&
                state.processesCount &&
                processesCountDiff &&
                state.processesCount + processesCountDiff < 0) {
                //CXSPA-3670 - extract logging to an effect
                /* eslint-disable-next-line no-console */
                console.error(`Action '${action.type}' sets processesCount to value < 0!\n` +
                    'Make sure to keep processesCount in sync.\n' +
                    'There should always be only one decrement action for each increment action.\n' +
                    "Make sure that you don't reset state in between those actions.\n", action);
            }
            if (processesCountDiff) {
                return {
                    ...loaderState,
                    processesCount: state.processesCount
                        ? state.processesCount + processesCountDiff
                        : processesCountDiff,
                };
            }
            else if (processesCountDiff === null) {
                // reset action
                return {
                    ...loaderState,
                    ...initialProcessesState,
                };
            }
        }
        return loaderState;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzc2VzLWxvYWRlci5yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvc3RhdGUvdXRpbHMvcHJvY2Vzc2VzLWxvYWRlci9wcm9jZXNzZXMtbG9hZGVyLnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBSTdFLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUE4QjtJQUM5RCxjQUFjLEVBQUUsQ0FBQztDQUNsQixDQUFDO0FBRUY7O0dBRUc7QUFDSCxNQUFNLFVBQVUsc0JBQXNCLENBQ3BDLFVBQWtCLEVBQ2xCLE9BQXFEO0lBS3JELE9BQU8sQ0FDTCxRQUFpQztRQUMvQixHQUFHLHFCQUFxQjtRQUN4QixHQUFHLGtCQUFrQjtLQUN0QixFQUNELE1BQTZCLEVBQ0osRUFBRTtRQUMzQixNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0RSxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO1lBQ3hELE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztZQUMxRCxJQUNFLFNBQVMsRUFBRTtnQkFDWCxLQUFLLENBQUMsY0FBYztnQkFDcEIsa0JBQWtCO2dCQUNsQixLQUFLLENBQUMsY0FBYyxHQUFHLGtCQUFrQixHQUFHLENBQUMsRUFDN0M7Z0JBQ0EsMkNBQTJDO2dCQUMzQyx5Q0FBeUM7Z0JBQ3pDLE9BQU8sQ0FBQyxLQUFLLENBQ1gsV0FBVyxNQUFNLENBQUMsSUFBSSx1Q0FBdUM7b0JBQzNELDZDQUE2QztvQkFDN0MsK0VBQStFO29CQUMvRSxrRUFBa0UsRUFDcEUsTUFBTSxDQUNQLENBQUM7YUFDSDtZQUNELElBQUksa0JBQWtCLEVBQUU7Z0JBQ3RCLE9BQU87b0JBQ0wsR0FBRyxXQUFXO29CQUNkLGNBQWMsRUFBRSxLQUFLLENBQUMsY0FBYzt3QkFDbEMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsa0JBQWtCO3dCQUMzQyxDQUFDLENBQUMsa0JBQWtCO2lCQUN2QixDQUFDO2FBQ0g7aUJBQU0sSUFBSSxrQkFBa0IsS0FBSyxJQUFJLEVBQUU7Z0JBQ3RDLGVBQWU7Z0JBQ2YsT0FBTztvQkFDTCxHQUFHLFdBQVc7b0JBQ2QsR0FBRyxxQkFBcUI7aUJBQ3pCLENBQUM7YUFDSDtTQUNGO1FBRUQsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgaW5pdGlhbExvYWRlclN0YXRlLCBsb2FkZXJSZWR1Y2VyIH0gZnJvbSAnLi4vbG9hZGVyL2xvYWRlci5yZWR1Y2VyJztcbmltcG9ydCB7IFByb2Nlc3Nlc0xvYWRlclN0YXRlIH0gZnJvbSAnLi9wcm9jZXNzZXMtbG9hZGVyLXN0YXRlJztcbmltcG9ydCB7IFByb2Nlc3Nlc0xvYWRlckFjdGlvbiB9IGZyb20gJy4vcHJvY2Vzc2VzLWxvYWRlci5hY3Rpb24nO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbFByb2Nlc3Nlc1N0YXRlOiBQcm9jZXNzZXNMb2FkZXJTdGF0ZTxhbnk+ID0ge1xuICBwcm9jZXNzZXNDb3VudDogMCxcbn07XG5cbi8qKlxuICogSGlnaGVyIG9yZGVyIHJlZHVjZXIgdGhhdCBhZGRzIHByb2Nlc3NlcyBjb3VudFxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc2VzTG9hZGVyUmVkdWNlcjxUPihcbiAgZW50aXR5VHlwZTogc3RyaW5nLFxuICByZWR1Y2VyPzogKHN0YXRlOiBUIHwgdW5kZWZpbmVkLCBhY3Rpb246IEFjdGlvbikgPT4gVFxuKTogKFxuICBzdGF0ZTogUHJvY2Vzc2VzTG9hZGVyU3RhdGU8VD4sXG4gIGFjdGlvbjogUHJvY2Vzc2VzTG9hZGVyQWN0aW9uXG4pID0+IFByb2Nlc3Nlc0xvYWRlclN0YXRlPFQ+IHtcbiAgcmV0dXJuIChcbiAgICBzdGF0ZTogUHJvY2Vzc2VzTG9hZGVyU3RhdGU8VD4gPSB7XG4gICAgICAuLi5pbml0aWFsUHJvY2Vzc2VzU3RhdGUsXG4gICAgICAuLi5pbml0aWFsTG9hZGVyU3RhdGUsXG4gICAgfSxcbiAgICBhY3Rpb246IFByb2Nlc3Nlc0xvYWRlckFjdGlvblxuICApOiBQcm9jZXNzZXNMb2FkZXJTdGF0ZTxUPiA9PiB7XG4gICAgY29uc3QgbG9hZGVyU3RhdGUgPSBsb2FkZXJSZWR1Y2VyKGVudGl0eVR5cGUsIHJlZHVjZXIpKHN0YXRlLCBhY3Rpb24pO1xuICAgIGlmIChhY3Rpb24ubWV0YSAmJiBhY3Rpb24ubWV0YS5lbnRpdHlUeXBlID09PSBlbnRpdHlUeXBlKSB7XG4gICAgICBjb25zdCBwcm9jZXNzZXNDb3VudERpZmYgPSBhY3Rpb24ubWV0YS5wcm9jZXNzZXNDb3VudERpZmY7XG4gICAgICBpZiAoXG4gICAgICAgIGlzRGV2TW9kZSgpICYmXG4gICAgICAgIHN0YXRlLnByb2Nlc3Nlc0NvdW50ICYmXG4gICAgICAgIHByb2Nlc3Nlc0NvdW50RGlmZiAmJlxuICAgICAgICBzdGF0ZS5wcm9jZXNzZXNDb3VudCArIHByb2Nlc3Nlc0NvdW50RGlmZiA8IDBcbiAgICAgICkge1xuICAgICAgICAvL0NYU1BBLTM2NzAgLSBleHRyYWN0IGxvZ2dpbmcgdG8gYW4gZWZmZWN0XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlICovXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgYEFjdGlvbiAnJHthY3Rpb24udHlwZX0nIHNldHMgcHJvY2Vzc2VzQ291bnQgdG8gdmFsdWUgPCAwIVxcbmAgK1xuICAgICAgICAgICAgJ01ha2Ugc3VyZSB0byBrZWVwIHByb2Nlc3Nlc0NvdW50IGluIHN5bmMuXFxuJyArXG4gICAgICAgICAgICAnVGhlcmUgc2hvdWxkIGFsd2F5cyBiZSBvbmx5IG9uZSBkZWNyZW1lbnQgYWN0aW9uIGZvciBlYWNoIGluY3JlbWVudCBhY3Rpb24uXFxuJyArXG4gICAgICAgICAgICBcIk1ha2Ugc3VyZSB0aGF0IHlvdSBkb24ndCByZXNldCBzdGF0ZSBpbiBiZXR3ZWVuIHRob3NlIGFjdGlvbnMuXFxuXCIsXG4gICAgICAgICAgYWN0aW9uXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAocHJvY2Vzc2VzQ291bnREaWZmKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4ubG9hZGVyU3RhdGUsXG4gICAgICAgICAgcHJvY2Vzc2VzQ291bnQ6IHN0YXRlLnByb2Nlc3Nlc0NvdW50XG4gICAgICAgICAgICA/IHN0YXRlLnByb2Nlc3Nlc0NvdW50ICsgcHJvY2Vzc2VzQ291bnREaWZmXG4gICAgICAgICAgICA6IHByb2Nlc3Nlc0NvdW50RGlmZixcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAocHJvY2Vzc2VzQ291bnREaWZmID09PSBudWxsKSB7XG4gICAgICAgIC8vIHJlc2V0IGFjdGlvblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmxvYWRlclN0YXRlLFxuICAgICAgICAgIC4uLmluaXRpYWxQcm9jZXNzZXNTdGF0ZSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbG9hZGVyU3RhdGU7XG4gIH07XG59XG4iXX0=