import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoDetailComponent } from './client-info-detail.component';

describe('ProjectInfoDetailComponent', () => {
  let component: ProjectInfoDetailComponent;
  let fixture: ComponentFixture<ProjectInfoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectInfoDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectInfoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
