import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetsClearComponent } from './tweets-clear.component';

describe('TweetsClearComponent', () => {
  let component: TweetsClearComponent;
  let fixture: ComponentFixture<TweetsClearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TweetsClearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TweetsClearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
