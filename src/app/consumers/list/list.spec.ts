import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { vitest } from 'vitest';

import { List } from './list';
import { Consumers } from '../consumers';
import { of } from 'rxjs';

const getFilterField = (fixture: ComponentFixture<List>) =>
  fixture.nativeElement.querySelector('input[matInput]');

const getTableRows = (fixture: ComponentFixture<List>) =>
  fixture.nativeElement.querySelectorAll('table tbody tr');

const getCreateButton = (fixture: ComponentFixture<List>) =>
  fixture.nativeElement.querySelector('a[test-id="createButton"]');

const MOCK_CONSUMERS = [
  {
    id: 1,
    civility: 'Mr',
    firstname: 'John',
    lastname: 'Doe',
    email: 'john@doe.test',
    phone: '0102030405',
  },
  {
    id: 2,
    civility: 'Mme',
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'jane@doe.test',
    phone: '0908070605',
  },
];

describe('List', () => {
  let component: List;
  let fixture: ComponentFixture<List>;

  let findSpy = vitest.fn((val?: string) => of(MOCK_CONSUMERS));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [List],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: Consumers,
          useValue: {
            find: findSpy,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(List);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 2 cosumers in the table', () => {
    const rows = getTableRows(fixture);
    console.log(rows);
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('John');
    expect(rows[0].textContent).toContain('Doe');
    expect(rows[1].textContent).toContain('Jane');
    expect(rows[1].textContent).toContain('Doe');
  });

  it('should have a link to create a new consumer', () => {
    const createButton = getCreateButton(fixture);
    expect(createButton).toBeTruthy();
  });

  it('should call find method on filter change', () => {
    const filterField = getFilterField(fixture);
    expect(filterField).toBeTruthy();
    if (!filterField) {
      return;
    }
    filterField.value = 'Doe';
    filterField.dispatchEvent(new Event('input'));
    component.find('Doe');
    fixture.detectChanges();

    expect(findSpy).toHaveBeenCalledWith('Doe');
  });
});
