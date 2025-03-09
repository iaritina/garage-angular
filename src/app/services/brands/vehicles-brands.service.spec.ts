import { TestBed } from '@angular/core/testing';

import { VehiclesBrandsService } from './vehicles-brands.service';

describe('VehiclesBrandsService', () => {
  let service: VehiclesBrandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclesBrandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
