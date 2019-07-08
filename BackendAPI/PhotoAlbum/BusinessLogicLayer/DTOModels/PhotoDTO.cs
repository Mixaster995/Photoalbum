using System;

namespace PhotoAlbum.BusinessLogicLayer.DTOModels
{
    public class PhotoDTO
    {
        public int PhotoId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public double Raiting { get; set; }
        public string UserLogin { get; set; }
        public string UserName { get; set; }
    }
}