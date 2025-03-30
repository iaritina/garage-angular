import { TestBed } from '@angular/core/testing';

import { BrandsStatService } from './brands-stat.service';

describe('BrandsStatService', () => {
  let service: BrandsStatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandsStatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
