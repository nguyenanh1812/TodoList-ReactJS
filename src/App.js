import TodoList from "./components/TodoList";
import Textfield from "@atlaskit/textfield"
import Button from "@atlaskit/button"
import { useState } from "react";
import { v4 } from "uuid"
import { useCallback } from "react";
import { useEffect } from "react";

const inputStyle = {
  fontSize: '17px',
  color: 'red',
  padding: '20px 20px 20px 10px'
}

const buttonStyle = {
  fontSize: "20px",
  margin: '4px'
}


const TODO_APP_STORAGE_KEY = "TODO_APP";
//state: các dữ liệu nội tại của components hiện tại
//props: các dữ liệu được truyền từ phía bên ngoài vào, từ element cha
function App() {
  const [todoList, setTodoList] = useState([]) //array 2 element gồm todoList: 1 biến lưu trữ state; element thứ 2  (setTodoList) là 1 method dùng để cập nhật state
  const [textInput, setTextInput] = useState("") //Lưu trữ giá trị người dùng vừa nhập

  //lƯU VÀO local STORAGE
  useEffect(() => {
    const storageTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storageTodoList) {
      setTodoList(JSON.parse(storageTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);


  const onTextInputChange = useCallback((event) => {
    setTextInput(event.target.value)
  }, []);
  //Sử dụng usecallback để biến onTextInputChange, onAddButtonClick sẽ không bị khởi tạo lại sau mỗi lần add render lại

  const onAddButtonClick = useCallback((e) => {
    // Thêm text input vào danh sách todo list
    setTodoList([
      { id: v4(), name: textInput, isCompleted: false },
      ...todoList,
    ]);
    setTextInput("");
  }, [textInput, todoList]); //Khi có sự thay đổi của textInput thì function trong usecallback sẽ được chạy lại để cập nhật giá trị mới nhất của text input

  //cập nhật trạng thái
  const onCheckIconClick = useCallback((id) => {
    setTodoList(prevState => prevState.map(todo => todo.id === id ? { ...todo, isCompleted: true } : todo))
  }, []);


  return (
    <>
      <h2>Danh sách việc cần làm</h2>
      <Textfield name="add-todo" placeholder=" Thêm công việc"
        elemAfterInput={
          <Button style={buttonStyle} isDisabled={!textInput} appearance='primary' onClick={onAddButtonClick}>Thêm</Button>
        }
        style={inputStyle}
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield>
      <TodoList todoList={todoList} onCheckIconClick={onCheckIconClick} />
    </>
  );
}

export default App;
