import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DemoObservable {
  getObservable(): Observable<number> {
    return new Observable<number>((subscriber: Subscriber<number>) => {
      console.log('obs called');
      // Send results
      setTimeout(() => {
        subscriber.next(1);
      }, 1000);
      setTimeout(() => {
        subscriber.next(2);
      }, 2000);
      setTimeout(() => {
        subscriber.next(3);
      }, 3000);

      // End of processing
      setTimeout(() => {
        subscriber.complete();
      }, 4000);
    }).pipe(
      catchError((err) => {
        console.log('error', err);
        return EMPTY;
      }),
    );
  }
}
