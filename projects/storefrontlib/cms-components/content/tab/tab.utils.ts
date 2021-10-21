/**
 * If the passed index its outside of the min and max boundaries,
 * wrap the index exceeding the max boundary to the min boundary or vice versa.
 * Return the index if it does not exceed any boundary.
 */
export function wrapIntoBounds(index: number, max: number, min = 0): number {
  return index < min ? max : index > max ? (index = min) : index;
}
