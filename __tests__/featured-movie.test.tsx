import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FeaturedMovie from "../components/movies/featured-movie";
import { ModalProps, Movieobj } from "../lib/types";

jest.mock("../components/movies/youtube-modal", () => {
    return function MockModal({ movie, hideModal }:ModalProps) {
        return (
            <div data-testid="modal">
                <h1>{movie!.title}</h1>
                <button onClick={hideModal}>Close</button>
            </div>
        );
    };
});

const mockMovies: Movieobj[] = [
    {
      id: 1,
      title: "Movie 1",
      name: "Movie 1",
      overview: "This is the overview for movie",
      backdrop_path: "/path/to/image1.jpg",
      vote_average: 7.50,
      genre_ids:[10,20],
      release_date:'21-02-2020'
    },
    {
      id: 2,
      title: "Movie 1",
      name: "Movie 1",
      overview: "This is the overview for movie",
      backdrop_path: "/path/to/image2.jpg",
      vote_average: 7.50,
      genre_ids:[14,30],
      release_date:'10-11-2022'
    },
  ];

describe("FeaturedMovie Component", () => {
    it("renders the featured movie with correct title and overview", () => {
        render(<FeaturedMovie Movies={mockMovies} />);

        const title = screen.getByText(/movie 1/i);
        const overview = screen.getByText(/This is the overview for movie/i);
        const voteAverage = screen.getByText(/Vote average: 7.50/i);

        expect(title).toBeInTheDocument();
        expect(overview).toBeInTheDocument();
        expect(voteAverage).toBeInTheDocument();
    });

    it("shows modal with selected movie information when button is clicked", () => {
        render(<FeaturedMovie Movies={mockMovies} />);

        const moreInfoButton = screen.getByRole("button", { name: /more information/i });
        fireEvent.click(moreInfoButton);

        const modalTitle = screen.getByTestId("modal").querySelector("h1");
        expect(modalTitle).toBeInTheDocument();
        expect(modalTitle).toHaveTextContent(/Movie 1/i);
    });

    it("closes the modal when close button is clicked", () => {
        render(<FeaturedMovie Movies={mockMovies} />);

        const moreInfoButton = screen.getByRole("button", { name: /more information/i });
        fireEvent.click(moreInfoButton);
        
        const closeButton = screen.getByText(/close/i);
        fireEvent.click(closeButton);

        const modal = screen.queryByTestId("modal");
        expect(modal).not.toBeInTheDocument();
    });

});
