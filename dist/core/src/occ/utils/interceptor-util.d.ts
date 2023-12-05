import { HttpHeaders, HttpRequest } from '@angular/common/http';
export declare const USE_CLIENT_TOKEN = "cx-use-client-token";
export declare const USE_CUSTOMER_SUPPORT_AGENT_TOKEN = "cx-use-csagent-token";
export declare class InterceptorUtil {
    static createHeader<T>(headerName: string, interceptorParam: T, headers?: HttpHeaders): HttpHeaders;
    static removeHeader(headerName: string, request: HttpRequest<any>): HttpRequest<any>;
    static getInterceptorParam<T>(headerName: string, headers: HttpHeaders): T | undefined;
}
