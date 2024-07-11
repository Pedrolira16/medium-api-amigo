import * as yup from 'yup';

const userSchema = {
	create: {
		body: yup
			.object({
				name: yup.string().required("Name is required"),
				email: yup.string().email().required("Email is required"),
				password: yup.string().required("Password is required"),
			})
			.noUnknown(),
	},
	login: {
		body: yup
			.object({
				email: yup.string().email().required("Email is required"),
				password: yup.string().required("Password is required"),
			})
			.noUnknown(),
	}
}
export default userSchema;