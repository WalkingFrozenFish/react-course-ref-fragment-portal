import Card from "./Card";
import Button from "./Button";
import styles from "./ErrorModal.module.css";
import React from "react";
// Импортируем библиотеку для работы с dom деревом
import ReactDom from "react-dom";

// Концепция порталов - данная концепция предполагает отображение компонентов в разных местах dom дерева
// К примеру у нас в логике компонентов есть модальное окно, при создании dom дерева, это модальное окно будет отрисовано в глубине dom дерева, это не корректно с точки зрения семантики, для решения этой проблемы есть концепция порталов. 
// Мы можем указать реакту, где должны быть отрисованы компоненты. В данном случае мы в index.html создали два div, в них будет отрисована подложка и модальное окно.
// То есть модальное окно будет отрисовано в самом верху dom дерева, что правильно с точки зрения семантики. 
// Таким образом мы можем отрисовывать компоненты правильно с точки зрения семантики, и при этом не нарушая исходную структуру всех компонентов.


// В данном случае мы создаем два компонента, подложка и модальное окно
const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onCloseModal}></div>
}

const Modal = (props) => {
  return (
    <Card className={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={styles.content}>
        <p>{props.message}</p>
      </div>
      <footer className={styles.actions}>
        <Button onClick={props.onCloseModal}>Закрыть</Button>
      </footer>
    </Card>
  );
}

// Эти два компонента мы передаем в компонент, который мы используем в других компонентах
const ErrorModal = (props) => {
  return (
    <React.Fragment>
      {/* Обращаемся к импортированной библиотеке "react-dom" и методу createPortal, куда аргументми передаем jsx компонент и селектор, в который будет встраиваться компонент */}
      {/* Так же передаем все props из внешнего компонента дальше */}
      {ReactDom.createPortal(<Backdrop onCloseModal={props.onCloseModal} />, document.getElementById("backdrop"))}

      {ReactDom.createPortal(<Modal title={props.title} message={props.message} onCloseModal={props.onCloseModal} />, document.getElementById("modal"))}
    </React.Fragment>
  );
};

export default ErrorModal;
