using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using AIA_HW_Katya.Api.Models;
using Microsoft.AspNetCore.Hosting;

namespace AIA_HW_Katya.Api.Services
{
    /// <summary>
    /// JSON-file based implementation of IAdsRepository.
    /// Data is stored in ads.json under the content root folder.
    /// </summary>
    public class FileAdsRepository : IAdsRepository
    {
        private readonly string _filePath;
        private readonly JsonSerializerOptions _jsonOptions;

        public FileAdsRepository(IWebHostEnvironment env)
        {
            // ContentRootPath = project root when running from VS / dotnet run.
            _filePath = Path.Combine(env.ContentRootPath, "ads.json");

            _jsonOptions = new JsonSerializerOptions
            {
                WriteIndented = true // nicer JSON to read.
            };
        }

        /// <summary>
        /// Loads all ads from the JSON file (or returns empty list if file does not exist).
        /// </summary>
        private async Task<List<Ad>> LoadAllInternalAsync()
        {
            if (!File.Exists(_filePath))
            {
                return new List<Ad>();
            }

            await using var stream = File.OpenRead(_filePath);

            var ads = await JsonSerializer.DeserializeAsync<List<Ad>>(stream, _jsonOptions)
                      ?? new List<Ad>();

            return ads;
        }

        /// <summary>
        /// Saves all ads to the JSON file.
        /// </summary>
        private async Task SaveAllInternalAsync(List<Ad> ads)
        {
            // Ensure folder exists (usually it does, but it's safe).
            var dir = Path.GetDirectoryName(_filePath);
            if (!string.IsNullOrEmpty(dir) && !Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
            }

            await using var stream = File.Create(_filePath);
            await JsonSerializer.SerializeAsync(stream, ads, _jsonOptions);
        }

        public async Task<IReadOnlyList<Ad>> GetAllAsync()
        {
            var ads = await LoadAllInternalAsync();

            // Order by CreatedAt descending (newest first).
            return ads
                .OrderByDescending(a => a.CreatedAt)
                .ToList();
        }

        public async Task<Ad?> GetByIdAsync(int id)
        {
            var ads = await LoadAllInternalAsync();
            return ads.FirstOrDefault(a => a.Id == id);
        }

        public async Task<Ad> AddAsync(Ad ad)
        {
            var ads = await LoadAllInternalAsync();

            // Generate new Id (max + 1).
            // In this way of creating ID --> the ID isn't strictly monotonic (but uniqueness),
            // but for this assignment it is less important 
            var nextId = ads.Count == 0 ? 1 : ads.Max(a => a.Id) + 1;
            ad.Id = nextId;

            // If CreatedAt not set, set to now.
            if (ad.CreatedAt == default)
            {
                ad.CreatedAt = DateTime.UtcNow;
            }

            ads.Add(ad);

            await SaveAllInternalAsync(ads);

            return ad;
        }

        public async Task<Ad?> UpdateAsync(int id, Ad updated)
        {
            var ads = await LoadAllInternalAsync();

            var existing = ads.FirstOrDefault(a => a.Id == id);
            if (existing == null)
            {
                return null;
            }

            // Update properties.
            existing.Category = updated.Category;
            existing.Title = updated.Title;
            existing.Description = updated.Description;
            existing.Owner = updated.Owner;
            existing.Location = updated.Location;
            existing.ImageUrl = updated.ImageUrl;

            // We don't change CreatedAt here (keep original creation time).

            await SaveAllInternalAsync(ads);

            return existing;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var ads = await LoadAllInternalAsync();

            var toRemove = ads.FirstOrDefault(a => a.Id == id);
            if (toRemove == null)
            {
                return false;
            }

            ads.Remove(toRemove);

            await SaveAllInternalAsync(ads);

            return true;
        }
    }
}
