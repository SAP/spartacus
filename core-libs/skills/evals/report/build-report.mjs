// @ts-check
/**
 * Build a self-contained HTML report from the aggregated eval data
 * (matrix-results.json + pattern-comparison.json). No server, no external
 * requests — all data is inlined and charts are vanilla SVG.
 *
 * Palette is the dataviz-validated categorical pair (passes CVD + contrast
 * in both light and dark): baseline #B45309 / treatment #0284C7 (light),
 * #D97706 / #0284C7 (dark).
 *
 * Run: node report/build-report.mjs  →  writes ../skills-impact-report.html
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const matrixPath = join(ROOT, 'matrix-results.json');
const patternPath = join(ROOT, 'pattern-comparison.json');

if (!existsSync(matrixPath) || !existsSync(patternPath)) {
  console.error('Missing matrix-results.json / pattern-comparison.json. Run `npm run aggregate` first.');
  process.exit(1);
}
const matrix = JSON.parse(readFileSync(matrixPath, 'utf8'));
const patternCmp = JSON.parse(readFileSync(patternPath, 'utf8'));

// Build per-model baseline/treatment overall scores (mean LLM-judge adherence).
const byModel = {};
for (const a of matrix.arms) (byModel[a.model] ??= {})[a.condition] = a.adherenceScore;
const models = Object.keys(byModel).sort().map((model) => ({
  model,
  baseline: byModel[model].baseline ?? null,
  treatment: byModel[model].treatment ?? null,
}));

const bv = patternCmp.totalBaselineViol;
const tv = patternCmp.totalTreatmentViol;
const reductionPct = bv ? Math.round((1 - tv / bv) * 100) : 0;
const improved = patternCmp.patterns.filter((p) => p.treatmentViol < p.baselineViol).length;
const totalPatterns = patternCmp.patterns.length;
const bestModel = models.reduce((best, m) => {
  if (m.baseline == null || m.treatment == null) return best;
  const lift = m.treatment - m.baseline;
  return !best || lift > best.lift ? { model: m.model, lift, rel: Math.round(lift / m.baseline * 100) } : best;
}, null);

const DATA = JSON.stringify({ models, patterns: patternCmp.patterns, bv, tv, reductionPct, improved, totalPatterns });

const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Spartacus AI Skills — Impact Report</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--surface:#fcfcfb;--surface-2:#f4f4f2;--surface-3:#e8e8e4;--border:#d1d1cc;--text-primary:#1a1a18;--text-secondary:#4a4a46;--text-muted:#7a7a74;--baseline:#B45309;--treatment:#0284C7;--green:#16A34A;--amber:#D97706;--red:#DC2626;--grid:#e2e8f0}
[data-theme=dark]{--surface:#1a1a19;--surface-2:#252523;--surface-3:#2e2e2c;--border:#3a3a38;--text-primary:#f0f0ee;--text-secondary:#b8b8b2;--text-muted:#7a7a74;--baseline:#D97706;--treatment:#0284C7;--green:#22C55E;--amber:#F59E0B;--red:#F87171;--grid:#2e2e2c}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:var(--surface);color:var(--text-primary);line-height:1.5;font-size:14px}
.page{max-width:1000px;margin:0 auto;padding:32px 24px 64px}
.header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:36px;gap:16px}
.header h1{font-size:22px;font-weight:700;letter-spacing:-.02em}.header p{color:var(--text-secondary);margin-top:4px;font-size:13px}
.btn{padding:5px 12px;border-radius:6px;border:1px solid var(--border);background:var(--surface-2);color:var(--text-secondary);font-size:12px;font-weight:500;cursor:pointer}
.hero-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:44px}
.tile{background:var(--surface-2);border:1px solid var(--border);border-radius:10px;padding:20px}
.tile-label{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:6px}
.tile-value{font-size:30px;font-weight:800;letter-spacing:-.03em;line-height:1}.tile-value.green{color:var(--green)}.tile-value.blue{color:var(--treatment)}
.tile-sub{font-size:12px;color:var(--text-muted);margin-top:6px}
section{margin-bottom:48px}.section-header{margin-bottom:16px}.section-header h2{font-size:16px;font-weight:700}.section-header p{font-size:12px;color:var(--text-secondary);margin-top:3px}
.legend{display:flex;gap:20px;margin-bottom:14px;flex-wrap:wrap}.legend-item{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text-secondary)}.legend-swatch{width:12px;height:12px;border-radius:3px}
.chart-wrap{background:var(--surface-2);border:1px solid var(--border);border-radius:10px;padding:20px;overflow:hidden}.chart-svg{width:100%;display:block}
.model-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}
.model-card{background:var(--surface-2);border:1px solid var(--border);border-radius:10px;padding:20px}.model-card h3{font-size:14px;font-weight:700;margin-bottom:14px}
.bar-row{display:flex;align-items:center;gap:10px;margin-bottom:10px}.bar-label{width:74px;font-size:12px;color:var(--text-secondary)}
.bar-track{flex:1;height:22px;background:var(--surface-3);border-radius:5px;overflow:hidden}.bar-fill{height:100%;border-radius:5px;display:flex;align-items:center;justify-content:flex-end;padding-right:8px;color:#fff;font-size:11px;font-weight:700}
.lift-badge{margin-top:6px;font-size:12px;font-weight:700;color:var(--green)}
table{width:100%;border-collapse:collapse;font-size:12px}th{padding:8px 10px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);background:var(--surface-2);border-bottom:1px solid var(--border)}
td{padding:8px 10px;border-bottom:1px solid var(--border);color:var(--text-secondary)}td.num{text-align:center;font-variant-numeric:tabular-nums;font-weight:600}
.delta-good{color:var(--green);font-weight:700}.delta-bad{color:var(--red);font-weight:700}.delta-same{color:var(--text-muted)}
.footer{margin-top:40px;padding-top:20px;border-top:1px solid var(--border);font-size:11px;color:var(--text-muted)}
#tt{position:fixed;pointer-events:none;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:8px 12px;font-size:12px;box-shadow:0 4px 16px rgba(0,0,0,.12);max-width:280px;opacity:0;transition:opacity .1s;z-index:100}#tt.show{opacity:1}#tt .t{font-weight:600;margin-bottom:4px}
</style></head><body><div class="page">
<div class="header"><div><h1>Spartacus AI Skills — Impact Report</h1><p>LLM-judged pattern adherence · baseline vs treatment · generated from eval run data</p></div><button class="btn" id="dk">☾ Dark</button></div>
<div class="hero-grid" id="hero"></div>
<section><div class="section-header"><h2>Overall Adherence by Model</h2><p>LLM judge rates each app 0–100 on idiomatic Spartacus. Higher is better.</p></div><div class="model-grid" id="models"></div></section>
<section><div class="section-header"><h2>Violations per Pattern</h2><p>Total violations across all experiments per condition. Hover a bar.</p></div>
<div class="legend"><div class="legend-item"><div class="legend-swatch" style="background:var(--baseline)"></div><span>Baseline</span></div><div class="legend-item"><div class="legend-swatch" style="background:var(--treatment)"></div><span>Treatment (skills)</span></div></div>
<div class="chart-wrap"><svg id="chart" class="chart-svg" role="img"></svg></div></section>
<section><div class="section-header"><h2>Full Data Table</h2></div><div style="overflow-x:auto"><table><thead><tr><th>#</th><th>Pattern</th><th>Baseline</th><th>Treatment</th><th>Δ</th></tr></thead><tbody id="tbody"></tbody></table></div></section>
<div class="footer">Generated by core-libs/skills/evals · data: matrix-results.json + pattern-comparison.json</div>
</div><div id="tt"></div>
<script>
const D=${DATA};
const dk=document.getElementById('dk');let dark=matchMedia('(prefers-color-scheme: dark)').matches;
function theme(){document.documentElement.setAttribute('data-theme',dark?'dark':'');dk.textContent=dark?'☀ Light':'☾ Dark';chart();}
dk.onclick=()=>{dark=!dark;theme();};
const cv=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
// hero
document.getElementById('hero').innerHTML=[
  ['Violations eliminated','−'+D.reductionPct+'%','green',D.bv+' → '+D.tv+' across '+D.totalPatterns+' patterns'],
  ['Patterns improved',D.improved+' / '+D.totalPatterns,'blue','fewer violations with treatment'],
  D.models.length?['Best adherence lift', (function(){let b=null;for(const m of D.models){if(m.baseline==null||m.treatment==null)continue;const l=m.treatment-m.baseline;if(!b||l>b.l)b={l,m:m.model,r:Math.round(l/m.baseline*100)}}return b?'+'+b.r+'%':'—'})(),'green',(function(){let b=null;for(const m of D.models){if(m.baseline==null||m.treatment==null)continue;const l=m.treatment-m.baseline;if(!b||l>b.l)b={l,m:m.model}}return b?b.m:''})()]:null,
].filter(Boolean).map(([l,v,c,s])=>'<div class="tile"><div class="tile-label">'+l+'</div><div class="tile-value '+c+'">'+v+'</div><div class="tile-sub">'+s+'</div></div>').join('');
// model cards
document.getElementById('models').innerHTML=D.models.map(m=>{
  if(m.baseline==null||m.treatment==null)return '<div class="model-card"><h3>'+m.model+'</h3><div class="tile-sub">incomplete (need both arms)</div></div>';
  const max=Math.max(m.baseline,m.treatment,50),w=v=>Math.round(v/max*100),lift=(m.treatment-m.baseline).toFixed(1),rel=Math.round((m.treatment-m.baseline)/m.baseline*100);
  return '<div class="model-card"><h3>'+m.model+'</h3>'+
    '<div class="bar-row"><div class="bar-label">Baseline</div><div class="bar-track"><div class="bar-fill" style="width:'+w(m.baseline)+'%;background:var(--baseline)">'+m.baseline.toFixed(1)+'</div></div></div>'+
    '<div class="bar-row"><div class="bar-label">Treatment</div><div class="bar-track"><div class="bar-fill" style="width:'+w(m.treatment)+'%;background:var(--treatment)">'+m.treatment.toFixed(1)+'</div></div></div>'+
    '<div class="lift-badge">▲ +'+lift+' pts (+'+rel+'%)</div></div>';
}).join('');
// table
document.getElementById('tbody').innerHTML=D.patterns.map(p=>{const d=p.treatmentViol-p.baselineViol,c=d<0?'delta-good':d>0?'delta-bad':'delta-same',t=d<0?'−'+Math.abs(d):d>0?'+'+d:'0';return '<tr><td class="num">'+p.id+'</td><td>'+p.name+'</td><td class="num">'+p.baselineViol+'</td><td class="num">'+p.treatmentViol+'</td><td class="num '+c+'">'+t+'</td></tr>';}).join('');
// tooltip
const tt=document.getElementById('tt');function tip(e,h){tt.innerHTML=h;tt.classList.add('show');mv(e);}function mv(e){tt.style.left=(e.clientX+14>innerWidth-290?e.clientX-300:e.clientX+14)+'px';tt.style.top=e.clientY+'px';}function hide(){tt.classList.remove('show');}
addEventListener('mousemove',e=>{if(tt.classList.contains('show'))mv(e);});
// chart
function chart(){const svg=document.getElementById('chart');const data=[...D.patterns].sort((a,b)=>b.baselineViol-a.baselineViol);
  const W=svg.parentElement.clientWidth-40,BAR=11,GAP=3,ROW=BAR*2+GAP+13,M={t:10,r:44,l:180,b:22},H=M.t+data.length*ROW+M.b,pw=W-M.l-M.r;
  const maxV=Math.max(5,...data.map(p=>Math.max(p.baselineViol,p.treatmentViol))),sx=v=>v/maxV*pw;
  const BC=cv('--baseline'),TC=cv('--treatment'),GC=cv('--grid'),TP=cv('--text-primary'),TM=cv('--text-muted'),RD=cv('--red');
  let e=[];const step=Math.ceil(maxV/6);
  for(let v=0;v<=maxV;v+=step){const x=M.l+sx(v);e.push('<line x1="'+x+'" y1="'+M.t+'" x2="'+x+'" y2="'+(H-M.b)+'" stroke="'+GC+'"/>');e.push('<text x="'+x+'" y="'+(H-M.b+14)+'" text-anchor="middle" fill="'+TM+'" font-size="10">'+v+'</text>');}
  data.forEach((p,i)=>{const y0=M.t+i*ROW,yb=y0+2,ys=y0+BAR+GAP+2;
    e.push('<text x="'+(M.l-8)+'" y="'+(y0+BAR+GAP/2+4)+'" text-anchor="end" fill="'+TP+'" font-size="11" dominant-baseline="middle">'+p.name.slice(0,34)+'</text>');
    const bw=Math.max(sx(p.baselineViol),p.baselineViol>0?2:0),sw=Math.max(sx(p.treatmentViol),p.treatmentViol>0?2:0);
    e.push('<rect class="b" data-i="'+i+'" data-t="b" x="'+M.l+'" y="'+yb+'" width="'+bw+'" height="'+BAR+'" rx="3" fill="'+BC+'" style="cursor:pointer"/>');
    e.push('<text x="'+(M.l+bw+4)+'" y="'+(yb+BAR/2)+'" dominant-baseline="middle" fill="'+TM+'" font-size="10">'+p.baselineViol+'</text>');
    e.push('<rect class="b" data-i="'+i+'" data-t="t" x="'+M.l+'" y="'+ys+'" width="'+sw+'" height="'+BAR+'" rx="3" fill="'+TC+'" style="cursor:pointer"/>');
    e.push('<text x="'+(M.l+sw+4)+'" y="'+(ys+BAR/2)+'" dominant-baseline="middle" fill="'+TM+'" font-size="10">'+p.treatmentViol+'</text>');
    if(p.treatmentViol>p.baselineViol)e.push('<text x="'+(M.l+sw+18)+'" y="'+(ys+BAR/2)+'" dominant-baseline="middle" fill="'+RD+'" font-size="9">▲ regression</text>');
  });
  svg.setAttribute('viewBox','0 0 '+W+' '+H);svg.setAttribute('height',H);svg.innerHTML=e.join('');
  svg.querySelectorAll('.b').forEach(b=>{b.onmouseenter=ev=>{const p=data[+b.dataset.i],isB=b.dataset.t==='b',v=isB?p.baselineViol:p.treatmentViol,d=p.treatmentViol-p.baselineViol,rel=p.baselineViol?Math.round((p.baselineViol-p.treatmentViol)/p.baselineViol*100):0;tip(ev,'<div class="t">'+p.id+'. '+p.name+'</div>'+(isB?'Baseline':'Treatment')+': <strong>'+v+' violations</strong>'+(!isB?'<div style="margin-top:5px;color:'+(d<0?'#16A34A':d>0?'#DC2626':'#888')+'">'+(d<0?'−'+rel+'% vs baseline':d>0?'+'+Math.abs(d)+' (regression)':'no change')+'</div>':''));};b.onmouseleave=hide;});
}
theme();addEventListener('resize',chart);
</script></body></html>`;

const out = join(ROOT, 'skills-impact-report.html');
writeFileSync(out, html);
console.log(`✓ Wrote ${out}`);
console.log(`  ${D_summary()}`);
function D_summary() {
  return `${reductionPct}% fewer violations (${bv}→${tv}), ${improved}/${totalPatterns} patterns improved` +
    (bestModel ? `, best lift +${bestModel.rel}% (${bestModel.model})` : '');
}
