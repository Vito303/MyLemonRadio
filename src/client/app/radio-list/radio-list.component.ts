import { Component, Input, OnInit } from '@angular/core';

import { Station, Stream } from '../model-data';

import { DataService }   from '../data.service';
import { LoggerService } from '../logger.service';

@Component({
  moduleId: module.id,
  selector: 'radio-list',
  templateUrl: './radio-list.component.html',
  styleUrls: ['./radio-list.component.css']
})

export class RadioListComponent implements OnInit {
  station: Station;  
  stations: any = [];
  stream: Stream;
  streams: any = [];  
  isBusy = false;

  currentSectionIx = 0;

  constructor(
    private dataService: DataService,
    private logger: LoggerService) { }

  ngOnInit() { 
    this.getStations();
   }

  onSectionChange(index: number) {
    this.currentSectionIx = index;
    this.station = this.stations[index];
    this.logger.log(this.station.name);
  }

  playStation(station) {
    this.getStreams(station.id);
  }

  getStreams(id) {
    this.stream = undefined;  // <-- clear before refresh
    this.streams = undefined;

    this.isBusy = true;
    return this.dataService.getRadioStationStreams(id).subscribe(streams => {
      this.isBusy = false;
      this.streams = streams;
      this.stream = Object.assign({}, streams[0])
    });
  }
  
  getStations() {
    this.station = undefined;  // <-- clear before refresh
    this.stations = undefined;

    this.isBusy = true;
    return this.dataService.getRadioStations().subscribe(stations => {
      this.isBusy = false;
      this.stations = stations;
      this.station = Object.assign({}, stations[0])
    });
  }

  // shift(increment: number) {
  //   let ix = increment + this.customers.findIndex(c => c === this.customer);
  //   ix = Math.min(this.customers.length - 1, Math.max(0, ix));
  //   this.customer = this.customers[ix];
  // }
}