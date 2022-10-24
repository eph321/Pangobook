import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPangolinComponent } from './edit-pangolin.component';

describe('EditPangolinComponent', () => {
  let component: EditPangolinComponent;
  let fixture: ComponentFixture<EditPangolinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPangolinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPangolinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
