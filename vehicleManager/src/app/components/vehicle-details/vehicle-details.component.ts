import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {DataService} from '../../service/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {
  @Input() vehicle: any;
  vehicleForm: FormGroup;
  vehicleSuccess = false;
  vehicleFail = false;
  private array_date: string[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    this.createVehicleForm();
  }

  createVehicleForm() {
    console.log(this.vehicle, 'open modal');
    this.vehicleForm = this.formBuilder.group({
      id: [this.vehicle.id],
      model: [this.vehicle.model, [Validators.required]],
      // tslint:disable-next-line:max-line-length
      vehicleType: [this.vehicle.vehicleType, [Validators.required]],
      plateCountrey: [this.vehicle.plateCountrey, [Validators.required]],
      plateNumber: [this.vehicle.plateNumber, [Validators.required]],
      vin: [this.vehicle.vin, [Validators.required]],
      creationDate: [this.vehicle.creationDate],
      manifacturedCountry: [this.vehicle.manifacturedCountry, [Validators.required]]
    });
  }

  onSubmit() {
    if(this.vehicle.creationDate){
      this.array_date = this.vehicle.creationDate.toString().split('.');
      this.vehicleForm.value.creationDate = this.array_date[0];
    }

    if (this.vehicle.id) {
      this.editVehicle(this.vehicle.id, this.vehicleForm.value);
      return;
    }

    this.createVehicle(this.vehicleForm.value);
  }

  createVehicle(form) {
    this.dataService.createVehicle(form).subscribe(
      (response) => {
        window.open('/', '_self');
        console.log(response);

      }, (err) => {
        this.vehicleFail = true;
        console.log(err);
      });
  }

  editVehicle(vehicleID, form) {
    this.dataService.editVehicle(vehicleID, form).subscribe(
      (response) => {
        console.log(response);
        window.open('/', '_self');
      }, (err) => {
        console.log(err);
      });
  }

  vehicleModalClose() {
    window.open('/', '_self');
  }

}
