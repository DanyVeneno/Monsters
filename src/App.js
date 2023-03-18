import { useState, useEffect } from "react";
import CardList from "./components/card-list/card-list.components";

import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filtroMonsters, setFiltroMonsters] = useState(monsters);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);
  useEffect(() => {
    const newfiltroMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFiltroMonsters(newfiltroMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();

    setSearchField(searchFieldString);
  };

  return (
    <div className='App'>
      <h1 className='monster-title'>Monster Roledex</h1>
      <SearchBox
        className='monsters-search-box'
        onChangeHandler={onSearchChange}
        placeholder={"search monsters"}
      />
      <CardList monsters={filtroMonsters} />
    </div>
  );
};

export default App;
