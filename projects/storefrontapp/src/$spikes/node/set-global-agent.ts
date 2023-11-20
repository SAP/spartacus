import { AgentOptions } from 'https';

const https = require('https');

let previousSettings: AgentOptions;

/**
 * Sets a new global agent for all https requests, using the given settings.
 *
 * Empty settings resets the global agent to the default one.
 */
export function setGlobalAgent(settings: AgentOptions | null) {
  https.globalAgent.destroy();

  let newSettings;
  if (!settings) {
    newSettings = {};
  } else {
    newSettings = {
      ...previousSettings,
      ...settings,
    };
  }
  https.globalAgent = new https.Agent(newSettings);
  previousSettings = newSettings;
}
