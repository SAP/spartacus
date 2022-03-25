export function getUrl(urlString: string): URL | null {
  try {
    return new URL(urlString);
  } catch {
    return null;
  }
}

export function isHttpOrHttps(url: URL) {
  return url.protocol === 'http:' || url.protocol === 'https:';
}
