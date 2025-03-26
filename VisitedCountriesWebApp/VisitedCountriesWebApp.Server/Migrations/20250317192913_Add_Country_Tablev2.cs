using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VisitedCountriesWebApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class Add_Country_Tablev2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "userId",
                table: "Countries");

            migrationBuilder.AddColumn<string>(
                name: "UserIdId",
                table: "Countries",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Countries_UserIdId",
                table: "Countries",
                column: "UserIdId");

            migrationBuilder.AddForeignKey(
                name: "FK_Countries_AspNetUsers_UserIdId",
                table: "Countries",
                column: "UserIdId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Countries_AspNetUsers_UserIdId",
                table: "Countries");

            migrationBuilder.DropIndex(
                name: "IX_Countries_UserIdId",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "UserIdId",
                table: "Countries");

            migrationBuilder.AddColumn<string>(
                name: "userId",
                table: "Countries",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
