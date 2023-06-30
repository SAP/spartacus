/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { W3cTraceContext } from './w3c-trace-context.model';

/**
 * Maps traceparent header to object with properties version, traceId, spanId and traceFlags.
 *
 * @param traceparent
 * @returns Params of the traceparent header
 *
 * @see https://www.w3.org/TR/trace-context/#traceparent-header-field-values
 */
export const parseTraceparent = (
  traceparent: string
): W3cTraceContext | null => {
  if (typeof traceparent !== 'string' || traceparent.length !== 55) {
    return null;
  }

  // Specific ranges of the traceparent header parameters calculated based on the official documentation
  // See https://www.w3.org/TR/trace-context/#traceparent-header-field-values
  const versionRange: [number, number] = [0, 2];
  const traceIdRange: [number, number] = [3, 35];
  const parentIdRange: [number, number] = [36, 52];
  const traceFlagsRange: [number, number] = [53, 55];

  const version = traceparent.substring(...versionRange);
  const traceId = traceparent.substring(...traceIdRange);
  const parentId = traceparent.substring(...parentIdRange);
  const traceFlags = traceparent.substring(...traceFlagsRange);

  return { version, traceId, parentId, traceFlags };
};
