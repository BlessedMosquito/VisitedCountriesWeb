using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VisitedCountriesWebApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class Add_Country_Tablev3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Countries_AspNetUsers_UserIdId",
                table: "Countries");

            migrationBuilder.RenameColumn(
                name: "UserIdId",
                table: "Countries",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Countries_UserIdId",
                table: "Countries",
                newName: "IX_Countries_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Countries_AspNetUsers_UserId",
                table: "Countries",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Countries_AspNetUsers_UserId",
                table: "Countries");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Countries",
                newName: "UserIdId");

            migrationBuilder.RenameIndex(
                name: "IX_Countries_UserId",
                table: "Countries",
                newName: "IX_Countries_UserIdId");

            migrationBuilder.AddForeignKey(
                name: "FK_Countries_AspNetUsers_UserIdId",
                table: "Countries",
                column: "UserIdId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
