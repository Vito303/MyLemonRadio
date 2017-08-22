import { Component, OnInit } from '@angular/core';

import { Station } from '../model-data';
import { Customer } from '../model';

import { DataService }   from '../data.service';
import { LoggerService } from '../logger.service';

@Component({
  moduleId: module.id,
  selector: 'radio-list',
  templateUrl: './radio-list.component.html',
  styleUrls: ['./radio-list.component.css']
})
export class RadioListComponent implements OnInit {
  customer: Customer;
  customers: Customer[];
  station: Station;
  stations: Station[];
  isBusy = false;

  constructor(
    private dataService: DataService,
    private logger: LoggerService) { }

  ngOnInit() { 
    this.getCustomers(); 
    this.getStations(); 
  }

  getCustomers() {
    this.customer = undefined;  // <-- clear before refresh
    this.customers = undefined;

    this.isBusy = true;
    this.logger.log('Getting customers ...');

    // this.dataService.getCustomersP().then(  // Promise version
    this.dataService.getCustomers().subscribe( // Observable version
        custs => {
          this.isBusy = false;
          this.customers = custs;
        },
        (errorMsg: string) => {
          this.isBusy = false;
          alert(errorMsg); // Don't use alert!
        }
      );
  }

  getStations() {
    this.station = undefined;  // <-- clear before refresh
    this.stations = undefined;

    this.isBusy = true;
    this.logger.log('Getting stations ...');

    // this.dataService.getCustomersP().then(  // Promise version
    this.dataService.getRadioStations().subscribe( // Observable version
        sta => {
          this.isBusy = false;
          this.stations = sta;
        },
        (errorMsg: string) => {
          this.isBusy = false;
          alert(errorMsg); // Don't use alert!
        }
      );
  }

  save(customer: Customer) {
    if (!customer) { return; }
    this.isBusy = true;
    this.logger.log(`Saving ${customer.name} ...`);
    this.dataService.update(customer).subscribe(
      () => this.isBusy = false,
      () => {
        this.isBusy = false;
        alert('Save failed; please check the console'); // Don't use alert!
      }
    );
  }

  shift(increment: number) {
    let ix = increment + this.customers.findIndex(c => c === this.customer);
    ix = Math.min(this.customers.length - 1, Math.max(0, ix));
    this.customer = this.customers[ix];
  }
}