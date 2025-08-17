import { CommonModule, CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Bookingservice, BusBookingPassenger, BusSchedule } from '../service/bookingservice';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-book-ticket',
  imports: [CommonModule,TitleCasePipe,DatePipe, CurrencyPipe,ReactiveFormsModule],
  templateUrl: './book-ticket.html',
  styleUrl: './book-ticket.css'
})
export class BookTicket implements OnInit{
bookServ = inject(Bookingservice);
activatedRoute = inject(ActivatedRoute);
booktickets:BusSchedule[]=[];
scheduleId!:number;
seatCount:number[]=[];
seatcounts!:number;
SelectedSeats:BusBookingPassenger[]=[];
 passengerForm: FormGroup;
 bookingForm:FormGroup;

  constructor(private fb: FormBuilder) {
    this.passengerForm = this.fb.group({
      passengerId: [null, Validators.required],
      bookingId: [null, Validators.required],
      passengerName: ['', [Validators.required, Validators.minLength(2)]],
      age: [null, [Validators.required, Validators.min(0), Validators.max(120)]],
      gender: ['', Validators.required],  // Could be 'Male', 'Female', 'Other'
      seatNo: [null, Validators.required]
    });

      this.bookingForm = this.fb.group({
      bookingId: [null, Validators.required],
      custId: [null, Validators.required],
      bookingDate: ['', Validators.required], // YYYY-MM-DD or ISO
      scheduleId: [null, Validators.required],
      busBookingPassengers: this.fb.array([this.passengerForm])
    });
    
  }

ngOnInit(): void {
  this.busSchedule();
}
busSchedule(){
  const scheduleIdStr = this.activatedRoute.snapshot.paramMap.get('scheduleId')!;
   const custId = this.activatedRoute.snapshot.paramMap.get('scheduleId')!;
  const scheduleId = Number(scheduleIdStr); 
  this.bookServ.GetBusScheduleById(scheduleId).subscribe((res:any)=>{
    this.booktickets = [res];
    
    const seatcounts = this.booktickets[0].totalSeats;
    for (let index = 1; index <= seatcounts; index++) {
       
      this.seatCount.push(index);
      
    }
 
  })
}

onSelect(seat: number) {
  // Find if seat is already selected
 const index = this.SelectedSeats.findIndex(p => p.seatNo === seat);


  if (index > -1) {
    this.SelectedSeats.splice(index, 1);
    this.SelectedSeats = [...this.SelectedSeats];
    console.log(`Seat ${seat} released.`);
  } else {
    // Seat not selected → add it if form is valid
    this.passengerForm.patchValue({ seatNo: seat });

    if (this.passengerForm) {
      this.SelectedSeats.push({ ...this.passengerForm.value });
      this.passengerForm.reset({ seatNo: 0 });
    } else {
      alert('Please fill all passenger details before selecting a seat.');
    }
  
  }
}

isSeatSelected(seat: number): boolean {
  return this.SelectedSeats.some(p => Number(p.seatNo) === Number(seat));
}
onBooking(){

}

}

