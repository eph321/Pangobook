import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PangolinFormComponent } from './pangolin-form.component';

describe('PangolinFormComponent', () => {
  let component: PangolinFormComponent;
  let fixture: ComponentFixture<PangolinFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PangolinFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PangolinFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
