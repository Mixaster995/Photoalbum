using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace PhotoAlbum.DataAccessLayer
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Photo> Photos { get; set; }
        public DbSet<BinaryPhoto> BinaryPhotos { get; set; }

        public ApplicationDbContext()
            : base("DefaultConnection")
        {
            Database.Initialize(false);
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}