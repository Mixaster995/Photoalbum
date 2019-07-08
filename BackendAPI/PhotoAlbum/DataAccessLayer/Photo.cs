using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhotoAlbum.DataAccessLayer
{
    public class Photo
    {
        public int PhotoID { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required]
        public DateTime UploadDate { get; set; }

        [Required]
        public double Raiting { get; set; }

        [Required]
        public int AmountOfVoted { get; set; }

        [Timestamp]
        public byte[] RowVersion { get; set; }

        [Required]
        [ForeignKey("User")]
        public string UserId { get; set; }

        public ApplicationUser User { get; set; }

        public virtual BinaryPhoto PhotoBytes { get; set; }
    }
}