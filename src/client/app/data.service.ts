// Observable DataService
import { Injectable }    from '@angular/core';
import { Headers, Http, Response} from '@angular/http';  // <-- import Http & Headers
import { HttpClient} from '@angular/common/http';

import { Station }      from './model-data';
import { LoggerService } from './logger.service';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch'; // <-- add rxjs operator extensions used here
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/toPromise';

import 'rxjs/add/observable/throw'; // <-- add rxjs Observable extensions used here

@Injectable()
export class DataService {
  private stationsUrl = 'api/stations';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,  // <-- inject http
    private httpClient: HttpClient,
    private logger: LoggerService) { }

    playRadioStation(idStation){
      var stationUrl = 'http://www.lemon-radio.com/web-service-v2/?show=radio_streams_all&parent_id=${idStation}';
      window.open(stationUrl, "_blank");;
    }
    
    // getRadioStations() {
    //   return this.httpClient.get<Array<Station>>('api/stations').catch(error => this.handleError(error));
    // }

    /** Get existing customers as an Observable */
    getRadioStations(): Observable<Station[]> {
      this.logger.log('Getting customers as an Observable via Http ...');

      return this.http.get(this.stationsUrl)
        .map(response => response.json().data as Station[])  // <-- extract data
        .do(stat => this.logger.log(`Got ${stat.length} stations`))
        .catch(error => this.handleError(error));
    }    
  /** Common Http Observable error handler */
  private handleError(error: any): Observable<any> {
    this.logger.log(`An error occurred: ${error}`); // for demo purposes only
    // re-throw user-facing message
    return Observable.throw('Something bad happened; please check the console');
  }
}