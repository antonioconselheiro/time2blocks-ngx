import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Time2BlocksWidgetModule } from '@belomonte/time2blocks-ngx';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Time2BlocksWidgetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
