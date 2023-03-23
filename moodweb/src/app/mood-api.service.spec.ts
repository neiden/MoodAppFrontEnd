import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule ,HttpTestingController} from '@angular/common/http/testing';
import { MoodAPIService } from './mood-api.service';

describe('MoodAPIService', () => {
  let service: MoodAPIService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    httpMock = TestBed.inject(HttpTestingController)
    service = TestBed.inject(MoodAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
