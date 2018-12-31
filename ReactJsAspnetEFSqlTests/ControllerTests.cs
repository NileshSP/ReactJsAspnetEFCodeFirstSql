using NUnit.Framework;
using Microsoft.EntityFrameworkCore;
using ReactJsAspnetEFSql.Controllers;
using ReactJsAspnetEFSql.Models;
using Microsoft.Extensions.DependencyInjection;

namespace ReactJsAspnetEFSqlTests
{
    public class ControllerTests
    {
        private SampleDataController _sampleDataController;
        private WebsitesController _websitesController;
        private WebsitesContext _testContext;

        [SetUp]
        public void SetUp()
        {
            var services = new ServiceCollection();
            services.AddDbContext<WebsitesContext>(options => options.UseInMemoryDatabase(), ServiceLifetime.Singleton);
            services.AddSingleton<WebsitesController>();
            services.AddSingleton<SampleDataController>();
            var serviceProvider = services.BuildServiceProvider();
            _testContext = serviceProvider.GetService<WebsitesContext>();
            _testContext.SeedData().GetAwaiter().GetResult();
            _websitesController = serviceProvider.GetService<WebsitesController>();
            _sampleDataController = serviceProvider.GetService<SampleDataController>();
        }

        public ControllerTests()
        {
        }

        [Test]
        public void WeatherForecastsReturnJson()
        {
            var result = _sampleDataController.WeatherForecasts();
            Assert.NotNull(result);
        }

        [Test]
        public void WebsitesReturnJson()
        {
            var result = _websitesController.Index(null, null, null);
            Assert.NotNull(result);
        }

        [Test]
        public void WebsitesMinMaxDateReturnJson()
        {
            var result = _websitesController.GetMinMaxDate();
            Assert.NotNull(result);
        }
    }
}