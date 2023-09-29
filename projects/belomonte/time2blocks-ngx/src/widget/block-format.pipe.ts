import { Pipe, PipeTransform } from '@angular/core';
import { Time2BlocksService } from '../service/time2blocks.service';

@Pipe({
  name: 'blockFormat'
})
export class BlockFormatPipe implements PipeTransform {

  constructor(
    private time2blocksService: Time2BlocksService
  ) { }

  transform(block: number, format = 'B', numberSeparator = ','): string {
    return this.time2blocksService.format(block, format, numberSeparator);
  }
}
