// should be private class
export class TransferData {
  /**
   * Rehydrates the value from the JSON script of the given id
   *
   * @param scriptId the id of the JSON script with the data to rehydrate
   * @param doc document object (default: global `document` object)
   */
  static rehydrate(scriptId: string, doc: Document = document): any {
    const script = doc.getElementById(scriptId);
    if (script && script.textContent) {
      try {
        return JSON.parse(unescapeHtml(script.textContent));
      } catch (e) {
        console.warn(
          'Exception while restoring the transferred state of the OCC base sites config',
          e
        );
      }
    }
  }

  static transfer(scriptId: string, data: any, document: Document) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.setAttribute('type', 'application/json');
    script.textContent = escapeHtml(JSON.stringify(data));
    document.body.appendChild(script);
  }
}

function escapeHtml(text: string): string {
  const escapedText: { [k: string]: string } = {
    '&': '&a;',
    '"': '&q;',
    "'": '&s;',
    '<': '&l;',
    '>': '&g;',
  };
  return text.replace(/[&"'<>]/g, s => escapedText[s]);
}

function unescapeHtml(text: string): string {
  const unescapedText: { [k: string]: string } = {
    '&a;': '&',
    '&q;': '"',
    '&s;': "'",
    '&l;': '<',
    '&g;': '>',
  };
  return text.replace(/&[^;]+;/g, s => unescapedText[s]);
}
