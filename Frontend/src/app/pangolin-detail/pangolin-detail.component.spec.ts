import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PangolinDetailComponent } from './pangolin-detail.component';

describe('PangolinDetailComponent', () => {
  let component: PangolinDetailComponent;
  let fixture: ComponentFixture<PangolinDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PangolinDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PangolinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
