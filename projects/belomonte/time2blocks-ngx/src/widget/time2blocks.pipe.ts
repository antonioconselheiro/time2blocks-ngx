import { Pipe, PipeTransform } from '@angular/core';
import { Time2BlocksService } from '../service/time2blocks.service';

@Pipe({
  name: 'time2blocks',
  pure: true
})
export class Time2BlocksPipe implements PipeTransform {

  constructor(
    private time2blocksService: Time2BlocksService
  ) { }

  async transform(value: number, format = 'B', type: 'milliseconds-timestamp' | 'timestamp' | 'blocks' | 'minutes' = 'minutes'): Promise<string> {
    if (type === 'blocks') {
      return this.time2blocksService.format(value, format);
    } else if (type === 'minutes') {
      const blocks = await this.time2blocksService.getFromMinutes(value);
      if (!blocks) {
        return '';
      }

      return this.time2blocksService.format(blocks, format);
    } else if (type === 'timestamp') {
      const blocks = await this.time2blocksService.getFromTimestamp(value);
      if (!blocks) {
        return '';
      }

      return this.time2blocksService.format(blocks, format);
    } else {
      const blocks = await this.time2blocksService.getFromMillisecondsTimestamp(value);
      if (!blocks) {
        return '';
      }

      return this.time2blocksService.format(blocks, format);
    }
  }

}
