import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/publishReplay';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WeatherService {

  readonly forecastPath = 'https://api.openweathermap.org/data/2.5/forecast?';

  readonly weatherPath = 'https://api.openweathermap.org/data/2.5/group?';

  readonly jsonList = 'assets/data/city.list.json';

  private weatherSource: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public weather$: Observable<any> = this.weatherSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  getWeather(id: string) {
    const params = new HttpParams().set('id', id).set('appid', 'a939b3a2c089cdc4dcefee3b74142319');
    return this.httpClient.get(this.weatherPath, { params: params } ).subscribe(response => {
    this.weatherSource.next(response);
    });
  }
  getForecast(id: string) {
    const params = new HttpParams().set('id', id).set('appid', 'a939b3a2c089cdc4dcefee3b74142319');
    return this.httpClient.get(this.forecastPath, { params: params } );
  }
  getPlacesJson() {
    return this.httpClient.get<any>( this.jsonList).publishReplay(1).refCount();
   }
}
