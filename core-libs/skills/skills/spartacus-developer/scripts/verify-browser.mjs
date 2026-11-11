#!/usr/bin/env node
/** Local feature acceptance evidence, not a benchmark or a field-CWV score. */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const viewportValue = (value, name) =>
  value && typeof value === 'object' && !Array.isArray(value) ? value[name] : value;
const urlKey = (value, base) => { const url = new URL(value, base); url.hash = ''; return url.href; };
export const localUrl = (value) => {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) ||
      !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) || url.username || url.password)
    throw new Error('Use a loopback development URL; use your existing browser tools for authenticated/remote sites.');
  return url.href;
};
const assert = (condition, message) => { if (!condition) throw new Error(message); };


// Reject misspelled criteria before any browser is opened. Unknown expectations
// must not disappear while the automatic image/overflow checks still pass.
export function knownKeys(value, keys, path) {
  assert(value && typeof value === 'object' && !Array.isArray(value), `${path} must be an object`);
  for (const key of Object.keys(value)) assert(keys.includes(key), `Unknown ${path} key: ${key}`);
}

function validateSchemaKeys(plan) {
  knownKeys(plan, ['version', 'url', 'root', 'readySelector', 'viewports', 'steps', 'timeoutMs', 'settleMs', 'allowResourceOrigins'], 'plan');
  const viewportNames = Array.isArray(plan.viewports) ? plan.viewports.map(v => v?.name) : [];
  const expected = (value, path) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) knownKeys(value, viewportNames, path);
  };
  const fields = {
    text: ['name', 'selector', 'value', 'exact'],
    count: ['name', 'selector', 'value'],
    attribute: ['name', 'selector', 'attribute', 'value'],
    property: ['name', 'selector', 'property', 'value'],
    images: ['name', 'selector', 'currentSrc', 'within', 'fill', 'tolerancePx'],
    network: ['name', 'urls', 'selected', 'minRequests', 'maxRequests'],
  };
  for (const [i, viewport] of (Array.isArray(plan.viewports) ? plan.viewports : []).entries())
    knownKeys(viewport, ['name', 'width', 'height'], `viewports[${i}]`);
  for (const [i, step] of (Array.isArray(plan.steps) ? plan.steps : []).entries()) {
    const path = `steps[${i}]`;
    knownKeys(step, ['name', 'action', 'checks', 'readySelector', 'settleMs'], path);
    if (step.action !== undefined) knownKeys(step.action, ['kind', 'selector', 'value'], `${path}.action`);
    knownKeys(step.checks, [...Object.keys(fields), 'allowDocumentOverflow'], `${path}.checks`);
    for (const [kind, keys] of Object.entries(fields)) {
      if (step.checks[kind] === undefined) continue;
      const checks = step.checks[kind];
      assert(Array.isArray(checks), `${path}.checks.${kind} must be an array`);
      for (const [j, check] of checks.entries()) {
        const checkPath = `${path}.checks.${kind}[${j}]`;
        knownKeys(check, keys, checkPath);
        for (const field of ['value', 'currentSrc', 'selected'])
          if (Object.hasOwn(check, field)) expected(check[field], `${checkPath}.${field}`);
      }
    }
  }
}

