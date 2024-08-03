import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { initialMainState } from 'app/main/store/main.state';
import { UserService } from 'app/shared/services/user-service/user.service';
import { TUser } from 'app/shared/types/user.type';
import { pipe, switchMap, tap } from 'rxjs';

export const MainStore = signalStore(
  withState(initialMainState),

  withMethods((store, userService = inject(UserService)) => ({
    loadUsers: rxMethod<void>(
      pipe(
        switchMap(() => {
          patchState(store, { isLoading: true });
          return userService.loadUsers().pipe(
            tap((users: TUser[]) => {
              patchState(store, { users: [...users], isLoading: false });
            })
          );
        })
      )
    ),
  })),

  withMethods((store, userService = inject(UserService)) => ({
    createUser(user: TUser): void {
      userService.addUser(user);
      store.loadUsers();
    },

    updateUser(user: TUser): void {
      userService.updateUser(user);
      store.loadUsers();
    },

    deleteUser(id: string): void {
      userService.deleteUser(id);
      store.loadUsers();
    },

    setSearchQuery(searchQuery: string): void {
      patchState(store, { searchQuery });
    },
  })),

  withComputed((store) => ({
    filteredUsers: computed(() => {
      const searchQuery = store.searchQuery().toLowerCase();
      return store
        .users()
        .filter(
          (user) =>
            user.firstName.toLowerCase().includes(searchQuery) ||
            user.lastName.toLowerCase().includes(searchQuery)
        );
    }),
  })),
  withHooks({
    onInit: (store) => {
      store.loadUsers();
    },
  })
);
