import React, { useState } from 'react';
import './TodoList.css';

function App() {

  const [ listItem, setListItem ] = useState([]);
  const [ item, setItem ] = useState({ id: '', text: '' });

  const handleOnChange = (e) =>
    setItem({
      id: `${e.target.value}-${Math.random() * 100}`,
      text: e.target.value
    })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (item?.text.length === 0) {
      return
    }

    setListItem([...listItem, item])
    setItem({ id: '', text: '' })

  }

  const handleDelete = (id) => {
    const newList = listItem?.filter(x => id !== x?.id)
    setListItem(newList)
  }


  return (
    <div className="App">
      <div>Hey Everyone!</div>
      <ul data-testid="todo-list">
        {
          listItem?.map((item, index) => (
            <li key={index}>
              <div style={{ display: "flex", marginBottom: 20 }}>
                <div>{item?.text}</div>
                <button
                  style={{ marginLeft: "12px", cursor: "pointer" }}
                  data-testid={`remove-button-${index}`}
                  onClick={() => handleDelete(item?.id)}
                >
                  x
                </button>
              </div>
            </li>
          ))
        }
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="item"
          value={item?.text}
          data-testid="input-text"
          onChange={(e) => handleOnChange(e)}
        />
        <button data-testid="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
