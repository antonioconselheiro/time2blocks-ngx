import { Injectable } from '@angular/core';
import { Time2Blocks } from '@belomonte/time2blocks-light';

@Injectable({
  providedIn: 'root'
})
export class Time2BlocksService {

  time2Blocks = Time2Blocks.getInstance();

  getFromTimestamp(timestamp: number): Promise<number | null> {
    return this.time2Blocks.getFromTimestamp(timestamp);
  }

  format(block: number, format: string, numberSeparator?: string): string {
    return this.time2Blocks.format(block, format, numberSeparator);
  }
}
