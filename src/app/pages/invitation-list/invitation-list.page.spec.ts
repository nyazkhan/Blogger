import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationListPage } from './invitation-list.page';

describe('InvitationListPage', () => {
  let component: InvitationListPage;
  let fixture: ComponentFixture<InvitationListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
