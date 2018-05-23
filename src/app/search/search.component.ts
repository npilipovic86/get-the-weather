import { Component, OnInit, OnDestroy, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { delay } from 'rxjs/operators';

import { WeatherService } from '../service/weather.service';
import { MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { Place } from '../../model/place';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Output() private emitterRemovedPlace: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('input') input: ElementRef;

  public plecesWeather: any;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes = [ENTER];

  public filteredItems: Observable<any[]>;
  public placeCtrl: FormControl;

  public weatherSubscription: Subscription;
  public jsonSubscription: Subscription;
  public placeJson: any = [];
  public placeToAdd: Place[];


  constructor(private service: WeatherService) { }

  ngOnInit() {
    this.loadJson();
    this.autocomplete();
    this.loadData();
    this.loadChip();
  }
  ngOnDestroy() {
    this.jsonSubscription.unsubscribe();
    this.weatherSubscription.unsubscribe();
  }
  autocomplete() {
    this.placeCtrl = new FormControl();
    this.filteredItems = this.placeCtrl.valueChanges
      .pipe(startWith(''), delay(1000), map(item => this.autocompleteFilter(item)));
  }
  autocompleteFilter(name: string) {
      if (name.length >= 3) {
        return this.placeJson.filter(item =>
          item.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
        } else { return []; }
  }
  loadJson() {
    this.jsonSubscription = this.service.getPlacesJson().subscribe(response => {
      this.placeJson = response; });
  }
  loadData() {
    this.service.getWeather(this.placesIdToString());
    this.weatherSubscription = this.service.weather$.subscribe(response => { this.plecesWeather = response;
      localStorage.setItem('plecesWeather', JSON.stringify(response));
    });
  }
  loadChip() { this.placeToAdd = JSON.parse(localStorage.getItem('placesList')) || []; }

  saveToLocaleStorage(item) {
    const placesList  = JSON.parse(localStorage.getItem('placesList')) || [];
    placesList.push(item);
    localStorage.setItem('placesList', JSON.stringify(placesList));
  }
  deleteFromLocalStorage(item) {
    let placesList = JSON.parse(localStorage.getItem('placesList'));
    placesList = placesList.filter(element =>  element.id !== item.id );
    localStorage.setItem('placesList', JSON.stringify(placesList));
  }

  placesIdToString() {
    const placesList: Place[] = JSON.parse(localStorage.getItem('placesList'))  || [];
    if (placesList.length > 0) {
      const idList: number[] = placesList.map(item => item.id);
    return idList.join(',');
    } else { return '0'; }
  }
  addSelected(event: MatAutocompleteSelectedEvent) {
    const option = event.option;
    const value = option.value;
    const index: number = this.placeToAdd.map(element => element.id).indexOf(value.id);
    if (index === -1) {
    this.placeToAdd.push(value);
    this.saveToLocaleStorage(value);
    } else {alert('Already in the list'); }
    this.loadData();
    this.input.nativeElement.value = '';
  }

  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
      if ((value || '').trim()) {
        const arr = value.split(',');
        for (const item of arr) {
          if (item === '') {  continue;  }
          const match: Place[] = this.placeJson.filter(element => element.name.toLowerCase() === item.toLowerCase());
          for (const place of match) {
            const index: number = this.placeToAdd.map(function(element) { return element.id; }).indexOf(place.id);
            if (index === -1 ) {
            this.placeToAdd.push(place);
            this.saveToLocaleStorage(place);
            } else {alert('Already in the list'); }
            if (place) { this.loadData(); }
          }
        }
      }
      if (input) {
          input.value = '';
        }
  }

  remove(place: any) {
    this.placeToAdd = this.placeToAdd.filter(element => element.id !== place.id );
    this.emitterRemovedPlace.emit(place);
    this.deleteFromLocalStorage(place);
      }
  }
