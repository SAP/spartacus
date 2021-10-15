import { productCodes } from '../product-codes';

export function generatePdpUrls(
  maxDifferentUrls: number,
  baseSite: string
): string[] {
  const codes = productCodes[baseSite];
  if (maxDifferentUrls > codes.length) {
    throw Error(
      `Cannot generate more different PDP urls than ${codes.length} for basesite '${baseSite}'`
    );
  }
  return codes.map((code) => `/${baseSite}/p/${code}`);
}
