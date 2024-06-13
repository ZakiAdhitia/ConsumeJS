import React, { useState } from 'react'
import ModalDelete from '../ModalDelete'
import ModalAdd from '../ModalAdd';
import ModalEdit from '../ModalEdit';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';



export default function Table({ headers, data, endpoint, inputData, titleModal, columnIdentitasDelete, opsiButton, columnForTd, inputDataRes, titleModalRes ,enpointres   }) {

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [endPointToSend, setEndPointToSend] = useState([]);
    const [endPointToSendRestoration, setEndPointToSendRestoration] = useState([]);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false)
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isAddRestorationOpen, setIsAddRestorationOpen] = useState(false);     
    const [dataDetail, setDataDetail] = useState({});
    
    


    function handleModalDelete(id) {
        const endpointDelete = endpoint['delete'];
        const endpointDetail = endpoint['data_detail'];
        const replaceUrlDelete = endpointDelete.replace("{id}", id);
        const replaceUrlDetail = endpointDetail.replace("{id}", id);
        const endpointReplaced = {
            "data_detail" : replaceUrlDetail,
            "delete" : replaceUrlDelete,
        }

        setEndPointToSend(endpointReplaced);
        setIsModalDeleteOpen(true)
    }
    
    function handleModalAdd() {
        const endPointToSend = {
            "store" :endpoint['store'],
        }

        setEndPointToSend(endPointToSend);
        setIsModalAddOpen(true)

    }
    
    function handleModalRestoration() {
        const endPointToSend = {
            "store" :enpointres['store'],
        }

        setEndPointToSend(endPointToSendRestoration);
        setIsModalAddOpen(true)

    }

    

    function handleModalEdit(item) {
        const endpointUpdate = endpoint['update'];
        const endpointDetail = endpoint['data_detail'];
        const replaceUrlUpdate = endpointUpdate.replace("{id}", item);
        const replaceUrlDetail = endpointDetail.replace("{id}", item);
        const endpointReplaced = {
            "data_detail": replaceUrlDetail,
            "update" : replaceUrlUpdate
        }
        console.log(endpointReplaced);
    
        // setDataDetail(item); 
        setEndPointToSend(endpointReplaced);
        setIsModalEditOpen(true);
    }

    function handleRestore(id) {
        const endpointRestore = endpoint['restore'].replace("{id}", id);
        axios.get(endpointRestore, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
    })
    .then(res => {
        window.location.reload();
    })
    .catch(err => {
        console.log(err)
        if (err.response.status == 401) {
            navigate('/login?message=' + encodeURIComponent('Anda Belum Login'));
        }
    })
    }

    function handlePermanentDelete(id) {
        const endpointPermanentDelete = endpoint['delete_permanent'].replace("{id}", id);
        console.log(endpointPermanentDelete);
        axios.delete(endpointPermanentDelete, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            console.log('Success', res.data);
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
            if (err.response.status == 401) {
                navigate('/login?message=' + encodeURIComponent('Anda Belum Login'));
            }
            else {
                console.error('Failed to delete data:', err.response ? err.response.data : err.message);
            }
        })
    }


console.log("Headers yang diterima oleh Table:", headers);
console.log('ini data yang diterima table', data);
if (data.length > 0) {
    console.log("Data Row Keys:", Object.keys(data[0]));
}
console.log(Object.entries(data));

