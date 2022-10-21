import { Component, OnInit } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isLoading: boolean = false;
  positions: Array<any> = [];
  candidates: Array<any> = [];
  voters: Array<any> = [];
  voteds: Array<any> = [];

  interval: any;

  constructor(
    private firestore: Firestore,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    this.getPositions();
    this.getCandidates();
    this.getVoter();
    this.getVoteds();

    // this.interval = setInterval(() => {
    this.getCandidates();
    // }, 4000);
  }
  getVoter() {
    const voterInstance = collection(this.firestore, 'users');
    getDocs(voterInstance)
      .then((res: any) => {
        this.voters = [
          ...res.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          }),
        ];
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  getVoteds() {
    const voterInstance = collection(this.firestore, 'users');
    const votedQuery = query(voterInstance, where('type', '==', 'voted'));
    getDocs(votedQuery)
      .then((res: any) => {
        this.voteds = [
          ...res.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          }),
        ];
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  getPositions() {
    const dbInstance = collection(this.firestore, 'positions');

    getDocs(dbInstance)
      .then((res: any) => {
        this.positions = [
          ...res.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          }),
        ];
        this.isLoading = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.isLoading = false;
      });
  }

  getCandidates() {
    this.firestoreService.getVotesResult().subscribe((res) => {
      this.candidates = res;

      this.isLoading = false;
    });
  }
}
