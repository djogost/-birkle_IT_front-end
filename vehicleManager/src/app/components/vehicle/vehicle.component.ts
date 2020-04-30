import {Component, OnInit} from '@angular/core';
import {DataService} from '../../service/data.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  vehicles: any = [this.resetVehicles()];

  vehicleModalOpen = false;
  vehiclesDetails: any = this.resetVehicles();

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.getVehicleParam();
    this.initVehicles();
  }

  resetVehicles() {
    return {
      id: null,
      model: null,
      vehicleType: null,
      plateCountrey: null,
      plateNumber: null,
      vin: null,
      creationDate: null,
      manifacturedCountry: null,
    };
  }

  getVehicleParam() {
    this.route.params
      .subscribe((params) => {
        if (params.id) {
          this.getVehicle(params.id);
          this.vehicleModalOpen = true;
        }

      });
  }

  initVehicles() {
    this.dataService.getVehicles()
      .subscribe(
        (response) => {
          this.vehicles = response;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getVehicle(vehicleID) {
    this.dataService.getVehicle(vehicleID).subscribe(
      (response) => {
        this.vehiclesDetails = response;
      }, (err) => {
        console.error(err);
      });
  }

  deleteVehicle(vehicleID) {
    this.dataService.deleteVehicle(vehicleID).subscribe(
      (response) => {
        this.initVehicles();
      }, (err) => {
        console.error(err);
      });
  }

  modalOpen() {
    this.vehicleModalOpen = true;
    this.vehiclesDetails = this.resetVehicles();
  }
}
