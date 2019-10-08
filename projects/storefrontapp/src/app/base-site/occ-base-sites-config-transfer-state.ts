import { isPlatformServer } from '@angular/common';
import { SiteContextConfig } from '@spartacus/core';

const OCC_BASE_SITES_CONFIG_STATE_ID = 'occ-base-sites-config-state';

export function rehydrateOccBaseSitesConfig(): SiteContextConfig {
  const script = document.getElementById(OCC_BASE_SITES_CONFIG_STATE_ID);
  if (script && script.textContent) {
    try {
      const { context } = JSON.parse(unescapeHtml(script.textContent));
      return { context }; // avoid the injection of other properties, just pass individual one
    } catch (e) {
      console.warn(
        'Exception while restoring the transferred state of the OCC base sites config',
        e
      );
    }
  }
}

export function transferOccBaseSitesConfigFactory(
  document: Document,
  platform: any,
  occBaseSitesConfig: SiteContextConfig = {}
) {
  return () => {
    if (isPlatformServer(platform)) {
      const script = document.createElement('script');
      script.id = OCC_BASE_SITES_CONFIG_STATE_ID;
      script.setAttribute('type', 'application/json');
      script.textContent = escapeHtml(JSON.stringify(occBaseSitesConfig));
      document.body.appendChild(script);
    }
  };
}

function escapeHtml(text: string): string {
  const escapedText: { [k: string]: string } = {
    '&': '&a;',
    '"': '&q;',
    "'": '&s;',
    '<': '&l;',
    '>': '&g;',
  };
  return text.replace(/[&"'<>]/g, s => escapedText[s]);
}

function unescapeHtml(text: string): string {
  const unescapedText: { [k: string]: string } = {
    '&a;': '&',
    '&q;': '"',
    '&s;': "'",
    '&l;': '<',
    '&g;': '>',
  };
  return text.replace(/&[^;]+;/g, s => unescapedText[s]);
}
