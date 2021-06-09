/**
 * Joins the multiple parts with '/' to create a url
 *
 * @param parts the distinct parts of the url to join
 */
export function urlPathJoin(...parts: string[]): string {
  const paths: string[] = [];
  parts = parts.filter((part) => Boolean(part));
  for (const part of parts) {
    paths.push(cleanSlashes(part));
  }

  if (parts[0]?.startsWith('/')) {
    paths[0] = '/' + paths[0];
  }
  if (parts[parts.length - 1]?.endsWith('/')) {
    paths[paths.length - 1] = paths[paths.length - 1] + '/';
  }
  return paths.join('/');
}

function cleanSlashes(path: string): string {
  path = path.startsWith('/') ? path.slice(1) : path;
  path = path.endsWith('/') ? path.slice(0, -1) : path;

  return path;
}
