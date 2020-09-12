import React from "react";
import { useLocalStore, useObserver } from "mobx-react";

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    superheroes: ["Ironman"],
    addSuperhero: (superhero) => {
      store.superheroes.push(superhero);
    },
    get superheroesCount() {
      return store.superheroes.length;
    },
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const SuperheroesHeader = () => {
  const store = React.useContext(StoreContext);
  return useObserver(() => (
    <h1>
      {store.superheroesCount == 1
        ? "We have got just one Superhero in the squad."
        : `We have got ${store.superheroesCount} Superheroes in the squad.`}
    </h1>
  ));
};

const SuperheroesList = () => {
  const store = React.useContext(StoreContext);

  return useObserver(() => (
    <ul>
      {store.superheroes.map((superhero) => (
        <li key={superhero}>{superhero}</li>
      ))}
    </ul>
  ));
};

const SuperheroesForm = () => {
  const store = React.useContext(StoreContext);
  const [superheroes, setSuperhero] = React.useState("");

  return (
    <form
      onSubmit={(e) => {
        store.addSuperhero(superheroes);
        setSuperhero("");
        e.preventDefault();
      }}
    >
      <input
        type="text"
        value={superheroes}
        onChange={(e) => {
          setSuperhero(e.target.value);
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <main>
        <SuperheroesHeader />
        <SuperheroesList />
        <SuperheroesForm />
      </main>
    </StoreProvider>
  );
}
