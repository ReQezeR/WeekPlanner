import { TestBed } from '@angular/core/testing';

import { EventTableService } from './event-table.service';

describe('EventTableService', () => {
  let service: EventTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
