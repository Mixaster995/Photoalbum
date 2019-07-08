using PhotoAlbum.Filters;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Filters;

namespace PhotoAlbum
{
    public class CustomErrorHandlerAttribute: ExceptionFilterAttribute
    {
        public override Task OnExceptionAsync(HttpActionExecutedContext actionExecutedContext, CancellationToken cancellationToken)
        {
            if (actionExecutedContext.Exception != null)
            {
                if (actionExecutedContext.Exception is NullReferenceException)
                {
                    actionExecutedContext.Response = actionExecutedContext.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid query parameters!");
                }
                if (actionExecutedContext.Exception is UnauthorizedException)
                {
                    actionExecutedContext.Response = actionExecutedContext.Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "You don't have rights for this!");
                }
                if (actionExecutedContext.Exception is ArgumentNullException)
                {
                    actionExecutedContext.Response = actionExecutedContext.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Http request has empty body!");
                }
                if (actionExecutedContext.Exception is SqlException)
                {
                    actionExecutedContext.Response = actionExecutedContext.Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Error occured while operating with database");
                }
            }
            return Task.FromResult<object>(null);
        }
    }
}