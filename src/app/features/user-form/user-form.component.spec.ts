import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form.component';
import { UserDataService } from '../../core/services/user-data.service';
import { signal } from '@angular/core';

describe('UserFormComponent', () =>
{
    let component: UserFormComponent;
    let fixture: ComponentFixture<UserFormComponent>;
    let mockUserDataService: jasmine.SpyObj<UserDataService>;

    beforeEach(async () =>
    {
        // Create a mock service
        mockUserDataService = jasmine.createSpyObj('UserDataService', [
            'addSubmission',
            'removeSubmission',
            'clearSubmissions'
        ], {
            submissions: signal([])
        });

        await TestBed.configureTestingModule({
            imports: [UserFormComponent, ReactiveFormsModule],
            providers: [
                { provide: UserDataService, useValue: mockUserDataService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('form invalid when empty', () =>
    {
        expect(component.userForm.valid).toBeFalsy();
    });

    it('should call addSubmission when form is valid', () =>
    {
        component.userForm.setValue({
            name: 'John Doe',
            email: 'john@example.com',
            message: 'This is a test message'
        });

        component.onSubmit();

        expect(mockUserDataService.addSubmission).toHaveBeenCalledWith({
            name: 'John Doe',
            email: 'john@example.com',
            message: 'This is a test message'
        });
    });

    it('should call removeSubmission', () =>
    {
        const testId = 'test-id';
        component.removeSubmission(testId);

        expect(mockUserDataService.removeSubmission).toHaveBeenCalledWith(testId);
    });

    it('should call clearSubmissions', () =>
    {
        component.clearSubmissions();

        expect(mockUserDataService.clearSubmissions).toHaveBeenCalled();
    });
});