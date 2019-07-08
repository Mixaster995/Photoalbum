using System.Collections.Generic;
using PhotoAlbum.BusinessLogicLayer.DTOModels;

namespace PhotoAlbum.BusinessLogicLayer
{
    public interface IPhotoService
    {
        byte[] GetBinaryPhoto(int photoId);
        IEnumerable<PhotoDTO> GetPhotos(string order, int pageNumber, string userName);
        void Save(PhotoLoadDTO photo);
        void Edit(PhotoEditDTO photo);
        void Delete(PhotoDeleteDTO photo);
        double Assess(int photoId, int assessment);
        int AmountOfPages(string userName);
    }
}
