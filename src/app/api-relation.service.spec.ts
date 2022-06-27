import { TestBed } from '@angular/core/testing';

import { ApiRelationService } from './api-relation.service';

describe('ApiRelationService', () => {
  let service: ApiRelationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRelationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
