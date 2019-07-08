using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PhotoAlbum.BusinessLogicLayer.DTOModels
{
    public class PhotoDeleteDTO
    {
        public int PhotoId { get; set; }

        public string UserId { get; set; }
    }
}