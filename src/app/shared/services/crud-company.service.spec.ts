import { TestBed } from '@angular/core/testing';

import { CrudCompanyService } from './crud-company.service';

describe('CrudCompanyService', () => {
  let service: CrudCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