function validateExpectationValues(plan) {
  const names = plan.viewports.map(viewport => viewport.name);
  const selector = (value, path) => assert(typeof value === 'string' && value.trim().length > 0, `${path} must be a nonempty selector/name`);
  const finiteScalar = value => typeof value === 'string' || typeof value === 'boolean' || (typeof value === 'number' && Number.isFinite(value));
  const expected = (value, path, valid) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      assert(names.every(name => Object.hasOwn(value, name)) && Object.keys(value).length === names.length, `${path} must specify every declared viewport`);
      for (const name of names) assert(valid(value[name]), `Invalid ${path}.${name}`);
    } else assert(valid(value), `Invalid ${path}`);
  };
  const valueKinds = {
    text: finiteScalar,
    count: value => Number.isInteger(value) && value >= 0,
    attribute: value => value === null || typeof value === 'string',
    property: value => value === null || finiteScalar(value),
  };
  for (const [index, step] of plan.steps.entries()) {
    const path = `steps[${index}].checks`;
    if (step.checks.allowDocumentOverflow !== undefined) assert(typeof step.checks.allowDocumentOverflow === 'boolean', `${path}.allowDocumentOverflow must be boolean`);
    for (const [kind, valid] of Object.entries(valueKinds)) for (const [i, check] of (step.checks[kind] ?? []).entries()) {
      const at = `${path}.${kind}[${i}]`;
      selector(check.selector, `${at}.selector`);
      assert(Object.hasOwn(check, 'value'), `${at}.value is required`);
      expected(check.value, `${at}.value`, valid);
      if (kind === 'attribute' || kind === 'property') selector(check[kind], `${at}.${kind}`);
      if (kind === 'text' && check.exact !== undefined) assert(typeof check.exact === 'boolean', `${at}.exact must be boolean`);
    }
    for (const [i, check] of (step.checks.images ?? []).entries()) {
      const at = `${path}.images[${i}]`;
      selector(check.selector, `${at}.selector`);
      if (Object.hasOwn(check, 'currentSrc')) expected(check.currentSrc, `${at}.currentSrc`, value => typeof value === 'string' && value.trim().length > 0);
      if (check.within !== undefined) selector(check.within, `${at}.within`);
      if (check.fill !== undefined) assert(typeof check.fill === 'boolean', `${at}.fill must be boolean`);
      assert(!check.fill || check.within !== undefined, `${at}.fill requires within`);
      if (check.tolerancePx !== undefined) assert(typeof check.tolerancePx === 'number' && Number.isFinite(check.tolerancePx) && check.tolerancePx >= 0, `${at}.tolerancePx must be finite and nonnegative`);
    }
    for (const [i, check] of (step.checks.network ?? []).entries()) {
      assert(Array.isArray(check.urls) && check.urls.length > 0 && check.urls.every(url => typeof url === 'string' && url.trim().length > 0), `${path}.network[${i}].urls requires nonempty URL strings`);
      if (Object.hasOwn(check, 'selected')) expected(check.selected, `${path}.network[${i}].selected`, value => typeof value === 'string' && value.trim().length > 0);
    }
  }
}

export function validatePlan(plan, baseUrl) {
  validateSchemaKeys(plan);
  assert(plan && plan.version === 1, 'Plan version must be 1');
  localUrl(baseUrl ?? plan.url);
  assert(typeof plan.root === 'string' && plan.root.length > 0, 'Declare the changed feature root selector');
  assert(Array.isArray(plan.viewports) && plan.viewports.length > 0, 'Declare representative viewports');
  const names = new Set();
  for (const v of plan.viewports) {
    assert(/^[a-zA-Z0-9_-]+$/.test(v.name) && !names.has(v.name), 'Viewport names must be unique safe names');
    names.add(v.name);
    assert(Number.isInteger(v.width) && v.width > 0 && Number.isInteger(v.height) && v.height > 0, 'Invalid viewport');
  }
  assert(Array.isArray(plan.steps) && plan.steps.length > 0 && !plan.steps[0].action,
    'First step must be an initial observation with no action');
  validateExpectationValues(plan);
  const steps = new Set();
  for (const s of plan.steps) {
    assert(/^[a-zA-Z0-9_-]+$/.test(s.name) && !steps.has(s.name), 'Step names must be unique safe names');
    steps.add(s.name);
    assert(s.checks && typeof s.checks === 'object', 'Declare checks for every step');
    if (s.action) assert(['click', 'fill', 'select', 'check', 'uncheck', 'press', 'scroll'].includes(s.action.kind), 'Unsupported action kind');
    for (const g of s.checks.network ?? []) {
      assert(Array.isArray(g.urls) && g.urls.length > 0, 'Network group needs exact URLs');
      assert(Number.isInteger(g.maxRequests) && g.maxRequests >= 0, 'Network group needs maxRequests');
      if (g.minRequests !== undefined) assert(Number.isInteger(g.minRequests) && g.minRequests >= 0 && g.minRequests <= g.maxRequests, 'Invalid minRequests');
      for (const v of plan.viewports) {
        const selected = viewportValue(g.selected, v.name);
        if (g.selected !== undefined) assert(typeof selected === 'string' && g.urls.some(u => urlKey(u, baseUrl ?? plan.url) === urlKey(selected, baseUrl ?? plan.url)), 'Selected URL must belong to the declared group in every viewport');
      }
    }
  }
}

