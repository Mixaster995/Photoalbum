using System.ComponentModel.DataAnnotations;

namespace PhotoAlbum.BusinessLogicLayer.DTOModels
{
    public class PhotoEditDTO
    {
        [Required]
        [MaxLength(30)]
        public string Title { get; set; }

        public string Description { get; set; }

        public int PhotoId { get; set; }

        public string UserId { get; set; }
    }
}