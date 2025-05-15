import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VikingMainComponent } from './viking-main.component';

describe('VikingMainComponent', () => {
  let component: VikingMainComponent;
  let fixture: ComponentFixture<VikingMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VikingMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VikingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
