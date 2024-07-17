import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from '../components/layout/filters';

describe('Filters', () => {
  const applyFilters = jest.fn();
  const sortByvoteAverage = jest.fn();

  beforeEach(() => {
    render(<Filters applyFilters={applyFilters} sortByvoteAverage={sortByvoteAverage} />);
  });

  it('renders the component with select elements', () => {
    const typeSelect = screen.getByTestId('type-select');
    const sortSelect = screen.getByTestId('sort-select');

    expect(typeSelect).toBeInTheDocument();
    expect(sortSelect).toBeInTheDocument();
  });

  it('calls applyFilters with correct value when type is selected', () => {
    const typeSelect = screen.getByTestId('type-select');

    fireEvent.change(typeSelect, { target: { value: '28' } });

    expect(applyFilters).toHaveBeenCalledWith(28);
  });

  it('calls sortByvoteAverage with correct value when sorting is selected', () => {
    const sortSelect = screen.getByTestId('sort-select');

    fireEvent.change(sortSelect, { target: { value: 'ascending' } });

    expect(sortByvoteAverage).toHaveBeenCalledWith('ascending');
  });
});
