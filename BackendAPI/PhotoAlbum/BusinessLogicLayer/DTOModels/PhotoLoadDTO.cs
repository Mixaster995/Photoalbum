using System.ComponentModel.DataAnnotations;

namespace PhotoAlbum.BusinessLogicLayer.DTOModels
{
    public class PhotoLoadDTO
    {
        [Required]
        [MaxLength(30)]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public byte[] Binary { get; set; }

        [Required]
        public string UserId { get; set; }
    }
}