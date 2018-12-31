using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;

namespace ReactJsAspnetEFSql.Models
{
    public class Model { }

    public class WebsitesContext : DbContext
    {
        public WebsitesContext(DbContextOptions<WebsitesContext> options)
            : base(options)
        { }

        public DbSet<Website> Websites { get; set; }
        public DbSet<WebsiteDetail> WebsiteDetails { get; set; }
    }

    public static class ModelBuilderExtensions
    {
        public static Task SeedData(this WebsitesContext context)
        {
            return Task.Run(() =>
            {
                if (context.Database.IsSqlServer()) context.Database.EnsureCreated(); // For MSSQL only

                if (context.Websites.Any())
                {
                    //To truncate tables and reseed the identities -- only required few times and not always 
                    context.Websites.RemoveRange(context.Websites);
                    context.SaveChanges();
                    if (context.Database.IsSqlServer()) // For MSSQL only
                    {
                        context.Database.ExecuteSqlCommand("DBCC CHECKIDENT('Websites', RESEED, 0)");
                        context.Database.ExecuteSqlCommand("DBCC CHECKIDENT('WebsiteDetails', RESEED, 0)");
                    }
                }

                if (!context.Websites.Any())
                {
                    context.Websites.AddRange(getWebsites().GetAwaiter().GetResult());
                    context.SaveChanges();
                }
                if (!context.WebsiteDetails.Any())
                {
                    context.WebsiteDetails.AddRange(getWebsiteDetails(context).GetAwaiter().GetResult());
                    context.SaveChanges();
                }
            });
        }

        public static Task<List<Website>> getWebsites() =>
            Task.Run(() => "dotnet,webdev,visualstudio,signalr,mobiles,vscode,csharp,visualbasic,mssql,azure,xbox,surfaceproducts,fsharp,office,xamarin"
                .Split(",")
                .Reverse()
                .Select((item, index) => new Website { Url = $"http://blogs.msdn.com/{item.Trim()}" })
                .ToList<Website>()
            );

        public static Task<List<WebsiteDetail>> getWebsiteDetails(WebsitesContext context) =>
            Task.Run(() => context.Websites
                .ToList<Website>()
                .Select((website, index) =>
                    Enumerable.Range(-15, 30)
                    .Select((number, enuIndex) => new WebsiteDetail { WebsiteId = website.WebsiteId, VisitDate = DateTime.Now.AddDays(number), TotalVisits = (index + 1) * (enuIndex + 1) * 100, Website = website })
                    .ToList<WebsiteDetail>()
                )
                .SelectMany(websiteDetails => websiteDetails)
                .ToList<WebsiteDetail>()
            );
    }

    public class Website
    {
        [Key]
        public int WebsiteId { get; set; }
        public string Url { get; set; }

        public List<WebsiteDetail> WebsiteDetails { get; set; }
    }

    public class WebsiteDetail
    {
        [Key]
        public int WebsiteDetailId { get; set; }
        public DateTime VisitDate { get; set; }
        public int TotalVisits { get; set; }

        public int WebsiteId { get; set; }
        public Website Website { get; set; }
    }
}