import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss']
})
export class PlaceListComponent implements OnInit, OnDestroy {

  subscribe: Subscription;
  public plecesWeather: any;

  public date = Date.now() ;

  constructor(private service: WeatherService) { }

  ngOnInit() { this.loadData(); }

  ngOnDestroy() { this.subscribe.unsubscribe(); }

  loadData() { this.subscribe = this.service.weather$.subscribe(response => { this.plecesWeather = response; }); }

  removePlace(place: any) { this.plecesWeather.list = this.plecesWeather.list.filter(item =>  item.id !== place.id); }

}
