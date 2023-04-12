/** @format */
"use client";

import axios from "axios";
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
// import { signIn } from "next-auth/react";

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";
const RegisterModel = () => {
	const registerModal = useRegisterModal();
	const LoginModal = useLoginModal();

	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			telephone: "",
		},
	});
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post("/api/register", data)
			.then(() => {
				toast.success("Account Created");
				registerModal.onClose();
				LoginModal.onOpen();
			})
			.catch((error) => {
				toast.error("error");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	const toggle = useCallback(() => {
		registerModal.onClose();
		LoginModal.onOpen();
	}, [LoginModal, registerModal]);
	const bodyContent = (
		<div className="flex flex-col gap-3">
			<Heading
				title="Welcome to Apartment Connect Sierra Leone"
				subtitle="Create an account!"
			/>
			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="name"
				label="Name"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="telephone"
				label="Phone Number (Without +232)"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="password"
				label="Password"
				type="password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);
	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			{/* <Button
				outline
				label="Continue with Google"
				icon={FcGoogle}
				onClick={() => signIn("google")}
			/> */}
			<div
				className="
	      text-neutral-500
	      text-center
	      mt-4
	      font-light
	    ">
				<p>
					Already have an account?
					<span
						onClick={toggle}
						className="
	          text-neutral-800
	          cursor-pointer
	          hover:underline
	        ">
						{" "}
						Log in
					</span>
				</p>
			</div>
		</div>
	);
	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title="Register"
			actionLabel="Continue"
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};
export default RegisterModel;
