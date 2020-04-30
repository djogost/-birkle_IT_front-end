import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

fdescribe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  const basePath = 'http://localhost:8080/api/';

  const dummyArray: any = [{
    id: 1,
    model: 'BMW 4',
    vehicleType: 'Sports Car',
    plateCountrey: 'D',
    plateNumber: 'RA KL 1234',
    vin: 'YV1SW61R021197119',
    creationDate: '2020-04-30',
    manifacturedCountry: 'Germany',

  },
    {
      id: 1,
      model: 'BMW 4',
      vehicleType: 'Sports Car',
      plateCountrey: 'D',
      plateNumber: 'RA KL 1234',
      vin: 'YV1SW61R021197119',
      creationDate: '2020-04-30',
      manifacturedCountry: 'Germany',

    }];

  const dummy: any = {
    id: 1,
    model: 'BMW 4',
    vehicleType: 'Sports Car',
    plateCountrey: 'D',
    plateNumber: 'RA KL 1234',
    vin: 'YV1SW61R021197119',
    creationDate: '2020-04-30',
    manifacturedCountry: 'Germany',

  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
    });
    service = TestBed.inject(DataService);
  });

  service = TestBed.get(DataService);
  httpMock = TestBed.get(HttpTestingController);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get vehicles from backend', () => {

    const req = httpMock.expectOne(`${basePath}/vehicle`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyArray);
  });

  it('should get vehicle from backend', () => {

    const req = httpMock.expectOne(`${basePath}/vehicle/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummy);
  });

});
