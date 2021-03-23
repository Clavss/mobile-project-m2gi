import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodoOptionPage } from './todo-option.page';

describe('TodoOptionPage', () => {
  let component: TodoOptionPage;
  let fixture: ComponentFixture<TodoOptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoOptionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoOptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
