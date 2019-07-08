namespace PhotoAlbum.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class fknotnull : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Photos", "UserId", "dbo.AspNetUsers");
            DropIndex("dbo.Photos", new[] { "UserId" });
            AlterColumn("dbo.Photos", "UserId", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.Photos", "UserId");
            AddForeignKey("dbo.Photos", "UserId", "dbo.AspNetUsers", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Photos", "UserId", "dbo.AspNetUsers");
            DropIndex("dbo.Photos", new[] { "UserId" });
            AlterColumn("dbo.Photos", "UserId", c => c.String(maxLength: 128));
            CreateIndex("dbo.Photos", "UserId");
            AddForeignKey("dbo.Photos", "UserId", "dbo.AspNetUsers", "Id");
        }
    }
}
