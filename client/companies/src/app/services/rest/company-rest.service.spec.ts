import { TestBed } from '@angular/core/testing';

import { RestService } from '../rest.service';
import { CompanyRestService } from './company-rest.service';

describe('CompanyRestService', () => {
  let restMock: any;
  beforeEach(() => {
    restMock = {
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: RestService, useInstance: restMock },
      ]
    });
  });

  it('should be created', () => {
    const service: CompanyRestService = TestBed.get(CompanyRestService);
    expect(service).toBeTruthy();
  });
});
