import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymphonyViewComponent } from './symphony-view.component';

describe('SymphonyViewComponent', () => {
  let component: SymphonyViewComponent;
  let fixture: ComponentFixture<SymphonyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymphonyViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymphonyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
