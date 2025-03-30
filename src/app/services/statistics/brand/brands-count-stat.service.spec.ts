import { TestBed } from '@angular/core/testing';

import { BrandsCountStatService } from './brands-count-stat.service';

describe('BrandsCountStatService', () => {
  let service: BrandsCountStatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandsCountStatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
