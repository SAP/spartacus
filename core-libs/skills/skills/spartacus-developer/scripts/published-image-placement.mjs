/** Match a trusted publication map keyed by absolute, canonical document URL. */
export function selectPublishedPlacement(documentUrl, publications, publishedMode) {
  if (publishedMode !== true || !URL.canParse(documentUrl)) return null;
  const url = new URL(documentUrl);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.hash) return null;

  const key = url.origin + url.pathname;
  let placement = publications.get(key);
  if (!placement && url.pathname !== '/' && url.pathname.endsWith('/') && !url.pathname.endsWith('//')) {
    const canonical = publications.get(key.slice(0, -1));
    if (canonical?.acceptTrailingSlash === true) placement = canonical;
  }
  if (placement?.publicForAllVisitors !== true) return null;
  for (const name of url.searchParams.keys()) {
    if (!placement.inertTrackingParameters?.includes(name)) return null;
  }
  return placement;
}
