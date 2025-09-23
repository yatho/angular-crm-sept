import { TestBed } from '@angular/core/testing';

import { DemoObservable } from './demo-observable';

describe('DemoObservable', () => {
  let service: DemoObservable;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoObservable);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
