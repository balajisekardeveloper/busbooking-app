import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { Bookingservice, resultbus} from '../service/bookingservice';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-result',
  imports: [CommonModule,DatePipe,RouterLink],
  templateUrl: './search-result.html',
  styleUrl: './search-result.css'
})
export class SearchResult implements OnInit {
  searchbuses: resultbus[]=[];
  constructor(private route: ActivatedRoute, private bookServ: Bookingservice) { }
  fromId!: string;
  toId!: string;
  date!: string;

  ngOnInit(): void {
  
   this.SearchResults();
  }

   SearchResults(){
    const fromId = this.route.snapshot.paramMap.get('fromId')!;
    const toId = this.route.snapshot.paramMap.get('toId')!;
    const date = this.route.snapshot.paramMap.get('date')!;
      this.bookServ.searchLocation(fromId, toId, date).subscribe((res:any) => {
        this.searchbuses = res;
        console.log(this.searchbuses)
      });
    }


}
