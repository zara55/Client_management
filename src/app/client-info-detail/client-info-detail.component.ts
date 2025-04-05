import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { clientInfoService } from '../project-info.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from '../project.interface';
import { ProjectInfoService } from '../project-info.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-info-detail',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule,MatDatepickerModule, MatInputModule, FormsModule, MatFormFieldModule, MatIconModule, MatIcon], // Add imports here
  templateUrl: './client-info-detail.component.html',
  styleUrl: './client-info-detail.component.css'
})
export class ClientInfoDetailComponent {
 clientInfo: FormGroup | any;
 clientId: any;
  dataToSubmit: any;
  project: any;
  showData: any;
 ngOnInit(){
  this.clientInfo = new FormGroup({
    firstName : new FormControl('',[Validators.required]),
    lastName : new FormControl('',[Validators.required]),
    companyName : new FormControl('',[Validators.required]),
    address : new FormControl('',[Validators.required]),
    meetingTopic : new FormControl('',[Validators.required]),
    // noofPeoples : new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),  // Email validation
    mobile: new FormControl('', [
        Validators.required, 
        Validators.pattern('^[0-9]{10}$')  // Mobile number validation for 10 digits
      ]),
    scheduleMeeting : new FormControl('',[Validators.required])

  })
  const state = history.state as { showData: any };

  if (state && state.showData !== undefined) {
    this.showData = state.showData;
  }
  this.route.paramMap.subscribe((params) => {
   
    this.clientId = params.get('id');
    if (this.clientId) {
      this.service.getClientById(this.clientId).subscribe((data:any) => {
        this.project = data;
        if (this.project!='') {
          // Patch the form control's value with the fetched emailId
          this.clientInfo.patchValue({ firstName: this.project.firstName });
          this.clientInfo.patchValue({ lastName: this.project.lastName });
          this.clientInfo.patchValue({ companyName: this.project.companyName });
          this.clientInfo.patchValue({ address: this.project.address });
          this.clientInfo.patchValue({ meetingTopic: this.project.meetingTopic });
          // this.clientInfo.patchValue({ noofPeoples: this.project.noofPeoples });
          this.clientInfo.patchValue({ mobile: this.project.mobile });
          this.clientInfo.patchValue({ email: this.project.email });
          this.clientInfo.patchValue({ scheduleMeeting: this.project.scheduleMeeting });
        }
        console.log(this.project,'p')
      });
    }
  });

}
  constructor(private router:Router,private route:ActivatedRoute,public service:ProjectInfoService,private snackBar:MatSnackBar ){}
  goBack(){
this.router.navigate(['/manageInfo']);
  }
  submitForm() {
    console.log(this.clientInfo, 'client');
  
    if (this.clientInfo.valid) {
      // Prepare the data to submit
      this.dataToSubmit = {
        ...this.clientInfo.value,
        id: this.clientId ? parseInt(this.clientId, 10) : undefined, // Use the clientId if it exists, otherwise leave it undefined
      };
  
      // Check if we are dealing with an existing client or a new one
      if (this.clientId) {
        // Existing client - update the client
        this.service.updateClientInfo(this.dataToSubmit).subscribe(
          (success) => {
            if (success) {
              this.snackBar.open('Details Updated successfully!', 'Close', {
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
              });
              this.router.navigate(['/manageInfo']);
            }
            console.log(success, 'su');
          },
          (error) => {
            console.log(error, 'err');
          }
        );
      } else {
        // New client - add it
        this.service.getClientInfo().subscribe(
          (clients: Client[]) => {
            // Generate new ID if no existing client ID
            const maxId = clients.reduce((max, client) => Math.max(max, client.id || 0), 0);
            const newId = maxId + 1;
  
            // Set the generated ID for the new client
            this.dataToSubmit.id = newId;
  
            // Submit the new client
            this.service.postClientInfo(this.dataToSubmit).subscribe(
              (success) => {
                if (success) {
                  this.snackBar.open('Details Saved successfully!', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'end',
                    verticalPosition: 'top',
                  });
                  this.router.navigate(['/manageInfo']);
                }
                console.log(success, 'su');
              },
              (error) => {
                console.log(error, 'err');
              }
            );
          },
          (error) => {
            console.error('Error fetching clients:', error);
          }
        );
      }
    } else {
      this.snackBar.open('Please Enter All Fields', 'Close', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });    }
  }
  
  resetForm(){
    this.clientInfo.reset();
  }
  getErrorMessage(controlName: string): string {
    const control = this.clientInfo.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName} is required.`;
    } else if (control?.hasError('email')) {
      return `Please enter a valid email address.`;
    } else if (control?.hasError('pattern')) {
      return `Invalid format.`;
    }
    return '';
  }
}