/** Count attempts within ONE phase. Never collapse repeated URLs into a Set. */
export function checkNetworkRules(rules, requests, base, viewport) {
  return (rules ?? []).map((rule, index) => {
    const urls = rule.urls.map(u => urlKey(u, base));
    const matching = requests.filter(r => urls.includes(urlKey(r.url, base)));
    const selected = viewportValue(rule.selected, viewport);
    const allowed = selected === undefined ? urls : [urlKey(selected, base)];
    const multiplicities = Object.fromEntries(urls.map(u => [u, matching.filter(r => urlKey(r.url, base) === u).length]));
    return {
      id: rule.name ?? `network-${index + 1}`,
      pass: matching.length >= (rule.minRequests ?? 0) && matching.length <= rule.maxRequests &&
        matching.every(r => allowed.includes(urlKey(r.url, base)) && !r.failure && r.finished && r.status >= 200 && r.status < 400),
      expected: { min: rule.minRequests ?? 0, max: rule.maxRequests, selected: selected ?? null },
      observed: { attempts: matching.length, multiplicities, requests: matching },
    };
  });
}

async function snapshot(page, root) {
  return page.locator(root).evaluate(el => {
    const rect = e => { const r = e.getBoundingClientRect(); return { x:r.x, y:r.y, width:r.width, height:r.height, right:r.right, bottom:r.bottom }; };
    const visible = e => {
      const r = e.getBoundingClientRect();
      if (!r.width || !r.height) return false;
      for (let p = e; p; p = p.parentElement) {
        const c = getComputedStyle(p);
        if (c.display === 'none' || ['hidden', 'collapse'].includes(c.visibility) || Number(c.opacity) === 0 || c.contentVisibility === 'hidden') return false;
      }
      return true;
    };
    return {
      time: performance.now(), text: el.innerText, rect: rect(el),
      documentOverflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
      images: [...el.querySelectorAll('img')].map(i => ({
        src:i.src, currentSrc:i.currentSrc, complete:i.complete, naturalWidth:i.naturalWidth, naturalHeight:i.naturalHeight,
        loading:i.loading, fetchPriority:i.fetchPriority, rect:rect(i), parentRect:rect(i.parentElement),
        objectFit:getComputedStyle(i).objectFit, visible:visible(i),
        inViewport:visible(i) && i.getBoundingClientRect().right > 0 && i.getBoundingClientRect().x < innerWidth && i.getBoundingClientRect().bottom > 0 && i.getBoundingClientRect().y < innerHeight,
      })),
      links:[...el.querySelectorAll('a')].map(a => ({text:a.innerText, href:a.href, visible:visible(a)})),
    };
  });
}

