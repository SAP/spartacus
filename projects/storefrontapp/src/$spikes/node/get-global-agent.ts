import type { Agent } from 'https';

const https = require('https');

/**
 * Returns a stringified version of the global agent.
 * Useful for debugging the current state of the open sockets.
 */
export function getGlobalAgentLight(): object {
  // return JSON.stringify(https.globalAgent, getCircularReplacer(), 2);
  const a = https.globalAgent;

  const countSockets = (socketList: object) =>
    Object.entries(socketList).reduce<Record<string, number>>(
      (acc, [address, sockets]) => {
        acc[address] = sockets.length;

        acc.$total += sockets.length;

        return acc;
      },
      { $total: 0 }
    );

  const globalAgentLightCopy = {
    //static config:
    maxSockets: a.maxSockets,
    maxFreeSockets: a.maxFreeSockets,
    maxTotalSockets: a.maxTotalSockets,
    maxCachedSessions: (a as any)['maxCachedSessions'],
    keepAlive: (a as any).keepAlive,

    // dynamic OOTB:
    totalSocketCount: (a as any)['totalSocketCount'],

    // dynamic custom:
    $sockets: countSockets(a.sockets),
    $freeSockets: countSockets(a.sockets),
  };

  return globalAgentLightCopy;
}

export function getGlobalAgent(): Agent {
  return https.globalAgent;
}
