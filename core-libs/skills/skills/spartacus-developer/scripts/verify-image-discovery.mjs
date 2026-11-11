#!/usr/bin/env node
/** Test one public image placement before bootstrap and on a separate, normally cached cold visit. */
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {parseArgs} from 'node:util';
import {knownKeys, launchVerificationBrowser, localUrl} from './verify-browser.mjs';

const absolute = (url, base) => { const u = new URL(url, base); u.hash = ''; return u.href; };
const status = (failures, gaps) => failures.length ? 'fail' : gaps.length ? 'inconclusive' : 'pass';

export function validateDiscoveryPlan(plan, baseOverride) {
  knownKeys(plan,['version','baseUrl','allowResourceOrigins','bootstrapScripts','timeoutMs','viewports','pages'],'plan');
  assert.equal(plan.version, 1, 'Expected plan version 1');
  const base = localUrl(baseOverride ?? plan.baseUrl);
  assert(Array.isArray(plan.pages) && ['eligible','excluded'].every(k => plan.pages.some(p => p.eligibility === k)), 'Include eligible and excluded pages');
  assert(Array.isArray(plan.viewports) && plan.viewports.length, 'Provide viewports');
  assert(Array.isArray(plan.bootstrapScripts) && plan.bootstrapScripts.length && plan.bootstrapScripts.every(s => typeof s==='string' && s.startsWith('/') && !s.startsWith('//')), 'Use local pathname globs for application entry scripts');
  const names = new Set(), urls = new Set();
  for (const v of plan.viewports) {
    knownKeys(v,['name','width','height','crop','sha256','mobile'],'viewport');
    assert(v.mobile===undefined||typeof v.mobile==='boolean','mobile must be boolean');
    assert(v.name && !names.has(v.name) && Number.isInteger(v.width) && v.width>0 && Number.isInteger(v.height) && v.height>0, 'Duplicate or invalid viewport');
    assert(typeof v.crop==='string' && v.crop.length && (!v.sha256 || /^[0-9a-f]{64}$/.test(v.sha256)), 'Provide crop URL and optional SHA-256');
    names.add(v.name);
  }
  names.clear();
  for (const p of plan.pages) {
    knownKeys(p,['name','url','eligibility','readySelector','imageSelector'],'page');
    assert(typeof p.readySelector==='string' && (p.imageSelector===undefined||typeof p.imageSelector==='string' && p.imageSelector.length),'Use valid selector strings');
    assert(p.name && !names.has(p.name) && typeof p.url==='string' && p.url.length && p.readySelector && ['eligible','excluded'].includes(p.eligibility), 'Invalid page, eligibility, name or ready selector');
    const url=localUrl(new URL(p.url,base)); assert(!urls.has(url),'Duplicate page URL'); names.add(p.name); urls.add(url);
  }
  const origins=(plan.allowResourceOrigins??[]).map(o=>{const u=new URL(o);assert(['https:','http:'].includes(u.protocol)&&!u.username&&!u.password&&u.pathname==='/'&&!u.search&&!u.hash,'Expected an HTTP resource origin');return u.origin;});
  const timeout=plan.timeoutMs??20000;assert(Number.isInteger(timeout)&&timeout>=1000&&timeout<=120000,'Invalid timeoutMs');
  return {base,origins,timeout};
}

