import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { User } from '../user';
import { map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userUrl = 'https://backendrecipe-production.up.railway.app';  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }


updateUser(userId: number, updatedUser: { name: string, email: string }): Observable<User> {
  console.log(userId);
  const updateUrl = `${this.userUrl}/update/${userId}`;
  return this.http.put<User>(updateUrl, updatedUser, this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated user with id=${userId}`)),
      catchError(this.handleError<User>('updateUser'))
    );
}


deleteUser(userId: number): Observable<User> {
  const deleteUrl = `${this.userUrl}/delete/${userId}`;

  return this.http.delete<User>(deleteUrl, this.httpOptions)
    .pipe(
      tap(_ => this.log(`deleted user with id=${userId}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getUsersByRole(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
      .pipe(
        map(users => users.filter(user => user.role === 'User')),
        tap(_ => this.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}
