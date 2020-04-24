export function mockTranslate(key: string, options: any = {}) {
  const optionsString = Object.keys(options)
    .sort()
    .map((optionName) => `${optionName}:${options[optionName]}`)
    .join(' ');
  return optionsString ? `${key} ${optionsString}` : key;
}
