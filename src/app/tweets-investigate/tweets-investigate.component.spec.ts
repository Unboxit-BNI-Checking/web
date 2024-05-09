import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetsInvestigateComponent } from './tweets-investigate.component';

describe('TweetsInvestigateComponent', () => {
  let component: TweetsInvestigateComponent;
  let fixture: ComponentFixture<TweetsInvestigateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TweetsInvestigateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TweetsInvestigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
