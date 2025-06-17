import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostContentDetailsComponent } from './post-content-details.component';

describe('PostContentDetailsComponent', () => {
  let component: PostContentDetailsComponent;
  let fixture: ComponentFixture<PostContentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostContentDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostContentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
