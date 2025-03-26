using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VisitedCountriesWebApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class Add_Country_Table_v31 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Countries_AspNetUsers_UserId",
                table: "Countries");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Countries",
                newName: "userId");

            migrationBuilder.RenameColumn(
                name: "capitl",
                table: "Countries",
                newName: "capital");

            migrationBuilder.RenameIndex(
                name: "IX_Countries_UserId",
                table: "Countries",
                newName: "IX_Countries_userId");

            migrationBuilder.AddForeignKey(
                name: "FK_Countries_AspNetUsers_userId",
                table: "Countries",
                column: "userId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Countries_AspNetUsers_userId",
                table: "Countries");

            migrationBuilder.RenameColumn(
                name: "userId",
                table: "Countries",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "capital",
                table: "Countries",
                newName: "capitl");

            migrationBuilder.RenameIndex(
                name: "IX_Countries_userId",
                table: "Countries",
                newName: "IX_Countries_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Countries_AspNetUsers_UserId",
                table: "Countries",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
