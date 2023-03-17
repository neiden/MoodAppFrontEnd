import { TestBed } from '@angular/core/testing';

import { SpotiyAPIService } from './spotiy-api.service';

describe('SpotiyAPIService', () => {
  let service: SpotiyAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotiyAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
