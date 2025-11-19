import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ad, AdCategory } from '../../models/ad.model';

@Component({
  selector: 'app-ad-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ad-card.html',
  styleUrls: ['./ad-card.css']
})
export class AdCardComponent {

  @Input() ad!: Ad;

  @Output() edit = new EventEmitter<Ad>();
  @Output() delete = new EventEmitter<Ad>();

  getCategoryClass(category: AdCategory): string {
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

  onEdit(): void {
    this.edit.emit(this.ad);
  }

  onDelete(): void {
    this.delete.emit(this.ad);
  }
}
