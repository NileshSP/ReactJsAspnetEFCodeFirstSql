using NUnit.Framework;
using Microsoft.EntityFrameworkCore;
using ReactJsAspnetEFSql.Controllers;
using ReactJsAspnetEFSql.Models;

namespace ReactJsAspnetEFSqlTests
{
    public class ControllerTests
    {
        private SampleDataController _sampleDataController;
        private WebsitesController _websitesController;

        public ControllerTests()
        {
            _sampleDataController = new SampleDataController();
            _websitesController = new WebsitesController(new WebsitesContext((new DbContextOptionsBuilder<WebsitesContext>()).Options));
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
    }
}