import { TestBed } from '@angular/core/testing';
import { Time2BlocksService } from './time2blocks.service';

describe('Time2blocksNgxService', () => {
  let service: Time2BlocksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Time2BlocksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
