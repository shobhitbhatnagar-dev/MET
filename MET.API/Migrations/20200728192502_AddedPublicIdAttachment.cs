using Microsoft.EntityFrameworkCore.Migrations;

namespace MET.API.Migrations
{
    public partial class AddedPublicIdAttachment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "Attachments",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "Attachments");
        }
    }
}
