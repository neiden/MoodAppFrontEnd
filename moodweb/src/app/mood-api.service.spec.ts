import { TestBed } from '@angular/core/testing';

import { MoodAPIService } from './mood-api.service';

describe('MoodAPIService', () => {
  let service: MoodAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoodAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
