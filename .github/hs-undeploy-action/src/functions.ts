export function getBundleId(branch: string) {
  let bundleId = '';
  const regex = /(\-\d)/;
  branch
    .toLowerCase()
    .replace(/\//g, '-s')
    .replace(/\./g, '-d')
    .replace(/_/g, '-')
    .split(regex)
    .forEach((s: string) => {
      if (s.match(regex)) {
        bundleId += s.substring(0, 1) + 'i' + s.substring(1, 2);
      } else {
        bundleId += s;
      }
    });
  console.log(`--> Generated bundle ID: ${bundleId}`);
  return bundleId;
}
