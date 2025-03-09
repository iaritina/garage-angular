import { TestBed } from '@angular/core/testing';

import { VehiclesModelsService } from './vehicles-models.service';

describe('VehiclesModelsService', () => {
  let service: VehiclesModelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclesModelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
