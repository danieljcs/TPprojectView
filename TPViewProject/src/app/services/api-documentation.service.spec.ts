import { TestBed } from '@angular/core/testing';

import { ApiDocumentationService } from './api-documentation.service';

describe('ApiDocumentationService', () => {
  let service: ApiDocumentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDocumentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
