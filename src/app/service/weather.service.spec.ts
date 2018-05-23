import { TestBed, inject } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.get(WeatherService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); });

  it('shoud have getPlacesJson function',  () => {
    expect(service.getPlacesJson).toBeTruthy(); });

  it('shoud have getWeather function',  () => {
    expect(service.getWeather).toBeTruthy(); });

  it('shoud have getForecast function',  () => {
      expect(service.getForecast).toBeTruthy(); });

  it('shoud retrive json list', () => {
    const dummyJson: any[] = [
      {id: 1, name: 'zrenjanin', country: 'rs', coord: [{ lon: 30, lat: 34}]},
      {id: 1, name: 'novi sad', country: 'rs', coord: [{ lon: 40, lat: 40}] }
    ];

    service.getPlacesJson().subscribe(response => {
          expect(response.length).toBe(2);
          expect(response).toEqual(dummyJson);
        });
        const request = httpMock.expectOne(`${service.jsonList}`);
        expect(request.request.method).toBe('GET');
      });
});
