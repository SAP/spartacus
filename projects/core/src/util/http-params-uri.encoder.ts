/**
 * Angular uses the native encodeURIComponent function,
 * but then un-encoded some characters that are allowed
 * to be part of the query according to IETF RFC 3986.
 * So, to make these characters still encoded, this encoder only
 * uses the encodeURIComponent.
 */
import { HttpParameterCodec } from '@angular/common/http';

export class HttpParamsURIEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
