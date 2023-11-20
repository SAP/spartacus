import { Express, Request, Response } from 'express';
import { getLogger } from '../express-logger';

export function addRoute_HealthCheck(server: Express) {
  server.get('/api/health-check', (_req: Request, res: Response) => {
    const logger = getLogger(server);
    logger.debug('health-check', { healthy: 'OK' });

    res.json({ healthy: 'OK' });
  });
}
