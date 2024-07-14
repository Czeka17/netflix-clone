import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AuthForm from "../components/auth/auth-form";

jest.mock("next/router");

describe("<AuthForm/>", () => {
	test("TEST1", () => {
		expect(screen.getByLabelText("email")).toBeInTheDocument();
		expect(screen.getByLabelText("password")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Create new account" })
		).toBeInTheDocument();
	});

	test("test2", () => {
		fireEvent.click(screen.getByRole("button", { name: "Create new account" }));
		expect(screen.getByText("Sign Up")).toBeInTheDocument();
	});

	test("test3", () => {
		fireEvent.click(screen.getByRole("button", { name: "Create new account" }));
		expect(screen.getByText("SignupModal")).toBeInTheDocument();

		fireEvent.change(screen.getByLabelText("email"), {
			target: { value: "test@example.com" },
		});
		fireEvent.change(screen.getByLabelText("password"), {
			target: { value: "password123" },
		});
		fireEvent.submit(screen.getByRole("button", { name: "Log in" }));

		expect(screen.getByText("Checking credentials")).toBeInTheDocument();
		expect(screen.getByText("Success!")).toBeInTheDocument();
		expect(screen.queryByText("SignupModal")).toBeNull();
	});
});