// Prepare CDP before navigation. Normal visits keep the HTTP cache enabled and never use Playwright routing.
async function observeNetwork(session, known, allowed) {
  const requests=[], active=new Map(), responseStatuses=new Map(), hints=[];
  function update(id, change){const r=active.get(id);if(r) Object.assign(r, change);}
  session.on('Network.requestWillBeSent', e=>{
    if(e.redirectResponse) update(e.requestId,{state:'redirect',status:e.redirectResponse.status});
    const url=absolute(e.request.url);
    const r={url,method:e.request.method,id:e.requestId,type:e.type,at:e.timestamp,initiator:e.initiator.type,state:'pending',decodedBytes:0,dataEncodedBytes:0};
    active.set(e.requestId,r);requests.push(r);
  });
  session.on('Network.requestServedFromCache',e=>update(e.requestId,{cache:true}));
  session.on('Network.responseReceivedEarlyHints',e=>hints.push({id:e.requestId,link:e.headers.link??e.headers.Link??null}));
  session.on('Network.responseReceivedExtraInfo',e=>{
    const statuses=responseStatuses.get(e.requestId)??[];statuses.push(e.statusCode);responseStatuses.set(e.requestId,statuses);
  });
  session.on('Network.responseReceived',e=>{
    const res=e.response, headers=Object.fromEntries(Object.entries(res.headers).map(([k,v])=>[k.toLowerCase(),v]));
    update(e.requestId,{status:res.status,mime:res.mimeType,disk:res.fromDiskCache,sw:res.fromServiceWorker,prefetch:res.fromPrefetchCache,
      encodedAtHeaders:res.encodedDataLength,contentLength:/^\d+$/.test(headers['content-length'])?Number(headers['content-length']):null,encoding:headers['content-encoding']??'identity'});
  });
  session.on('Network.dataReceived',e=>{const r=active.get(e.requestId);if(r){r.decodedBytes+=e.dataLength;r.dataEncodedBytes+=Math.max(0,e.encodedDataLength);}});
  session.on('Network.loadingFinished',e=>update(e.requestId,{state:'complete',encodedBytes:e.encodedDataLength}));
  session.on('Network.loadingFailed',e=>update(e.requestId,{state:e.canceled?'cancelled':'failed',error:e.errorText}));
  await session.send('Network.enable',{maxTotalBufferSize:32000000,maxResourceBufferSize:12000000});
  // An ordered CDP URLPattern allowlist does not intercept requests or disable the HTTP cache.
  await session.send('Network.setBlockedURLs',{urlPatterns:[...[...allowed].map(o=>({urlPattern:o+'/*',block:false})),{urlPattern:'*://*:*/*',block:true}]});
  return {requests,hints,async images(){
    const images=requests.filter(r=>known.has(r.url));
    for(const r of images){
      r.responseStatuses=responseStatuses.get(r.id)??[];
      if(r.state!=='complete'||r.status!==200||!r.mime?.startsWith('image/')||!r.encodedBytes||r.cache||r.disk||r.sw||r.prefetch)continue;
      try{const body=await session.send('Network.getResponseBody',{requestId:r.id});
        const bytes=Buffer.from(body.body,body.base64Encoded?'base64':'utf8');
        if(bytes.length){r.bodyBytes=bytes.length;r.sha256=createHash('sha256').update(bytes).digest('hex');}
      }catch{r.bodyUnavailable=true;}
    }
    return images;
  }};
}
export function classifyBody(r) {
  if (r.prefetch || r.sw || r.status===206 || r.responseStatuses?.some(code=>code===304 || code===206)) return 'unconfirmed';
  if (r.cache || r.disk) return r.dataEncodedBytes>0 ? 'unconfirmed' : 'cache';
  if (r.method!=='GET' || r.state!=='complete' || r.status!==200 || !r.mime?.startsWith('image/') || !(r.bodyBytes>0)) return 'unconfirmed';
  // loadingFinished includes HTTP headers. Never count a readable cached body plus positive headers as a new payload.
  const wireLength=r.contentLength>0?r.contentLength:r.encoding==='identity'?r.bodyBytes:null;
  const afterHeaders=r.encodedAtHeaders>0?r.encodedBytes-r.encodedAtHeaders:0;
  const fullWireBody=wireLength && (r.dataEncodedBytes>=wireLength || afterHeaders>=wireLength);
  return fullWireBody || (!wireLength && r.dataEncodedBytes>0) ? 'transfer' : 'unconfirmed';
}

function linkHeaderTargets(header,base,known) {
  if(!header)return [];
  const results=[];
  for(const item of header.matchAll(/<([^>]*)>([^<>]*?)(?=,\s*<|$)/g)){
    if(!/;\s*rel\s*=\s*(?:"[^"]*\bpreload\b[^"]*"|preload\b)/i.test(item[2]))continue;
    try{const u=absolute(item[1],base);if(known.has(u))results.push(u);}catch{/* Malformed Link values cannot name a usable target. */}
  }
  return results;
}

