import * as  yup from 'yup';

const PostLikeSchemas = {
	like: {
		params: yup
			.object({
				id: yup.number().integer().required("Id is required")
			})
			.noUnknown()
	}
};
export default PostLikeSchemas;
