import React, { useRef, useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
// import Wrapper from "../Helpers/Wrapper.jsx";
import styles from "./CreateUser.module.css";
import ErrorModal from "../UI/ErrorModal";

const CreateUser = (props) => {
  const [error, setError] = useState();

  // Концепция ref - получение доступа к dom элементам и возможность манипулирования ими (не рекомендуется манипулировать dom напрямую, можно считывать данные)

  // Создаем хук useRef(); и присваиваем его в переменную, затем передаем эту переменную в нужный нам dom элемент, таким образом мы получим объект в переменной, а в нем элемент dom дерева

  // В объекте есть одно поле current, это и есть dom элемент, и мы можем обращаться к нему как к dom элементу nameInputRef.current.value и получать данные

  // Эту концепцию можно применять за место useState, и на оборот
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const createUserHandler = (event) => {
    event.preventDefault();

    const inputUserName = nameInputRef.current.value;
    const inputUserAge = ageInputRef.current.value;

    if (inputUserName.trim().length === 0 || inputUserAge.trim().length === 0) {
      setError({
        title: "Некорректный ввод",
        message: "Эти поля не могут быть пустыми",
      });
      return;
    }

    if (+inputUserAge < 1) {
      setError({
        title: "Некорректный возраст",
        message: "Возраст должен быть больше 0",
      });
      return;
    }

    props.onCreateUser(inputUserName, inputUserAge);

    // Можем перезаписывать данные в элементе, в данном случае это не критично
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(false);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          onCloseModal={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={createUserHandler}>
          <label htmlFor="name">Имя</label>
          <input
            id="name"
            type="text"
            // Присваиваем ref в dom элемент, тем самым мы получаем к нему доступ
            ref={nameInputRef}
          />
          <label htmlFor="age">Возраст</label>
          <input
            id="age"
            type="number"
            ref={ageInputRef}
          />
          <Button type="submit">Добавить Пользователя</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default CreateUser;