async function checkDom(page, checks, base, viewport) {
  const results = [];
  const run = async (id, fn) => {
    try { results.push({id, ...await fn()}); }
    catch (error) { results.push({id, pass:false, error:String(error.message ?? error)}); }
  };
  for (const [i, item] of (checks.text ?? []).entries()) await run(item.name ?? `text-${i + 1}`, async () => {
    const locator = page.locator(item.selector);
    const count = await locator.count();
    const observed = count === 1 ? await locator.evaluate(root => {
      const hidden = el => { const c=getComputedStyle(el); return c.display==='none' || ['hidden','collapse'].includes(c.visibility) || Number(c.opacity)===0 || c.contentVisibility==='hidden'; };
      for(let p=root;p;p=p.parentElement) if(hidden(p)) return null;
      const parts=[];
      const visit=node=>{
        if(node.nodeType===Node.TEXT_NODE) {
          const range=document.createRange(); range.selectNodeContents(node);
          if([...range.getClientRects()].some(r=>r.width>0 && r.height>0)) parts.push(node.textContent);
        } else if(node instanceof Element && !hidden(node)) {
          const block=/^(block|flex|grid|list-item|table|flow-root)/.test(getComputedStyle(node).display);
          if(block || node.tagName==='BR') parts.push(' ');
          for(const child of node.childNodes) visit(child);
          if(block) parts.push(' ');
        }
      };
      visit(root);
      return parts.join('').replace(/\s+/g,' ').trim();
    }) : null;
    const expected = String(viewportValue(item.value, viewport)).replace(/\s+/g, ' ').trim();
    return {pass: observed !== null && (item.exact === false ? observed.includes(expected) : observed === expected), expected, observed, matchedElements:count};
  });
  for (const [i, item] of (checks.count ?? []).entries()) await run(item.name ?? `count-${i + 1}`, async () => {
    const observed = await page.locator(item.selector).count(), expected = viewportValue(item.value, viewport);
    return {pass:observed === expected, expected, observed};
  });
  for (const [i, item] of (checks.attribute ?? []).entries()) await run(item.name ?? `attribute-${i + 1}`, async () => {
    const observed = await page.locator(item.selector).getAttribute(item.attribute), expected = viewportValue(item.value, viewport);
    return {pass:observed === expected, expected, observed};
  });
  for (const [i, item] of (checks.property ?? []).entries()) await run(item.name ?? `property-${i + 1}`, async () => {
    const state = await page.locator(item.selector).evaluate((el,name)=>({exists:name in el, value:el[name]}), item.property), expected = viewportValue(item.value, viewport);
    return {pass:state.exists && state.value === expected, expected, observed:state.value, propertyExists:state.exists};
  });
  for (const [i, item] of (checks.images ?? []).entries()) await run(item.name ?? `image-${i + 1}`, async () => {
    const target = page.locator(item.selector);
    assert(await target.count() === 1, 'Image selector must match one native img');
    const observed = await target.evaluate(el => {
      if (el.tagName !== 'IMG') throw new Error('Select the generated native img, not its cx-media host');
      const r = el.getBoundingClientRect();
      let visible = r.width > 0 && r.height > 0;
      for(let p=el;p;p=p.parentElement) {
        const c=getComputedStyle(p);
        if(c.display==='none' || ['hidden','collapse'].includes(c.visibility) || Number(c.opacity)===0 || c.contentVisibility==='hidden') visible=false;
      }
      return {currentSrc:el.currentSrc, complete:el.complete, naturalWidth:el.naturalWidth, visible, rect:{x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height}};
    });
    let pass = observed.complete && observed.naturalWidth > 0 && observed.visible;
    const selected = viewportValue(item.currentSrc, viewport);
    if (item.currentSrc !== undefined) { assert(typeof selected === 'string', 'Missing currentSrc for viewport'); pass &&= urlKey(observed.currentSrc, base) === urlKey(selected, base); }
    if (item.within) {
      const slot = await page.locator(item.within).boundingBox();
      assert(slot, 'Image slot must be visible and unique');
      observed.slot = slot;
      const r = observed.rect, epsilon = item.tolerancePx ?? 1;
      pass &&= r.x >= slot.x - epsilon && r.y >= slot.y - epsilon && r.right <= slot.x + slot.width + epsilon && r.bottom <= slot.y + slot.height + epsilon;
      if (item.fill) pass &&= Math.abs(r.width - slot.width) <= epsilon && Math.abs(r.height - slot.height) <= epsilon;
    }
    return {pass, expected:item, observed};
  });
  return results;
}

