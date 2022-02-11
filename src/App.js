import React, { useState } from "react";
import CreateUser from "./components/Users/CreateUser";
import UserList from "./components/Users/UserList";

const App = () => {
  const [userList, setUserList] = useState([]);

  const createUserHandler = (name, age) => {
    setUserList((prevUserList) => {
      return [
        ...prevUserList,
        { name: name, age: age, id: Math.random().toString() },
      ];
    });
  };

  return (
    <React.Fragment>
      <CreateUser onCreateUser={createUserHandler} />
      <UserList users={userList} />
    </React.Fragment>
  );
};

export default App;
