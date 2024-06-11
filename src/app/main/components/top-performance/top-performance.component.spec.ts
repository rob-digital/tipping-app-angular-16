import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPerformanceComponent } from './top-performance.component';

describe('TopPerformanceComponent', () => {
  let component: TopPerformanceComponent;
  let fixture: ComponentFixture<TopPerformanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopPerformanceComponent]
    });
    fixture = TestBed.createComponent(TopPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
