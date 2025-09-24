import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { Consumers } from './consumers';
import { HttpTestingController } from '@angular/common/http/testing';
import { ConsumerData } from './model/consumer';

describe('Consumers', () => {
  let service: Consumers;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Consumers);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET /api/consumers with no params', () => {
    service.find().subscribe();
    const req = httpMock.expectOne((r) => r.method === 'GET' && r.url === '/api/consumers');
    expect(req.request.params.keys().length).toBe(0);
    req.flush([]);
  });

  it('should call GET /api/consumers with lastnameFilter param', () => {
    service.find('Smith').subscribe();
    const req = httpMock.expectOne((r) => r.method === 'GET' && r.url === '/api/consumers');
    expect(req.request.params.get('q')).toBe('Smith');
    req.flush([]);
  });

  it('should call GET /api/consumers/:id', () => {
    service.getById(1).subscribe();
    const req = httpMock.expectOne('/api/consumers/1');
    expect(req.request.method).toBe('GET');
    req.flush({ id: 1, lastname: 'Smith' } as ConsumerData);
  });

  it('should call POST /api/consumers', () => {
    const consumer: ConsumerData = { id: 2, lastname: 'Doe' } as ConsumerData;
    service.create(consumer).subscribe();
    const req = httpMock.expectOne('/api/consumers');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(consumer);
    req.flush(null);
  });

  it('should call PUT /api/consumers/:id', () => {
    const consumer: ConsumerData = { id: 3, lastname: 'Brown' } as ConsumerData;
    service.update(consumer).subscribe();
    const req = httpMock.expectOne('/api/consumers/3');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(consumer);
    req.flush(null);
  });

  it('should call DELETE /api/consumers/:id', () => {
    service.remove(4).subscribe();
    const req = httpMock.expectOne('/api/consumers/4');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
