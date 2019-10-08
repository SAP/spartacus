import { isPlatformServer } from '@angular/common';
import { SiteContextConfig } from '@spartacus/core';

const OCC_BASE_SITES_CONFIG_TRANSFER_STATE =
  'occ-base-sites-config-transfer-state';

export function rehydrateStateOccBaseSitesConfig(): SiteContextConfig {
  const script = document.getElementById(OCC_BASE_SITES_CONFIG_TRANSFER_STATE);
  if (script && script.textContent) {
    try {
      const { context } = JSON.parse(unescapeHtml(script.textContent));
      // return explicitly only the context property (avoid the injection of other configurations)
      return { context };
    } catch (e) {
      console.warn(
        'Exception while restoring the transferred state of the OCC base sites config',
        e
      );
    }
  }
}

export function transferStateOccBaseSitesConfigFactory(
  document: Document,
  platform: any,
  occBaseSitesConfig: SiteContextConfig = {}
) {
  return () => {
    if (isPlatformServer(platform)) {
      const script = document.createElement('script');
      script.id = OCC_BASE_SITES_CONFIG_TRANSFER_STATE;
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
