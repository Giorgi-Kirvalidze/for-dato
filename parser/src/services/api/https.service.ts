import https from 'https';
import { Service } from 'typedi';

enum HttpsEvents {
  DATA = 'data',
  END = 'end',
  ERROR = 'error',
}
@Service()
export class HttpsService {
  public GET<T>(options: string | https.RequestOptions | URL): Promise<T> {
    return new Promise((resolve, reject) => {
      https
        .get(options, (resp) => {
          let data = '';
          resp.on(HttpsEvents.DATA, (chunk) => (data += chunk));
          resp.on(HttpsEvents.END, () => resolve(JSON.parse(data)));
        })
        .on(HttpsEvents.ERROR, (err) => reject(err));
    });
  }
}
