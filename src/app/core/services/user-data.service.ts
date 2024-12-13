import { Injectable, signal, computed } from '@angular/core';

export interface UserData
{
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserDataService
{
    // Private method to check if localStorage is available
    private isLocalStorageAvailable(): boolean
    {
        try
        {
            const test = 'test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e)
        {
            return false;
        }
    }

    // Private method to load submissions from local storage
    private loadSubmissionsFromStorage(): UserData[]
    {
        if (!this.isLocalStorageAvailable())
        {
            return [];
        }

        const savedSubmissions = localStorage.getItem('userSubmissions') ?? null;
        return savedSubmissions ? JSON.parse(savedSubmissions) : [];
    }

    // Private signal for storing user submissions
    private _submissions = signal<UserData[]>(this.loadSubmissionsFromStorage());

    // Public computed signal for accessing submissions
    readonly submissions = computed(() => this._submissions());

    // Add a new submission
    addSubmission(submission: Omit<UserData, 'id' | 'createdAt'>)
    {
        const newSubmission: UserData = {
            id: crypto.randomUUID(),
            ...submission,
            createdAt: new Date().toLocaleString()
        };

        // Update signal and limit to 5 most recent submissions
        const updatedSubmissions = [newSubmission, ...this._submissions()]
            .slice(0, 5);

        this._submissions.set(updatedSubmissions);
        this.saveSubmissionsToStorage(updatedSubmissions);
    }

    // Remove a submission by ID
    removeSubmission(id: string)
    {
        const currentSubmissions = this._submissions();
        const filteredSubmissions = currentSubmissions.filter(submission => submission.id !== id);

        this._submissions.set(filteredSubmissions);
        this.saveSubmissionsToStorage(filteredSubmissions);
    }

    // Clear all submissions
    clearSubmissions()
    {
        this._submissions.set([]);
        if (this.isLocalStorageAvailable())
        {
            localStorage.removeItem('userSubmissions');
        }
    }

    // Private method to save submissions to local storage
    private saveSubmissionsToStorage(submissions: UserData[])
    {
        if (!this.isLocalStorageAvailable())
        {
            return false;
        }

        try
        {
            localStorage.setItem('userSubmissions', JSON.stringify(submissions));
            return true;
        } catch (error)
        {
            console.error('Error saving submissions to local storage', error);
            return false;
        }
    }
}