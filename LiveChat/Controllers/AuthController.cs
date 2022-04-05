using System.Reflection.Metadata.Ecma335;
using AutoMapper;
using LiveChat.Dto;
using LiveChat.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace LiveChat.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;

    public AuthController(UserManager<User> userManager, IMapper mapper)
    {
        _userManager = userManager;
        _mapper = mapper;
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] UserRegistrationDto dto)
    {
        if (dto == null || !ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = _mapper.Map<User>(dto);

        var result = await _userManager.CreateAsync(user, dto.Password);
        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description);
            return BadRequest(new UserRegistrationResponseDto { Errors = errors, IsSuccessful = false });
        }

        return Ok(new UserRegistrationResponseDto { IsSuccessful = true });
    }
}
