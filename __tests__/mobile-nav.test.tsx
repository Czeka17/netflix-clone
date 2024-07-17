import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MobileNavigation from "../components/layout/mobile-nav";
import * as nextAuth from "next-auth/react";
import { useRouter } from "next/router";

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("MobileNavigation", () => {
  const mockPush = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    render(<MobileNavigation />);
  });

  it("renders the navigation bar", () => {
    expect(screen.getByText("Moowiz")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("Films")).toBeInTheDocument();
    expect(screen.getByText("My List")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Log out/i })).toBeInTheDocument();
  });

  it("handles input changes and redirects on search", () => {
    const searchInput = screen.getByPlaceholderText("Search");

    fireEvent.change(searchInput, { target: { value: "Inception" } });
    
    expect(mockPush).toHaveBeenCalledWith("/search?q=Inception");
  });

  it("calls signOut when logout button is clicked", () => {
    const logoutButton = screen.getByRole("button", { name: /Log out/i });
    
    fireEvent.click(logoutButton);

    expect(nextAuth.signOut).toHaveBeenCalled();
  });
});
