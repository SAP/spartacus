import { Express, Request, Response } from 'express';
import { getLogger } from '../express-logger';
import { getGlobalAgentLight } from '../get-global-agent';

export function addRoute_GetGlobalAgent(server: Express) {
  server.get('/api/get-global-agent', (req: Request, res: Response) => {
    const globalAgent = getGlobalAgentLight();

    const logger = getLogger(server);
    logger.debug('get-global-agent', {
      _tag: 'get-global-agent',
      request: req,
      globalAgent: globalAgent,
    });

    res.json({ globalAgent: globalAgent });
  });
}
