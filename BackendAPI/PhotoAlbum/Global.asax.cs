using AutoMapper;
using PhotoAlbum.BusinessLogicLayer.DTOModels;
using PhotoAlbum.DataAccessLayer;
using System.Web.Http;

namespace PhotoAlbum
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AutofacConfig.Configure();
            Mapper.Initialize(cfg => cfg.CreateMap<Photo, PhotoDTO>()
                       .ForMember("PhotoId", opt => opt.MapFrom(src => src.PhotoID))
                       .ForMember("Title", opt => opt.MapFrom(src => src.Name))
                       .ForMember("Date", opt => opt.MapFrom(src => src.UploadDate))
                       .ForMember("UserLogin", opt => opt.MapFrom(src => src.User.UserName))
                       .ForMember("UserName", opt => opt.MapFrom(src => src.User.FirstName)));
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
