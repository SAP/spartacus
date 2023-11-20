import { Express, Request, Response } from 'express';
import { getLogger } from '../express-logger';
import { getRequestsStats } from '../get-requests-stats';

export function addRoute_GetRequestsStats(server: Express) {
  server.get('/api/get-requests-stats', (_req: Request, res: Response) => {
    const requestsStats: object = getRequestsStats();

    const logger = getLogger(server);
    logger.debug('get-requests-stats', {
      _tag: 'get-requests-stats',
      requestsStats,
    });

    res.json({ requestsStats });
  });
}
