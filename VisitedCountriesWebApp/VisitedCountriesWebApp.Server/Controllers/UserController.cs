using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;




namespace VisitedCountriesWebApp.Server.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        public UserController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        [Authorize]
        [HttpGet("username")]
        public async Task<IActionResult> GetUsername()
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);

            System.Console.WriteLine(user);
            if (user == null)
            {
                return Unauthorized("User not found");
            }

            return Ok(new {username = user.UserName });
        }
    }
}
