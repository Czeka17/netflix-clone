import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import SignupModal from '../components/auth/signup-modal';
import * as nextAuth from "next-auth/react";
import { createUser } from '../lib/api';
import { useRouter } from 'next/navigation';



jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
  }));

jest.mock("../lib/api", () => ({
  createUser: jest.fn(),
}));

const hideModal = jest.fn();

describe("SignupModal", () => {

  beforeEach(() => {
    jest.clearAllMocks();
});

  beforeEach(() => {
    const modalContainer = document.createElement("div");
    modalContainer.setAttribute("id", "modals");
    document.body.appendChild(modalContainer);
  });

  afterEach(() => {
    const modalContainer = document.getElementById("modals");
    if (modalContainer) {
      document.body.removeChild(modalContainer);
    }
    jest.clearAllMocks();
  });

  it("renders the modal correctly", () => {
    render(<SignupModal showModal={true} hideModal={hideModal} />);
    
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
  });



  it("redirects to '/' on successful signup", async () => {
    (createUser as jest.Mock).mockResolvedValueOnce({});
    (nextAuth.signIn as jest.Mock).mockResolvedValueOnce({ error: null });
    
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
        replace: mockPush,
    });
    

    render(<SignupModal showModal={true} hideModal={hideModal} />);
    
    fireEvent.change(screen.getByPlaceholderText("name"), {
        target: { value: "John1223" },
    });
    fireEvent.change(screen.getByPlaceholderText("email"), {
        target: { value: "test@test245.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
        target: { value: "password1233" },
    });

    await act(async () => {
        fireEvent.submit(screen.getByRole("form"));
    });

    await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/");
    });
    expect(createUser).toHaveBeenCalledWith("test@test245.com", "John1223", "password1233");

    
    expect(nextAuth.signIn).toHaveBeenCalledWith("credentials", {
        email: "test@test245.com",
        password: "password1233",
        redirect: false,
    });
});

  it("displays error notification on failed signup", async () => {
    (createUser as jest.Mock).mockRejectedValueOnce(new Error("User already exists"));

    render(<SignupModal showModal={true} hideModal={hideModal} />);

    fireEvent.change(screen.getByPlaceholderText("name"), {
      target: { value: "John1Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "test@tes1112.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "password125233" },
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole("form"));
    });

    await waitFor(() => {
      expect(screen.getByText("Error!")).toBeInTheDocument();
    });
  });

  it("calls hideModal when Cancel button is clicked", () => {
    render(<SignupModal showModal={true} hideModal={hideModal} />);

    fireEvent.click(screen.getByText("Cancel"));

    expect(hideModal).toHaveBeenCalled();
  });
});
