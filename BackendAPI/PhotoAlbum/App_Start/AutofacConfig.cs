using Autofac;
using Autofac.Integration.WebApi;
using PhotoAlbum.BusinessLogicLayer;
using System.Reflection;
using System.Web.Http;

namespace PhotoAlbum
{
    public class AutofacConfig
    {
        public static void Configure()
        {
            var builder = new ContainerBuilder();

            var config = GlobalConfiguration.Configuration;

            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            builder.RegisterType<PhotoService>().As<IPhotoService>();

            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}