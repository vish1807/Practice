using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/Employee")]
    public class EmployeeController : ApiController
    {
        private readonly EmployeeEntities db = new EmployeeEntities();

        [Route("AddEmployee")]
        [HttpPost]
        public Response AddEmployee(EmployeeModel employeeModel)
        {
            Response response = new Response();
            var employee = new Employee() {
                Id = employeeModel.Id,
                FirstName = employeeModel.FirstName,
                LastName = employeeModel.LastName,
                Email = employeeModel.Email,
                Mobile = employeeModel.Mobile };
            if (employeeModel.Type== "Add")
            {
                if(employee != null)
                {
                    db.Employees.Add(employee);
                    db.SaveChanges();
                    response.ResponseCode = "200";
                    response.ResponseMessage = "Employee Added Succesfully!";
                }
                else
                {
                    response.ResponseCode = "100";
                    response.ResponseMessage = "Some Error occurred!";
                }
            }
            else if (employeeModel.Type == "Update")
            {
                if (employee != null)
                {
                    db.Entry(employee).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    response.ResponseCode = "200";
                    response.ResponseMessage = "Employee Data Updated Successfully!";
                }
                else
                {
                    response.ResponseCode = "100";
                    response.ResponseMessage = "Some Error occurred!";
                }
            }
            else if (employeeModel.Type == "Delete")
            {
                if (employee != null)
                {
                    db.Entry(employee).State = System.Data.Entity.EntityState.Deleted;
                    db.SaveChanges();
                    response.ResponseCode = "200";
                    response.ResponseMessage = "Employee Data Deleted Successfully!";
                }
                else
                {
                    response.ResponseCode = "100";
                    response.ResponseMessage = "Some Error occurred!";
                }
            }

            return response;

        }

        [Route("GetEmployee")]
        [HttpGet]
        public Response GetEmployees()
        {
            return new Response
            {
                ListEmployees = db.Employees.ToList(),
                ResponseCode = "200",
                ResponseMessage = "Data fetched Successfully!"
            };
        }

        [Route("EmployeeById")]
        [HttpPost]
        public Response EmmployeeById(EmployeeModel employeeModel)
        {
            Response response = new Response();
            var employee = new Employee();
            if(employeeModel != null && employeeModel.Id > 0)
            {
                employee = db.Employees.FirstOrDefault(x => x.Id == employeeModel.Id);
                response.ResponseCode = "200";
                response.ResponseMessage = "Data fetched Successfully!";
                response.Employee = employee;
            }
            return response;
        }
    }
}
