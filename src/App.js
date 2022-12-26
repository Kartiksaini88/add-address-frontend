import logo from './logo.svg';
import './App.css';
import AddressForm from './components/addressdform/addressform';
import { Route, Routes } from 'react-router';
import Table from './components/Tabel/Table';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
     <Navbar></Navbar>
      <Routes>
        <Route path='/address' element={<AddressForm></AddressForm>}></Route>
        <Route path='/' element={<Table></Table>}></Route>
      </Routes>
    </div>
  );
}

export default App;
