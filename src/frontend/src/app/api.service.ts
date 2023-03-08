import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from  './user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private user: any;

  constructor(private httpClient: HttpClient) { }  

  API_SERVER = "http://crazy-pong.com:3000";

  public readUsers(){
    return this.httpClient.get<User[]>(`${this.API_SERVER}/users`);
  }

  public createUser(user: User){
    return this.httpClient.post<User>(`${this.API_SERVER}/users/create`, user);
  }

  public updateUser(user: User){
    return this.httpClient.put<User>(`${this.API_SERVER}/users/${user.id}/update`, user);
  }

  public deleteUser(id: number){
    return this.httpClient.delete(`${this.API_SERVER}/users/${id}/delete`);
  }

  public registerUser(name: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
    };

    console.log("api registerUSer whit name: " + name);
    const body = JSON.stringify({ name });
    console.log("bpdy antes de mandar:" + body);
    return this.httpClient.post<any>(`${this.API_SERVER}/users/register`, body, httpOptions);
  }
}