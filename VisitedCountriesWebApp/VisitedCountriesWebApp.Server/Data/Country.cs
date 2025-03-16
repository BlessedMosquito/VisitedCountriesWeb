using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;

namespace VisitedCountriesWebApp.Server.Data
{
    public class Country
    {
        [JsonProperty("name")]
        public NameInfo Name { get; set; }

        [JsonProperty("cca2")]
        public string Code { get; set; }

        [JsonProperty("capital")]
        public List<string> Capital { get; set; }

        [JsonProperty("population")]
        public int Population { get; set; }

        [JsonProperty("languages")]
        public Dictionary<string, string> Languages { get; set; }

        [JsonProperty("currencies")]
        public Dictionary<string, CurrencyInfo> Currencies { get; set; }

        [JsonProperty("region")]
        public string Region { get; set; }

        [JsonProperty("subregion")]
        public string SubRegion { get; set; }

        [JsonProperty("flag")]
        public string Flag { get; set; }

        [JsonProperty("latlng")]
        public List<double> LatLng { get; set; }

        [JsonProperty("timezones")]
        public List<string> Timezones { get; set; }

        [JsonProperty("area")]
        public double Area { get; set; }

        [JsonProperty("demonyms")]
        public DemonymInfo Demonyms { get; set; }

        public string PrintCountry()
        {
            string countryDetails = $"Country: {Name?.Common ?? "Unknown"}\n" +
                                    $"Capital: {(Capital != null && Capital.Count > 0 ? string.Join(", ", Capital) : "Not Available")}\n" +
                                    $"Population: {Population:N0}\n" +
                                    $"Language: {(Languages != null && Languages.Count > 0 ? string.Join(", ", Languages.Values) : "Not Available")}\n" +
                                    $"Currency: {string.Join(", ", Currencies?.Values.Select(c => c.Name) ?? new List<string>())}\n" +
                                    $"Region: {Region}\n" +
                                    $"Flag: {Flag}";

            return countryDetails;
        }

        public Country(NameInfo name, List<string> capital, int population, string region, string subRegion, double area)
        {
            Name = name;
            Capital = capital;
            Population = population;
            Region = region;
            SubRegion = subRegion;
            Area = area;
        }

        public string CapitalListToString()
        {
            string capitalString = "";

            if (Capital.Count > 1)
            {
                capitalString = string.Join("/", Capital);
            }
            else
            {
                return Capital[0];
            }

            return capitalString;
        }
    }

    public class NameInfo
    {
        [JsonProperty("common")]
        public string Common { get; set; }

        [JsonProperty("official")]
        public string Official { get; set; }
    }

    public class CurrencyInfo
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("symbol")]
        public string Symbol { get; set; }
    }

    public class DemonymInfo
    {
        [JsonProperty("eng")]
        public Demonym Language { get; set; }
    }

    public class Demonym
    {
        [JsonProperty("f")]
        public string Female { get; set; }

        [JsonProperty("m")]
        public string Male { get; set; }
    }
}