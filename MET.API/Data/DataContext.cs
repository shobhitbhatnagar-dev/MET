using MET.API.Models;
using Microsoft.EntityFrameworkCore;

namespace MET.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Approval> Approvals { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<Effort> Efforts { get; set; }
        public DbSet<Module> Modules { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Release> Releases { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<Timeline> Timelines { get; set; }

    }
}