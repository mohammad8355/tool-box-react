import { useState } from "react";

function ToDoList() {
  const [openForm, setOpenForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [Lists, setList] = useState(() => {
    let data = JSON.parse(localStorage.getItem("List"));
    if (data != null) {
      return data;
    } else {
      return [];
    }
  });
  function HandleAddToList(newItem) {
    Lists.push(newItem);
    setList(Lists);
  }
  function HandleDelete(id) {
    if (confirm("are you sure to delete this Item ?")) {
      setList(Lists.filter((item) => item.id != id));
    }
  }
  function HandleToggle(id) {
    setList(
      Lists.map((Item) =>
        Item.id === id ? { ...Item, finished: !Item.finished } : Item
      )
    );
  }
  function HandleSave() {
    localStorage.setItem("List", JSON.stringify(Lists));
  }
  return (
    <div style={ToDoListStyle}>
      <h1>ToDoList</h1>
      <button style={btnStyle} onClick={HandleSave}>
        {" "}
        💾
      </button>
      {openForm ? (
        <Form addData={HandleAddToList} setOpenForm={setOpenForm} />
      ) : (
        <button style={btnStyle} onClick={() => setOpenForm(!openForm)}>
          ➕
        </button>
      )}
      <List
        setSelectedItem={setSelectedItem}
        HandleToggle={HandleToggle}
        HandleDelete={HandleDelete}
        list={Lists}
      />
      {selectedItem ? (
        <ItemDetail
          Item={Lists.filter((item) => item.id === selectedItem)[0]}
          select={setSelectedItem}
        />
      ) : (
        ""
      )}
    </div>
  );
}
function List({ list, HandleDelete, HandleToggle, setSelectedItem }) {
  return (
    <ul>
      {list
        ? list.map((item) => (
            <ListItem
              Delete={HandleDelete}
              HandleToggle={HandleToggle}
              Item={item}
              key={item.id}
              select={setSelectedItem}
            />
          ))
        : ""}
    </ul>
  );
}
function ListItem({ Item, Delete, HandleToggle, select }) {
  return (
    <li style={Item.finished ? DoListItemStyle : ListItemStyle}>
      {Item.title}{" "}
      <div>
        <input onChange={() => HandleToggle(Item.id)} type="checkbox" />{" "}
        <button onClick={() => select(Item.id)}>👀</button>
        <button onClick={() => Delete(Item.id)}>❌</button>
      </div>
    </li>
  );
}
function ItemDetail({ Item, select }) {
  return (
    <>
      {Item && (
        <div style={itemDetailStyle}>
          <button onClick={() => select(null)}>❌</button>
          <h1 style={{ margin: "0" }}>{Item.title}</h1>
          <p>{Item.description}</p>
          <span style={Item.finished ? ItemCompleteStyle : ItemInprogressStyle}>
            {Item.finished ? "COMPLETE" : "INPROGRESS"}
          </span>
        </div>
      )}
    </>
  );
}
function Form({ addData, setOpenForm }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  function SubmitHandle(e) {
    e.preventDefault();
    const newItem = {
      id: 100 + Math.random() * 99,
      title: title,
      description: description,
      finished: false,
    };
    addData(newItem);
    setOpenForm(false);
  }
  return (
    <form
      onSubmit={SubmitHandle}
      style={{
        backgroundColor: "#CE6CB6",
        padding: ".5em",
        borderRadius: ".5em",
      }}
    >
      <button onClick={() => setOpenForm(false)}>❌</button>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Title</label>
        <input
          style={inputStyle}
          type="text"
          placeholder="please enter title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Description</label>
        <textarea
          style={inputStyle}
          placeholder="please enter description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" style={{ margin: ".1em" }}>
        Add
      </button>
    </form>
  );
}
const ToDoListStyle = {
  width: "100%",
  padding: ".5em",
};
const formGroupStyle = {
  width: "90%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};
const ListItemStyle = {
  listStyle: "none",
  backgroundColor: "#FFEDF8",
  padding: ".5em",
  borderRadius: ".5em",
  color: "#242424",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "1.2em",
  margin: ".5em",
};
const itemDetailStyle = {
  backgroundColor: "#FFEDF8",
  borderRadius: ".5em",
  display: "flex",
  flexDirection: "column",
  padding: ".5em",
  alignItems: "flex-start",
};
const ItemCompleteStyle = {
  backgroundColor: "green",
  color: "#fff",
  padding: ".5em",
  borderRadius: ".5em",
  fontWeight: "bold",
};
const ItemInprogressStyle = {
  backgroundColor: "orange",
  color: "#fff",
  padding: ".5em",
  borderRadius: ".5em",
  fontWeight: "bold",
};
const DoListItemStyle = {
  textDecoration: "line-through",
  backgroundColor: "#FFEDF8",
  opacity: ".8",
  listStyle: "none",
  //   backgroundColor: "#FFEDF8",
  padding: ".5em",
  borderRadius: ".5em",
  color: "#242424",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "1.2em",
};
const btnStyle = {
  borderRadius: "8px",
  border: "1px solid transparent",
  padding: "0.6em 1.2em",
  fontSize: "1em",
  fontWeight: 500,
  fontFamily: "inherit",
  margin: ".5em",
  backgroundColor: "#FFEDF8",
  cursor: "pointer",
};
const labelStyle = {
  fontSize: "1.5em",
  color: "#242424",
  fontWeight: "bold",
};
const inputStyle = {
  width: "100%",
  padding: ".5em",
  border: "none",
  outline: "none",
  borderRadius: ".5em",
  backgroundColor: "#FFEDF8",
  fontSize: "1.5em",
  color: "#CE6CB6",
};
export default ToDoList;
