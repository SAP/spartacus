/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InvalidTraceparentFormatError } from './errors/invalid-traceparent-format-error';
import { InvalidTraceparentLengthError } from './errors/invalid-traceparent-length-error';
import { W3cTraceContext } from './w3c-trace-context.model';

const HEXDIGLC = '[0-9a-f]'; // https://www.w3.org/TR/trace-context/#traceparent-header-field-values
const VERSION = HEXDIGLC + '{2}'; // 2 HEXDIGLC
const TRACE_ID = HEXDIGLC + '{32}'; // 32 HEXDIGLC
const PARENT_ID = HEXDIGLC + '{16}'; // 16 HEXDIGLC
const TRACE_FLAGS = HEXDIGLC + '{2}'; // 2 HEXDIGLC
const TRACEPARENT = [VERSION, TRACE_ID, PARENT_ID, TRACE_FLAGS].join('-'); // separated by dashes
const traceparentPattern = new RegExp('^' + TRACEPARENT + '$');

/**
 * Maps traceparent header to object with properties version, traceId, spanId and traceFlags.
 * Since `traceparent` header may be not attached to the request, the function returns undefined if the header is not provided.
 * If the header is provided but has invalid format or length, the function throws an error.
 *
 * @param traceparent
 * @returns Params of the traceparent header.
 *
 * @see https://www.w3.org/TR/trace-context/#traceparent-header-field-values
 */
export function parseTraceparent(
  traceparent: string | undefined | null
): W3cTraceContext | undefined {
  if (typeof traceparent !== 'string') {
    return undefined;
  }

  if (traceparent.length !== 55) {
    throw new InvalidTraceparentLengthError(traceparent.length);
  }

  if (!traceparentPattern.test(traceparent)) {
    throw new InvalidTraceparentFormatError();
  }

  const [version, traceId, parentId, traceFlags] = traceparent.split('-');

  return { version, traceId, parentId, traceFlags };
}
