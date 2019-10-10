export interface NodeHttpsClientResponse {
  statusCode: number;
  on: (event: 'data' | 'end', callback: Function) => void;
}
export interface NodeHttpsClient {
  get: (
    url: string,
    callback: (response: NodeHttpsClientResponse) => void
  ) => { on: (event: 'error', callback: Function) => void };
}

export class LoadJsonUtils {
  static loadXhr(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (e) {
            reject(e);
          }
        } else {
          reject(new Error(xhr.responseText));
        }
      };
      xhr.onerror = e => {
        reject(e);
      };
      xhr.send();
    });
  }

  static loadNodeHttps(
    url: string,
    httpsClient: NodeHttpsClient
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      httpsClient
        .get(url, response => {
          let data = '';
          response.on('data', chunk => {
            data += chunk;
          });
          response.on('end', () => {
            if (response.statusCode === 200) {
              try {
                resolve(JSON.parse(data));
              } catch (e) {
                reject(e);
              }
            } else {
              reject(response);
            }
          });
        })
        .on('error', err => {
          reject('Error: ' + err.message);
        });
    });
  }

  static loadNodeHttpsFactory(
    httpsClient: NodeHttpsClient
  ): (url: string) => Promise<any> {
    return (url: string) => LoadJsonUtils.loadNodeHttps(url, httpsClient);
  }
}
