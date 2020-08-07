using Microsoft.EntityFrameworkCore.Migrations;

namespace MET.API.Migrations
{
    public partial class UATupdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "UAT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "UAT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UATApproval",
                table: "UAT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "UAT");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "UAT");

            migrationBuilder.DropColumn(
                name: "UATApproval",
                table: "UAT");
        }
    }
}
