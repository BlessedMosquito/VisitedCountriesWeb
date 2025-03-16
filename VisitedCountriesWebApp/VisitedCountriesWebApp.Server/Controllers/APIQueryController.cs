using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;
using VisitedCountriesWebApp.Server.Data;

namespace VisitedCountriesWebApp.Server.Controllers
{

    [ApiController]
    [Route("api/countries")]
    public class APIQueryController : Controller
    {

        private readonly string APIUrl = "https://restcountries.com/v3.1/name/";
        private readonly HttpClient _httpClient;

        public APIQueryController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }



        [HttpPost("search")]
        public async Task<IActionResult> SearchCountryByName([FromBody] SearchCountryModel model)
        {

            if (string.IsNullOrWhiteSpace(model.CountryName))
            {
                return BadRequest("Country name cannot be empty");
            }

            string url = $"{APIUrl}{model.CountryName}";
            System.Console.WriteLine(url);

            try
            {
                HttpResponseMessage response = await _httpClient.GetAsync(url);
                if (!response.IsSuccessStatusCode)
                {
                    return NotFound($"Country '{model.CountryName}' not found.");
                }

                string json = await response.Content.ReadAsStringAsync();
                List<Country> countries = JsonConvert.DeserializeObject<List<Country>>(json);

                return Ok(countries[0]) ;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
            
        }

    }


    public class SearchCountryModel
    {
        public string CountryName { get; set; }
    }
}
