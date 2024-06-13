import React, { useEffect , useState} from 'react'
import Case from '../components/Case'
import axios from 'axios'
import Table from '../components/Table/Table'
import { Link } from 'react-router-dom'


export default function TrashStuff() {
    
    const [stuffTrash, setStuffTrash] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8000/stuff/trash' , {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      })
      .then(res => {
        setStuffTrash(res.data.data);
      })
      .catch(err => {
        console.log(err)
        if (err.response.status == 401) {
          navigate('/login?message=' + encodeURIComponent('Anda Belum Login'));
        }
      })
    }, [])

    const  headers = [
      "#",
      "Name",
      "Category"
    ]

    const endpointModal = {
      "restore": "http://localhost:8000/stuff/restore/{id}",
      "delete_permanent": "http://localhost:8000/stuff/permanent/{id}"
    }

    const inputData = {}

    const tittle = 'Stuff'

    const columnIdentitasDelete = 'name'

    const buttons = [
      "restore",
      "permanentDeletes",
    ]

    const tdColumn = {
      "name": null,
      "category": null
    }

    return (
      <>
      <Case>
      <div className="relative overflow-x-auto shadow-md px-20 py-10">
                    <div className="flex justify-end">
                        <Link to="/stuff" className="inline-flex items-center px-4 py-2 text-sm font-medium 
                        text-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none 
                        focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 
                        rounded-lg">Kembali</Link>
                    </div>
                </div>
        <Table headers={headers} data={stuffTrash} endpoint={endpointModal} inputData={inputData} titleModal={tittle} indentitasColumn={columnIdentitasDelete} opsiButton={buttons} 
        columnForTd={tdColumn}> 
        </Table>
      </Case>
      </>
  )
}
