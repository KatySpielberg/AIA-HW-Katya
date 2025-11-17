using System;

namespace AIA_HW_Katya.Api.Models
{
    /// <summary>
    /// Represents a single ad item in the board.
    /// </summary>
    public class Ad
    {
        // Unique identifier of the ad (we'll assign it in the repository).
        public int Id { get; set; }

        // Category of the ad: BUY&SELL / RENT / TRAVEL / EVENT.
        public string Category { get; set; } = string.Empty;

        // Title shown in the list.
        public string Title { get; set; } = string.Empty;

        // Longer text describing the ad.
        public string Description { get; set; } = string.Empty;

        // The name of the person who created the ad.
        public string Owner { get; set; } = string.Empty;

        // Location string (e.g. "Tel Aviv", "Haifa").
        public string Location { get; set; } = string.Empty;

        // When the ad was created.
        public DateTime CreatedAt { get; set; }

        // Optional image URL (can be extended later to a list of images).
        public string? ImageUrl { get; set; }
    }
}