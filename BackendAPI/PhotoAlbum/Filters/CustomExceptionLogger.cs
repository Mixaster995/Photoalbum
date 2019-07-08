using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Http.ExceptionHandling;

namespace PhotoAlbum
{
    public class CustomExceptionLogger: ExceptionLogger
    {
        public override void Log(ExceptionLoggerContext context)
        {
            var errorInfo = context.Exception.ToString();
            //any logging logic
            Debug.WriteLine(errorInfo);
        }
    }
}