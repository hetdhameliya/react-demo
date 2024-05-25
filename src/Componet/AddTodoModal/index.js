import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import "./style.scss"
import { actions } from '../../Redux/store';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useAddTodoMutation, useEditTodoMutation } from '../../Api/Todo';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function AddTodoModal() {

    const modal = useSelector((sate) => sate.drawer.todoModal)

    const [EditTodo] = useEditTodoMutation();


    const [AddTodo, { isLoading }] = useAddTodoMutation();

    console.log(modal?.data?.id, "modal?.data?.note?.id")

    const formik = useFormik({
        initialValues: {
            note: "",
            title: "",
            done: ""
        },

        validationSchema: Yup.object({
            note: Yup.string().required("this filed are required"),
            title: Yup.string().required("this filed are required"),
            done: Yup.string().required("this filed are required"),
        }),


        onSubmit: async (values) => {

            if (modal?.data?.id) {
                const body = {
                    note: values?.note,
                    title: values?.title,
                    done: values?.done,
                    id: modal?.data?.id
                }
                const response = await EditTodo(body)
                response && toast.success("TDOD Edit successfuly")
            } else {
                const response = await AddTodo(values)
                response && toast.success("TDOD Added successfuly")

            }
            handleClose();
            formik.resetForm();

        }
    })

    const handleClose = () => {
        actions.drawer.closeTodoModal(null)
    }

    useEffect(() => {
        formik.setFieldValue("note", modal?.data?.note || "")
        formik.setFieldValue("title", modal?.data?.title || "")
        formik.setFieldValue("done", modal?.data?.done || "")
    }, [modal])



    return (
        <Modal
            open={modal.opne}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style} >

                <div className='heading' >
                    <span className='heading_text'>Add Todo</span>
                </div>


                <form >

                    <div className="main_body">
                        <TextField name='title' value={formik.values.title} onChange={formik.handleChange} error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title} sx={{ width: "100%" }} id="outlined-basic" label="Title" variant="outlined" />
                        <TextField name='note' value={formik.values.note}
                            onChange={formik.handleChange}
                            error={formik.touched.note && Boolean(formik.errors.note)}
                            helperText={formik.touched.note && formik.errors.note}
                            sx={{ width: "100%" }} id="outlined-basic" label="Note" variant="outlined" />

                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="done"
                                value={formik.values.done}
                                onChange={formik.handleChange}
                                error={formik.touched.done && Boolean(formik.errors.done)}
                            >
                                <MenuItem value={"true"}>True</MenuItem>
                                <MenuItem value={"false"}>False</MenuItem>
                            </Select>
                            {formik.errors.done && formik.touched.done ? (
                                <Typography color="error" variant="caption">{formik.errors.done}</Typography>
                            ) : null}
                        </FormControl>
                    </div>

                    <div className='btns'>
                        <Stack spacing={2} direction="row">
                            <Button endIcon={isLoading ? <CircularProgress sx={{ color: "white" }} size={20} /> : null} onClick={() => {
                                formik.handleSubmit();
                            }} sx={{ width: "8rem", height: "2.5rem" }} variant="contained"> {modal?.data?.id ? "Edit" : "Add"}</Button>
                            <Button onClick={handleClose} sx={{ width: "8rem", height: "2.5rem" }} variant="outlined">Cancle</Button>
                        </Stack>
                    </div>
                </form>

            </Box>
        </Modal>
    )
}
