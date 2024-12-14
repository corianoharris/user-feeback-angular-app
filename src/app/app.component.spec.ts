import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});

describe('should render title', () => {

   let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
     // Reset any spies or mocks
     jasmine.createSpy('time').and.callThrough();
  });

  it('should return "Good morning" between 05:00 and 11:59', () => {
    // Mock times in the morning
    const morningTimes = ['05:00:00', '06:30:45', '11:59:59'];
    
    morningTimes.forEach(time => {
      app.time = time;
      expect(app.getGreeting()).toBe('Good morning');
    });
  });

  it('should return "Good afternoon" between 12:00 and 17:59', () => {
    // Mock times in the afternoon
    const afternoonTimes = ['12:00:00', '14:30:45', '17:59:59'];
    
    afternoonTimes.forEach(time => {
      app.time = time;
      expect(app.getGreeting()).toBe('Good afternoon');
    });
  });

  it('should return "Good evening" between 18:00 and 04:59', () => {
    // Mock times in the evening
    const eveningTimes = ['18:00:00', '22:30:45', '23:59:59', '00:00:00', '04:59:59'];
    
    eveningTimes.forEach(time => {
      app.time = time;
      expect(app.getGreeting()).toBe('Good evening');
    });
  });
});
