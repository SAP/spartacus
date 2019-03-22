import { Injectable } from '@angular/core';

// TODO: move class
@Injectable({
  providedIn: 'root'
})
export abstract class Adapter<S, T> {
  // TODO: add documentation
  abstract adapt(source: S): T;
}
