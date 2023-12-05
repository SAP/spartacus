/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export function getRequestOrigin(req) {
    // If express is resolving and trusting X-Forwarded-Host, we want to take it
    // into an account to properly generate request origin.
    const trustProxyFn = req.app.get('trust proxy fn');
    let forwardedHost = req.get('X-Forwarded-Host');
    if (forwardedHost && trustProxyFn(req.connection.remoteAddress, 0)) {
        if (forwardedHost.indexOf(',') !== -1) {
            // Note: X-Forwarded-Host is normally only ever a
            //       single value, but this is to be safe.
            forwardedHost = forwardedHost
                .substring(0, forwardedHost.indexOf(','))
                .trimRight();
        }
        return `${req.protocol}://${forwardedHost}`;
    }
    else {
        return `${req.protocol}://${req.get('host')}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzcy1yZXF1ZXN0LW9yaWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NvcmUtbGlicy9zZXR1cC9zc3IvZXhwcmVzcy11dGlscy9leHByZXNzLXJlcXVlc3Qtb3JpZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFJSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsR0FBWTtJQUMzQyw0RUFBNEU7SUFDNUUsdURBQXVEO0lBQ3ZELE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbkQsSUFBSSxhQUFhLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2hELElBQUksYUFBYSxJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsRUFBRTtRQUNsRSxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDckMsaURBQWlEO1lBQ2pELDhDQUE4QztZQUM5QyxhQUFhLEdBQUcsYUFBYTtpQkFDMUIsU0FBUyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN4QyxTQUFTLEVBQUUsQ0FBQztTQUNoQjtRQUNELE9BQU8sR0FBRyxHQUFHLENBQUMsUUFBUSxNQUFNLGFBQWEsRUFBRSxDQUFDO0tBQzdDO1NBQU07UUFDTCxPQUFPLEdBQUcsR0FBRyxDQUFDLFFBQVEsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7S0FDL0M7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgUmVxdWVzdCB9IGZyb20gJ2V4cHJlc3MnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVxdWVzdE9yaWdpbihyZXE6IFJlcXVlc3QpOiBzdHJpbmcge1xuICAvLyBJZiBleHByZXNzIGlzIHJlc29sdmluZyBhbmQgdHJ1c3RpbmcgWC1Gb3J3YXJkZWQtSG9zdCwgd2Ugd2FudCB0byB0YWtlIGl0XG4gIC8vIGludG8gYW4gYWNjb3VudCB0byBwcm9wZXJseSBnZW5lcmF0ZSByZXF1ZXN0IG9yaWdpbi5cbiAgY29uc3QgdHJ1c3RQcm94eUZuID0gcmVxLmFwcC5nZXQoJ3RydXN0IHByb3h5IGZuJyk7XG4gIGxldCBmb3J3YXJkZWRIb3N0ID0gcmVxLmdldCgnWC1Gb3J3YXJkZWQtSG9zdCcpO1xuICBpZiAoZm9yd2FyZGVkSG9zdCAmJiB0cnVzdFByb3h5Rm4ocmVxLmNvbm5lY3Rpb24ucmVtb3RlQWRkcmVzcywgMCkpIHtcbiAgICBpZiAoZm9yd2FyZGVkSG9zdC5pbmRleE9mKCcsJykgIT09IC0xKSB7XG4gICAgICAvLyBOb3RlOiBYLUZvcndhcmRlZC1Ib3N0IGlzIG5vcm1hbGx5IG9ubHkgZXZlciBhXG4gICAgICAvLyAgICAgICBzaW5nbGUgdmFsdWUsIGJ1dCB0aGlzIGlzIHRvIGJlIHNhZmUuXG4gICAgICBmb3J3YXJkZWRIb3N0ID0gZm9yd2FyZGVkSG9zdFxuICAgICAgICAuc3Vic3RyaW5nKDAsIGZvcndhcmRlZEhvc3QuaW5kZXhPZignLCcpKVxuICAgICAgICAudHJpbVJpZ2h0KCk7XG4gICAgfVxuICAgIHJldHVybiBgJHtyZXEucHJvdG9jb2x9Oi8vJHtmb3J3YXJkZWRIb3N0fWA7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGAke3JlcS5wcm90b2NvbH06Ly8ke3JlcS5nZXQoJ2hvc3QnKX1gO1xuICB9XG59XG4iXX0=