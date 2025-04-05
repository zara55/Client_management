import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectInfoService } from '../project-info.service';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, DatePipe } from '@angular/common';
import { Project } from '../project.interface';

@Component({
  selector: 'app-project-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatDatepickerModule, MatInputModule, FormsModule, MatFormFieldModule, MatIconModule, MatIcon], // Add imports here
  templateUrl: './project-info.component.html',
  styleUrl: './project-info.component.css',
  providers: [DatePipe],
})
export class ProjectInfoComponent {
  ProjectInfo: FormGroup | any;
  projectId: any;
  project: any;
  dataToSubmit: any;
  showData: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, public service: ProjectInfoService, private snackBar: MatSnackBar, private datePipe: DatePipe) { }
  ngOnInit() {
    this.ProjectInfo = new FormGroup({
      projectName: new FormControl('', [Validators.required]),
      projectDesc: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
      clientName: new FormControl('', [Validators.required]),
      projectStatus: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),  // Email validation
      mobileNo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')  // Mobile number validation for 10 digits
      ]),
    })
    const state = history.state as { showData: any };

    if (state && state.showData !== undefined) {
      this.showData = state.showData;
    }
    this.route.paramMap.subscribe((params) => {

      this.projectId = params.get('id');
      if (this.projectId) {
        this.service.getProjectById(this.projectId).subscribe((data: any) => {
          this.project = data;
          if (this.project != '') {
            // Patch the form control's value with the fetched emailId
            this.ProjectInfo.patchValue({ projectName: this.project.projectName });
            this.ProjectInfo.patchValue({ clientName: this.project.clientName });
            this.ProjectInfo.patchValue({ projectDesc: this.project.projectDesc });
            this.ProjectInfo.patchValue({ projectStatus: this.project.projectStatus });
            this.ProjectInfo.patchValue({ startDate: this.project.startDate });
            this.ProjectInfo.patchValue({ endDate: this.project.endDate });
            this.ProjectInfo.patchValue({ mobileNo: this.project.mobileNo });
            this.ProjectInfo.patchValue({ emailId: this.project.emailId });

          }
          console.log(this.project, 'p')
        });
      }
    });
  }

  goBack() {
    this.router.navigate(['/manageInfo'])
  }
  onDateChange(event: any) {
    this.setDateInProjectInfo(event.value); // Call when date is selected
  }
  setDateInProjectInfo(date: Date) {
    this.ProjectInfo.patchValue({
      startDate: this.datePipe.transform(date, 'yyyy-MM-dd'),
    });
  }
  onDateChange1(event: any) {
    this.setDateInProjectInfo1(event.value); // Call when date is selected
  }
  setDateInProjectInfo1(date: Date) {
    this.ProjectInfo.patchValue({
      endDate: this.datePipe.transform(date, 'yyyy-MM-dd'),
    });
  }

  submitForm() {
    if (this.ProjectInfo.valid) {
      this.dataToSubmit = {
        ...this.ProjectInfo.value,
        id: this.projectId ? parseInt(this.projectId, 10) : undefined, // Use the projectId if it exists, otherwise leave it undefined
      };

      // Check if we are dealing with an existing project or a new one
      if (this.projectId) {
        // Existing project - update the project
        this.service.updateProjectInfo(this.dataToSubmit).subscribe(
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
        // New project - add it
        this.service.getProjectInfo().subscribe(
          (projects: Project[]) => {
            // Generate new ID if no existing project ID
            const maxId = projects.reduce((max, project) => Math.max(max, project.id || 0), 0);
            const newId = maxId + 1;

            // Set the generated ID for the new project
            this.dataToSubmit.id = newId;

            // Submit the new project
            this.service.postProjectInfo(this.dataToSubmit).subscribe(
              (success) => {
                if (success) {
                  this.snackBar.open('Details Saved successfully!', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'end',
                    verticalPosition: 'top',
                  });
                  this.router.navigate(['/manageInfo']);
                }
              },
              (error) => {
                console.log(error, 'err');
              }
            );
          },
          (error) => {
            console.error('Error fetching projects:', error);
          }
        );
      }
    } else {
      console.log('Form is not valid');
    }
  }
  getErrorMessage(controlName: string): string {
    const control = this.ProjectInfo.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName} is required.`;
    } else if (control?.hasError('email')) {
      return `Please enter a valid email address.`;
    } else if (control?.hasError('pattern')) {
      return `Invalid format.`;
    }
    return '';
  }
  resetForm() {
    this.ProjectInfo.reset();
  }
}
