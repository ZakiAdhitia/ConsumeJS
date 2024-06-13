import Table from '../components/Table/Table'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Case from '../components/Case';
import axios from 'axios';


export default function User() {

  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
      axios.get("http://localhost:8000/user", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setUser(res.data.data);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 401) {
            navigate("/login?message=" + encodeURIComponent("Anda Belum Login!"));
          }
        });
    }
  
    const headers = [
      "#" , 
      "username", 
      "email",
      "role",
      
    ]

    const title = "User";
  
    const endpointModal = {
          data_detail: "http://localhost:8000/user/show/{id}",
          store:  "http://localhost:8000/user/store",
          delete: "http://localhost:8000/user/delete/{id}",
          update: "http://localhost:8000/user/update/{id}",
        };

    const columnIdentitasDelete = "username";
    

    const buttons = [
            "create",
            "edit",
            "delete",
            "trashuser"
          ]
        
    const tdColumn = {
      "username" : null, 
      "email" : null,
      "role": null,
    }
      
    const inputData = {
      username: {
        tag: "input",
        type: "text",
        option: "null",
      },
      password: {
        tag: "input",
        type: "password",
        option: "null",
      },
      email: {
        tag: "input",
        type: "text",
        option: "null",
      },
      role: {
        tag: "select",
        type: "select",
        option: ["staff", "admin"],
      },
    };

  return (
    <Case>
    
    <Table 
    headers={headers} 
    data={user} 
    endpoint={endpointModal} 
    inputData={inputData}
    titleModal={title} 
    identitasColumn={columnIdentitasDelete} 
    opsiButton={buttons} 
    columnForTd={tdColumn} 
    >
    </Table>
    
    </Case>
  )
}
