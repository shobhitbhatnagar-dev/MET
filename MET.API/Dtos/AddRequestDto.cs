using System;
using System.ComponentModel.DataAnnotations;
using MET.API.Models;
using Microsoft.AspNetCore.Http;

namespace MET.API.Dtos
{
    public class AddRequestDto
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public int ProjectId { get; set; }
        [Required]
        public int ModuleId { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Requierment { get; set; }
        [Required]
        public string Priority { get; set; }
        public string Justification { get; set; }
        public string AttachmentUrl { get; set; }
        public string AttachmentTitle { get; set; }
        public int AttachmentId {get; set;}
        public string PublicId {get; set;}
        [Required]
        public string Status { get; set; }
    }
}