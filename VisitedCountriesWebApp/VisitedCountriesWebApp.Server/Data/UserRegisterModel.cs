using System.ComponentModel.DataAnnotations;

public class UserRegisterModel
{
    [Required]
    public string UserName { get; set; }

    [Required]  
    [EmailAddress]  
    public string Email { get; set; }

    [Required]  
    [MinLength(6)]  
    public string Password { get; set; }

    [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
    public string ConfirmPassword { get; set; }
}
