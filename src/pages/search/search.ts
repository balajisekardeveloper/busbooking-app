import { Component, inject, OnInit } from '@angular/core';
import { Bookingservice, getlocation, searchbus } from '../service/bookingservice';
import { CommonModule} from '@angular/common';
import { ReactiveFormsModule,FormGroup,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit{
  bookServ = inject(Bookingservice);
  route = inject(Router);
  locationlist:getlocation[]=[];
  searchlist:searchbus[]=[];

  searchfrom = new FormGroup({
    fromloc: new FormControl('',Validators.required),
    toloc: new FormControl('',Validators.required),
    date: new FormControl('',Validators.required),
  });




  ngOnInit(): void {
    this.bookServ.Getlocations().subscribe((res)=>{
      this.locationlist= res;
    });
    
  }

  searchbus() {
     const {fromloc,toloc,date}= this.searchfrom.value as any;
    this.route.navigate(['searchresult',fromloc,toloc,date]);
  }


}
