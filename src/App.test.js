import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const renderComponent = () => render(<App />);
const handleList = () => screen.getByTestId("todo-list");
const handleSubmit = () => screen.getByTestId('submit');
const handleType = () => screen.getByTestId('input-text');
const expectedValueOne = 'Drink a coffee'
const expectedValueTwo = 'Read an book'
const notExpectedValue = 'Lunch time'

const addNewItems = (items = []) => {
  items.forEach(newItem => {
    userEvent.type(handleType(), newItem)
    fireEvent.click(handleSubmit());
  });
}

describe('ToDo App:', () => {

  test('should to add an item on the list',  async () => {
    renderComponent();

    await addNewItems([expectedValueOne, expectedValueTwo]);

    expect(screen.getByText(expectedValueOne)).toHaveTextContent(expectedValueOne);
    expect(screen.getByText(expectedValueTwo)).toHaveTextContent(expectedValueTwo);
    expect(screen.getByText(expectedValueOne)).not.toHaveTextContent(notExpectedValue);
  });

  test('should to return two items in that list', async () => {
    renderComponent();

    await addNewItems([expectedValueOne, expectedValueTwo]);

    expect(handleList().children.length).toBe(2);
  });

  test('should remove an item on the list',  async () => {
    renderComponent();

    await addNewItems([expectedValueOne]);
    fireEvent.click(screen.getByTestId('remove-button-0'));

    expect(handleList()).not.toHaveTextContent(expectedValueOne);
  });

})
