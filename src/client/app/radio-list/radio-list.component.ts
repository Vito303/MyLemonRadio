import { Component, Input, OnInit } from '@angular/core';

import { Station } from '../model-data';

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
  isBusy = false;

  constructor(
    private dataService: DataService,
    private logger: LoggerService) { }

  ngOnInit() { 
    this.getStations();
  }

  playStation() {
    return this.dataService.playRadioStation(this.station);
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