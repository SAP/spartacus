export const getSegments = (path: string): string[] => path.split('/');

export const isParameter = (segment: string): boolean =>
  segment.startsWith(':');

export const getParameterName = (segment: string): string => segment.slice(1); // it just removes leading ':'

export const ensureLeadingSlash = (path: string): string =>
  path.startsWith('/') ? path : '/' + path;

export const removeLeadingSlash = (path: string): string =>
  path.startsWith('/') ? path.slice(1) : path;
