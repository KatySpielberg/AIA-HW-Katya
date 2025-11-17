using System.Collections.Generic;
using System.Threading.Tasks;
using AIA_HW_Katya.Api.Models;

namespace AIA_HW_Katya.Api.Services
{
    /// <summary>
    /// Abstraction for working with ads storage.
    /// For now it will be implemented with a JSON file.
    /// </summary>
    public interface IAdsRepository
    {
        Task<IReadOnlyList<Ad>> GetAllAsync();
        Task<Ad?> GetByIdAsync(int id);
        Task<Ad> AddAsync(Ad ad);
        Task<Ad?> UpdateAsync(int id, Ad updated);
        Task<bool> DeleteAsync(int id);
    }
}
