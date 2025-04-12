using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Response
    {
        public string ResponseCode { get; set; }
        public string ResponseMessage { get; set; }
        public Employee Employee { get; set; }
        public List<Employee> ListEmployees { get; set; }
    }
}