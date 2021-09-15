import React, { useState, useEffect } from "react";
import "./style.css";

//get the localStorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const addItem = () => {
    if (!inputdata) {
      alert("Plz fill the data");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };
  const deleteItem = (index) => {
    const updatedItem = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItem);
  };

  //remove all the elements
  const removeAll = () => {
    setItems([]);
  };

  //adding localStorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            {/* <img src="./images/todo.svg" alt="todo logo" /> */}
            <figcaption>Todo List</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Input your Todo List"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i class="fa fa-pencil-square-o" onClick={addItem}></i>
            ) : (
              <i class="fa fa-plus" onClick={addItem}></i>
            )}
          </div>
          {/* show yout items */}

          <div className="showItem">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      class="fa fa-pencil-square-o"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      class="fa fa-trash-o"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItem">
            <button
              className="btn effect04"
              data-sm-link-text="Clear Items"
              onClick={removeAll}
            >
              <span>clear list</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
