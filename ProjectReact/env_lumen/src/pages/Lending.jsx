import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Table from '../components/Table/Table';
import Case from '../components/Case';

export default function Lending() {

    const [lending, setLending] = useState([]);
    const navigate = useNavigate();
    const [stuffs, setStuffs] = useState([])
  
    useEffect(() => {
      getLending();
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

    function getLending() {
        axios.get("http://localhost:8000/lending", {
            headers: {
              'Authorization': "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            setLending(res.data.data);
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status == 401) {
              navigate("/login?message=" + encodeURIComponent("Anda Belum Login!"));
            }
          });
      }

    
    const headers = [
    "no" , 
    "name stuff", 
    "username" , 
    "user-id", 
    "date" , 
    "notes",
    "total_Stuff",
    // "restoration"
  ]
    
    const endpointModal = {
        "store": "http://localhost:8000/lending/store",
        "delete": "http://localhost:8000/lending/delete/{id}" ,
        "data_detail": "http://localhost:8000/lending/show/{id}",
        // "storeresto": "http://localhost:8000/restoration/store"
      };

    const endpointModalRes = {
        "store": "http://localhost:8000/restoration/store",
      };

      
    
      const inputData = {
        name: {
          tage: "input",
          type: "text",
          option: "null",
        },
        stuff_id: {
          tage: "input",
          type: "number",
          option: "null",
        },
        user_id: {
          tage: "input",
          type: "number",
          option: "null",
        },
        date_time: {
          tage: "input",
          type: "datetime-local",
          option: "null",
        },
        notes: {
          tage: "input",
          type: "text",
          option: "null",
        },
        total_stuff: {
          tage: "input",
          type: "number",
          option: "null",
        },
      };
    
      const inputDataRes = {
        user_id: {
          tag: "input",
          type: "number",
          option: null,
        },
        lending_id: {
          tag: "input",
          type: "number",
          option: lending,
        },
        date_time: {
          tag: "input",
          type: "datetime-local",
          option: "null",
        },
        total_good_stuff: {
          tag: "input",
          type: "number",
          option: "null",
        },
        total_defec_stuff: {
          tag: "input",
          type: "number",
          option: "null",
        },
      };

      const title = "Lending";
      const titleres = "Restoration";
    
      const columnIdentitasDelete = "name";
    
    const buttons = [
        "create",
        "trashlending",
        "delete", 
        "storeresto"
      ]

    
      const tdColumn = {
        "name" : null,
        "stuff" :"name",
        "user" : "username",
        "date_time" : null,
        "total_stuff" : null,
        "notes" : null,
        "total_stuff" : null,
        // "restoration": "id"
      }
    
    
    
  return (
    
    <Case>
        <Table 
        headers={headers} 
        data={lending} 
        endpoint={endpointModal}
        endpointres={endpointModalRes}
        inputDataRes={inputDataRes}
        titleModal={title}  
        titleModalRes={titleres}  
        opsiButton={buttons} 
        columnForTd={tdColumn}
        inputData={inputData}
        identitasColumn={columnIdentitasDelete}>
        </Table>
    </Case>

  )
}
