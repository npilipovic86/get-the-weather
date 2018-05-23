import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceWeatherComponent } from './place-weather.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PlaceWeatherComponent', () => {
  let component: PlaceWeatherComponent;
  let fixture: ComponentFixture<PlaceWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
