import { NgModule } from '@angular/core';
import { Time2BlocksPipe } from './time2blocks.pipe';
import { Time2BlocksServiceModule } from '../service/time2blocks-service.module';

@NgModule({
  declarations: [
    Time2BlocksPipe
  ],
  exports: [
    Time2BlocksPipe
  ],
  imports: [
    Time2BlocksServiceModule
  ]
})
export class Time2BlocksWidgetModule { }
