﻿using System.Security.Claims;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using IdentityModel;
using IdentityService.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityService.Services;

public class CustomProfileService : IProfileService
{
  private readonly UserManager<ApplicationUser> _userManager;

  public CustomProfileService(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        ApplicationUser user = await _userManager.GetUserAsync(context.Subject);
        IList<Claim> existingClaims = await _userManager.GetClaimsAsync(user);

        List<Claim> claims = new()
        {
            new Claim("username", user.UserName),
            existingClaims.FirstOrDefault(x => x.Type == JwtClaimTypes.Name)
        };
        context.IssuedClaims.AddRange(claims);
    }

    public Task IsActiveAsync(IsActiveContext context)
    {
        return Task.CompletedTask;
    }
}
