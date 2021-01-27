import { TestBed } from '@angular/core/testing';

import { TotoService } from './toto.service';

describe('TotoService', () => {
  let service: TotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
