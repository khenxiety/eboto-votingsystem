import { Component, OnInit } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-votes-homepage',
  templateUrl: './votes-homepage.component.html',
  styleUrls: ['./votes-homepage.component.scss'],
})
export class VotesHomepageComponent implements OnInit {
  isLoading: boolean = false;
  title: Array<any> = [];
  voteSummary: Array<any> = [];
  positions: Array<any> = [];
  candidates: Array<any> = [];

  constructor(
    private firestore: Firestore,
    private toaster: ToastrService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    this.getCandidates();
    this.getTitle();
    this.getPositions();

    const object1 = { name: 'marc' };
    const b = object1;

    object1.name = 'test';
    console.log(object1);

    console.log(b);
  }

  getPositions() {
    const dbInstance = collection(this.firestore, 'positions');
    const q = query(dbInstance, orderBy('maximumVote', 'asc'));

    getDocs(q)
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
  getTitle() {
    const dbInstance = collection(this.firestore, 'election_title');

    getDocs(dbInstance)
      .then((res: any) => {
        this.title = [
          ...res.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          }),
        ];
        this.isLoading = false;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  getCandidates() {
    this.firestoreService.getVotesResult().subscribe((res) => {
      this.candidates = res;

      this.isLoading = false;
    });
  }
}
