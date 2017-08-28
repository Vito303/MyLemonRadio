// Observable DataService
import { Injectable }    from '@angular/core';
import { Headers, Http, Response} from '@angular/http';  // <-- import Http & Headers
import { HttpClient} from '@angular/common/http';

import { Station, Stream } from './model-data';
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
  private streamsUrl = 'api/streams';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http,  // <-- inject http
    private httpClient: HttpClient,
    private logger: LoggerService) { }

  getRadioStationStreams(stationId){
    return this.httpClient.get<Array<Stream>>(`${this.streamsUrl}/${stationId}`).catch(error => this.handleError(error));
  }

  // /** Get existing stream as an Observable */
  // getRadioStationStreams(stationId): Observable<Stream[]> {
  //   this.logger.log('Getting stream as an Observable via Http ...');
  //   return this.http.get(this.streamsUrl)
  //     .map(response => response.json().data as Stream[])  // <-- extract data
  //     .do(str => this.logger.log(`Got ${str.length} stream`))
  //     .catch(error => this.handleError(error));
  // }
  
  // getRadioStations() {
  //   return this.httpClient.get<Array<Station>>(this.stationsUrl).catch(error => this.handleError(error));
  // }

  /** Get existing stations as an Observable */
  getRadioStations(): Observable<Station[]> {
    this.logger.log('Getting stations as an Observable via Http ...');

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