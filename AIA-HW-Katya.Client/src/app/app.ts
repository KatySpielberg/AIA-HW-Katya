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
  editingId: number | null = null;
 
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

  //  שליחת הטופס ליצירת מודעה חדשה או עדכון
onSubmit(): void {
  if (this.adForm.invalid || this.isSaving) {
    return;
  }

  this.isSaving = true;
  const formValue = this.adForm.value;

  // מצב EDIT
  if (this.editingId) {
    this.adsService.updateAd(this.editingId, formValue).subscribe({
      next: (updated: Ad) => {
        this.ads = this.ads.map(a => a.id === updated.id ? updated : a);
        this.resetForm();
      },
      error: (err: any) => {
        console.error('Failed to update ad', err);
        this.error = 'Failed to update ad';
        this.isSaving = false;
      }
    });

    return;
  }

  // מצב CREATE
  this.adsService.createAd(formValue).subscribe({
    next: (created: Ad) => {
      this.ads = [...this.ads, created];
      this.resetForm();
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

  editAd(ad: Ad): void {
  this.editingId = ad.id;

  this.adForm.setValue({
    category: ad.category,
    title: ad.title,
    description: ad.description,
    owner: ad.owner,
    location: ad.location,
    imageUrl: ad.imageUrl || ''
  });
}

resetForm(): void {
  this.adForm.reset({
    category: 'BUY&SELL',
    title: '',
    description: '',
    owner: '',
    location: '',
    imageUrl: ''
  });
  this.editingId = null;
  this.isSaving = false;
}


}
