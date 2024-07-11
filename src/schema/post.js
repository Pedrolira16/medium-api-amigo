import * as yup from 'yup';

const postSchema = {
    create: {
        body: yup
            .object({
                title: yup.string().required("Title is required"),
                summary: yup.string().required("Summary is required"),
                content: yup.string().required("Content is required"),
                available_at: yup.date()
            })
            .noUnknown()
    },

    list: {
        query: yup
            .object({
                page: yup.number().integer().min(1)
            })
            .noUnknown()
    },

    listById: {
        params: yup
            .object({
                id: yup.number().integer().required("Id is required")
            })
            .noUnknown()
    },

    remove: {
        params: yup
            .object({
                id: yup.number().integer().required("Id is required")
            })
            .noUnknown()
    },

    update: {
        params: yup
            .object({
                id: yup.number().integer().required("Id is required")
            }),
        body: yup
            .object({
                title: yup.string().required("Title is required"),
                summary: yup.string().required("Summary is required"),
                content: yup.string().required("Content is required"),
            })
            .noUnknown()
    }
};
export default postSchema;