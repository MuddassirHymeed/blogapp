import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgBannerComponent } from './bg-banner.component';

describe('BgBannerComponent', () => {
  let component: BgBannerComponent;
  let fixture: ComponentFixture<BgBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BgBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BgBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
