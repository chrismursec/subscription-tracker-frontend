import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { first, last } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
	constructor(private http: HttpClient, private router: Router) {}

	private token: string;
	private tokenTimer: any;
	private userId: string;
	userName: string;
	private authStatusListener = new Subject<boolean>();
	private isAuthenticated: boolean = false;
	private hostUrl: string = 'http://localhost:3000/api/users';

	getToken() {
		return this.token;
	}
	getUserName() {
		return this.userName;
	}
	getIsAuth() {
		return this.isAuthenticated;
	}
	getUserId() {
		return this.userId;
	}
	getAuthStatusListener() {
		return this.authStatusListener.asObservable();
	}

	createUser(firstName: string, lastName: string, email: string, password: string) {
		const user: User = { firstName: firstName, lastName: lastName, email: email, password: password };
		this.http.post(this.hostUrl + '/signup', user).subscribe((response) => {});
	}

	login(email: string, password: string) {
		const authData: AuthData = { email: email, password: password };

		this.http
			.post<{ token: string; expiresIn: number; userId: string; firstName: string; lastName: string }>(
				this.hostUrl + '/login',
				authData
			)
			.subscribe((response) => {
				const token = response.token;
				this.token = token;

				if (token) {
					const expiresInDuration = response.expiresIn;
					this.setAuthTimer(expiresInDuration);
					this.isAuthenticated = true;
					this.userId = response.userId;
					this.userName = response.firstName + ' ' + response.lastName;
					this.authStatusListener.next(true);
					const now = new Date();
					const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
					this.saveAuthData(token, expirationDate, this.userId, response.firstName, response.lastName);
					this.router.navigate([ '/' ]);
				}
			});
	}

	autoAuthUser() {
		const authInfo = this.getAuthData();
		if (!authInfo) {
			return;
		}
		const now = new Date();
		const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
		if (expiresIn > 0) {
			this.token = authInfo.token;
			this.isAuthenticated = true;
			this.userId = authInfo.userId;
			this.setAuthTimer(expiresIn / 1000);
			this.authStatusListener.next(true);
		}
	}

	logout() {
		this.token = null;
		this.isAuthenticated = false;
		this.authStatusListener.next(false);
		clearTimeout(this.tokenTimer);
		this.clearAuthData();
		this.userId = null;
		this.router.navigate([ '/' ]);
	}

	setAuthTimer(duration: number) {
		this.tokenTimer = setTimeout(() => {
			this.logout();
		}, duration * 1000);
	}

	private saveAuthData(token: string, expirationDate: Date, userId: string, firstName: string, lastName: string) {
		localStorage.setItem('token', token);
		localStorage.setItem('expiration', expirationDate.toISOString());
		localStorage.setItem('userId', userId);
		localStorage.setItem('firstName', firstName);
		localStorage.setItem('lastName', lastName);
	}

	private clearAuthData() {
		localStorage.removeItem('token');
		localStorage.removeItem('expiration');
		localStorage.removeItem('userId');
	}

	private getAuthData() {
		const token = localStorage.getItem('token');
		const expirationDate = localStorage.getItem('expiration');
		const userId = localStorage.getItem('userId');

		if (!token || !expirationDate) {
			return;
		}
		return {
			token: token,
			expirationDate: new Date(expirationDate),
			userId: userId
		};
	}
}
