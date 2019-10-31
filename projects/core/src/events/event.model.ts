/**
 * CxEvent model holds the value of the event source
 * and can potential be extended with meta info to the
 * event.
 */
export class CxEvent<T> {
  value: T;
}
