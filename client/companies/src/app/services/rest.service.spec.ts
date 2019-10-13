import { TestBed } from '@angular/core/testing';
import { HttpBackend } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RestService } from './rest.service';

describe('RestService', () => {
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
      ]
    });
    http = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: RestService = TestBed.get(RestService);
    expect(service).toBeTruthy();
  });

  it('can handle get', (done) => {
    const service: RestService = TestBed.get(RestService);

    service.get<string[]>('someUrl').subscribe(value => {
      expect(value).toEqual(['someValue', 'otherValue']);
      done();
    });
    http.expectOne('someUrl').flush(['someValue', 'otherValue']);
  });

  it('can handle post', (done) => {
    const service: RestService = TestBed.get(RestService);

    service.post<string[]>('someUrl', {some: 'data'}).subscribe(value => {
      expect(value).toEqual(['someValue', 'otherValue']);
      done();
    });
    http.expectOne('someUrl').flush(['someValue', 'otherValue'], { status: 201, statusText: 'Created' });
  });

  it('can handle put', (done) => {
    const service: RestService = TestBed.get(RestService);

    service.put<string[]>('someUrl', {some: 'data'}).subscribe(value => {
      expect(value).toEqual(['someValue', 'otherValue']);
      done();
    });
    http.expectOne('someUrl').flush(['someValue', 'otherValue']);
  });

  it('can handle delete', (done) => {
    const service: RestService = TestBed.get(RestService);

    service.del('someUrl').subscribe(value => {
      expect(value).toBeFalsy();
      done();
    });
    http.expectOne('someUrl').flush(null, { status: 204, statusText: 'No Content' });
  });
});