async function doAction(page, action) {
  const locator = page.locator(action.selector);
  assert(await locator.count() === 1, 'Action selector must match exactly one element');
  switch (action.kind) {
    case 'click': return locator.click();
    case 'fill': return locator.fill(action.value);
    case 'select': return locator.selectOption(action.value);
    case 'check': return locator.check();
    case 'uncheck': return locator.uncheck();
    case 'press': return locator.press(action.value);
    case 'scroll': return locator.scrollIntoViewIfNeeded();
  }
}

export async function launchVerificationBrowser(tools, executablePath) {
  const require = createRequire(join(resolve(tools ?? process.cwd()), '__verify-browser__.cjs'));
  let chromium;
  try { chromium = require('playwright').chromium; }
  catch { chromium = require('playwright-core').chromium; }
  return chromium.launch({headless: true, ...(executablePath ? {executablePath} : {})});
}

export async function verifyBrowser(plan, options = {}) {
  const base = localUrl(options.baseUrl ?? plan.url);
  validatePlan(plan, base);
  const output = options.output ? resolve(options.output) : null;
  if (output) { await mkdir(dirname(output), {recursive:true}); try { await access(output); throw new Error('Evidence file already exists; use a new output path'); } catch (e) { if (e.code !== 'ENOENT') throw e; } }
  const browser = options.browser ?? await launchVerificationBrowser(options.tools, options.executablePath);
  const timeout = plan.timeoutMs ?? 15000;
  const result = {version:1, kind:'local-browser-acceptance', startedAt:new Date().toISOString(), url:base,
    browser:browser.version(), pass:false, runs:[],
    networkCapture:{counter:'request-attempts', httpCacheDisabled:true, serviceWorkers:'blocked', transferBytesRecorded:false},
    limits:[
      'Acceptance checks for the declared feature, states, URLs and viewports only. This is not an independent grader, performance benchmark, or field-CWV result.',
      'Request limits count attempts with HTTP caching disabled, including redirects and cancellations. Confirm repeated downloads separately with normal caching, transfer bytes and response outcomes. Counts are per phase. The initial phase includes navigation and hydration; an action/revisit starts a separate phase. Exact URL matching preserves query parameters.',
      'New tabs/popups are unsupported and make acceptance fail. Origin rules and request evidence cover the whole helper-owned browser context.',
      'The helper does not prove pre-load space reservation, actual CMS route integration, keyboard/screen-reader behavior, or responsiveness during CPU work; inspect those with the existing browser tools as applicable.',
    ]};
  try {
    for (const viewport of plan.viewports) {
      const context = await browser.newContext({viewport:{width:viewport.width,height:viewport.height},serviceWorkers:'block'});
      const run = {viewport, pass:false, phases:[], errors:[]};
      result.runs.push(run);
      try {
        let phase;
        const requestRecords = new Map();
        context.on('request', request => {
          const record = {url:request.url(), resourceType:request.resourceType(), method:request.method(), startedAt:Date.now(), status:null, finished:false, failure:null};
          requestRecords.set(request, record);
          phase?.requests.push(record);
        });
        context.on('response', response => { const record=requestRecords.get(response.request()); if(record) record.status=response.status(); });
        context.on('requestfinished', request => { const record=requestRecords.get(request); if(record) record.finished=true; });
        context.on('requestfailed', request => { const record=requestRecords.get(request); if(record) record.failure=request.failure()?.errorText ?? 'failed'; });
        // Keep fixture navigation local. Resource origin allowances are explicit.
        const allowed = new Set([new URL(base).origin, ...(plan.allowResourceOrigins ?? [])]);
        await context.route('**/*', route => {
          const request=route.request(), u=new URL(request.url());
          if ((request.isNavigationRequest() && u.origin !== new URL(base).origin) ||
              (!allowed.has(u.origin) && !['data:', 'blob:'].includes(u.protocol))) {
            run.errors.push('Blocked undeclared origin: '+u.origin);
            return route.abort();
          }
          return route.continue();
        });
        const page = await context.newPage();
        page.setDefaultTimeout(timeout);
        const cdp = await context.newCDPSession(page);
        await cdp.send('Network.enable');
        await cdp.send('Network.setCacheDisabled', {cacheDisabled:true});
        page.on('pageerror', error => run.errors.push(String(error.message ?? error)));
        page.on('console', message => { if(message.type()==='error') run.errors.push(message.text()); });
        context.on('page', popup => {
          if (popup === page) return;
          run.errors.push('Unsupported popup/new tab: this helper verifies one page; use existing browser tools for multi-page interactions.');
          popup.close().catch(error => run.errors.push('Popup close failed: '+String(error.message ?? error)));
        });
        for (const [index, step] of plan.steps.entries()) {
          phase = {name:step.name, requests:[], checks:[], pass:false};
          run.phases.push(phase);
          try {
            if (index === 0) {
              await page.goto(base, {waitUntil:'load',timeout});
              phase.readiness = 'selector-only';
              if (options.waitUntilReady) {
                await options.waitUntilReady(page);
                phase.readiness = 'trusted-wrapper-confirmed';
              }
            }
            else if (step.action) await doAction(page, step.action);
            await page.locator(step.readySelector ?? plan.readySelector ?? plan.root).waitFor({state:'visible'});
            await page.waitForLoadState('networkidle', {timeout});
            await page.waitForTimeout(step.settleMs ?? plan.settleMs ?? 250);
            phase.snapshot = await snapshot(page, plan.root);
            const visibleImages = phase.snapshot.images.filter(i => i.inViewport);
            phase.checks.push({id:'visible-images-loaded', pass:visibleImages.every(i=>i.complete && i.naturalWidth>0), observed:visibleImages});
            phase.checks.push({id:'document-horizontal-overflow', pass:step.checks.allowDocumentOverflow === true || phase.snapshot.documentOverflow <= 1, observed:phase.snapshot.documentOverflow});
            phase.checks.push(...await checkDom(page, step.checks, base, viewport.name));
            phase.checks.push(...checkNetworkRules(step.checks.network, phase.requests, base, viewport.name));
            if (output) {
              phase.screenshot = `${output}.${viewport.name}.${step.name}.png`;
              await page.screenshot({path:phase.screenshot, fullPage:false});
            }
            phase.pass = phase.checks.every(c=>c.pass);
          } catch(error) { phase.error=String(error.message ?? error); }
        }
        run.pass = run.errors.length === 0 && run.phases.length === plan.steps.length && run.phases.every(p=>p.pass);
      } finally { await context.close(); }
    }
    result.pass = result.runs.length === plan.viewports.length && result.runs.every(r=>r.pass);
  } finally { if (!options.browser) await browser.close(); }
  result.finishedAt = new Date().toISOString();
  if(output) await writeFile(output, JSON.stringify(result,null,2)+'\n');
  return result;
}

async function main() {
  const args=process.argv.slice(2), options={};
  for(let i=0;i<args.length;i+=2) {
    assert(['--plan','--out','--tools','--browser','--base-url'].includes(args[i]) && args[i+1], 'Usage: node verify-browser.mjs --plan browser-plan.json --out browser-evidence/run.json [--tools directory] [--browser executable] [--base-url http://127.0.0.1:port/]');
    options[args[i]]=args[i+1];
  }
  assert(options['--plan'], 'Missing --plan');
  const plan=JSON.parse(await readFile(resolve(options['--plan']),'utf8'));
  const result=await verifyBrowser(plan,{baseUrl:options['--base-url'],output:options['--out'],tools:options['--tools'],executablePath:options['--browser']});
  process.stdout.write(JSON.stringify(result,null,2)+'\n');
  process.exitCode=result.pass ? 0 : 1;
}
if(process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(error=>{process.stderr.write(String(error.stack ?? error)+'\n');process.exitCode=2;});
