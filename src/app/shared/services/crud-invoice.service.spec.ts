import { TestBed } from '@angular/core/testing';

import { CrudInvoiceService } from './crud-invoice.service';

describe('CrudInvoiceService', () => {
  let service: CrudInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
