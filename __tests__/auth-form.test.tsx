import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AuthForm from "../components/auth/auth-form";
import * as nextAuth from "next-auth/react";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("AuthForm", () => {

  beforeEach(() => {
    const modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modals');
    document.body.appendChild(modalContainer);

    const mockRouter = {
      replace: jest.fn(),
    };
    (require("next/navigation").useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<AuthForm />);
  });

  afterEach(() => {
    const modalContainer = document.getElementById('modals');
    if (modalContainer) {
      document.body.removeChild(modalContainer);
    }
  });

  it("renders the AuthForm with the title and description", () => {
    expect(screen.getByText("Moowiz")).toBeInTheDocument();
    expect(screen.getByText("Log in or create a free account now!")).toBeInTheDocument();
    expect(screen.getByText("Watch tons of movies in one place!")).toBeInTheDocument();
  });

  it("displays a notification when the login is pending", async () => {
    (nextAuth.signIn as jest.Mock).mockResolvedValueOnce({ error: null });

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "test@test.pl" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "test123" },
    });

    fireEvent.submit(screen.getByRole("form"));

    expect(screen.getByText("Checking...")).toBeInTheDocument();
  });

  it("displays success notification on successful login", async () => {
    (nextAuth.signIn as jest.Mock).mockResolvedValueOnce({ error: null });

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "test@test.pl" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "test123" },
    });

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText("Success!")).toBeInTheDocument();
      expect(screen.getByText("logged in successfully")).toBeInTheDocument();
    });
  });

  it("displays error notification on failed login", async () => {
    (nextAuth.signIn as jest.Mock).mockResolvedValueOnce({ error: "Invalid credentials" });

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "wrong@test.pl" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "wrongpass" },
    });

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText("Error!")).toBeInTheDocument();
      expect(screen.getByText("Invalid inputs!")).toBeInTheDocument();
    });
  });

  it("shows the signup modal when the button is clicked", () => {
    fireEvent.click(screen.getByText("Create new account"));

    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("shows email and password examples", () => {
    expect(screen.getByText("email: test@test.pl")).toBeInTheDocument();
    expect(screen.getByText("password: test123")).toBeInTheDocument();
  });
});
