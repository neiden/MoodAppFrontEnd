import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SentimentAPIService } from './sentiment-api.service';

describe('SentimentAPIService', () => {
  let service: SentimentAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SentimentAPIService]
    });
    service = TestBed.inject(SentimentAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
