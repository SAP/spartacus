import {
  HttpErrorResponse,
  HttpHeaders,
  HttpStatusCode,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ejs from 'ejs';
import * as fs from 'fs';
import { first } from 'rxjs/operators';

import { PROPAGATE_ERROR } from '../../../../../core/src/error/tokens/propagate-error.token';
import { UnknownServerRenderError } from '../errors/server-render-errors';

export const logErrors = () => {
  return (error: any) => {
    fs.promises.appendFile('error.log', '\n' + error.message);
  };
};

export const writeStateToFile = () => {
  const store = inject(Store);

  return () => {
    const state$ = store.select((state) => JSON.stringify(state, null, 2));

    state$
      .pipe(first())
      .toPromise()
      .then((state) => new Uint8Array(Buffer.from(state)))
      .then((data) => fs.promises.writeFile('data.json', data));
  };
};

export const throwOups = () => {
  const propagateError = inject(PROPAGATE_ERROR);

  return async () => {
    const html = await ejs.renderFile('./src/app/custom/errors/500.ejs', {
      title: 'Oups!',
      text: 'An unknown error has occured',
    });

    const error = new UnknownServerRenderError(html);

    propagateError(
      new HttpErrorResponse({
        error,
        status: HttpStatusCode.InternalServerError,
        headers: new HttpHeaders({
          'X-CX-ERR': error.cxErrorCode,
        }),
      })
    );
  };
};

/**
 * Propagating a generic `HttpErrorResponse` is very flexible.
 * It allows setting headers, specifying a status code, and
 * handling new error types without any server-side effort.
 * However, it is not quite as practical for the developer as
 * handling custom error classes.
 *
 * Replace the throwOups function above with the one below and
 * check the `handleUnknownServerRenderErrors` function in the
 * src/app/custom/handlers/express-error-handlers.ts file to see
 * how it is handled.
 *
 * Hint: We will no longer send the `x-cx-err: SR0001` header
 * and log `CX Error Code: SR0001` in the terminal instead.
 */
// export const throwOups = () => {
//   const propagateError = inject(PROPAGATE_ERROR);

//   return async () => {
//     const html = await ejs.renderFile('./src/app/custom/errors/500.ejs', {
//       title: 'Oups!',
//       text: 'An unknown error has occured',
//     });

//     propagateError(new UnknownServerRenderError(html));
//   };
// };
