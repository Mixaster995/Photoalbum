using System.ComponentModel.DataAnnotations;

namespace PhotoAlbum.PresentationLayer.ViewModels
{
    public class PhotoEditViewModel
    {
        [Required]
        [MaxLength(30)]
        public string Title { get; set; }

        public string Description { get; set; }
    }
}