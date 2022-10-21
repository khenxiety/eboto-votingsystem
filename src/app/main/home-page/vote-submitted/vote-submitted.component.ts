import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/services/firestore.service';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-vote-submitted',
  templateUrl: './vote-submitted.component.html',
  styleUrls: ['./vote-submitted.component.scss'],
})
export class VoteSubmittedComponent implements OnInit {
  isLoading: boolean = false;
  title: Array<any> = [];
  voteSummary: Array<any> = [];
  positions: Array<any> = [];
  candidates: Array<any> = [];
  uid: any;
  @ViewChild('content', { static: false }) el!: ElementRef;
  user: Array<any> = [];

  constructor(
    private firestore: Firestore,
    private toaster: ToastrService,
    private firestoreService: FirestoreService
  ) {
    this.uid = localStorage.getItem('uid');
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getVoteSummary();

    this.getUser();
    this.getTitle();
    this.getPositions();
    this.getCandidates();
  }

  generatePdf() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('Vote Summary.pdf');
      },
    });
  }

  getUser() {
    console.log(this.uid);
    const dbInstance = collection(this.firestore, 'voters_information');
    const q = query(dbInstance, where('voterId', '==', this.uid));
    getDocs(q)
      .then((res: any) => {
        this.user = [
          ...res.docs.map((doc: any) => {
            return { ...doc.data(), id: doc.id };
          }),
        ];
        console.log(this.user);
        this.isLoading = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.isLoading = false;
      });
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

  getVoteSummary() {
    const dbInstance = collection(this.firestore, 'votes');
    const q = query(dbInstance, where('votes', 'array-contains', this.uid));

    getDocs(q)
      .then((res: any) => {
        this.voteSummary = [
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
