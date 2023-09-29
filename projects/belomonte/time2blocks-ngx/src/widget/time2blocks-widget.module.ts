import { NgModule } from '@angular/core';
import { Time2BlocksPipe } from './time2blocks.pipe';
import { Time2BlocksServiceModule } from '../service/time2blocks-service.module';
import { BlockFormatPipe } from './block-format.pipe';

@NgModule({
  declarations: [
    Time2BlocksPipe,
    BlockFormatPipe
  ],
  exports: [
    Time2BlocksPipe,
    BlockFormatPipe
  ],
  imports: [
    Time2BlocksServiceModule
  ]
})
export class Time2BlocksWidgetModule { }
