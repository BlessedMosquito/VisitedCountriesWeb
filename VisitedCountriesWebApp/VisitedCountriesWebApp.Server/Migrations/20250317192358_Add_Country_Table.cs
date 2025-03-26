using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VisitedCountriesWebApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class Add_Country_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    userId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    capitl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    population = table.Column<int>(type: "int", nullable: false),
                    region = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    subRegion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    area = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Countries");
        }
    }
}
