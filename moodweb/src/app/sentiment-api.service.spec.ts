import { TestBed } from '@angular/core/testing';

import { SentimentAPIService } from './sentiment-api.service';

describe('SentimentAPIService', () => {
  let service: SentimentAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentimentAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
