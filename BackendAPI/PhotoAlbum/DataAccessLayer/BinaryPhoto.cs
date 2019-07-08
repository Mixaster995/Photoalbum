using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhotoAlbum.DataAccessLayer
{
    public class BinaryPhoto
    {
        [Key]
        [ForeignKey("PhotoData")]
        public int PhotoID { get; set; }

        [Required]
        public byte[] Picture { get; set; }

        public Photo PhotoData { get; set; }
    }
}