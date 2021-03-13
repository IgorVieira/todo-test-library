import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../index';

const expectedValueOne = 'Drink a coffee'
const expectedValueTwo = 'Read an book'

const addNewItems = (items = [], screen) => {
  const input = screen.getByTestId('input-text');
  const submitButton = screen.getByTestId('submit');
  items.forEach(newItem => {
    userEvent.type(input, newItem)
    fireEvent.click(submitButton);
  });
}

// Using the <tag /> notation indicates that we are testing a UI component
describe('<TodoList />', () => {

  // The test name describes specifically what we are testing
  test('add items to the list',  async () => {
    const screen = render(<TodoList />);
    const todoList = screen.getByTestId("todo-list");

    //The first expect assures that the list is empty by default
    expect(todoList.children.length).toBe(0);

    // The user interaction with the component
    addNewItems(
      [expectedValueOne, expectedValueTwo],
      screen,
    );

    // The tests after the user interaction confirm the expected behaviour
    expect(todoList.children.length).toBe(2);

    // The same values on the user interaction are used in the test
    expect(screen.getByText(expectedValueOne)).toBeInTheDocument();
    expect(screen.getByText(expectedValueTwo)).toBeInTheDocument();
  });

  test('remove an item of the list',  async () => {
    const screen = render(<TodoList />);
    const todoList = screen.getByTestId("todo-list");

    expect(todoList.children.length).toBe(0);

    addNewItems([expectedValueOne], screen);
    expect(todoList.children.length).toBe(1);

    fireEvent.click(screen.getByTestId('remove-button-0'));
    expect(todoList.children.length).toBe(0);
  });

})
