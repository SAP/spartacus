/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultOccSiteContextConfig = {
    backend: {
        occ: {
            endpoints: {
                languages: 'languages',
                currencies: 'currencies',
                countries: 'countries',
                regions: 'countries/${isoCode}/regions?fields=regions(name,isocode,isocodeShort)',
                baseSites: 'basesites?fields=FULL',
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1vY2Mtc2l0ZS1jb250ZXh0LWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL29jYy9hZGFwdGVycy9zaXRlLWNvbnRleHQvZGVmYXVsdC1vY2Mtc2l0ZS1jb250ZXh0LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBSUgsTUFBTSxDQUFDLE1BQU0sMkJBQTJCLEdBQWM7SUFDcEQsT0FBTyxFQUFFO1FBQ1AsR0FBRyxFQUFFO1lBQ0gsU0FBUyxFQUFFO2dCQUNULFNBQVMsRUFBRSxXQUFXO2dCQUN0QixVQUFVLEVBQUUsWUFBWTtnQkFDeEIsU0FBUyxFQUFFLFdBQVc7Z0JBQ3RCLE9BQU8sRUFDTCx3RUFBd0U7Z0JBQzFFLFNBQVMsRUFBRSx1QkFBdUI7YUFDbkM7U0FDRjtLQUNGO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE9jY0NvbmZpZyB9IGZyb20gJy4uLy4uL2NvbmZpZy9vY2MtY29uZmlnJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRPY2NTaXRlQ29udGV4dENvbmZpZzogT2NjQ29uZmlnID0ge1xuICBiYWNrZW5kOiB7XG4gICAgb2NjOiB7XG4gICAgICBlbmRwb2ludHM6IHtcbiAgICAgICAgbGFuZ3VhZ2VzOiAnbGFuZ3VhZ2VzJyxcbiAgICAgICAgY3VycmVuY2llczogJ2N1cnJlbmNpZXMnLFxuICAgICAgICBjb3VudHJpZXM6ICdjb3VudHJpZXMnLFxuICAgICAgICByZWdpb25zOlxuICAgICAgICAgICdjb3VudHJpZXMvJHtpc29Db2RlfS9yZWdpb25zP2ZpZWxkcz1yZWdpb25zKG5hbWUsaXNvY29kZSxpc29jb2RlU2hvcnQpJyxcbiAgICAgICAgYmFzZVNpdGVzOiAnYmFzZXNpdGVzP2ZpZWxkcz1GVUxMJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG4iXX0=