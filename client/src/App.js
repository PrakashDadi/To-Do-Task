import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios'

function App() {
  const [id, setId] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdTime, setCreatedTime] = useState('');
  const [createdBY, setCreatedBY] = useState('');
  const [completed, setCompleted] = useState('');
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setTodoList(response.data)
    })
  }, [])
  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      id: id,
      title: title,
      description: description,
      createdTime: createdTime,
      createdBY: createdBY,
      completed: completed
    }).then(() => {
      alert('succesful insert')
    });
  };

  return (
    <div className="App">
      <h1>ToDO List</h1>
      <div className="form">
        <label>TaskID:</label>
        <input type="text" name="id" onChange={(e) => {
          setId(e.target.value)
        }} />
        <label>TaskName:</label>
        <input type="text" name="title" onChange={(e) => {
          setTitle(e.target.value)
        }} />
        <label>Description:</label>
        <input type="text" name="description" onChange={(e) => {
          setDescription(e.target.value)
        }} />
        <label>CreatedTime:</label>
        <input type="time" name="createdTime" onChange={(e) => {
          setCreatedTime(e.target.value)
        }} />
        <label>CreatedBY:</label>
        <input type="text" name="createdBY" onChange={(e) => {
          setCreatedBY(e.target.value)
        }} />
        <label>Completed:</label>
        <input type="text" name="completed" onChange={(e) => {
          setCompleted(e.target.value)
        }} />

        <button onClick={submitReview}>Submit</button>

        {todoList.map((val) => {
          return (
            <h3>
              id: {val.id} | title:{val.title} | description:{val.description} | createdTime: {val.createdTime} |createdBY: {val.createdBY} |complted: {val.completed}
            </h3>
          );

        })}
      </div>
    </div>
  );
}

export default App;
