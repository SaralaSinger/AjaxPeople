using AjaxPeople.Data;
using AjaxPeople.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Diagnostics;

namespace AjaxPeople.Web.Controllers
{
    public class HomeController : Controller
    {
        private string _connectionString = @"Data Source=.\sqlexpress;Initial Catalog=People;Integrated Security=true;";

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult GetPeople()
        {
            var repo = new PeopleRepository(_connectionString);
            List<Person> people = repo.GetAll();
            return Json(people);
        }

        [HttpPost]
        public void AddPerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Add(person);
        }
        [HttpPost]
        public void UpdatePerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Update(person);
        }
        [HttpPost]
        public void DeletePerson(int id)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Delete(id);
        }
        [HttpPost]
        public IActionResult GetPerson(int id)
        {
            var repo = new PeopleRepository(_connectionString);
            var person = repo.GetPerson(id);
            return Json(person);
        }
    }
}