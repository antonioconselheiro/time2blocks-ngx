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

  async transform(value: number, format = 'B', numberSeparator = ','): Promise<string> {
    const blocks = await this.time2blocksService.getFromTimestamp(value);
    if (!blocks) {
      return '';
    }

    return this.time2blocksService.format(blocks, format, numberSeparator);
  }
}