// HTML srcset permits commas inside URLs. A descriptor is separated from its URL by whitespace.
function documentHints({knownUrls,html}) {
  const known=new Set(knownUrls), match=(raw,base)=>{try{const u=new URL(raw,base);u.hash='';return known.has(u.href)?u.href:null;}catch{return null;}};
  const fromSet=raw=>[...(raw??'').matchAll(/(?:^|,\s*)(\S+?)(?:\s+[^,]+(?=,|$)|,(?=\s)|$)/g)].map(m=>m[1].replace(/,$/,''));
  function inspect(doc){
    const base=new URL(doc.querySelector('base[href]')?.getAttribute('href')||location.href,location.href).href;
    const hints=[];
    for(const link of doc.querySelectorAll('link[rel~="preload" i]')){
      const candidates=[link.getAttribute('href'),...fromSet(link.getAttribute('imagesrcset'))].filter(Boolean).map(v=>match(v,base)).filter(Boolean);
      if(candidates.length)hints.push({urls:candidates,media:link.media});
    }
    return hints;
  }
  return {original:inspect(new DOMParser().parseFromString(html,'text/html')),live:inspect(document)};
}
const glob = s => new RegExp('^'+s.split('*').map(l=>l.replace(/[.+?^${}()|[\]\\]/g,'\\$&')).join('.*')+'$');

async function probe(browser,definition,stage,timeout,origins,scripts) {
  const {url,viewport,known,readySelector,imageSelector}=definition;
  const evidence={stage,issues:[],blockedScripts:[],images:[],headerHints:[],hints:{original:[],live:[]}};
  const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height},isMobile:!!viewport.mobile,deviceScaleFactor:1,serviceWorkers:'block'});
  try{
    const page=await context.newPage(),cdp=await context.newCDPSession(page);
    const monitor=await observeNetwork(cdp,known,origins);
    if(stage==='before-bootstrap'){
      await page.route('**/*',route=>{
        const req=route.request(),u=new URL(req.url());
        if(req.resourceType()==='script' && u.origin===new URL(url).origin){
          const matches=scripts.filter(p=>glob(p).test(u.pathname));
          if(matches.length){evidence.blockedScripts.push({path:u.pathname,patterns:matches});return route.abort('blockedbyclient');}
        }
        return route.continue();
      });
    }
    const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout});
    if(!response)throw Error('No document response');
    evidence.httpStatus=response.status();evidence.finalUrl=page.url();
    if(response.status()!==200||absolute(response.url())!==absolute(url)||absolute(page.url())!==absolute(url))evidence.issues.push('Expected a successful direct response for the requested document');
    if(stage==='normal-cache')await page.locator(readySelector).first().waitFor({state:'visible',timeout}).catch(()=>evidence.issues.push('Ready selector did not become visible'));
    await page.waitForLoadState('networkidle',{timeout}).catch(()=>evidence.issues.push('Network did not settle'));
    if(stage==='before-bootstrap'){
      if(!scripts.every(s=>evidence.blockedScripts.some(b=>b.patterns.includes(s))))evidence.issues.push('One or more named application entry scripts were not observed and held');
      const doc=monitor.requests.find(r=>r.type==='Document'&&r.url===absolute(response.url()));
      evidence.headerHints=[...linkHeaderTargets(await response.headerValue('link'),url,known),...monitor.hints.filter(h=>h.id===doc?.id).flatMap(h=>linkHeaderTargets(h.link,url,known))];
      evidence.hints=await page.evaluate(documentHints,{knownUrls:[...known],html:await response.text()});
    }else if(imageSelector){
      const image=page.locator(imageSelector).first();
      if(await image.isVisible())evidence.currentSrc=await image.evaluate(el=>el instanceof HTMLImageElement&&el.complete&&el.naturalWidth?el.currentSrc:null);
    }
    evidence.images=await monitor.images();
  }catch(error){evidence.issues.push(error.message);}
  finally{await context.close();}
  return evidence;
}

