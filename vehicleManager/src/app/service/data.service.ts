import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const basePath = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({});
  }

  getVehicles() {
    return this.http.get(basePath + 'vehicle');

  }

  getVehicle(vehicleID) {
    return this.http.get(basePath + 'vehicle/' + vehicleID);
  }

  deleteVehicle(vehicleID) {
    console.log(vehicleID, 'vehicleID');
    return this.http.delete(basePath + 'vehicle/' + vehicleID);
  }

  createVehicle(data) {
    return this.http.post(basePath + 'vehicle', data);
  }

  editVehicle(vehicleID, data) {
    return this.http.put(basePath + 'vehicle/' + vehicleID, data);
  }
}
