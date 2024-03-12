import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Time2BlocksWidgetModule } from '@belomonte/time2blocks-ngx';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Time2BlocksWidgetModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
