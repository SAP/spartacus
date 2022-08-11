export function getCookie(cookie: string, name: string) {
  const regExp = new RegExp('(?:^|;\\s*)' + name + '=([^;]*)', 'g');
  const result: RegExpExecArray | null = regExp.exec(cookie);

  return (result && decodeURIComponent(result[1])) || '';
}
