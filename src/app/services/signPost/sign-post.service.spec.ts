import { TestBed } from '@angular/core/testing';

import { SignPostService } from './sign-post.service';

describe('SignPostService', () => {
  let service: SignPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
