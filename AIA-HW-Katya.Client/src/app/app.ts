import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ad } from './models/ad.model';
import { AdsService } from './services/ads.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {

  ads: Ad[] = [];
  isLoading = false;
  error: string | null = null;

  adForm!: FormGroup;       // טופס יצירת מודעה
  isSaving = false;         // מצב "שומר" כדי לנעול כפתור

  constructor(
    private adsService: AdsService,
    private fb: FormBuilder
  ) {
    // בניית הטופס עם ערכי ברירת מחדל
    this.adForm = this.fb.group({
      category: ['BUY&SELL', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      owner: ['', Validators.required],
      location: ['', Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadAds();
  }

  loadAds(): void {
    this.isLoading = true;
    this.error = null;

    this.adsService.getAds().subscribe({
      next: (data: Ad[]) => {
        this.ads = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load ads', err);
        this.error = 'Failed to load ads from server';
        this.isLoading = false;
      }
    });
  }

  // שליחת הטופס ליצירת מודעה חדשה
  onSubmit(): void {
    if (this.adForm.invalid || this.isSaving) {
      return;
    }

    this.isSaving = true;
    const newAd = this.adForm.value; // Partial<Ad>

    this.adsService.createAd(newAd).subscribe({
      next: (created: Ad) => {
        // מוסיפים את המודעה החדשה לרשימה
        this.ads = [...this.ads, created];
        // מאפסים טופס לברירת מחדל
        this.adForm.reset({
          category: 'BUY&SELL',
          title: '',
          description: '',
          owner: '',
          location: '',
          imageUrl: ''
        });
        this.isSaving = false;
      },
      error: (err: any) => {
        console.error('Failed to create ad', err);
        this.error = 'Failed to create ad';
        this.isSaving = false;
      }
    });
  }

  getCategoryClass(category: string): string {
    switch (category) {
      case 'BUY&SELL':
        return 'category-buy-sell';
      case 'RENT':
        return 'category-rent';
      case 'TRAVEL':
        return 'category-travel';
      case 'EVENT':
        return 'category-event';
      default:
        return 'category-other';
    }
  }
}
