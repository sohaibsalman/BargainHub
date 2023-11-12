using System.Security.Claims;
using IdentityModel;
using IdentityService.Data;
using IdentityService.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace IdentityService;

public class SeedData
{
    public static void EnsureSeedData(WebApplication app)
    {
        using var scope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope();
        var context = scope.ServiceProvider.GetService<ApplicationDbContext>();
        context.Database.Migrate();

        var userMgr = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        if(userMgr.Users.Any()) return;

        var sohaib = userMgr.FindByNameAsync("sohaib").Result;
        if (sohaib == null)
        {
            sohaib = new ApplicationUser
            {
                UserName = "sohaib",
                Email = "sohaib.it40@gmail.com",
                EmailConfirmed = true,
            };
            var result = userMgr.CreateAsync(sohaib, "Pass123$").Result;
            if (!result.Succeeded)
            {
                throw new Exception(result.Errors.First().Description);
            }

            result = userMgr.AddClaimsAsync(sohaib, new Claim[]{
                            new Claim(JwtClaimTypes.Name, "Sohaib Salman")
                        }).Result;
            if (!result.Succeeded)
            {
                throw new Exception(result.Errors.First().Description);
            }
            Log.Debug("sohaib created");
        }
        else
        {
            Log.Debug("sohaib already exists");
        }
    }
}
