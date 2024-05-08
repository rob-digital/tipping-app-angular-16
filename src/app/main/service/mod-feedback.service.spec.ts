import { TestBed } from '@angular/core/testing';

import { MODFeedbackService } from './mod-feedback.service';

describe('MODFeedbackService', () => {
  let service: MODFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MODFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
