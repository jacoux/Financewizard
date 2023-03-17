import { TestBed } from '@angular/core/testing';

import { GeneralCrudService } from './general-crud.service';

describe('GeneralCrudService', () => {
  let service: GeneralCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
