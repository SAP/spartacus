/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export const defaultOccOrderApprovalConfig = {
    backend: {
        occ: {
            endpoints: {
                orderApprovals: '/users/${userId}/orderapprovals',
                orderApproval: '/users/${userId}/orderapprovals/${orderApprovalCode}?fields=FULL',
                orderApprovalDecision: '/users/${userId}/orderapprovals/${orderApprovalCode}/decision',
            },
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1vY2Mtb3JnYW5pemF0aW9uLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vb3JkZXItYXBwcm92YWwvb2NjL2NvbmZpZy9kZWZhdWx0LW9jYy1vcmdhbml6YXRpb24tY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFJSCxNQUFNLENBQUMsTUFBTSw2QkFBNkIsR0FBYztJQUN0RCxPQUFPLEVBQUU7UUFDUCxHQUFHLEVBQUU7WUFDSCxTQUFTLEVBQUU7Z0JBQ1QsY0FBYyxFQUFFLGlDQUFpQztnQkFDakQsYUFBYSxFQUNYLGtFQUFrRTtnQkFDcEUscUJBQXFCLEVBQ25CLCtEQUErRDthQUNsRTtTQUNGO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgT2NjQ29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRPY2NPcmRlckFwcHJvdmFsQ29uZmlnOiBPY2NDb25maWcgPSB7XG4gIGJhY2tlbmQ6IHtcbiAgICBvY2M6IHtcbiAgICAgIGVuZHBvaW50czoge1xuICAgICAgICBvcmRlckFwcHJvdmFsczogJy91c2Vycy8ke3VzZXJJZH0vb3JkZXJhcHByb3ZhbHMnLFxuICAgICAgICBvcmRlckFwcHJvdmFsOlxuICAgICAgICAgICcvdXNlcnMvJHt1c2VySWR9L29yZGVyYXBwcm92YWxzLyR7b3JkZXJBcHByb3ZhbENvZGV9P2ZpZWxkcz1GVUxMJyxcbiAgICAgICAgb3JkZXJBcHByb3ZhbERlY2lzaW9uOlxuICAgICAgICAgICcvdXNlcnMvJHt1c2VySWR9L29yZGVyYXBwcm92YWxzLyR7b3JkZXJBcHByb3ZhbENvZGV9L2RlY2lzaW9uJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG4iXX0=