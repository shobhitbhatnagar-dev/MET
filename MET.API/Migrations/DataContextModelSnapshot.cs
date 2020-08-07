﻿// <auto-generated />
using System;
using MET.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MET.API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity("MET.API.Models.Approval", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("ApprovalDate");

                    b.Property<string>("ApprovalMail");

                    b.Property<string>("Approver");

                    b.Property<int>("ApproverId");

                    b.Property<int>("FinalEfforts");

                    b.Property<string>("PublicId");

                    b.Property<string>("Title");

                    b.Property<bool>("UAT");

                    b.HasKey("Id");

                    b.ToTable("Approvals");
                });

            modelBuilder.Entity("MET.API.Models.Attachment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("PublicId");

                    b.Property<string>("Title");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.ToTable("Attachments");
                });

            modelBuilder.Entity("MET.API.Models.Effort", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Estimation");

                    b.Property<string>("PublicId");

                    b.Property<DateTime>("SubmittedDate");

                    b.Property<string>("Title");

                    b.Property<string>("WbsUrl");

                    b.HasKey("Id");

                    b.ToTable("Efforts");
                });

            modelBuilder.Entity("MET.API.Models.Module", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<string>("ModuleName");

                    b.Property<int?>("ProjectId");

                    b.HasKey("Id");

                    b.HasIndex("ProjectId");

                    b.ToTable("Modules");
                });

            modelBuilder.Entity("MET.API.Models.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<string>("ProjectName");

                    b.HasKey("Id");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("MET.API.Models.Release", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("PublicId");

                    b.Property<DateTime>("ReleaseDate");

                    b.Property<string>("ReleaseNoteUrl");

                    b.Property<string>("Title");

                    b.Property<DateTime>("UpdatedOn");

                    b.HasKey("Id");

                    b.ToTable("Releases");
                });

            modelBuilder.Entity("MET.API.Models.Request", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ApprovalId");

                    b.Property<int?>("AttachmentId");

                    b.Property<DateTime>("CreationDate");

                    b.Property<int?>("EffortId");

                    b.Property<string>("Justification");

                    b.Property<int?>("ModuleId");

                    b.Property<string>("Priority");

                    b.Property<int?>("ProjectId");

                    b.Property<int?>("ReleaseId");

                    b.Property<string>("Requierment");

                    b.Property<string>("Status");

                    b.Property<int?>("TimelineId");

                    b.Property<string>("Title");

                    b.Property<int?>("UATId");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("ApprovalId");

                    b.HasIndex("AttachmentId");

                    b.HasIndex("EffortId");

                    b.HasIndex("ModuleId");

                    b.HasIndex("ProjectId");

                    b.HasIndex("ReleaseId");

                    b.HasIndex("TimelineId");

                    b.HasIndex("UATId");

                    b.HasIndex("UserId");

                    b.ToTable("Requests");
                });

            modelBuilder.Entity("MET.API.Models.Timeline", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("PlannedDate");

                    b.Property<DateTime>("UpdatedOn");

                    b.HasKey("Id");

                    b.ToTable("Timelines");
                });

            modelBuilder.Entity("MET.API.Models.UAT", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("PublicId");

                    b.Property<DateTime>("SignOffDate");

                    b.Property<DateTime>("StartDate");

                    b.Property<string>("Title");

                    b.Property<string>("UATApproval");

                    b.Property<DateTime>("UpdatedOn");

                    b.HasKey("Id");

                    b.ToTable("UAT");
                });

            modelBuilder.Entity("MET.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<string>("Department");

                    b.Property<string>("EmailId");

                    b.Property<DateTime>("LastActive");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("Project");

                    b.Property<string>("Role");

                    b.Property<int>("Status");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("MET.API.Models.Value", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.ToTable("Values");
                });

            modelBuilder.Entity("MET.API.Models.Module", b =>
                {
                    b.HasOne("MET.API.Models.Project", "Project")
                        .WithMany()
                        .HasForeignKey("ProjectId");
                });

            modelBuilder.Entity("MET.API.Models.Request", b =>
                {
                    b.HasOne("MET.API.Models.Approval", "Approval")
                        .WithMany()
                        .HasForeignKey("ApprovalId");

                    b.HasOne("MET.API.Models.Attachment", "Attachment")
                        .WithMany()
                        .HasForeignKey("AttachmentId");

                    b.HasOne("MET.API.Models.Effort", "Effort")
                        .WithMany()
                        .HasForeignKey("EffortId");

                    b.HasOne("MET.API.Models.Module", "Module")
                        .WithMany()
                        .HasForeignKey("ModuleId");

                    b.HasOne("MET.API.Models.Project", "Project")
                        .WithMany()
                        .HasForeignKey("ProjectId");

                    b.HasOne("MET.API.Models.Release", "Release")
                        .WithMany()
                        .HasForeignKey("ReleaseId");

                    b.HasOne("MET.API.Models.Timeline", "Timeline")
                        .WithMany()
                        .HasForeignKey("TimelineId");

                    b.HasOne("MET.API.Models.UAT", "UAT")
                        .WithMany()
                        .HasForeignKey("UATId");

                    b.HasOne("MET.API.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
