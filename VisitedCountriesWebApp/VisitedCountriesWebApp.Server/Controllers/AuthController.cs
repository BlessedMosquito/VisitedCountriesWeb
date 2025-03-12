using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VisitedCountriesWeb.Server.Data;

namespace VisitedCountriesWeb.Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {

        private readonly AppDbContext _appDbContext;

        public AuthController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterModel registerModel)
        {
            if (registerModel == null || string.IsNullOrEmpty(registerModel.Email) || string.IsNullOrEmpty(registerModel.Password))
            {
                return BadRequest("Cannot be empty");
            }

            var existingUser = await _appDbContext.Users.AnyAsync(u => u.Email == registerModel.Email);

            if (existingUser)
            {
                return BadRequest("This email is alredy in use");
            }

            var user = new User(registerModel.Email, registerModel.Password);

            _appDbContext.Users.Add(user);
            await _appDbContext.SaveChangesAsync();
            return Ok(new { message = "" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginModel loginModel)
        {
            if (loginModel == null || string.IsNullOrEmpty(loginModel.Email) || string.IsNullOrEmpty(loginModel.Password))
            {
                return BadRequest("Cannot be empty");
            }

            var existingUser = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Email == loginModel.Email);
            var chceckPassowrd = await _appDbContext.Users.AnyAsync(u => u.Password == loginModel.Password);

            if (existingUser == null)
            {
                return Unauthorized("Ivalid email or password");
            }

            if (existingUser.Password == loginModel.Password)
            {
                return Ok(new { message = "Login Succesful" });
            }
            else
            {
                return Unauthorized("Invalid email or password");
            }
        }
    }
}