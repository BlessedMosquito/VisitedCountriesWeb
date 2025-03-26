using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using VisitedCountriesWebApp.Server.Data;

namespace VisitedCountriesWeb.Server.Data
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {

        public IConfiguration _config;
        public AppDbContext(IConfiguration config)
        {
            _config = config;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_config.GetConnectionString("DatabaseConnection"));
        }


        public DbSet<CountryDatabase> Countries { get; set; }
    }
}