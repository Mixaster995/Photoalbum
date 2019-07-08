using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using PhotoAlbum.BusinessLogicLayer.DTOModels;
using PhotoAlbum.DataAccessLayer;

namespace PhotoAlbum.Controllers
{
    [Authorize]
    [Validate]
    [RoutePrefix("api/account")]
    public class AccountController : ApiController
    {
        private ApplicationUserManager _userManager;

        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager)
        {
            UserManager = userManager;
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [HttpPost]
        [Route("changePassword")]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException();
            }
            IdentityResult result = await UserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("register")]
        public async Task<IHttpActionResult> Register(RegisterBindingModel model)
        {
            if (model == null)
            {
                throw new ArgumentNullException();
            }
            var user = new ApplicationUser() { UserName = model.Login, FirstName = model.FirstName,
                                                                        LastName = model.LastName, Email = model.Email };

            IdentityResult result = await UserManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        [HttpGet]
        [Route("userdata/get")]
        public async Task<IHttpActionResult> ReturnUserData()
        {
            var result = await UserManager.FindByIdAsync(User.Identity.GetUserId());

            var userInfo = new UserInfoDTO()
            {
                FirstName = result.FirstName,
                LastName = result.LastName,
                Email = result.Email
            };
            return Ok(userInfo);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("userdata/get/{userName}")]
        public async Task<IHttpActionResult> ReturnUserDataByLogin(string userName)
        {
            var result = await UserManager.FindByNameAsync(userName);

            var userInfo = new UserInfoDTO()
            {
                FirstName = result.FirstName,
                LastName = result.LastName,
                Email = result.Email
            };
            return Ok(userInfo);
        }

        [HttpPost]
        [Route("userdata/edit")]
        public async Task<IHttpActionResult> ChangeUserData(UserInfoDTO model)
        {
            if (model == null)
            {
                throw new ArgumentNullException();
            }
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Email = model.Email;

            var result = await UserManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }
            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && _userManager != null)
            {
                _userManager.Dispose();
                _userManager = null;
            }

            base.Dispose(disposing);
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result.Errors != null)
            {
                foreach (string error in result.Errors)
                {
                    ModelState.AddModelError("", error);
                }
                return BadRequest(ModelState);
            }
            return BadRequest();          
        }
    }
}
