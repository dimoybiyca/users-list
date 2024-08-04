import { inject, Injectable } from '@angular/core';
import { PersistenceService } from 'app/shared/services/persistence-service/persistence.service';
import { TUser } from 'app/shared/types/user.type';
import { environment } from 'environments/environment';
import { nanoid } from 'nanoid';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  persistenceService: PersistenceService = inject(PersistenceService);

  private $usersSubject: BehaviorSubject<TUser[]>;
  private users: TUser[];

  constructor() {
    const savedContacts = this.persistenceService.get('users');

    if (savedContacts) {
      this.users = savedContacts;
    } else {
      this.users = this.generateMockData();
      this.setUsersToLocalStorage();
    }
    this.$usersSubject = new BehaviorSubject(this.users);
  }

  loadUsers(): Observable<TUser[]> {
    return this.$usersSubject.asObservable();
  }

  getUserById(id: string): TUser | null {
    return this.users.find((user) => user.id === id) ?? null;
  }

  updateUser(user: TUser): void {
    this.users = this.users.map((c) => (c.id === user.id ? user : c));
    this.setUsersToLocalStorage();
    this.$usersSubject.next(this.users);
  }

  addUser(user: TUser): void {
    const id: string = nanoid();

    this.users.push({ ...user, id });
    this.$usersSubject.next(this.users);
    this.setUsersToLocalStorage();
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
    this.$usersSubject.next(this.users);
    this.setUsersToLocalStorage();
  }

  private setUsersToLocalStorage(): void {
    this.persistenceService.set('users', this.users);
  }

  private generateMockData(): TUser[] {
    const users: TUser[] = [];

    for (let i = 0; i < environment.amountOfMockUsers; i++) {
      users.push({
        id: i.toString(),
        firstName: `User`,
        lastName: `Lastname`,
        email: `test${i}@gmail.com`,
        phone: `+380634444413`,
        city: `Kyiv`,
        street: `Street`,
        appartment: `${i}`,
      });
    }
    return users;
  }
}
