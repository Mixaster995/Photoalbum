using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using System.Net.Http.Headers;
using PhotoAlbum.PresentationLayer.ViewModels;
using PhotoAlbum.BusinessLogicLayer.DTOModels;
using PhotoAlbum.BusinessLogicLayer;

namespace PhotoAlbum.Controllers
{
    [Authorize]
    [RoutePrefix("api/photo")]
    public class PhotoController : ApiController
    {
        IPhotoService Service;

        public PhotoController(IPhotoService service)
        {
            Service = service;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("get/{id}")]
        public HttpResponseMessage GetPhoto(int id)
        {
            var binaryFile = Service.GetBinaryPhoto(id);
            if (binaryFile == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NoContent);
            }
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StreamContent(new MemoryStream(binaryFile));
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("image/png");
            return response;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("pagesCount/{userName?}")]
        public IHttpActionResult ReturnAmountOfPages(string userName = "")
        {
            if (userName.Length > 30)
            {
                return BadRequest();
            }

            var resultNumber = Service.AmountOfPages(userName);
            return Ok(resultNumber);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("getmany/{order}/{pageNumber}/{userName?}")]
        public IHttpActionResult ReturnListOfPhoto(string order, int pageNumber, string userName = "")
        {
            if (string.IsNullOrEmpty(order) || pageNumber < 1 || userName.Length > 30)
            {
                return BadRequest();
            }

            var resultList = Service.GetPhotos(order, pageNumber, userName);
            if (resultList != null)
            {
                return Ok(resultList);
            }
            return Ok();
        }

        [HttpPost]
        [Route("add/{title}/{description?}")]
        public async Task<HttpResponseMessage> UploadPhoto(string title, string description = "")
        {
            var model = new PhotoLoadDTO()
            {
                Title = title,
                Description = description,
                Binary = await Request.Content.ReadAsByteArrayAsync(),
                UserId = User.Identity.GetUserId()
            };

            if (model.Binary == null || string.IsNullOrEmpty(model.Title))
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

            Service.Save(model);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPut]
        [Validate]
        [Route("edit/{id}")]
        public IHttpActionResult EditPhotoInfo(int id, [FromBody]PhotoEditViewModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException();
            }

            var photoInfo = new PhotoEditDTO()
            {
                Title = model.Title,
                Description = model.Description,
                UserId = User.Identity.GetUserId(),
                PhotoId = id
            };

            Service.Edit(photoInfo);
            return Ok();                       
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public IHttpActionResult DeletePhoto(int id)
        {
            var photoInfo = new PhotoDeleteDTO()
            {
                PhotoId = id,
                UserId = User.Identity.GetUserId()
            };
            Service.Delete(photoInfo);
            return Ok();
        }

        [HttpPost]
        [Route("assess/{id}")]
        public IHttpActionResult AssessPhoto(int id, [FromBody]int assessment)
        {
            var finalRaiting = Service.Assess(id, assessment);
            return Ok(finalRaiting);
        }
    }
}
