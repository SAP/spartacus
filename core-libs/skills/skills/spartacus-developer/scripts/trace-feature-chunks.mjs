import { readFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';

const { values } = parseArgs({ options: {
  stats: { type: 'string' }, report: { type: 'string' }, input: { type: 'string' },
  'first-use': { type: 'string' }, 'asset-base': { type: 'string' },
}});

try {
  for (const name of ['stats', 'report', 'input', 'first-use']) {
    if (!values[name]) throw Error(`Required: --${name}`);
  }
  const load = async path => JSON.parse(await readFile(path, 'utf8'));
  const [stats, report] = await Promise.all([load(values.stats), load(values.report)]);
  if (!stats.outputs || report.kind !== 'local-browser-acceptance' || !report.pass || !report.runs?.length) {
    throw Error('Use production esbuild stats and a passing verify-browser report from that build.');
  }
  const base = new URL(values['asset-base'] ?? '/', report.url);
  if (!base.pathname.endsWith('/') || base.search || base.hash) throw Error('--asset-base must be a directory URL ending in /');
  const target = values.input.replaceAll('\\', '/');
  const expectedPhase = values['first-use'];
  const urls = new Map();
  const feature = [];
  for (const [name, output] of Object.entries(stats.outputs)) {
    // The Angular application builder emits browser JavaScript as .js and server bundles as .mjs.
    if (!name.endsWith('.js')) continue;
    const url = new URL(name.replaceAll('\\', '/'), base).href;
    urls.set(url, { name, entry: Boolean(output.entryPoint) });
    const input = Object.entries(output.inputs ?? {}).find(([path]) => path.replaceAll('\\', '/') === target);
    if (input?.[1].bytesInOutput > 0) {
      feature.push({ name, url, sourceBytesInOutput: input[1].bytesInOutput, outputBytes: output.bytes });
    }
  }
  if (!feature.length) throw Error('No retained bytes for the exact input path in browser JavaScript. Check stats.outputs[*].inputs.');
  const viewports = report.runs.map(run => {
    const planned = run.phases.findIndex(phase => phase.name === expectedPhase);
    if (planned < 1) throw Error('The named first-use phase must follow the initial phase.');
    const requested = new Map();
    for (const [index, phase] of run.phases.entries()) {
      for (const request of phase.requests) {
        const url = new URL(request.url);
        url.search = '';
        url.hash = '';
        if (urls.has(url.href) && !requested.has(url.href)) {
          requested.set(url.href, { index, phase: phase.name, status: request.status, finished: request.finished, failure: request.failure });
        }
      }
    }
    if (![...requested].some(([url, found]) => found.index === 0 && urls.get(url).entry && found.finished && found.status === 200)) {
      throw Error('No initial entry script matched the build. Check production build, origin and --asset-base (default /).');
    }
    const outputs = feature.map(chunk => ({ ...chunk, firstRequest: requested.get(chunk.url) ?? null }));
    const seen = outputs.flatMap(chunk => chunk.firstRequest ? [chunk.firstRequest] : []);
    const first = Math.min(...seen.map(request => request.index));
    return { viewport: run.viewport.name, outputs,
      pass: first === planned && seen.every(req => req.finished && !req.failure && req.status >= 200 && req.status < 300) };
  });
  const pass = viewports.every(viewport => viewport.pass);
  console.log(JSON.stringify({ input: target, expectedPhase, assetBase: base.href, viewports, pass }, null, 2));
  process.exitCode = pass ? 0 : 1;
} catch (error) {
  console.error(error.message);
  process.exitCode = 2;
}
