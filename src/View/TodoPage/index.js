import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '@mui/material'
import AddTodoModal from '../../Componet/AddTodoModal'
import { actions } from '../../Redux/store'
import { useSelector } from 'react-redux'
import "./style.scss"
import { DataGrid } from '@mui/x-data-grid';
import { useDeleteTodoMutation, useGetTodoQuery } from '../../Api/Todo';
import { render } from '@testing-library/react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { toast } from 'react-toastify'

export default function TodoPage() {

    const { data, isLoading } = useGetTodoQuery();

    const [DeletTodp, { }] = useDeleteTodoMutation();

    const handleDelete = (id) => {
        const response = DeletTodp(id);
        response && toast.success("TDOD Delet successfuly")
    }

    const columns = [
        { field: 'note', headerName: 'Note', width: 600, sortable: false, },
        { field: 'title', headerName: 'Title', width: 600, sortable: false, },
        { field: 'done', headerName: 'Done', width: 200, sortable: false, },
        {
            field: 'action',
            headerName: 'Action',
            width: 160,
            renderCell: (params) => {

                console.log(params?.row, "paramsparamsparams")


                return (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", height: "100%" }}>
                        <EditIcon sx={{ color: "green" }} onClick={() => actions.drawer.opneTodoModal(params?.row)} />
                        <DeleteIcon sx={{ color: "red" }} onClick={() => handleDelete(params?.row?.id)} />
                    </div>

                )

            }



        },
    ];


    const [todoData, setTodoData] = useState()

    useEffect(() => {
        setTodoData(data)
    }, [data])

    return (
        <div className='todo_main_page'>

            <div className='heading'>
                <span className='heding_text'>Yes,Control Your TODO</span>
            </div>

            <div className='btn_div'>
                <Button onClick={() => actions.drawer.opneTodoModal({})} variant="contained">Add Todo</Button>
            </div>



            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <div style={{ height: 600, width: '80%', marginTop: "1rem" }}>
                    <DataGrid

                        rows={todoData || []}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[10, 20, 30]}
                    />
                </div>
            </div>


            <AddTodoModal />
        </div>

    )
}
