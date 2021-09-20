import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HereMapNewComponent } from './here-map-new.component';

describe('HereMapNewComponent', () => {
  let component: HereMapNewComponent;
  let fixture: ComponentFixture<HereMapNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HereMapNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HereMapNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
