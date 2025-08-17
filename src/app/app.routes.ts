import { Routes } from '@angular/router';
import { Search } from '../pages/search/search';
import { SearchResult } from '../pages/search-result/search-result';
import { BookTicket } from '../pages/book-ticket/book-ticket';
import { MyBookings } from '../pages/my-bookings/my-bookings';
import { Login } from './pages/login/login';



export const routes: Routes = [
    {path:"", redirectTo:'search', pathMatch:'full'},
    {path:"search", component:Search},
    {path:"login", component:Login},
    {path:"searchresult/:fromId/:toId/:date", component:SearchResult},
    {path:"bookticket/:scheduleId", component:BookTicket},
    {path:"mybooking", component:MyBookings},
];
