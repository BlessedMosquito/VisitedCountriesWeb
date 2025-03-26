using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace VisitedCountriesWebApp.Server.Data
{
    public class CountryDatabase
    {
        [Key]
        public string Id { get; set; }
        public IdentityUser user {  get; set; }
        public string name { get; set; }
        public string capital { get; set; }
        public int population { get; set; }
        public string region { get; set; }
        public string subRegion { get; set; }
        public long area { get; set; }
        public DateTime dateVisited { get; set; }
    }
}
