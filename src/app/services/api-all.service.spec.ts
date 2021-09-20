import { TestBed } from '@angular/core/testing';

import { ApiAllService } from './api-all.service';

describe('ApiAllService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiAllService = TestBed.get(ApiAllService);
    expect(service).toBeTruthy();
  });
});
