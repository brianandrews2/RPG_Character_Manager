import './App.css';
import React from "react";
import CharacterPage from "./pages/CharacterPage";
import WorldPage from "./pages/WorldPage";
import HomePage from "./pages/HomePage";
import CreateItemPage from './pages/CreateItemPage';
import EditCharacterPage from './pages/EditCharacterPage';
import CharacterSheetPage from "./pages/CharacterSheetPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateWorldPage from './pages/CreateWorldPage';
import { useState } from 'react'
import CreateCharacterPage from './pages/CreateCharacterPage';
import MerchantPage from './pages/MerchantPage';
import TutorialPage from './pages/TutorialPage';
import EditWorldPage from './pages/EditWorldPage';
import CreateDefaultCharacterPage from './pages/CreateDefaultCharacterPage';

/**
 * App is the router page for the website containing each route and global state variables
 * @returns The routes for each web page
 */
function App() {
  const [worldToView, setWorldToView] = useState();
  const [worldToEdit, setWorldToEdit] = useState();
  const [characterToView, setCharacterToView] = useState();
    return (
      <div>
       <Router>
        <Routes>
          <Route path="/" 
            element={<HomePage/>} />

          <Route path="/worlds/characters"
            element={ <CharacterPage 
            worldToView={ worldToView } 
            setCharacterToView={ setCharacterToView }/>} />

          <Route path="/worlds"
            element={ <WorldPage 
            setWorldToView={ setWorldToView }
            setWorldToEdit={ setWorldToEdit } />} />

          <Route path="/create_world"
            element={ <CreateWorldPage/> } />

          <Route path="/worlds/characters/character_sheet"
            element={ <CharacterSheetPage 
            characterToView={ characterToView }
            worldToView={ worldToView } /> } />

          <Route path="/worlds/characters/create_character"
            element={ <CreateCharacterPage 
            worldToView={ worldToView } /> } />

          <Route path="/worlds/characters/create_default_character"
            element={ <CreateDefaultCharacterPage 
            worldToView={ worldToView } /> } />

          <Route path="/worlds/characters/add_item"
            element={ <CreateItemPage 
            characterToView={characterToView}/> } />

          <Route path="/worlds/characters/update_character"
            element={ <EditCharacterPage 
            characterToView={characterToView}/>} />

          <Route path="/worlds/merchant"
            element={ <MerchantPage 
            characterToView={ characterToView } /> } />

          <Route path="/tutorial"
            element={<TutorialPage></TutorialPage>} />

          <Route path="/worlds/update_world"
            element={ <EditWorldPage
            worldToEdit={worldToEdit}/> } />
            
        </Routes>
       </Router>
      </div>
   );
  }


export default App;
