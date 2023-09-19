import { Injectable } from '@angular/core';
import { time2Blocks } from '@belomonte/time2blocks-light';

@Injectable({
  providedIn: 'root'
})
export class Time2BlocksService {

  getFromTimestamp(timestamp: number): Promise<number | null> {
    return time2Blocks.getFromTimestamp(timestamp);
  }

  getFromMinutes(timestamp: number): Promise<number | null> {
    return time2Blocks.getFromMinutes(timestamp);
  }

  getFromMillisecondsTimestamp(javascriptTimestamp: number): Promise<number | null> {
    return time2Blocks.getFromMillisecondsTimestamp(javascriptTimestamp);
  }

  format(block: number, format: string, numberSeparator?: string): string {
    return time2Blocks.format(block, format, numberSeparator);
  }

}
