import React from 'react';
import styles from './App.module.scss';
import NewsList from './components/NewsList/NewsList.tsx';

const App: React.FC = () => {
  return (
      <main className={styles.app}>
        <h1>Hacker News</h1>
        <NewsList/>
      </main>
  )
}

export default App
