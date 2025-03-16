using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text;
using VisitedCountriesWeb.Server.Data;
using VisitedCountriesWebApp.Server.Controllers;

var builder = WebApplication.CreateBuilder(args);

// Dodajemy konfiguracjê CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("https://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

// Konfiguracja DbContext i Identity
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DatabaseConnection"))); // Zmienny connection string

// Dodajemy Identity do aplikacji
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

// Rejestracja innych serwisów
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Rejestracja aplikacji DbContext
builder.Services.AddScoped<AppDbContext>();

builder.Services.AddHttpClient<APIQueryController>();

var app = builder.Build();

// Middleware
app.UseCors("AllowSpecificOrigin");

app.UseDefaultFiles();  // Dzia³a z plikami statycznymi
app.UseStaticFiles();

// Konfiguracja Swaggera
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// U¿ywamy uwierzytelniania i autoryzacji
app.UseAuthentication();  // Dodajemy middleware do uwierzytelniania
app.UseAuthorization();

app.MapControllers();  // Mapowanie kontrolerów

// Konfiguracja domyœlnej strony
app.MapFallbackToFile("/index.html");

app.Run();
