using AIA_HW_Katya.Api.Models;
using AIA_HW_Katya.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register ads repository as a singleton service.
// It will handle reading/writing to ads.json.
builder.Services.AddSingleton<IAdsRepository, FileAdsRepository>();

// Configure CORS so Angular client (http://localhost:4200) can call this API.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularClient", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Enable Swagger in development.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable CORS policy.
app.UseCors("AllowAngularClient");

// --------------------
// Minimal API endpoints for Ads CRUD
// Base route: /api/ads
// --------------------

// GET /api/ads - get all ads.
app.MapGet("/api/ads", async (IAdsRepository repo) =>
{
    var ads = await repo.GetAllAsync();
    return Results.Ok(ads);
})
.WithName("GetAds");

// GET /api/ads/{id} - get single ad by id.
app.MapGet("/api/ads/{id:int}", async (int id, IAdsRepository repo) =>
{
    var ad = await repo.GetByIdAsync(id);
    return ad is not null ? Results.Ok(ad) : Results.NotFound();
})
.WithName("GetAdById");

// POST /api/ads - create new ad.
app.MapPost("/api/ads", async (Ad ad, IAdsRepository repo) =>
{
    // The repository will assign Id and CreatedAt if needed.
    var created = await repo.AddAsync(ad);
    return Results.Created($"/api/ads/{created.Id}", created);
})
.WithName("CreateAd");

// PUT /api/ads/{id} - update existing ad.
app.MapPut("/api/ads/{id:int}", async (int id, Ad ad, IAdsRepository repo) =>
{
    var updated = await repo.UpdateAsync(id, ad);
    return updated is not null ? Results.Ok(updated) : Results.NotFound();
})
.WithName("UpdateAd");

// DELETE /api/ads/{id} - delete ad.
app.MapDelete("/api/ads/{id:int}", async (int id, IAdsRepository repo) =>
{
    var deleted = await repo.DeleteAsync(id);
    return deleted ? Results.NoContent() : Results.NotFound();
})
.WithName("DeleteAd");

app.Run();
