import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface getlocation{
    locationId: number;
    locationName:string;
    code:string;
}
export interface searchbus{
    fromLocation: string;
    toLocation:string;
    travelDate:string;
}
export interface resultbus{
  availableSeats: number;
  totalSeats: number;
  price: number;
  arrivalTime: string;       // ISO 8601 format datetime
  scheduleId: number;
  departureTime: string;     // ISO 8601 format datetime
  busName: string;
  busVehicleNo: string;
  fromLocationName: string;
  toLocationName: string;
  vendorName: string;
  scheduleDate: string;      // ISO 8601 format datetime (may be unused)
  vendorId: number;
}
export interface BusSchedule {
  scheduleId: number;
  vendorId: number;
  busName: string;
  busVehicleNo: string;
  fromLocation: number;
  toLocation: number;
  departureTime: string; // ISO date string
  arrivalTime: string;   // ISO date string
  scheduleDate: string;  // ISO date string
  price: number;
  totalSeats: number;
}
export interface BusBookingPassenger {
  passengerId: number;
  bookingId: number;
  passengerName: string;
  age: number;
  gender: string;
  seatNo: number;
}

// Interface for the Booking
export interface BusBookings {
  bookingId: number;
  custId: number;
  bookingDate: string; // ISO 8601 format string
  scheduleId: number;
  busBookingPassengers: BusBookingPassenger[]; // Array of passengers
}

export interface login{
   message: string;
  result: boolean;
  data: UserData;
}

export interface UserData {
  userId: number;
  userName: string;
  emailId: string;
  fullName: string;
  role: string;
  createdDate: string; // ISO date string, can be Date if you parse it
  password: string;
  projectName: string;
  refreshToken: string;
  refreshTokenExpiryTime: string; // ISO date string
}

export interface LoginResponse {
  message: string;
  result: boolean;
  data: UserData;
}
@Injectable({
  providedIn: 'root'
})
export class Bookingservice {
  
  private http = inject(HttpClient);
  
  Getlocations():Observable<getlocation[]>{
   return this.http.get<getlocation[]>("https://api.freeprojectapi.com/api/BusBooking/GetBusLocations");
  }

  searchLocation(fromLocation:string,toLocation:string,travelDate:string):Observable<searchbus[]>{
    return this.http.get<searchbus[]>(`https://api.freeprojectapi.com/api/BusBooking/searchBus2?fromLocation=${fromLocation}&toLocation=${toLocation}&travelDate=${travelDate}`);
  }

  GetBusScheduleById(scheduleId:number):Observable<BusSchedule[]>{
    return this.http.get<BusSchedule[]>(`https://api.freeprojectapi.com/api/BusBooking/GetBusScheduleById?id=${scheduleId}`);
  }

  LoginForm(login:LoginResponse):Observable<LoginResponse>{
    return this.http.post<LoginResponse>("https://api.freeprojectapi.com/api/BusBooking/login", login);
  }

  private UserName = new BehaviorSubject<string | null>(localStorage.getItem('username'));
  UserValue$ = this.UserName.asObservable();
  private LoginToken = new BehaviorSubject<boolean>(!!localStorage.getItem('refresh'));
  LoginTokens$ = this.LoginToken.asObservable();

  setUser(name:string){
    this.UserName.next(name);
  }
  getUser():string | null{
    return this.UserName.value
  }
  setLogin(token:boolean){
    this.LoginToken.next(token);
  }
  getLogin():boolean | null{
    return this.LoginToken.value
  }

}