export function assessDiscovery({eligibility,selected,sha256,imageSelector,early,normal}) {
  const failures=[],gaps=[...early.issues,...normal.issues];
  const validPage=p=>p.httpStatus===200&&!p.issues.some(s=>s.includes('requested document'));
  const transfers=normal.images.filter(r=>classifyBody(r)==='transfer');
  const wrong=transfers.filter(r=>r.url!==selected);
  if(eligibility==='excluded'){
    if(validPage(early)&&(early.images.length||early.headerHints.length||early.hints.original.length||early.hints.live.length))failures.push('Excluded document emitted a campaign hint or requested campaign artwork before bootstrap');
    if(validPage(normal)&&normal.images.length)failures.push('Excluded storefront requested campaign artwork on a normal navigation');
  }else{
    if(validPage(early)&&early.images.some(r=>r.url!==selected)) failures.push('Wrong crop requested before bootstrap');
    if(!early.issues.length&&!early.images.some(r=>r.url===selected))failures.push('Selected crop was not requested while bootstrap was held');
    if(early.images.some(r=>r.url===selected&&(r.state!=='complete'||r.status!==200)))gaps.push('Early crop request did not complete successfully while the entry scripts were held');
    if(validPage(normal)&&normal.images.some(r=>r.url!==selected))failures.push('Wrong crop requested on a normal navigation');
    if(transfers.filter(r=>r.url===selected).length>1)failures.push('Selected crop downloaded more than once');
    if(!normal.issues.length&&!normal.images.length)failures.push('No campaign image requested by the ready storefront');
    if(normal.images.some(r=>classifyBody(r)==='unconfirmed')||normal.images.length&&!transfers.some(r=>r.url===selected))gaps.push('Could not confirm every non-cache attempt as a full network image transfer');
    if(sha256&&transfers.some(r=>r.url===selected&&r.sha256!==sha256))failures.push('Selected bytes differ from the supplied digest');
    if(imageSelector&&!normal.issues.length&&normal.currentSrc!==selected)failures.push('Ready storefront did not visibly render the decoded selected image');
  }
  return {outcome:status(failures,gaps),reasons:[...new Set([...failures,...gaps])],earlyRequests:early.images.length,normalTransfers:transfers.length,wrongCropTransfers:wrong.length};
}

export async function verifyImageDiscovery(plan, options={}) {
  const {base,origins,timeout}=validateDiscoveryPlan(plan,options.baseUrl);
  const browser=options.browser??await launchVerificationBrowser(options.tools,options.executablePath);
  const rows=[];
  try{
    for(const p of plan.pages)for(const viewport of plan.viewports){
      const url=new URL(p.url,base).href, selected=absolute(viewport.crop,url);
      const known=new Set(plan.viewports.map(v=>absolute(v.crop,url)));
      const allowed=new Set([new URL(url).origin,...origins]);
      for(const crop of known)assert(allowed.has(new URL(crop).origin),'Crop origin must be allowed');
      const definition={...p,url,viewport,known};
      const early=await probe(browser,definition,'before-bootstrap',timeout,allowed,plan.bootstrapScripts);
      const normal=await probe(browser,definition,'normal-cache',timeout,allowed,plan.bootstrapScripts);
      rows.push({page:p.name,viewport:viewport.name,url,eligibility:p.eligibility,selected,...assessDiscovery({...p,selected,sha256:viewport.sha256,early,normal}),early,normal});
    }
    const verifierSha256=createHash('sha256').update(await readFile(new URL(import.meta.url))).digest('hex');
    return {version:1,kind:'image-discovery-acceptance',verifierSha256,chrome:browser.version(),outcome:rows.some(r=>r.outcome==='fail')?'fail':rows.every(r=>r.outcome==='pass')?'pass':'inconclusive',rows};
  }finally{if(!options.browser)await browser.close();}
}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  try{
    const {values}=parseArgs({options:Object.fromEntries(['plan','out','base-url','tools','browser'].map(k=>[k,{type:'string'}]))});
    assert(values.plan&&values.out,'Usage: node verify-image-discovery.mjs --plan plan.json --out fresh-result.json [--base-url URL] [--tools directory] [--browser executable]');
    const result=await verifyImageDiscovery(JSON.parse(await readFile(values.plan,'utf8')),{baseUrl:values['base-url'],tools:values.tools,executablePath:values.browser});
    await mkdir(dirname(resolve(values.out)),{recursive:true});await writeFile(values.out,JSON.stringify(result,null,2)+'\n',{flag:'wx'});
    console.log(result.outcome+' — '+result.rows.length+' route/viewport checks');
    process.exitCode=result.outcome==='pass'?0:result.outcome==='fail'?1:2;
  }catch(error){console.error(error.message);process.exitCode=2;}
}
