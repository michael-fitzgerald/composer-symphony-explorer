import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymphonyViewNodeComponent } from './symphony-view-node.component';

describe('SymphonyViewNodeComponent', () => {
  let component: SymphonyViewNodeComponent;
  let fixture: ComponentFixture<SymphonyViewNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymphonyViewNodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymphonyViewNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
