import { Component, OnInit, OnDestroy } from '@angular/core';
import { WordService } from '../services/word.service';
import {  Observable, Subscription, firstValueFrom, from, lastValueFrom } from 'rxjs';
import { Word } from '../models/word';
import * as moment from 'moment';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private wordService: WordService) { }

  subscription!: Subscription;
  words: Word[] | null = null;
  words$!: Observable<Word[]>;
  wordChart!: Chart;
  

   ngOnInit():void {

    this.getWords()
  }

   getWords(){   
    this.subscription = this.wordService.words$.subscribe((words)=>{
    this.words = words      
    this.createChart(this.words)   
  })
       
        
  }

  createChart(words: Word[]): void {
    const data = this.getDataByMonth(words)
    console.log('data', data);
    

//       this.wordChart = new Chart("wordChart", {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });
    
  }

 
  getDataByMonth(words: Word[]): { month: string, count: number }[] {
    const data = new Map<string, number>();
    words.forEach(w => {
      const month = moment(w.createdAt).format('MMM YYYY');
      if (data.has(month)) {
        data.set(month, (data.get(month) ?? 0) + 1);
      } else {
        data.set(month, 1);
      }
    });
    return Array.from(data).map(([month, count]) => ({ month, count }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
