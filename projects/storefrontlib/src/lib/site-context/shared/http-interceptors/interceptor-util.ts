import { HttpHeaders } from '@angular/common/http';

export const REQUEST_MAPPING_CUSTOM_HEADER = 'y-request-mapping';

export class InterceptorUtil {
  static createHeader<T>(
    headerName: string,
    interceptorParam: T,
    headers?: HttpHeaders
  ): HttpHeaders {
    if (headers) {
      return headers.append(headerName, JSON.stringify(interceptorParam));
    }
    headers = new HttpHeaders().set(
      headerName,
      JSON.stringify(interceptorParam)
    );
    return headers;
  }

  static getInterceptorParam<T>(headerName: string, headers: HttpHeaders): T {
    const rawValue = headers.get(headerName);
    if (rawValue) {
      return JSON.parse(rawValue);
    }
    return undefined;
  }
}
