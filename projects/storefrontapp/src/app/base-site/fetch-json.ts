export function fetchJson(url: string): Promise<any> {
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
        reject(xhr.responseText);
      }
    };
    xhr.onerror = e => {
      reject(e);
    };
    xhr.send();
  });
}

export function fetchJsonSSR(url: string, httpsClient: any): Promise<any> {
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
          }
          reject(response);
        });
      })
      .on('error', err => {
        reject('Error: ' + err.message);
      });
  });
}

//spike todo add type
export function fetchJsonSSRFactory(
  httpsClient: any
): (url: string) => Promise<any> {
  return (url: string) => fetchJsonSSR(url, httpsClient);
}
