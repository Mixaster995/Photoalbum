namespace PhotoAlbum.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class separateBinaryTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BinaryPhotoes",
                c => new
                    {
                        PhotoID = c.Int(nullable: false),
                        Picture = c.Binary(nullable: false),
                    })
                .PrimaryKey(t => t.PhotoID)
                .ForeignKey("dbo.Photos", t => t.PhotoID)
                .Index(t => t.PhotoID);
            
            DropColumn("dbo.Photos", "Picture");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Photos", "Picture", c => c.Binary(nullable: false));
            DropForeignKey("dbo.BinaryPhotoes", "PhotoID", "dbo.Photos");
            DropIndex("dbo.BinaryPhotoes", new[] { "PhotoID" });
            DropTable("dbo.BinaryPhotoes");
        }
    }
}
