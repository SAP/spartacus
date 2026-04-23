/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/** A single part of an agent message — currently only 'text' is used. */
export interface AgentMessagePart {
  kind: 'text' | string;
  text: string;
}

/** One artifact produced by the agent task. */
export interface AgentArtifact {
  artifactId: string;
  name: string;
  parts: AgentMessagePart[];
}

/** A message entry in the task history. */
export interface AgentHistoryMessage {
  contextId: string;
  kind: 'message' | string;
  messageId: string;
  metadata?: Record<string, unknown>;
  parts: AgentMessagePart[];
  role: 'user' | 'agent';
  taskId: string;
}

/** Status of the agent task. */
export interface AgentTaskStatus {
  state: 'completed' | 'failed' | 'running' | string;
  timestamp: string;
}

/** The `result` object inside the JSON-RPC envelope. */
export interface AgentTaskResult {
  artifacts: AgentArtifact[];
  contextId: string;
  history: AgentHistoryMessage[];
  id: string;
  kind: 'task' | string;
  status: AgentTaskStatus;
}

/** The full A2A JSON-RPC 2.0 response envelope from the Kyma agent. */
export interface A2AResponse {
  id: string;
  jsonrpc: '2.0';
  result: AgentTaskResult;
}

/** Normalised reply used internally by AgentService consumers. */
export interface AgentReply {
  reply: string;
  contextId: string;
}
