import React, { useState, useEffect } from "react";
import Case from "../components/Case";
import Table from "../components/Table/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Stuff() {

  const [stuffs, setStuffs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getStuffs();
  }, []);

  function getStuffs() {
    axios
      .get("http:///localhost:8000/stuff", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setStuffs(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          navigate("/login?message=" + encodeURIComponent("Anda Belum Login!"));
        }
      });
  }

  const headers = ["#", "Stuff-Name", "Category", "Total Available", "Total Defec"];

  const endpointModal = {
    data_detail: "http://localhost:8000/stuff/show/{id}",
    delete: "http://localhost:8000/stuff/delete/{id}",
    update: "http://localhost:8000/stuff/{id}",
    store: "http://localhost:8000/stuff/store", 
  };

  const inputData = {
    name: {
      tag: "input",
      type: "text", 
      option: "null",
    },
    category: {
      tag: "select",  
      type: "select",
      option: ["KLN", "HTL", "Teknisi/Sarpras"],
    },
  };

  const title = "Stuff";

  const columnIdentitasDelete = "name";

  const buttons = [
    "create",
    "trash",
    "edit",
    "delete"
  ]
  // stuff_id. user_id

  const tdColumn = {
    "name" : null,
    "category" : null,
    "stuff_stock" : "total_available",
    "stuff_stock*" : "total_defec",
  }

  return (


    <Case>
      <Table
        headers={headers}
        data={stuffs}
        endpoint={endpointModal}
        inputData={inputData}
        titleModal={title}
        identitasColumn={columnIdentitasDelete}
        opsiButton={buttons}
        columnForTd={tdColumn}
      ></Table>
    </Case>
  );
}
