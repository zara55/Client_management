import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementInfoComponent } from './management-info.component';

describe('ManagementInfoComponent', () => {
  let component: ManagementInfoComponent;
  let fixture: ComponentFixture<ManagementInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagementInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
