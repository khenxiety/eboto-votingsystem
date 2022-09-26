import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voters-side-page',
  templateUrl: './voters-side-page.component.html',
  styleUrls: ['./voters-side-page.component.scss'],
})
export class VotersSidePageComponent implements OnInit {
  sampleCandidates: any = [
    {
      name: 'Test Candidate 1',
      position: 'president',
    },
    {
      name: 'Test Candidate 2',
      position: 'president',
    },
    {
      name: 'Test Candidate 3',
      position: 'vice-president',
    },
    {
      name: 'Test Candidate 4',
      position: 'vice-president',
    },
    {
      name: 'Test Candidate sect',
      position: 'secretary',
    },
    {
      name: 'Test Candidate sect2',
      position: 'secretary',
    },
  ];

  samplePosition: any = [
    {
      position: 'president',
    },

    {
      position: 'vice-president',
    },
    {
      position: 'secretary',
    },
  ];

  sampleVotes: any = [];
  constructor() {}

  ngOnInit(): void {}

  onChange(event: any) {
    // console.log(event);
    this.sampleVotes.push(event);

    const arr: any = [];

    this.sampleVotes.forEach((element: any) => {
      // if (!arr.includes(element)) {
      //   arr.push(element);
      // }
      if (event.position != element.position) {
        arr.push(element.name);
      }
    });

    console.log(arr);
  }
}
