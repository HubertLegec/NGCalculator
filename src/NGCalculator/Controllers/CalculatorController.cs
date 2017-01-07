using Microsoft.AspNetCore.Mvc;
using System;

namespace CalculatorMVC.Controllers
{
    public class CalculatorController : Controller
    {

        public IActionResult Index()
        {
            return View();
        }
    }
}

