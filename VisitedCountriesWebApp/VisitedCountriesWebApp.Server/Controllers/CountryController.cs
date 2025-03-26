using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using VisitedCountriesWeb.Server.Data;
using VisitedCountriesWebApp.Server.Data;

namespace VisitedCountriesWebApp.Server.Controllers
{
    [Route("api/country")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly AppDbContext _context;
        public CountryController(UserManager<IdentityUser> userManager, AppDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }



        [Authorize]
        [HttpPost("add")]
        public async Task<IActionResult> AddCountry([FromBody] AddCountryRequest request)
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);
            if (user == null)     
            {
                Console.WriteLine("User is null, authentication failed!");
                return Unauthorized("User not found");
            }
            if (!DateTime.TryParseExact(request.visitDate, "MMMM yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parsedDate))
            {
                return BadRequest("Invalid date format. Expected format: yyyy MMMM");
            }

            var countryDatabase = new CountryDatabase
            {
                Id = Guid.NewGuid().ToString(),
                user = user,
                name = request.country.Name.Common,
                capital = request.country.Capital.First(),
                population = request.country.Population,
                region = request.country.Region,
                subRegion = request.country.SubRegion,
                area = (long)request.country.Area,
                dateVisited = parsedDate
            };

            object data = _context.Countries.Add(countryDatabase);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize]
        [HttpGet("get/all")]
        public async Task<IActionResult> GetAllCountries()
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);
            if (user == null)
            {
                System.Console.WriteLine("User is null, authentication failed!");
                return Unauthorized("User not found");
            }

            var countries = _context.Countries.Where(c => c.user == user).ToList();

            return Ok(countries);
        }
    }

    public class AddCountryRequest
    {
        public Country country { get; set; }
        public String visitDate { get; set; }
    }
}
