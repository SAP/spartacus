/* eslint-disable no-console */
const https = require('https');

import { IncomingMessage } from 'node:http';

import type { Socket } from 'node:net';

// Custom tracking counters
let pendingRequestsCount = 0;
let awaitingResponseCount = 0;
let waitingInQueueCount = 0;

export function registerRequestsStats() {
  // Original request function
  const originalRequest = https.request;

  // Wrap the original https.request function to track request states
  https.request = function (...args: any[]) {
    // Increment the pending requests count
    pendingRequestsCount++;
    waitingInQueueCount++;

    // Call the original request function
    const req = originalRequest.apply(this, args as any);

    // When a socket is assigned, decrement the waiting in queue count
    req.on('socket', (socket: Socket) => {
      waitingInQueueCount--;
      if (socket.connecting) {
        // Socket is connecting, meaning the request is awaiting response
        awaitingResponseCount++;
      }

      // SPIKE TODO: add logging of stats on every change of the state of the app
    });

    // When the response is received, decrement the awaiting response count
    req.on('response', (res: IncomingMessage) => {
      awaitingResponseCount--;
      res.on('end', () => {
        // When the response has ended, decrement the pending requests count
        pendingRequestsCount--;
      });
    });

    // Handle errors
    req.on('error', (_err: unknown) => {
      pendingRequestsCount--;
      if (req.socket && req.socket.connecting) {
        awaitingResponseCount--;
      } else {
        waitingInQueueCount--;
      }
    });

    return req;
  };
}

// Function to log the current state of the requests
export function getRequestsStats() {
  return {
    pending: pendingRequestsCount,
    waitingInQueue: waitingInQueueCount,
    awaitingResponse: awaitingResponseCount,
  };
}

// Example usage of the wrapped request function
// const req = https.request('https://example.com', (res) => {
//   res.on('data', (chunk: any) => {});
//   res.on('end', () => {
//     logRequestStates(); // Log the states after the request ends
//   });
// });

// req.on('error', (e: unknown) => {
//   console.error(`Got error: ${(e as Error).message}`);
// });

// req.end();

// You can call this function whenever you want to log the current request states
// logRequestStats();
