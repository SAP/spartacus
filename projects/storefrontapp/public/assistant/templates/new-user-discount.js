/**
 * Display template: new-user-discount
 *
 * Renders a discount summary card with order breakdown and a CTA button.
 * Self-contained: injects its own CSS once and registers the render function.
 *
 * Expected data shape:
 * {
 *   memberSince: string,
 *   discounts: Array<{ label: string, note?: string }>,
 *   items: Array<{ name: string, qty: number, price: number }>,
 *   subtotal: number,
 *   lineDiscounts: Array<{ label: string, amount: number }>,
 *   tax: number,
 *   taxRate?: string,
 *   totalSavings: number,
 *   total: number,
 *   ctaLabel?: string,
 *   ctaPrompt?: string,
 * }
 */

if (!document.getElementById('tpl-style-new-user-discount')) {
  const s = document.createElement('style');
  s.id = 'tpl-style-new-user-discount';
  s.textContent = `
    .nud-discount-section { background: #f0faf0; }
    .nud-discount-label { font-size: 0.84rem; font-weight: 700; color: #1a5c2a; display: block; }
    .nud-discount-note  { font-size: 0.74rem; color: #2e8b57; display: block; }
    .nud-table { width: 100%; border-collapse: collapse; }
    .nud-table td { padding: 5px 0; font-size: 0.82rem; vertical-align: top; }
    .nud-table td:last-child { text-align: right; white-space: nowrap; }
    .nud-table tr + tr td { border-top: 1px solid #f0f0f0; }
    .nud-muted td { color: #6a6a6a; }
    .nud-savings td { font-weight: 700; border-top: 1px solid #e0e0e0 !important; padding-top: 7px; }
    .nud-green { color: #1a8a3a; }
    .nud-total td { font-size: 0.92rem; font-weight: 700; border-top: 2px solid #1a1a1a !important; padding-top: 10px; }
  `;
  document.head.appendChild(s);
}

// eslint-disable-next-line no-undef
registerTemplate('new-user-discount', function renderNewUserDiscount(data) {
  function fmt(n) {
    const abs = Math.abs(Number(n)).toFixed(2);
    return (Number(n) < 0 ? '-$' : '$') + abs;
  }

  function esc(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  const discountSection = (data.discounts ?? []).length
    ? `<div class="template-card-section nud-discount-section">
        ${(data.discounts).map(d => `
          <span class="nud-discount-label">${esc(d.label)}</span>
          ${d.note ? `<span class="nud-discount-note">${esc(d.note)}</span>` : ''}
        `).join('')}
      </div>`
    : '';

  const itemRows = (data.items ?? []).map(i =>
    `<tr><td>${esc(i.name)} × ${esc(i.qty)}</td><td>${fmt(i.price)}</td></tr>`
  ).join('');

  const discountLineRows = (data.lineDiscounts ?? []).map(d =>
    `<tr class="nud-muted"><td>${esc(d.label)}</td><td class="nud-green">${fmt(d.amount)}</td></tr>`
  ).join('');

  const ctaBtn = data.ctaLabel
    ? `<button class="template-cta-btn" data-cta-prompt="${esc(data.ctaPrompt ?? '')}">${esc(data.ctaLabel)}</button>`
    : '';

  return `
    <div class="template-card">
      <div class="template-card-header">
        <h3>New User Welcome Discount</h3>
        <p>Member since ${esc(data.memberSince)}</p>
      </div>
      ${discountSection}
      <div class="template-card-section">
        <p style="font-weight:700;margin-bottom:8px;color:#1a1a1a">Order Summary</p>
        <table class="nud-table">
          ${itemRows}
          <tr class="nud-muted"><td>Subtotal</td><td>${fmt(data.subtotal)}</td></tr>
          ${discountLineRows}
          <tr class="nud-muted"><td>Tax${data.taxRate ? ` (${esc(data.taxRate)})` : ''}</td><td>${fmt(data.tax)}</td></tr>
          <tr class="nud-savings"><td>Total Savings</td><td class="nud-green">${fmt(data.totalSavings)}</td></tr>
          <tr class="nud-total"><td>Total</td><td>${fmt(data.total)}</td></tr>
        </table>
      </div>
      ${ctaBtn}
      <div class="template-card-footer">
        By placing this order, you agree to our Terms of Service and Privacy Policy.
        New user welcome discount applied – first order only.
      </div>
    </div>
  `;
});
