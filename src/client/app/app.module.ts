import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';  // <-- import HttpModule
import { HttpClientModule }    from '@angular/common/http';  // <-- import HttpModule

import { AppComponent } from './app.component';
import { RadioListComponent } from './radio-list/radio-list.component';

import { DataService }   from './data.service';
import { LoggerService } from './logger.service';

// in-mem-web-api and its test-data service
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { RadioAudioComponent } from './radio-audio/radio-audio.component';

@NgModule({
  declarations: [
    AppComponent,
    RadioListComponent,
    RadioAudioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    
        HttpModule,  // <--  add HttpModule here
        HttpClientModule,

        InMemoryWebApiModule.forRoot(InMemoryDataService) // <-- register in-mem-web-api and its data      
  ],
  providers: [   
    DataService,
    LoggerService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
