import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const TodoApi = createApi({
    reducerPath: "TodoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://664f05e0fafad45dfae1f273.mockapi.io/demo"
    }),
    tagTypes: ["Todo"],
    endpoints: (builder) => ({
        AddTodo: builder.mutation({
            query: (body) => ({
                url: "",
                method: "POST",
                body: body
            }),
            invalidatesTags: ["Todo"]
        }),
        GetTodo: builder.query({
            query: () => ({
                url: "",
                method: "GET",
            }),
            providesTags: ["Todo"]
        }),
        DeleteTodo: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Todo"]
        }),
        EditTodo: builder.mutation({
            query: (body) => {
                console.log(body,"bodybody")
                return {
                    url: `/${body?.id}`,
                    method: "PUT",
                    body: body
                }
            },
            invalidatesTags: ["Todo"]
        }),
    })
})

export const { useAddTodoMutation, useGetTodoQuery, useDeleteTodoMutation, useEditTodoMutation } = TodoApi

