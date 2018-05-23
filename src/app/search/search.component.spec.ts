import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
        MatSelectModule,
        MatIconModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatFormFieldModule, } from '@angular/material';
import { FormsModule, ReactiveFormsModule, FormControl, } from '@angular/forms';
import { WeatherService } from '../service/weather.service';
// import {BrowserModule} from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {} from 'jasmine';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSelectModule,
        MatIconModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,

      ],
      providers: [
        WeatherService
      ],
      declarations: [ SearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('input'));
    htmlElement = debugElement.nativeElement;
  });

  it('should display search bar input field to bee null', () => {
    expect(htmlElement.nodeValue).toEqual(null); });

  it('shoud have loadJson function',  () => {
      expect(component.loadJson).toBeTruthy(); });

  it('shoud have loadData function',  () => {
      expect(component.loadData).toBeTruthy(); });

  it('shoud have loadChip function',  () => {
          expect(component.loadChip).toBeTruthy(); });

  it('shoud have placesIdToString function',  () => {
      expect(component.placesIdToString).toBeTruthy(); });
});
