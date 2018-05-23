import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { PlaceWeatherComponent } from './place-weather/place-weather.component';
import { WeatherService } from './service/weather.service';
import { Routing } from './app.routing';
import {
  MatSelectModule,
  MatIconModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  // MatTooltipModule
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PlaceListComponent,
    PlaceWeatherComponent,

  ],
  imports: [
  BrowserModule,
  Routing,
  FormsModule,
  ReactiveFormsModule,
  MatSelectModule,
  MatIconModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  HttpClientModule,
  AgmCoreModule.forRoot({
    apiKey: 'AIzaSyBfzXYPCQal1et36eTq339ktKeHGeuH7Cw'
  })

  ],
  providers: [
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
