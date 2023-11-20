import { Express, Request, Response } from 'express';
import { AgentOptions } from 'http';
import { getLogger } from '../express-logger';
import { getGlobalAgentLight } from '../get-global-agent';
import { setGlobalAgent } from '../set-global-agent';

function getAgentSettingsFromQueryParams(req: Request): AgentOptions | null {
  try {
    if (!req.query?.settings) {
      return null;
    }

    return JSON.parse(req.query.settings as any) as AgentOptions;
  } catch (e: unknown) {
    throw new Error('req.query.settings is not a valid JSON', {
      cause: e,
    });
  }
}

export function addRoute_SetGlobalAgent(server: Express) {
  // query params: settings=<global agent settings>
  server.get('/api/set-global-agent', (req: Request, res: Response) => {
    const oldGlobalAgent = getGlobalAgentLight();
    const settings = getAgentSettingsFromQueryParams(req);

    setGlobalAgent(settings); // don't change order of operations

    const newGlobalAgent = getGlobalAgentLight();

    const logger = getLogger(server);
    logger.debug('set-global-agent', {
      _tag: 'set-global-agent',
      request: req,
      newGlobalAgentSettings: settings,
      oldGlobalAgent,
      newGlobalAgent,
    });

    res.json({
      newGlobalAgentSettings: settings,
      oldGlobalAgent,
      newGlobalAgent,
    });
  });
}
