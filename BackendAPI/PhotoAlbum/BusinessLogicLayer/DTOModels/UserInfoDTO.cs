using System.ComponentModel.DataAnnotations;

namespace PhotoAlbum.BusinessLogicLayer.DTOModels
{
    public class UserInfoDTO
    {
        [Required]
        [MaxLength(30)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(30)]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }
    }
}