return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-20 py-10">
        {/* <div className="flex justify-end"> */}
    {
        opsiButton.includes("create") ? (

            <button type="button" onClick={handleModalAdd} className="justify-end inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 
            dark:hover:bg-green-700 dark:focus:ring-green-800 mb-5">Create</button>

        ) : '' 
    }
    {
        location.pathname.includes('lending') && opsiButton.includes("storeresto") ? (

            <button type="button" onClick={handleModalRestoration} className="justify-end inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 
            dark:hover:bg-green-700 dark:focus:ring-green-800 mb-5">Restoration</button>

        ) : '' 
    }   
    {
        opsiButton.includes("trash") ? (
            <Link to={'/stuff/trash'} className="justify-end inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 
            dark:hover:bg-green-700 dark:focus:ring-green-800 mb-5" >Trash</Link>
        ) : ''
    }
    {
        opsiButton.includes("trashlending") ? (
            <Link to={'/lending/trash'} className="justify-end inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 
            dark:hover:bg-green-700 dark:focus:ring-green-800 mb-5" >Trash</Link>
        ) : ''
    }
    {
        opsiButton.includes("trashuser") ? (
            <Link to={'/user/trash'} className="justify-end inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 
            dark:hover:bg-green-700 dark:focus:ring-green-800 mb-5" >Trash</Link>
        ) : ''
    }
    {
        opsiButton.includes("addinbound") ? (
            <Link to={'/inbound-stuff'} className="justify-end inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 
            dark:hover:bg-green-700 dark:focus:ring-green-800 mb-5" >Add Inbound Stuff</Link>
        ) : ''
    }
    {/* </div> */}
    
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {headers.map((header, index) => (
                    <th scope="col" className="px-6 py-3" key={index}>{header}</th>
                ))}
                <th scope="col" className="px-6 py-3"></th> 
            </tr>
        </thead>
        <tbody>
            {
                Object.entries(data).map(([index, item]) => (
                    <>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{ parseInt(index) + 1}.</td>
                            {
                                Object.entries(columnForTd).map(([key, value]) => (
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                                        
                                        {
                                            key == 'proff_file' ? 
                                            <img src={`http://localhost:8000/proff/`+item[key.replace(/[!&*;:]/g, '')]} width={50} height={90} /> : (
                                                !value ? item[key] : item[key.replace(/[!&*;:]/g, '')] ? item[key.replace(/[!&*;:]/g, '')][value] : '0'
                                            )
                                        }                                    </td>
                                ))

                            }
                            {/* <!-- aksi --> */}
                            <td className="px-6 py-4 text-right">
                                {
                                    opsiButton.includes("edit") ? (
                                        <button type="button" onClick={() => handleModalEdit(item.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                    ) : ''
                                }
                                {
                                    opsiButton.includes("delete") ? (
                                        <button type="button" onClick={() => handleModalDelete(item.id)} className="font-medium text-blue-600 dark:text-red-500 hover:underline ml-3">Delete</button>
                                    ) : ''
                                }
                                {
                                    opsiButton.includes("restore") ? (
                                        <button type="button"   onClick={() => handleRestore(item.id)} className="font-medium text-blue-600 dark:text-red-500 hover:underline ml-3">Restore</button>
                                    ) : ''
                                }
                                {
                                    opsiButton.includes("permanentDeletes") ? (
                                        <button type="button"  onClick={() => handlePermanentDelete(item.id)} className="font-medium text-blue-600 dark:text-red-500 hover:underline ml-3">Permanent Delete</button>
                                    ) : ''
                                }
                                {/* {
                                    opsiButton.includes("restoration") ? (
                                        <button type="button"  onClick={() => handleRestoration(item.id)} className="font-medium text-blue-600 dark:text-red-500 hover:underline ml-3">Restoration</button>
                                    ) : ''
                                } */}
                            </td>
                        </tr>
                    </>
                ))
                
            }
        </tbody>
    </table>
<ModalDelete isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} endpoint={endPointToSend} identitasColumn={columnIdentitasDelete}>
</ModalDelete> 


<ModalAdd isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)} endPoint={endPointToSend} inputData={inputData} titleModal={titleModal}>
</ModalAdd>

<ModalEdit isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} endPoint={endPointToSend} inputData={inputData} titleModal={titleModal}></ModalEdit>

<ModalAdd isOpen={isAddRestorationOpen} onClose={() => setIsAddRestorationOpen(false)}  inputDataRes={inputDataRes} enpointres={endPointToSendRestoration} titleModalRes={titleModalRes}></ModalAdd>

</div>
)
}
