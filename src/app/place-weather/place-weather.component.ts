import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WeatherService } from '../service/weather.service';
import { Place } from '../../model/place';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-place-weather',
  templateUrl: './place-weather.component.html',
  styleUrls: ['./place-weather.component.scss']
})
export class PlaceWeatherComponent implements OnInit, OnDestroy {


  public subscribe: Subscription;
  public plecesWeather: any;
  public forecastByDay: any = [];
  public forecast: any;
  public lat: number;
  public lng: number;


  public windDirection = [ 'North', 'North-northeast', 'Northeast',
  'East-northeast', 'East', 'East-southeast', 'Southeast',
  'South-southeast', 'South', 'South-southwest', 'Southwest',
  'West-southwest', 'West', 'West-northwest', 'Northwest', 'North-northwest'];


  constructor(private service: WeatherService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getForecast();
    this.loadData();
  }
  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
  getForecast() {
    const placeId: string = this.route.snapshot.params['id'];
    this.subscribe = this.service.getForecast(placeId).subscribe(response => {
      this.forecast = response;
      this.forecastByDay = this.forecast.list.filter(element => element.dt_txt.includes('12:00:00'));
      this.lat = this.forecast.city.coord.lat;
      this.lng = this.forecast.city.coord.lon;
  });
  }

 loadData() {
  const placeId: number = +this.route.snapshot.params['id'];
  const places = JSON.parse(localStorage.getItem('plecesWeather')) || [];
  const match = places.list.filter(element => element.id === placeId);
  this.plecesWeather = match[0];
  }
  degreeToDirection(num) {
    const val = Math.floor((num / 22.5) + .5);
    return this.windDirection[(val % 16)];
  }
  describeHumidity(humidity) {
    if (humidity >= 0 && humidity <= 40) {
      return 'Very dry';
    } else if (humidity >= 40 && humidity <= 70) {
      return 'Dry';
    } else if (humidity >= 85 && humidity <= 95) {
      return 'Humid';
    }
    return 'Very humid';
  }
  describeTemperature(temp) {
    const celsius = temp - 273.15;
    if (celsius >= 0 && celsius < 7) {
      return 'Very cold';
    } else if (celsius >= 8 && celsius < 13) {
      return 'Cold';
    } else if (celsius >= 13 && celsius < 18) {
      return 'Cool';
    } else if (celsius >= 18 && celsius < 23) {
      return 'Mild';
    } else if (celsius >= 23 && celsius < 28) {
      return 'Warm';
    } else if (celsius >= 28 && celsius < 32) {
      return 'Hot';
    }
    return 'Very hot';
  }

  describeWindSpeed(speed) {
    if (speed < 0.3) {
      return 'Calm';
    } else if (speed >= 0.3 && speed < 1.6) {
      return 'Light air';
    } else if (speed >= 1.6 && speed < 3.4) {
      return 'Light breeze';
    } else if (speed >= 3.4 && speed < 5.5) {
      return 'Gentle breeze';
    } else if (speed >= 5.5 && speed < 8) {
      return 'Moderate breeze';
    } else if (speed >= 8 && speed < 10.8) {
      return 'Fresh breeze';
    } else if (speed >= 10.8 && speed < 13.9) {
      return 'Strong breeze';
    } else if (speed >= 13.9 && speed < 17.2) {
      return 'Moderate gale';
    } else if (speed >= 17.2 && speed < 20.8) {
      return 'Gale';
    } else if (speed >= 20.8 && speed < 24.5) {
      return 'Strong gale';
    } else if (speed >= 24.5 && speed < 28.5) {
      return 'Storm';
    } else if (speed >= 28.5 && speed < 32.7) {
      return 'Violent storm';
    } else if (speed >= 32.7 && speed < 42) {
      return 'Hurricane force';
    }
    return 'Super typhoon';
  }
  unixTimestamp(t) {
    const dt = new Date(t * 1000);
    const h = dt.getHours();
    const m = '0' + dt.getMinutes();
    return  h + ':' + m.substr(-2) ;
  }
}
