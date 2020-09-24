import { Injectable } from '@angular/core';
import { Person } from './Person';

@Injectable({ providedIn: 'root'})
export class PersonService { 

    constructor() { 
    }

    setLocalStorageData(persons: Person[]): void {
      localStorage.setItem('basicCrudData', JSON.stringify(persons));
    }

    getLocalStorageData(): Person[] {
      const retrievedObject = localStorage.getItem('basicCrudData');
      return JSON.parse(retrievedObject);
    }

    deleteLocalStorageData(): void {
      localStorage.removeItem('basicCrudData');
    }
    
}