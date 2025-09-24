import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsumerData } from './model/consumer';

@Injectable({
  providedIn: 'root',
})
export class Consumers {
  private readonly http = inject(HttpClient);

  find(lastnameFilter?: string): Observable<ConsumerData[]> {
    let params;
    if (lastnameFilter && lastnameFilter !== '') {
      params = new HttpParams().set('q', lastnameFilter);
    }
    return this.http.get<ConsumerData[]>('/api/consumers', { params });
  }

  getById(id: number): Observable<ConsumerData> {
    return this.http.get<ConsumerData>(`/api/consumers/${id}`);
  }

  create(consumer: ConsumerData): Observable<void> {
    return this.http.post<void>('/api/consumers', consumer);
  }

  update(consumer: ConsumerData): Observable<void> {
    return this.http.put<void>(`/api/consumers/${consumer.id}`, consumer);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`/api/consumers/${id}`);
  }
}
