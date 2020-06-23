using AutoMapper;
using MET.API.Dtos;
using MET.API.Models;


namespace MET.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserDto>();
            CreateMap<Project, ProjectDto>();
            CreateMap<Module, ModuleDto>();
            CreateMap<Request, RequestforlistDto>();
            CreateMap<Request, RequestforDetailsDto>();

        }
    }
}