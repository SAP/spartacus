/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * W3cTraceContext is used for log message in server side rendering.
 * It contains values of traceparent header.
 *
 * @property version - version of traceparent header
 * @property traceId - traceId of traceparent header
 * @property parentId - spanId of traceparent header
 * @property traceFlags - traceFlags of traceparent header
 *
 * @see https://www.w3.org/TR/trace-context/#traceparent-header-field
 */
export interface W3cTraceContext {
  version: string;
  traceId: string;
  parentId: string;
  traceFlags: string;
}
