import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySymphoniesComponent } from './my-symphonies.component';

describe('MySymphoniesComponent', () => {
  let component: MySymphoniesComponent;
  let fixture: ComponentFixture<MySymphoniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySymphoniesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySymphoniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
