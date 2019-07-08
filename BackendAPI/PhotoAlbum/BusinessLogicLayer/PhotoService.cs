using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using AutoMapper;
using PhotoAlbum.BusinessLogicLayer.DTOModels;
using PhotoAlbum.DataAccessLayer;
using PhotoAlbum.Filters;

namespace PhotoAlbum.BusinessLogicLayer
{
    public class PhotoService: IPhotoService
    {
        private const int photosOnPage = 5;

        private ApplicationDbContext context = new ApplicationDbContext();

        public byte[] GetBinaryPhoto(int photoId)
        {
            return context.BinaryPhotos.Where(b => b.PhotoID == photoId).Select(p => p.Picture).FirstOrDefault();
        }

        public IEnumerable<PhotoDTO> GetPhotos(string order, int pageNumber, string userName)
        {
            List<Photo> photos;
            if (string.IsNullOrEmpty(userName))
            {
                photos = context.Photos.Include(p => p.User).ToList();
            }
            else
            {
                photos = context.Photos.Where(p => p.User.UserName == userName).Include(p => p.User).ToList();
            }

            var orderedPhotos = new List<Photo>();
            if (order == "date")
            {
                orderedPhotos = photos.OrderBy(d => d.UploadDate).ToList();
            }
            else if (order == "raiting")
            {
                orderedPhotos = photos.OrderByDescending(d => d.Raiting).ToList();

            }
        
            var photosDTO = Mapper.Map<List<Photo>, List<PhotoDTO>>(orderedPhotos.Take(pageNumber * photosOnPage)
                                                                                    .Skip((pageNumber - 1) * photosOnPage)
                                                                                                        .ToList());          
            return photosDTO;
        }

        public void Save(PhotoLoadDTO inputPhoto)
        {
            var photo = new Photo()
            {
                Name = inputPhoto.Title,
                Description = inputPhoto.Description,
                UploadDate = DateTime.Now,
                Raiting = 0,
                AmountOfVoted = 0,
                PhotoBytes = new BinaryPhoto() { Picture = inputPhoto.Binary },
                UserId = inputPhoto.UserId,
            };
            context.Photos.Add(photo);
            context.SaveChanges();
        }

        public void Edit(PhotoEditDTO photoInfo)
        {
            var photo = context.Photos.Find(photoInfo.PhotoId);

            if (photo.UserId != photoInfo.UserId)
            {
                throw new UnauthorizedException();
            }
            photo.Name = photoInfo.Title;
            photo.Description = photoInfo.Description;
            context.SaveChanges();
        }

        public void Delete(PhotoDeleteDTO photoInfo)
        {
            var photo = context.Photos.Where(p => p.PhotoID == photoInfo.PhotoId).Include(p => p.PhotoBytes).FirstOrDefault();
            if (photo.UserId != photoInfo.UserId)
            {
                throw new UnauthorizedException();
            }
            context.Photos.Remove(photo);
            context.SaveChanges();
        }

        public double Assess(int photoId, int assessment)
        {
            while (true)
            {
                try
                {
                    using (var context = new ApplicationDbContext())
                    {
                        var result = context.Photos.Find(photoId);
                        result.Raiting = (result.Raiting * result.AmountOfVoted + assessment) / (result.AmountOfVoted + 1);
                        result.AmountOfVoted++;
                        var raiting = result.Raiting;
                        context.SaveChanges();
                        return raiting;
                    }
                }
                catch (DbUpdateConcurrencyException)
                {
                }
            }
        }

        public int AmountOfPages(string userName)
        {
            var result = 0;
            if (string.IsNullOrEmpty(userName))
            {
                result = context.Photos.Select(p => p.PhotoID).Count();
            }        
            else
            {
                result = context.Photos.Where(p => p.User.UserName == userName).Select(p => p.PhotoID).Count();
            }
            if (result == 0)
            {
                return 1;
            }
            return result%photosOnPage==0 ? result/photosOnPage : result / photosOnPage + 1;
        }
    }
}