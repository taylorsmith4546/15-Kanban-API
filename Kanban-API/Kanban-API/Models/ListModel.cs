using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kanban_API.Models
{
    public class ListModel
    {
        public int ListId { get; set; }
        public string Name { get; set; }
        public System.DateTime CreatedDate { get; set; }

        public string CardsUrl
        {
            get
            {
                return $"http://localhost:52991/api/lists/{ListId}/cards";
            }

        }
    }
}