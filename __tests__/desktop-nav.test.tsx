import DesktopNav from '../components/layout/desktop-nav'
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from 'next/router';
import { signOut } from "next-auth/react";

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

describe("DesktopNav", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/',
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the navigation correctly", () => {
    render(<DesktopNav navBg="bg-black" />);

    expect(screen.getByText("Moowiz")).toBeInTheDocument();
    expect(screen.getByText("Films")).toBeInTheDocument();
    expect(screen.getByText("My List")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search for a movie")).toBeInTheDocument();
    expect(screen.getByText("Log out")).toBeInTheDocument();
  });

  it("navigates to the search page on input change", () => {
    render(<DesktopNav navBg="bg-black" />);

    const input = screen.getByPlaceholderText("Search for a movie");
    fireEvent.change(input, { target: { value: "Inception" } });

    expect(mockPush).toHaveBeenCalledWith("/search?q=Inception");
  });


  it("logs out when the logout button is clicked", () => {
    render(<DesktopNav navBg="bg-black" />);

    const logoutButton = screen.getByText("Log out");
    fireEvent.click(logoutButton);

    expect(signOut).toHaveBeenCalled();
  });
});
