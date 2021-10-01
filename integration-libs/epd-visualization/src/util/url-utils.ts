export function getUrl(urlString?: string): URL | null {
  if (!urlString) {
    return null;
  }
  try {
    return new URL(urlString);
  } catch {
    return null;
  }
}

export function isHttpOrHttps(url: URL) {
  return url?.protocol === 'http:' || url?.protocol === 'https:';
}

export function isOrigin(url: URL) {
  return url.href === url?.origin + '/';
}
